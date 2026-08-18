# 📊 ERP Management System - Local Server

**SIMPLE VERSION - No Database Needed!**

A complete ERP management system that runs locally with everything built-in. No MongoDB, no complex setup!

## ✨ Features

- ✅ User Registration & Login (data stored locally)
- ✅ Product Management (Add, View, Delete)
- ✅ Beautiful Web Dashboard
- ✅ Works Offline (data saved to file)
- ✅ Sample Data Included (Login with demo account)
- ✅ Super Easy Setup (Just 3 clicks!)

## 🚀 Quick Start (3 Steps)

### Step 1: Download Node.js
If you don't have it: https://nodejs.org/
- Download the LTS version
- Install it (just click Next, Next, Finish)

### Step 2: Run the Startup Script
In your project folder, **double-click**:
```
START_SERVER.bat
```

### Step 3: Open in Browser
A command window will open showing:
```
🌐 Open your browser and go to:
   http://localhost:5000
```

Copy-paste that URL into your browser. Done! ✅

---

## 📧 Demo Login

When you start the server, you can login with:
- **Email:** admin@test.com
- **Password:** admin123

Or create your own account by clicking Register!

---

## 🎯 What You Can Do

### 1. Authentication
- Register a new account
- Login with your credentials
- Logout

### 2. Products
- View all products (3 samples included)
- Add new products
- Delete products

### 3. Dashboard
- See your user info
- View total products
- View total inventory value

---

## 📁 Files & Folders

```
├── START_SERVER.bat    ← Click this to start!
├── server.js          ← Backend server
├── data.json          ← Your data (auto-created)
├── package.json       ← Dependencies
├── public/
│   └── index.html     ← Web dashboard
└── README.md          ← This file
```

---

## 🐛 Troubleshooting

### "Node.js not found"
- Download and install from https://nodejs.org/
- Restart your computer after install
- Try running START_SERVER.bat again

### "Port 5000 already in use"
- Another app is using port 5000
- Close the app or change PORT in server.js
- Or run: `npx kill-port 5000`

### Server won't start
- Make sure you're in the correct folder
- Check that all files are here (server.js, package.json, etc.)
- Try deleting `node_modules` and running again
- Check for error messages in the terminal

### "Cannot POST /api/products"
- Make sure you're logged in first
- Check that authorization token is valid
- Refresh the page and try again

---

## 📝 Data Storage

All your data is saved in **data.json** in the project folder. 

**To reset all data:**
1. Stop the server (Ctrl+C)
2. Delete `data.json`
3. Start the server again
4. Demo data will be automatically recreated

---

## 🔒 Security Notes

**This is for LEARNING/TESTING only!**

- Data is stored in plain JSON (not secure)
- Passwords are not encrypted
- No HTTPS (not secure for production)
- Use for development only

**For production, upgrade to:**
- MongoDB database
- Password hashing with bcrypt
- JWT tokens
- HTTPS/SSL
- Deployment to cloud server

---

## 📚 API Reference

All endpoints need `Authorization: Bearer TOKEN` header (get token from login)

### Users
```
POST   /api/users/register  - Create account
POST   /api/users/login     - Login
GET    /api/users/me        - Get current user
```

### Products
```
GET    /api/products        - Get all products
POST   /api/products        - Create product
DELETE /api/products/:id    - Delete product
```

---

## 💾 How to Save Your Work

Your data is **automatically saved** to `data.json` whenever you:
- Register/Login
- Create/Delete products

To backup:
1. Copy `data.json` to a safe place
2. Or export from the dashboard

---

## 🆘 Still Having Issues?

1. Check that Node.js is installed: Open Command Prompt and type `node -v`
2. Make sure you're in the correct folder
3. Try: `npm install` first, then `npm start`
4. Look at error messages in the terminal
5. Try resetting data.json

---

## ✅ You're All Set!

Double-click `START_SERVER.bat` and enjoy your ERP system! 🎉

**Questions?** Check the error messages - they usually tell you exactly what's wrong!

