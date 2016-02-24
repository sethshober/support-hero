# Support Hero Calendar and Scheduler

## Usage
```
npm install
npm start
```

This web-based application stores and displays the on-duty schedule for a team. It is a Node/Express app, serving and Angular frontend. The datastore is MongoDB. This represents an MVP to the following guidelines. It is not feature complete, and the UI/UX is minimal, but provides a clear starting point and understanding. Also, I am currently not an Angular engineer, and thus you will find that not everything here has been done the Angular way. Please, see this for what it is, a fun experiment and proof of concept. Enjoy!

## Features

* Display today’s Support Hero.
* Display a single user’s schedule showing the days they are assigned to Support Hero.
* Display the full schedule for all users in the current month.
* Users should be able to mark one of their days on duty as undoable
* The system should reschedule accordingly
* Should take into account weekends and California’s holidays.
* Users should be able to swap duty with another user’s specific day

## Requirements

* The app must be implemented as a JavaScript-based single page application with an api backend that preserves state,
* Your completed work must be either checked into an accessible git-based repository or sent as a single zip file, and
* We must be able to run your app on a Mac laptop without assistance.

## Guidelines

* Use a server-side framework of your choice for api and data storage,
* Use whatever JavaScript framework and libraries you want,
* Place a heavy emphasis on building this as a system you would actually deploy, and
* Use development and architectural best practices.

## Initial order for on-duty schedule
￼
["Sherry", "Boris", "Vicente", "Matte", "Jack", "Sherry",
 "Matte", "Kevin", "Kevin", "Vicente", "Zoe", "Kevin",
 "Matte", "Zoe", "Jay", "Boris", "Eadon", "Sherry",
 "Franky", "Sherry", "Matte", "Franky", "Franky", "Kevin",
 "Boris", "Franky", "Vicente", "Luis", "Eadon", "Boris",
 "Kevin", "Matte", "Jay", "James", "Kevin", "Sherry",
 "Sherry", "Jack", "Sherry", "Jack"]