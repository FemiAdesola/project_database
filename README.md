# Frontend React app with Redux for Project database App

# 📂 Project Database App

> A full-stack **React + Redux + Bootstrap** web application for managing **projects** and **team members**.  
> The app provides authentication, role-based access control (e.g., admin privileges), and CRUD functionality for both **projects** and **members**.

---

## 🚀 Features

- 🔐 **Authentication** (Login / Signup with JWT stored in `localStorage`)
- 👥 **Members Management**
  - View all members
  - Create new members
  - Update member roles (admin only)
  - Delete members (admin only)

- 📂 **Projects Management**
  - Create new projects (admin only)
  - Assign multiple members to a project
  - View project details in a card layout
  - Update or delete projects (restricted to project creator)

- 🎨 **UI/UX**
  - Built with **Bootstrap** for responsive design
  - Custom reusable components 
      * Navbar, 
      * Footer, 
      * Loader, 
      * BackToHome, 
      * CancelButton

- 🔄 **State Management**
  - Powered by **Redux Toolkit**
  - Persistent login using `localStorage`

- 🌐 **API Integration**
  - Axios client with token-based authentication
  - Backend base URL: `https://project-database-api.onrender.com`

---

## 🛠️ Tech Stack

- **Frontend:** 
  * React, 
  * Redux Toolkit, 
  * React Router DOM, 
  * Axios,
  * Bootstrap 

- **Backend (API):** 
    * Node.js / Express (hosted at `project-database-api.onrender.com`)

- **Icons:** 
  * React Icons (FontAwesome)

---

## 📂 Project Structure

```
project_database/
├── public/
│   └── index.html            # Entry point (Bootstrap included via CDN)
├── src/
│   ├── App.jsx               # App routes
│   ├── index.jsx             # Root render with Redux + Router
│   ├── Redux/
│   │   ├── store.js
│   │   └── slice/
│   │       ├── apiSlice.js
│   │       └── authSlice.js
│   ├── common/constants.js   # API endpoints
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   ├── BackToHome.jsx
│   │   └── CancelButton.jsx
│   ├── pages/
│   │   ├── HomeScreen.jsx
│   │   ├── LoginScreen.jsx
│   │   ├── SignupScreen.jsx
│   │   ├── Member/
│   │   │   ├── MembersList.jsx
│   │   │   ├── CreateMember.jsx
│   │   │   └── UpdateMember.jsx
│   │   └── Project/
│   │       ├── ProjectsList.jsx
│   │       ├── CreateProject.jsx
│   │       └── UpdateProject.jsx
└── package.json
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/FemiAdesola/project_database

   cd project_database
   ```

2. **Install dependencies**
  ```bash
   npm install
  ```

3. **Run the development server**
   ```bash
   npm start
   ```
  Runs the app in the development mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 🧑‍💻 Usability

Here’s how to use the app effectively:

1. **Signup / Login**
   - New users can **sign up** with 
    * name, 
    * email and 
    * password.
   - Returning users can **log in**, with 
    * email, 
    * password and 
    * the token is stored in `localStorage`.

2. **Members**
   - Admins can **update roles** (e.g., promote a user to admin).
   - Admins can **delete members**.
   - Regular users can only **view the member list**.

3. **Projects**
   - Admins can **create projects**, set a description, and assign team members.
   - Each project displays as a **card** with details and assigned members.
   - Project creators can **update or delete their own projects**.
   - Regular users can only **view projects** and see what they are assigned to.

4. **Navigation**
   - **Navbar** provides quick access to 
    * Home, 
    * Projects, 
    * Members, and 
    + Auth routes.
   - **Back to Home button** is included for easy navigation.

---

## 🔑 Environment Variables

The app currently uses a hardcoded backend URL inside `src/Redux/slice/apiSlice.js`:

```js
const api = axios.create({
  baseURL: "https://project-database-api.onrender.com",
});
```

---

## 📡 API Endpoints

Base URL:  
```
https://project-database-api.onrender.com/api
```

### 🔐 Authentication

**Signup**  
```http
POST /api/auth/signup
```
Request body:
```json
{
  "name": "John Adeolu",
  "email": "john@example.com",
  "password": "password123"
}
```
Response:
```json
{
  "message": "User registered successfully"
}
```

**Login**  
```http
POST /api/auth/login
```
Request body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
Response:
```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "6521...",
    "name": "John Adeolu",
    "email": "john@example.com",
    "role": "developer"
  }
}
```

---

### 👥 Members

**Get all members**  
```http
GET /api/members
Authorization: Bearer <token>
```

Response:
```json
[
  {
    "_id": "6521...",
    "name": "John Adeolu",
    "email": "john@example.com",
    "role": "admin"
  },
  {
    "_id": "6522...",
    "name": "Jane Smart",
    "email": "jane@example.com",
    "role": "Designer"
  }
]
```

**Create a member (Admin only)**  
```http
POST /api/members
Authorization: Bearer <token>
```
Request body:
```json
{
  "name": "Jane Smart",
  "email": "jane@example.com",
  "password": "pass456",
  "role": "user"
}
```

**Update a member role**  
```http
PUT /api/members/:id
Authorization: Bearer <token>
```
Request body:
```json
{
  "role": "admin"
}
```

**Delete a member (Admin only)**  
```http
DELETE /api/members/:id
Authorization: Bearer <token>
```

---

### 📂 Projects

**Get all projects**  
```http
GET /api/projects
Authorization: Bearer <token>
```

**Create a project (Admin only)**  
```http
POST /api/projects
Authorization: Bearer <token>
```
Request body:
```json
{
  "title": "New Project",
  "description": "This is a test project",
  "members": ["6521...", "6522..."]
}
```

**Update a project (Only creator)**  
```http
PUT /api/projects/:id
Authorization: Bearer <token>
```
Request body:
```json
{
  "title": "Updated Project",
  "description": "Updated description"
}
```

**Delete a project (Only creator)**  
```http
DELETE /api/projects/:id
Authorization: Bearer <token>
```

---

## 🖼️ Screenshots (optional)

_Add some screenshots here for UI preview (Home, Login, Members, Projects)._

---

## 👨‍💻 Author

**Femi Adesola**  
🔗 [LinkedIn](https://www.linkedin.com/in/femi-adesola-oyinloye-106454145/)  
💻 [GitHub](https://github.com/FemiAdesola)

