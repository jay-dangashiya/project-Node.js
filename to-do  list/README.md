# 📝 Todo List App (Node.js + Express + EJS)

A minimal and aesthetic **Todo List CRUD application** built using **Node.js**, **Express**, and **EJS**, with a clean black & white UI and basic security using **dotenv**.

---

## 🚀 Features

- Add new tasks
- View all tasks
- Edit existing tasks
- Delete tasks
- Server-side rendering with EJS
- Minimal black & white UI (CSS)
- Environment variable security using dotenv

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- EJS
- CSS (No framework)
- dotenv

---

## 📁 Folder Structure

```

todo-app/
│
├── public/
│   └── css/
│       └── style.css
│
├── views/
│   ├── index.ejs
│   └── edit.ejs
│
├── routes/
│   └── todoRoutes.js
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd todo-app
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file

Create a file named `.env` in the root folder:

```env
PORT=3000
```

> ⚠️ Never commit the `.env` file to GitHub

---

## ▶️ Run the Application

```bash
node app.js
```

or (recommended)

```bash
npx nodemon app.js
```

Open your browser:

```
http://localhost:3000
```

---

## 🔐 Security

* Sensitive configuration values are stored in `.env`
* `dotenv` is used to load environment variables
* `.env` is excluded from version control using `.gitignore`

---

## 🧠 Learning Outcomes

* Express routing
* EJS templating
* CRUD operations
* Environment variables with dotenv
* Clean folder structure
* Basic web security practices

---

## 📌 Future Improvements

* MongoDB database integration
* User authentication
* Task completion status
* Dark mode toggle
* Deployment on Render or Railway

---

## 👤 Author

**Ravindra Kachariya**

---

## 📜 License

This project is open-source and free to use for learning purposes.