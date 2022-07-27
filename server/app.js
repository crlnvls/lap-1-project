const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const ejs = require("ejs");
const _ = require("lodash");
const path = require("path");
let posts = "../public/posts.json";
// const cors = require("cors");
const app = express();

app.use(express.json());
// app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.static("../views"));
app.use(express.static("../public"));

function getData() {
  let data = fs.readFileSync("../public/posts.json");
  data = JSON.parse(data);
  return data;
}

//Function to store data
function storeData(req) {
  data = getData("../public/posts.json");
  data.posts.push(req);
  let myJSON = JSON.stringify(data, null, 2);
  fs.writeFileSync("../public/posts.json", myJSON);
}

app.get("/", (req, res) => {
  currentData = getData();
  console.log(currentData);
  res.render(__dirname + "/../views/index", { currentData: currentData });
});

app.get("/post", (req, res) => {
  res.render(__dirname + "/../views/post");
});

app.post("/post", (req, res) => {
  data = req.body;
  currentData = getData();
  // Function to iterate through the data to find the highest ID
  let highestId = 0;
  currentData.posts.forEach((post) => {
    if (post.id > highestId) {
      highestId = post.id;
    }
  });
  // Allocate the data to variables
  let id = highestId + 1;
  let title = req.body.title;
  let text = req.body.text;
  let comments = req.body.comments;

  storeData({
    id: id,
    title: title,
    text: text,
    comments: [],
    reactions: {
      like: 0,
      love: 0,
      hate: 0,
    },
  });
  res.redirect("/");
});

// Stores reactions to json file

// Deleting a post
app.delete("/posts/:id", (req, res) => {
  let id = req.params.id;
  let currentData = getData();
  //Iterate through data to match the ID
  currentData.posts.forEach((post) => {
    if (post.id == id) {
      //Cut out the data with the matching ID and rewrite the file
      currentData.posts.splice(id - 1, 1);
      let myJSON = JSON.stringify(currentData, null, 2);
      fs.writeFileSync("../public/post.json", myJSON);
    } else {
      console.log(post);
    }
  });
  console.log(currentData.posts);
  res.send("Deletion Complete!");
});

app.get("/postPage/:postName", (req, res) => {
  let postName = _.lowerCase(req.params.postName);
  currentData = getData();
  for (let i = 0; i < currentData.posts.length; i++) {
    if (_.lowerCase(currentData.posts[i].id) === postName) {
      res.render(__dirname + "/../views/postPage", {
        title: currentData.posts[i].title,
        text: currentData.posts[i].text,
        comments: currentData.posts[i].comment,
      });
    }
  }
});

app.post("/postPage/:postName", (req, res) => {
  let postName = _.lowerCase(req.params.postName);
  let newComment = req.body.comment;
  for (let i = 0; i < posts.length; i++) {
    if (_.lowerCase(posts[i].title) === postName) {
      posts[i].comments.push(newComment);
      res.render("postPage", {
        title: posts[i].title,
        text: posts[i].text,
        comments: posts[i].comments,
        time: posts[i].time,
      });
    }
  }
});

//Add count reactions
app.post("/reactions", (req, res) => {
  const currentData = getData();
  // console.log(req.body);
  console.log(req.body.reaction);

  // Find the post with that id

  let reactionPostId = Number(req.body.post);
  currentData.posts.forEach((post) => {
    if (reactionPostId === post.id) {
      post.reactions.hate += 1;
      // console.log(post.reactions);
    }
  });

  //  Update the post's number of [whatever reaction] by one
  // Save all the changed data
  let myJSON = JSON.stringify(currentData.posts, null, 2);
  fs.writeFileSync("../public/post.json", myJSON);

  res.json({
    success: true,
  });
});
module.exports = app;
