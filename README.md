# cloud-file-storage
cloud based storage system 

Project Overview
This is the backend of a Cloud File Storage System, focusing on User Authentication using Node.js, Express.js, MongoDB, bcrypt, and JWT.

Features
User Registration (/api/users/register)

User Login (/api/users/login)

JWT Token generation

Protected route access (e.g., /api/users/profile)

Password hashing using bcrypt

Environment variables handled using dotenv

Project Structure

cloud-file-storage/
├── client/                   # (Frontend – placeholder, optional)
├── server/                  # Backend
│   ├── middleware/          # JWT verification middleware
│   │   └── verifyToken.js
│   ├── models/              # Mongoose user schema
│   │   └── User.js
│   ├── routes/              # All route files (Auth, Users, etc.)
│   │   └── userRoutes.js
│   ├── .env                 # Environment variables (PORT, MONGO_URI, JWT_SECRET)
│   ├── index.js             # Main Express server file
│   └── package.json         # Backend dependencies and scripts
├── .gitignore
├── LICENSE
├── README.md                # You’re reading this

 Setup Instructions
Clone the repository
git clone <repo-url>
cd server

Install dependencies
npm install

Create .env file

MONGO_URI=your_mongo_connection_string
SECRET_KEY=your_jwt_secret_key

Run the server
nodemon index.js


 API Endpoints

Method	Endpoint	        Description
POST	/api/users/register	Register a new user
POST	/api/users/login	Login and get token
GET	    /api/users/profile	Protected route (token)

API Endpoints
🔐 Authentication
✅ Register a New User

POST /api/users/register
Body (JSON):

{
  "username": "manvi",
  "email": "manvi@example.com",
  "password": "securepassword"
}
🔓 Login User

POST /api/users/login
Body (JSON):

{
  "email": "manvi@example.com",
  "password": "securepassword"
}
Response:

{
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE"
}
🔐 JWT-Protected Route (Optional)

To access a protected route, include the JWT in the request header:
Authorization: Bearer JWT_TOKEN_HERE


🧑‍💻 Author
Manvi
BCA Student | Aspiring Developer | Focused on building real-world projects

Tech Stack

Node.js

Express.js

MongoDB + Mongoose

bcrypt

JWT

dotenv