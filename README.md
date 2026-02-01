Hostel Booking Platform (MERN Stack)

A full-stack hostel/PG booking platform built using the MERN stack where users can browse hostels, owners can post listings with images, and students can leave reviews.

🔗 Live Demo: hostle-app.vercel.app

🚀 Features
👤 Authentication & Roles

User registration & login (JWT based)

Role based access:

User (student)

Owner (hostel provider)

Admin

🏠 Listings

Add, update, delete hostel listings (owner only)

Upload multiple images (Cloudinary)

View all listings

Listing detail page

⭐ Reviews

Add reviews with rating & comments

View reviews per hostel

Delete own reviews (or admin)

📸 Image Upload

Multiple images per listing

Cloud storage using Cloudinary

🔐 Security

Protected routes

Role based permissions

Secure password hashing

🛠 Tech Stack
Frontend

React (Vite)

Axios

React Router

Tailwind CSS

React Toastify

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Multer + Cloudinary

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

📂 Project Structure
Backend
server/
 ┣ models/
 ┣ routes/
 ┣ middleware/
 ┣ config/
 ┗ server.js

Frontend
client/
 ┣ pages/
 ┣ components/
 ┣ api/
 ┗ App.jsx

⚙️ Environment Variables (Backend)

Create .env file:

MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
CLOUD_NAME=your_cloudinary_name
CLOUD_KEY=your_cloudinary_key
CLOUD_SECRET=your_cloudinary_secret

▶️ Run Locally
Backend
cd server
npm install
npm run dev

Frontend
cd client
npm install
npm run dev


🎯 Future Improvements

Booking system

Payment integration

Search & filters

Map view

Owner dashboard

Average ratings

🙌 Author

Tushar Verma
Full Stack Developer (MERN)

⭐ If you like this project

Give it a star ⭐ on GitHub — it really helps!
