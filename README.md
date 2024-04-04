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

