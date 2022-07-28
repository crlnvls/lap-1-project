const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const ejs = require("ejs");
const _ = require("lodash");
const path = require("path");
const supervillains = require('supervillains');
let posts = ("../public/posts.json");
// const cors = require("cors");
const app = express();

app.use(express.json());
// app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(express.static("../client/public"));

app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.static("../views"));
app.use(express.static("../public"));

//Function to retrieve data for posts.json

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


// GET request for homepage

app.get("/", (req, res) => {
  currentData = getData();
  //console.log(currentData);
  res.render(__dirname + "/../views/index", { currentData: currentData });
});

//GET request for posting page
app.get("/post", (req, res) => {

   
    res.render("post");
        
});

//POST request to post new entry to post.JSON

app.post("/post", (req, res) => {
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
  let gif = req.body.gif
  let date = getPostDate()
  let supervillain = supervillains.random()
  let comments = req.body.comments;
  storeData({
    id: id,
    title: title,
    text: text,
    comments: [],
    gif: gif,
    time: date,
    supervillain: supervillain,
    reactions: {
      like: 0,
      love: 0,
      hate: 0,
  },
  });
  res.redirect("/");
});
    
  

// Stores reactions to json file

// // POST request to add a comment
// app.post("/postPage/:id", (req, res) => {
//   let id = req.params.id;
//   let newComment = req.body.comments;
//   let newData = getData();
//   newData.posts.forEach((post) => {
//     if (post.id == id) {
//       post.comments.push(newComment);
//     }
//   });
//   let myJson = JSON.stringify(newData, null, 2);
//   fs.writeFileSync("../public/post.json", myJson, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("../public/post.json");
//     }
//   });
//   res.redirect("/");
// });


// DELETE request to remove a post from post.JSON
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



app.get("/postPage/:id", (req, res) => {
    let postId = Number(req.params.id);
    currentData = getData();

    for (let i = 0; i < currentData.posts.length; i++) {
        if (postId == currentData.posts[i].id) {
            res.render("postPage", {
                title: currentData.posts[i].title,
                text: currentData.posts[i].text,
                comments: currentData.posts[i].comments,
                id: currentData.posts[i].id

      });
    }
  }
});

app.post("/postPage/:postName", (req, res) => {
  currentData = getData()
  let postName = _.lowerCase(req.params.postName);
  let newComment = req.body.comment;
  for (let i = 0; i < currentData.posts.length; i++) {
    if (_.lowerCase(currentData.posts[i].title) === postName) {
      currentData.posts[i].comments.push(newComment);
      res.render(__dirname + "/../views/postPage", {
        title: currentData.posts[i].title,
        text: currentData.posts[i].text,
        comments: currentData.posts[i].comments,
        id: currentData.posts[i].id,
        gif: currentData.posts[i].gif,
        date: currentData.posts[i].time,
        supervillain : currentData.posts[i].supervillain,
        time: currentData.posts[i].time
      });
    }
  }
});

app.post("/postPage/:id", (req, res) => {
  let postId = Number(req.params.id)
  let newComment = req.body.comment
  currentData = getData();

  for (let i = 0; i < currentData.posts.length; i++) {
    if (postId === currentData.posts[i].id) {
      currentData.posts[i].comments.push(newComment)
      let myJSON = JSON.stringify(currentData, null, 2);
      fs.writeFileSync("../public/posts.json", myJSON);
      res.render(__dirname + "/../views/postPage", {
        title: currentData.posts[i].title, 
        text: currentData.posts[i].text, 
        comments: currentData.posts[i].comments, 
        id: currentData.posts[i].id,
        gif: currentData.posts[i].gif,
        date: currentData.posts[i].time,
        supervillain: currentData.posts[i].supervillain
      })
    }
  }

})


// Add comments
// app.post("/comments/:id", (req, res) => {
//   let id = req.params.id;
//   let newComment = req.body.comments;
//   let newData = getData();
//   newData.posts.forEach((post) => {
//     if (post.id == id) {
//       post.comments.push(newComment);
//     }
//   });
//   let myJson = JSON.stringify(newData, null, 2);
//   fs.writeFileSync("../public/post.json", myJson, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("../public/post.json");
//     }
//   });
//   res.redirect("/");
// });


// this is a function to get the time and date a post was made

function getPostDate() {

  let date = new Date()

  hour = date.getHours() 
  hour = hour < 10 ? `0${hour}` : hour
  minute = date.getMinutes()
  minute = minute < 10 ? `0${minute}` : minute
  day = date.getDate()
  month = date.getMonth()
  year = date.getFullYear()

  //minute = minute < 10 ? `0${minute}` : minute

  if (month === 1) {
      month = "Jan"
  } else if (month === 2) {
      month = "Feb"
  } else if (month === 3) {
      month = "Mar"
  } else if (month === 4) {
      month = "Apr"
  } else if (month === 5) {
      month = "May"
  } else if (month === 6) {
      month = "Jul"
  } else if (month === 7) {
      month = "Aug"
  } else if (month === 8) {
      month = "Sep"
  } else if (month === 9) {
      month = "Oct"
  } else if (month === 10) {
      month = "Nov"
  } else if (month === 11) {
      month = "Dec"
  } else if (month === 0) {
      
  }

  let postDate = `${hour}:${minute} · ${month} ${day}, ${year}`

  return postDate
}

//Add count reactions
app.post("/reactions", (req, res) => {
  const currentData = getData();
  //console.log(typeof req.body.reaction); //string
  //console.log(typeof req.body.post) //string
  let postId = Number(req.body.post)
  //console.log(postId, typeof postId) //number
  //Find the post with that id
  let reactionType = req.body.reaction
  //reaction.hate
  //obj.reactions["hate"]
  //console.log(typeof currentData[0].reactions.like) // 0 number
  //console.log(currentData.posts[0].reactions[`${reactionType}`]) // <========== OH MY GODDDD!!!! ==========>
  for (let i = 0; i < currentData.posts.length; i++) {
    if (currentData.posts[i].id === postId) {
      currentData.posts[i].reactions[reactionType] += 1
      let myJSON = JSON.stringify(currentData, null, 2);
      fs.writeFileSync("../public/posts.json", myJSON);
      //console.log(currentData.posts[i].reactions[`${reactionType}`])
    }
  }
})
app.post("/postPage/:id", (req, res) => {

    if (req.body.button == "Post") {
        let postId = Number(req.params.id)
        let newComment = req.body.comment
        currentData = getData();
        console.log(req.body);

        for (let i = 0; i < currentData.posts.length; i++) {
            if (postId == currentData.posts[i].id) {
                currentData.posts[i].comments.push(newComment);
                let myJSON = JSON.stringify(currentData, null, 2);
                fs.writeFileSync("./public/posts.json", myJSON);
                res.render("postPage", {
                    title: currentData.posts[i].title,
                    text: currentData.posts[i].text,
                    comments: currentData.posts[i].comments,
                    id: currentData.posts[i].id
            
                })
            }
        
        }
    } else if (req.body.button == "Delete journal entry") {
            // DELETE request to remove a post from post.JSON
            console.log(req.body)
        
            let id = req.params.id;
            let currentData = getData();
             //Iterate through data to match the ID
            currentData.posts.forEach((post) => {
                if (post.id == id) {
            //Cut out the data with the matching ID and rewrite the file
                    currentData.posts.splice(id - 1, 1);
                    let myJSON = JSON.stringify(currentData, null, 2);
                    fs.writeFileSync("./public/posts.json", myJSON);
                    res.redirect("/");
                }            
    });
    
}

});
    

          
    
    

module.exports = app;


