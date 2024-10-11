# Assignment Submission Portal

This project is a backend system for an assignment submission portal designed to facilitate the interaction between users and admins. Users can upload assignments, while admins can accept or reject them. Built using Node.js, Express, and MongoDB, the application implements user authentication and a simple RESTful API.

## Features

- **User Registration and Login**: Users can register and log in to the system.
- **Admin Registration and Login**: Admins can register and log in to manage assignments.
- **Assignment Upload**: Users can upload assignments associated with a specific admin.
- **Assignment Management**: Admins can view, accept, or reject assignments.
- **JWT Authentication**: Secure authentication using JSON Web Tokens (JWT).

## Tech Stack

- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing user and assignment data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **bcryptjs**: Library for hashing passwords.
- **jsonwebtoken**: Library for creating and verifying JWTs.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/lovelypangotra2003/Assignment-sub
   ```
Install dependencies:

```
npm install cookie-parser dotenv express bcryptjs jsonwebtoken mongoose

```
Create a .env file in the root directory and add the following environment variables:
```
JWT_SECRET=your_jwt_secret  #create using command : openssl rand -base64 32
PORT=your_port_number  # e.g., 8000
MONGO_DB_URI=your_mongodb_uri  # e.g., mongodb://localhost:27017/yourdbname
```
Start MongoDB server: Ensure you have MongoDB installed and running locally or use a cloud instance.

Start the server:

```
npm run server
```

#API Endpoints

#User Routes

Register User: POST /api/users/register
Login User: POST /api/users/login
Upload Assignment: POST /api/users/upload

#Admin Routes

Register Admin: POST /api/admins/register
Login Admin: POST /api/admins/login
View Assignments: GET /api/admins/assignments
Accept Assignment: POST /api/admins/assignments/:id/accept
Reject Assignment: POST /api/admins/assignments/:id/reject

#Usage

Register users and admins using their respective endpoints.
Users can upload assignments to their assigned admin.
Admins can view all assignments assigned to them and accept or reject them.

#Testing

You can test the API using tools like Postman or Insomnia. Make sure to include the JWT in the Authorization header when making requests that require authentication.

