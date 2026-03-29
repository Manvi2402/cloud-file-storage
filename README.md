# 🚀 AeroDrive – Cloud File Storage

**Fast, Secure & Cloud-Powered File Storage System**  

AeroDrive is a modern cloud-based file storage system with a sleek dashboard, responsive UI, user authentication, and AWS S3 integration. Users can upload, manage, and delete files with ease, all secured using JWT authentication.

---

## 🌟 Features

- **User Authentication**
  - Register & Login with JWT
  - Password hashing using `bcrypt`
- **File Management**
  - Upload files (Images, PDFs, etc.)
  - Delete files ✅
  - View uploaded files with preview
- **AWS Integration**
  - Cloud storage using AWS S3
  - Future support: storage stats
- **Dashboard**
  - Responsive, clean, and modern UI
  - Sidebar navigation
- **Responsive Design**
  - Works on Desktop, Tablet & Mobile

---

## 📁 Project Structure
cloud file storage/
├── client/ # Frontend
│ ├── src/
│ │ ├── assets/ # Images & icons
│ │ ├── components/ # UploadForm, UploadedFiles, etc.
│ │ ├── css/ # Dashboard, LandingPage, Login, Register styles
│ │ ├── pages/ # LandingPage, Dashboard, Login, Register
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
├── server/ # Backend
│ ├── middleware/ # JWT verification
│ │ └── verifyToken.js
│ ├── models/ # Mongoose models
│ │ ├── User.js
│ │ └── UploadModel.js
│ ├── routes/ # API routes
│ │ └── userRoutes.js
│ │ └── uploadRoutes.js
│ ├── utils/ # Helper functions (e.g., S3 upload)
│ │ └── s3upload.js
│ ├── .env # Environment variables
│ ├── index.js # Main server entry
│ └── package.json
├── .gitignore
├── LICENSE
└── README.md

## ⚙️ Setup Instructions

Clone the repository
git clone <repo-url>
cd server

Install dependencies
npm install

Create .env file

MONGO_URI=your_mongo_connection_string
SECRET_KEY=your_jwt_secret_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_s3_bucket_name

Run the server
nodemon index.js

Frontend
cd client
npm install
npm run dev

## 🛠️ API Endpoints
Method	Endpoint	Description
POST	/api/users/register	Register a new user
POST	/api/users/login	Login and get JWT token
GET	/api/users/profile	Protected route (requires token)
POST	/api/upload	Upload files to AWS S3
GET	/api/files	Fetch uploaded files
DELETE	/api/files/:id	Delete uploaded file

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

## 💻 Tech Stack
Frontend: React.js, HTML, CSS, Vite

Backend: Node.js, Express.js

Database: MongoDB + Mongoose

Authentication: JWT, bcrypt

Cloud Storage: AWS S3

Env Management: dotenv

## 🚀 Future Updates
Add storage statistics per user

Add file versioning & recycle bin

Improve dashboard analytics & charts

Multi-theme support

## 👩‍💻 Author
Manvi
BCA Student | Aspiring Developer | Focused on building real-world projects

