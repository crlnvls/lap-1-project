// Giphy API

//search endpoint
const url = "https://api.giphy.com/v1/gifs/search?api_key=goUgQEQqeYYGEBmKW7QbDqW0PhVQopno&limit=10&q="

document.addEventListener("DOMContentLoaded", getGif)
document.addEventListener("DOMContentLoaded", pasteGif)

function getGif () {
    document.getElementById("btnSearch").addEventListener("click", e => {
        e.preventDefault()
        let searchedGif = document.getElementById("search").value
        let newUrl = `${url}${searchedGif}`
        console.log(newUrl)
        fetch(newUrl)
        .then(response => response.json())
        .then(content => {
            for (let i = 0; i < content.data.length; i++) {
                let img = document.getElementById(`gif${i}`)
                img.src = content.data[i].images.downsized.url
                img.alt = content.data[i].title
            }
        })
        .catch(err => {
            console.error(err)
        })
    })
}

function pasteGif () {
    let elements = document.querySelectorAll(".gif-size")

    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", e => {
            e.preventDefault()
            let gifImg = document.getElementById("gifAttachment")
            gifImg.src = elements[i].src
            gifImg.alt = elements[i].alt
        })
    }
        
}

const likes = document.getElementsByClassName("like");
// for each button
[...likes].forEach((l) => {
    //add an event listener
    l.addEventListener("click", (e) => {
        //get reference to the click thing
        const holder = e.currentTarget;
        //get reference to span
        const span = holder.querySelector("span");
        //change the text
        span.textContent= 1 + Number(span.textContent);
    });
});

const loves = document.getElementsByClassName("heart");
// for each button
[...loves].forEach((l) => {
    //add an event listener
    l.addEventListener("click", (e) => {
        //get reference to the click thing
        const holder = e.currentTarget;
        //get reference to span
        const span = holder.querySelector("span");
        //change the text
        span.textContent= 1 + Number(span.textContent);
    });
});

const hates = document.getElementsByClassName("hate");
// for each button
[...hates].forEach((l) => {
    //add an event listener
    l.addEventListener("click", (e) => {
        //get reference to the click thing
        const holder = e.currentTarget;
        //get reference to span
        const span = holder.querySelector("span");
        //change the text
        span.textContent= 1 + Number(span.textContent);
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
    





