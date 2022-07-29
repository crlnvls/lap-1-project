# Lap 1 assignment : X-diary, anonymous journals

## Badges

![licence](https://img.shields.io/github/license/Mike-Mercieca/lap-1-project-front-end) ![version](https://img.shields.io/github/package-json/v/Mike-Mercieca/lap-1-project-front-end/master)

# Product Information

## Product Description
X-diary is an anonymous journaling site. It allows you to post journal entries (with GIFS) under a pseudonym for the rest of the users to view, comment and react to. The journals, along with any GIFS, comments and reactions attributed to the post are then stored in a JSON file to be recalled when the website is reloaded. 

## Built using:

* HTML
* CSS
* Javascript
* Node
* Node Express
* EJS
* Giphy API
* Jest 
* Supertest

# Installation & Usage

## Installation

1. npm install - install the dependencies for the public folder.
2. cd server - move into the server folder.
3. npm install - install the dependencies for the server folder.
4. Navigate to [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and follow instructions to install.
5. heroku local - run the application on the local Heroku server.

## Usage

1. Navigate to the URL https://x-diary.herokuapp.com/
2. The homepage displays all the current journal entries
    ![Homepage](/READMEAssets/Homepage.jpg)

3. To create a new post navigate to the create post icon in the top right.
    ![GIF to create post](/READMEAssets/createpost.gif)

4. Fill in your title and add your journal.
5. Add any GIFS you may want and then post to the website.
    ![add a GIF](/READMEAssets/addGIF.gif)

6. To add a comment to a post, navigate to the post, fill in the comment box and then click add comment.
    ![add a comment](/READMEAssets/addacomment.gif)

7. Along the bottom of each journal entry are a list of reactions.
    1. The first shows the number of comments the entry has recieved.
    2. The second shows the number of likes the entry has recieved.
    3. The third shows the number of love the entry has recieved.
    4. The fourth shows the number of downvotes the entry has recieved.
    ![react to a post](/READMEAssets/react.gif)

8. To delete a post, navigate to the post, then press the delete post button.
    ![delete a post](/READMEAssets/delete.gif)



## Build Process

# Backend Process

In the backend we started with requiring in the modules we would need to get make the programme such as express. We then moved onto creating each of the app.GET paths for each of the pages to make sure we could connect to each of them. After this we spoke to the front end team to start creating routes for each of the functions that they were planning to include for example the app.POST to post a new journal to the website.

# Frontend Process

In the frontend we started with choosing how we wanted to handle displaying the journal cards on the homepage for which we chose to work with EJS due to its ability to easily create templates and display them when called upon. We then moved onto working out how to dispay GIF's and get them to send and re-display once posted. This involved converting the source of the GIF into JSON to be stored and then reconverted to a string to be called upon to display again. 

# Joining together

We weere intiially going to display the front end on Netlify but due to EJS not using static html files we were unable to di this. This caused us to have to knit the two files together into one app to be fully deployed on Heroku. This initially caused some issues as we had to reorganise a lot of the routing to make sure all the necessary assets we are able to be called upon.



## Wins & Challeneges

# Challenges

* Passing the GIF image to the server for storage via a form.
* Storing the number of reactions that the emoji had recieved on click.
* Having a list of hidden GIF's that appeared on button press.
* Getting all the GET and POST pathing to match up with where they need to be.
* Merging two sets of code towards the end of the project.
* Using JSON.parse and JSON.stringify in the correct places to get the correct data type.


# Wins

* The look of the website.
* The reactional layout of the cards.
* Realising that EJS was going to cause us to have to totally change the way we host the app but learning the necessary things to get it working.
* Creating an if/else statement that listens to two POST requests and decides what to do with it.
* Creating tests for the backend routing.

## Bugs

* Currently the delete post function is correctly taking in the ID of the post but is then deleting the incorrect post due to it selecting the index position of the number. 

## Future features

* Search for a journal title.
* Add GIFS into comments.
* Add reactions to comments.
* Reply to comments.
* Add a sentiment analyser that auto-imputes emojis according to the post content's sentiment.
