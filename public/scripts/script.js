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



