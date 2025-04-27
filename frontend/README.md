MCQ Generator
MCQ Generator is a web-based application designed to help users create multiple-choice questions (MCQs) efficiently using AI techniques. This tool is particularly useful for educators, trainers, and content creators who want to generate MCQs automatically from provided text input.

Table of Contents
1.Features
2.Demo
3.Tech Stack
4.Installation
5.Usage
6.API Endpoints
7.Project Structure
8.Contributing
9.License

Features
1.AI-Powered MCQ Generation: Automatically generate multiple-choice questions from any text input.
2.User-Friendly Interface: Simple and intuitive UI for users to interact with.
3.Account Registration and Login: Users can register, log in, and manage their MCQ sets.
4.Real-Time Feedback: Users can review generated MCQs and make modifications as needed.
5.Data Storage: Saves user-generated MCQs to a database for easy access.

Demo
Check out the live version of MCQ Generator here. (Provide a live link if available)

Tech Stack
Frontend: React, CSS
Backend: Node.js, Express
Database: SQL-based database (e.g., MySQL/PostgreSQL)
API: Axios for handling HTTP requests
Deployment: Vite for development server, hosted on GitHub Pages / any cloud provider (if applicable)

Installation
Prerequisites
Node.js
npm or yarn
SQL database setup (e.g., MySQL, PostgreSQL)

Steps
1.Clone the repository:
git clone https://github.com/your-username/mcq-generator.git
cd mcq-generator
2.
Install dependencies:
npm install

3.Database Setup:
Ensure your SQL database server is running.
Create a database named registration_form and configure tables for storing user information and MCQ data.

4.Backend Configuration:
In the server directory, update config.js with your database credentials.

5.Start the Development Server:
npm run dev

Usage
1.Sign Up:
New users should register to create an account.
2.Log In:
Users can log in to access their dashboard and begin generating MCQs.
3.MCQ Generation:
After logging in, input the text content into the text field and click "Generate MCQs."
Review the auto-generated MCQs and adjust options if needed.
4.Save and Retrieve:
Save your MCQs to the database and retrieve them anytime by logging in.

API Endpoints
1.POST /signup: Register a new user
2.POST /login: Log in an existing user
3.POST /upload: Generate MCQs based on user-provided text
4.GET /questionlist: Retrieve saved MCQs for the logged-in user
(Adjust the endpoints as per actual implementation)

Project Structure
bash
Copy code
mcq-generator/
│
├── frontend/           # Frontend code
│   ├── public/         
│   ├── src/            
│       ├── assets/     
│       ├── components/ 
│       ├── pages/      
│       ├── App.js      
│       └── index.js    
│
├── backend/            # Backend code
│   ├── routes/         # API endpoints
│   ├── controllers/    # Request handling logic
│   ├── config/         # Database configuration
│   ├── models/         # Database models
│   └── server.js       # Main server file
│
├── .env                # Environment variables
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation

Contributing
1.Fork the repository.
2.Create a new branch for your feature.
3.Commit your changes and push to your branch.
4.Open a pull request.

License
This project is licensed under the QuizGEn License.

Contact
For any questions or suggestions, please reach out to shishir.chapagain.999@gmail.com