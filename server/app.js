const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const ejs = require("ejs");
const _ = require("lodash");
const path = require("path");
const posts = require("../client/post.json");
const cors = require("cors");
const app = express();


app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("../client/public"));



function getData() {
  let data = fs.readFileSync("../client/post.json");
  data = JSON.parse(data);
  return data;
}

//Function to store data
function storeData(req) {
  data = getData("../client/post.json");
  data.posts.push(req);
  let myJSON = JSON.stringify(data, null, 2);
  fs.writeFileSync("../client/post.json", myJSON);
}


app.get("/", (req, res) => {
  currentData = getData();
  res.render("index", { currentData: currentData });
});

app.get("/post", (req, res) => {
  res.render("post");
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
  });
  res.redirect("/");
});
// Add comments
app.post("/comments/:id", (req, res) => {
  let id = req.params.id;
  let newComment = req.body.comments;
  let newData = getData();
  newData.posts.forEach((post) => {
    if (post.id == id) {
      post.comments.push(newComment);
    }
  });
  let myJson = JSON.stringify(newData, null, 2);
  fs.writeFileSync("../client/post.json", myJson, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("../client/post.json");
    }
  });
  res.redirect("/");
});


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
      fs.writeFileSync("../client/post.json", myJSON);
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
    if (_.lowerCase(currentData.posts[i].title) === postName) {
      res.render("postPage", {
        title: currentData.posts[i].title,
        text: currentData.posts[i].text,
      });
    }
  }
});


module.exports = app;
























app.listen(3000, () => {
    console.log("Server started on port 3000")
})

