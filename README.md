# Lap 1 assignment : X-diary, anonymous journals

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

# Installation & Usage

## Installation

1. npm install - install the dependencies for the public folder.
2. cd server - move into the server folder.
3. npm install - install the dependencies for the server folder.
4. Navigate to [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and follow instrucitons to install.
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

    

