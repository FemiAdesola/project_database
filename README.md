# Frontend React app with Redux for Project database App

## Project Structure

Project_database/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   ├── Proj.png
│   │   └── logo.png
│   │
│   ├── common/
│   │   └── constants.jsx
│   │
│   ├── components/
│   │   ├── BackToHome.jsx
│   │   ├── CancelButton.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   └── Navbar.jsx
│   │
│   ├── pages/
│   │   ├── Member/
│   │   │   ├── CreateMember.jsx
│   │   │   ├── MemberList.jsx
│   │   │   └── UpdateMember.jsx
│   │   │
│   │   └── Project/
│   │       ├── CreateProject.jsx
│   │       ├── ProjectsList.jsx
│   │       └── UpdateProject.jsx
│   │
│   ├── Redux/
│   │   ├── slice/
│   │   │   ├── apiSlice.jsx
│   │   │   └── authSlice.jsx
│   │   └── store.jsx
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── App.test.js
│   ├── HomeScreen.jsx
│   ├── LoginScreen.jsx
│   ├── SignupScreen.jsx
│   ├── index.css
│   ├── index.jsx
│   └── setupTests.js
│
├── .gitignore
├── README.md
├── package-lock.json
└── package.json

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**


