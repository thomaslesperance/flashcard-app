# flashcard-app

## Context
This application was created to test and showcase skills with React in general and with client-side routing using the React Router library.

## How to Use
Rather than using an IDE extension such as Live Server for VSCode, this project uses an internal script (npm start) to start a concurrent pair of local servers. One server is for the json-server server which takes data from the db.json file and provides it to the application. The test web server is spun up from a further internal script from create-react-app. The frontend is compiled by the components of the create-react-app structure and sent to the browser to display the application.

With the two servers running concurrently, you should see a UI in your browser.

## Features
The application provides a number of features pertaining to the management of decks of flashcards for study. The primary functions of this application are:

### Home screen for selecting decks and entering application
![image](https://github.com/thomaslesperance/flashcard-app/assets/144936700/cb3ffb4d-02e5-4791-84ec-d44c8e76d4e8)

### Study deck feature for cycling through cards and flipping them front to back
![image](https://github.com/thomaslesperance/flashcard-app/assets/144936700/671d6ff3-5acd-43c9-924d-5880f006bfe3)

### Create deck feature for creating new decks
![image](https://github.com/thomaslesperance/flashcard-app/assets/144936700/c5c2f4d2-fefc-4e0c-93c2-66e80fa7d243)

### Deck information feature for displaying all info about the deck and further options to manage the deck
![image](https://github.com/thomaslesperance/flashcard-app/assets/144936700/10992588-b776-4caf-988c-1b616adfe9fa)

### Edit deck feature to edit top-level info about the deck
![image](https://github.com/thomaslesperance/flashcard-app/assets/144936700/5584682f-5ea7-4298-aea5-4e33f2eb48ec)

### Add card feature to add additional cards to study into the deck
![image](https://github.com/thomaslesperance/flashcard-app/assets/144936700/6384902c-5575-4ee0-bb10-5031b9793d50)

### Edit card feature to edit existing cards in a deck
![image](https://github.com/thomaslesperance/flashcard-app/assets/144936700/0b0bd367-4329-486f-8b43-19241aad1a10)

## Technologies and Tools
--  JavaScript(ES6)/ HTML/ CSS
--  Bootstrap/ Bootstrap Icons
--  React
--  React Router
--  create-react-app

## Conclusion
Future goals for project are to adapt the application stucture and UI schema to other interests, such as web apps for tabletop gaming or fitness tracking.
