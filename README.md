------------SET UP------------------------

Setup Backend :  ---------------IMPORTANT--------------------------------
To get the backend of the project running locally and interact with the database  the steps to be followed are
1)clone the repository to your local machine
2)Navigate to the backend directory of the project and install the required dependencies (and npm install)
3)setting up your environment variables - .env file 
To make the backend work locally, you need to create a .env file to store sensitive information like the MongoDB connection string, JWT secret key, etc.
Create a .env file in the root of the backend directory. 
Inside the .env file, you'll add the necessary environment variables for the backend to connect to the database and handle authentication.
install mongodb locally and after installing, ensure MongoDB is running locally by executing momgosh.exe  in the terminal
After setting up the .env file and ensuring MongoDB is running, now run the back end using command 
npm start // if nodemomn is installed 
or   
node server,js

   
------Updated setup--------
Previously users may have faced db interactivity problems due to local instance varying but that problem can be tackled by upadting the .env file.

NOTE: If an .env file having environment variables is not created or updated the back end can cause interactivity problems while running the application locally (local instance)

1) Build a Nodejs project for back-end
2) Build a React project for front-end using vite 
3) Install the required packages –
4) npm install to install node modules
5) Express
6) Mongoose
7) React
8) React-router-dom
9) Jsonwebtoken
10) Bcryptjs
11) Cors
12)  Axios
13) react-toastify
14) dotenv

•	Start the Front-end in an integrated terminal using command – 
 npm run dev 

•	Start the Back end in another integrated terminal using command –
npm start 
{because back end is using nodemon package for active listening to changes, note: include  "start": "nodemon server.js" in package.json to use nodemon}

•	If not using nodemon start back end by running command –
node main_server_file.js 
{In my case its server.js i.e.=> node server.js}

------------------FEATURES AND USAGE-------------------

Features and Usage: 

1)	Homepage contains videos in the database in a grid format.
2) Functional Search bar used to filter out videos using Titles.
3) Signup feature – users can register in the app by providing the necessary details.
4) Login feature – after registering user can login by using there credentials to use application and avail some user authorized features.
5) Logout feature – user can logout of their account by clicking on logout.
6) A dedicated video player page when clicking on a certain video it opens to a new page showcasing comment section and playing the selected video.
7) Add video feature – an logged in user can upload a video and view their videos in their dedicated channel page.
8) Edit and delete options for comment section – user can edit or delete their comments by choosing relevant options.

