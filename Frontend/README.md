# 🧑‍💼 Job Portal – MERN Stack Application

A complete end-to-end **Job Portal System** built using the **MERN Stack (MongoDB, Express, React, Node.js)**.

---

## 👔 Employers Can
- Create and manage company profile  
- Post, edit & delete job listings  
- View all job applications  
- Update application status  

---

## 👨‍🎓 Job Seekers Can
- Create and update profile (skills, education, experience)  
- Upload profile picture & resume  
- View all jobs  
- Apply for jobs  
- Track applied jobs  
- Download resume  

---

# 🔐 Authentication Features
- Secure login & signup using **JWT + bcrypt**  
- Auto-login using `/auth/me` (**HTTP-only cookies**)  
- Role-based routing (Employer / Job Seeker)  
- Protected Routes with **profile completion checks**  

---

# 📈 Project Progress (Updated)

| Module | Status | Description |
|--------|--------|-------------|
| 🔐 Authentication | ✅ Completed | Signup, Login, Auto-login using JWT (HTTP-only Cookies) |
| 🧑‍💼 Employer Module | ✅ Completed | Company profile, job CRUD, view applicants, update status |
| 👨‍🎓 Job Seeker Module | ✅ Completed | Profile creation, resume upload, job apply, track applications |
| 📄 File Upload System | ✅ Completed | Profile pic, company logo, resume upload using Multer |
| 🔒 Role-based Access | ✅ Completed | Employer vs Jobseeker protected routes |
| 🏠 Dashboards | ✅ Completed | Employer Dashboard & Jobseeker Dashboard |
| 🎨 Frontend UI | ✅ Completed | Responsive UI with Tailwind CSS |

---

# 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React, Vite, Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT + Bcrypt + HTTP-only Cookies |
| **File Uploads** | Multer (Profile Pics, Company Logo, Resume) |
| **Tools** | Git, VS Code, Postman |

---

# ⚙️ How to Run Locally

## 🧩 Step 1 — Clone the repository
```sh
git clone https://github.com/yourusername/job-portal.git
cd job-portal 
```

🧩 Step 2 — Install backend dependencies
```sh
cd Backend
npm install
```


🧩 Step 3 — Add environment variables
Create a .env file inside Backend folder:
```env
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
PORT=5100
```


🧩 Step 4 — Start backend server
```sh
npm start

Backend runs at:
👉 http://localhost:5100
```


🧩 Step 5 — Install frontend dependencies
```sh
cd ../Frontend
npm install
```


🧩 Step 6 — Start frontend
```sh
npm run dev


Frontend runs at:
👉 http://localhost:5173  
```


