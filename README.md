# EduHub

* *Deployed Frontend URL*: <https://eduhub-react-frontend.vercel.app/>
* *Deployed Backend URL*: <https://eduhub-node-backend.onrender.com>

## Authors

* [Kunal Rajeshkumar Makwana](kn362288@dal.ca)
* [Rachit Khanna]()
* [Disha Anand]()
* [Rahul Goswami]()
* [Freya Vora]()
* [Disha Anand]()


## Built With

* [React](https://legacy.reactjs.org/docs/getting-started.html/) - The web framework used
* [npm](https://docs.npmjs.com//) - Dependency Management
* [MongoDB](https://legacy.reactjs.org/docs/getting-started.html/) - The Database used
* [ZegoCloud](https://legacy.reactjs.org/docs/getting-started.html/) - The SDK Kit used for live streaming
* [Node](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) - Runtime JS environment used for backend
* [Express](https://expressjs.com/en/starter/hello-world.html) - Web framework used for Node.js
* [Springboot](https://spring.io/guides/gs/spring-boot) - Java-based framework for building our web application


## Prerequisites

To have this project up and running on your local machine, you will first need to install the following softwares.


Node.js(v20.11.0)

See the following section for detailed step-by-step instructions on how to install this software.

## Installing

Download and Install Node.js for your Operating System from https://nodejs.org/en/download.

Check if Node.js is successfully installed by checking it's version on the terminal.

node --version


Confirm if the version is the same as the one downloaded.


## In order to run it locally :
- Clone the project using git clone.
```bash
git clone https://git.cs.dal.ca/harshpreet/csci_5709_grp-06.git
```
- Move to the cloned directory using cd command. 
```bash
cd csci_5709_grp-06
```
- Now go inside the backend folder using cd command.
```bash
cd backend
```
- Run  `npm install` in your terminal to install the dependencies
```bash
npm install
```
- Then Run command : npm start to start the backend code
```bash
npm start
```

- Now re-direct to the frontend folder using cd command. 
```bash
cd ../frontend
```
- Run  `npm install` in your terminal to install the dependencies
```bash
npm install
```
- Then Run command : npm start to start the backend code
```bash
npm start
```

- To open the web application, click on the link which is there in the logs.

- **Disclaimer: We have deployed backend code on render, so we have replace api calls with the url of deployed backend url.**

- In order to use localhost backend code, you have to modify the frontend/src/services/urls.js file. 

- Go to that file and change :
```bash
baseURL = 'localhost:6002'  //changing url to local backend
```

- Now you are all set to run and test the application. Wohooo!!

## Deployment
### Frontend

To deploy our project environment, we utilized Netlify. Here's a summary of the deployment process we followed:

- Setting Up the Netlify Account
- Connecting to Github Repository
- Configuring Build Settings
- Continuous Deployment

### Backend

To deploy our project environment, we utilized Render. Here's a summary of the deployment process we followed:

- Creating a Render Account
- Deploying Backend Services
- Configuring Environment Variables
- Continuous Deployment

## Folder Structure
### Backend
As we are using NodeJS for backend, so there
are package.json and package-lock.json for maintaining the dependencies of the project.
- Constant: This folder will have all the constants which are defined in entire NodeJS code.
For ex. Static url.
- Controller: This folder will have all the controllers of the features. It is the place where all
the business logic of the application will be maintained.
- Models: This folder will have schema for all the features. It is responsible for defining the
shape of the data, as well as any validation rules or business logic associated with it.
- Routes: This folder will have routes for all the http request made by the user or react
application.
- .env: This file have all the secret key values, and this file won’t be deployed to any
platform in order to secure the credentials.
- Server.js: This file is the entry point of node.js where express server has initialised.
- Middlewares: This folder will have middlewares for all the features which will pre-validate
and handle the request body.

### Frontend
As we are using ReactJS for frontend, so
there are package.json and package-lock.json for maintaining the dependencies of the project.
- tailwind.config.js: As we are using Tailwind CSS for our project, this file will help us
to determine the file name format in which we have to apply Tailwind CSS.
- postcss.config.js: This file will define the plugins for the Tailwind CSS.
- index.jsx: This file is the entry point of an application where we have defined our
browser router.
- Assets folder: This folder will have static images and other static resources which we
are using in our application.
- Components: This folder will store all the react components designed for our website.
- pages: This folder will have the main pages of our application. For ex. Login page,
Course dashboard page etc.
- Readme.md : This file will have the information of our project, like which technology
we are using and helps others to get started with the project.
- Core: This folder will have routes for the EduHub Application.


## Feature : User Authentication (Account Management)
- **Overview**: This feature is intended to provide functionality for user authentication and account management. It allows users to securely sign up, log in, and manage their accounts within the application. **The whole authentication is implement using JWT tokens**.

    **1.** **Sign Up for an Account**
    - Users can create new accounts by providing necessary details such as firstName, lastName, role (Student or Teacher), email, and password.

    - Password has been encrypted using bcrypt and the JWT token has been sent to the user in the header from backend and it has been stored in the cookie with the expiry time of 2 days.

    **2.** **Login to an existing Account:**
    - Registered users can log in to their accounts using their credentials. Authentication mechanisms is implemented using JSON Web Tokens to securely manage user sessions.

    **3.** **Forgot Password:**
    - In case users forget their passwords, the system will provide a mechanism for password reset. Our system will send a link over mail to reset the password with the expiry time of 20 minutes. 

    **4.** **Profile page:**
    - Logged-in users will be able to see the account details including firstname, lastname, email and will be able to update the same. 

    - So basically, i am displaying the details of the user from the userSlice which i am maintaining it using Redux. 

    **5.** **Logout:**
    - Logged-in users will be able to logout from the application by clicking on logout which will clear the accesstoken cookie on the client side.

    ***For more details re-direct to***: https://git.cs.dal.ca/harshpreet/csci_5709_grp-06/-/tree/dev_kunal/backend


## License

EduHub is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

