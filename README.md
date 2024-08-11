# Lazaza React Assessment

This repository holds the boilerplate for a Trivia Quiz Game application.

Your goal is to write React code that delivers the product described in the ticket below. You should write code that you would feel comfortable submitting for code review and deploying to production.

**Please spend no more than two hours on this project.**

## Ticket LC-5678

This application currently fetches from a publically available api hosted at `https://opentdb.com/`, which serves trivia questions. You can see them logged in your browser console. However, that's nearly all it does - your task is to finish building this Trivia Game Application.

### Acceptance Criteria

A user should be able to:

- See instructions for how to play
- Start a fresh trivia game
- Select:
  - a category of questions
  - number of questions
  - any other configuration you see fit
- See their score and how many questions are remaining
- Start a new game at the end of their current game

Bonus: Feel free to show off your CSS skills to make the app attractive, dynamic and user-friendly.

### Out of Scope

- User Accounts / Auth
- Persistance
- Multi-Player Games

## How to Submit

Please use this repository to implement the ticket.
For submission, either fork the repo and provide the url, or zip your local repo and send to your interviewer.

## Running the App

`npm install`

`npm run dev`

App will be running on `http://localhost:3001/`

## Julia's Updates

- **Settings:** Added options to configure game difficulty, number of questions, category, and a timed game mode with 15 seconds per question.
- **Question Persistence:** Ensured that questions are only refreshed when settings change or when new questions are requested, preventing unnecessary reloads if the user navigates away briefly.
- **UI Enhancements:** Integrated a progress bar, basic visual feedback for correct and incorrect responses, and a confetti celebration for a perfect score.
- **Error handling:** Created an ErrorBox component to display to user's if error persists after 3 retries.

### Roadmap if More Time:
- Add more unit tests
- Implement a visual timer cue
- Further gamify the UI
- Add non-multiple-choice question types
- Improve specific error handling and user experience feedback



