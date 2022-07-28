// Giphy API

//search endpoint
const url =
  "https://api.giphy.com/v1/gifs/search?api_key=goUgQEQqeYYGEBmKW7QbDqW0PhVQopno&limit=10&q=";

document.addEventListener("DOMContentLoaded", getGif);
document.addEventListener("DOMContentLoaded", pasteGif);

function getGif() {
  document.getElementById("btnSearch").addEventListener("click", (e) => {
    e.preventDefault();
    let searchedGif = document.getElementById("search").value;
    let newUrl = `${url}${searchedGif}`;
    console.log(newUrl);
    fetch(newUrl)
      .then(response => response.json())
      .then(content => {
        for (let i = 0; i < content.data.length; i++) {
          let img = document.getElementById(`gif${i}`);
          img.src = content.data[i].images.downsized.url;
          img.alt = content.data[i].title;
        }
      })
      .catch(err => {
        console.error(err);
      });
  });
}

function pasteGif () {
    let elements = document.querySelectorAll(".gif-size")
    let gifInput = document.querySelector("input[type=hidden]") //select hidden input

    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", e => {
            e.preventDefault()
            let gifImg = document.getElementById("gifAttachment")
            gifImg.src = elements[i].src
            gifImg.alt = elements[i].alt
            gifInput.value = elements[i].src // on click, change value of hidden input to the clicked gifs link
        })
    }
        
}

const likes = document.getElementsByClassName("like");
// for each button
[...likes].forEach((l) => {
  // add an event listener
  l.addEventListener("click", (e) => {
    // get reference to the click thing
    const holder = e.currentTarget;
    // get reference to span
    const span = holder.querySelector("span");
    // change the text
    span.textContent = 1 + Number(span.textContent);

    // tell the server that the post have been liked
    const url = "https://x-diary.herokuapp.com/reactions";
    const options = {
      method: "post",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        reaction: "like",
        post: span.getAttribute("postId"),
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
  });
});

const loves = document.getElementsByClassName("heart");
// for each button
[...loves].forEach((l) => {
  // add an event listener
  l.addEventListener("click", (e) => {
    // get reference to the click thing
    const holder = e.currentTarget;
    // get reference to span
    const span = holder.querySelector("span");
    // change the text
    span.textContent = 1 + Number(span.textContent);

    // tell the server that the post have been liked
    const url = "https://x-diary.herokuapp.com/reactions";
    const options = {
      method: "post",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        reaction: "love",
        post: span.getAttribute("postId"),
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
  });
});

const hates = document.getElementsByClassName("hate");
// for each button
[...hates].forEach((l) => {
  // add an event listener
  l.addEventListener("click", (e) => {
    // get reference to the click thing
    const holder = e.currentTarget;
    // get reference to span
    const span = holder.querySelector("span");
    // change the text
    span.textContent = 1 + Number(span.textContent);

    // tell the server that the post have been liked
    const url = "https://x-diary.herokuapp.com/reactionshttp://localhost:3000/reactions";
    const options = {
      method: "post",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        reaction: "hate",
        post: span.getAttribute("postId"),
      }),
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
  });
});

const comments = document.getElementsByClassName("comments");
// for each button
[...comments].forEach((e) => {
        //get reference to the click thing
        const holder = e.currentTarget;
        //get reference to span
        const span = holder.querySelector("span");
        //change the text
        span.textContent= 1 + Number(span.textContent);
        
    });
