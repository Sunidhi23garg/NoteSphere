# NoteSphere

NoteSphere is a secure and user-friendly desktop note-taking application built with **Electron**, **React**, and **Node.js**.  
It allows users to **register, log in, create, and manage notes** seamlessly, with local storage and backend sync.

---

## Features

- **User Authentication** (Register / Login)  
- **Create, edit, and delete notes**  
- **Local storage + server sync**  
- **Secure communication with backend**  
- **Cross-platform desktop app**  

---

## Tech Stack

- **Frontend:** React + Tailwind CSS  
- **Backend:** Node.js + Express + MongoDB  
- **Desktop Runtime:** Electron.js  

---

## ▶️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Sunidhi23garg/notesphere.git
cd notesphere
```
2. Install dependencies
```bash
npm install
cd backend && node server.js
cd ../frontend && npm start
```
3. Run the app:    
Frontend runs on http://localhost:3000  
Backend runs on http://localhost:5000  
Electron will open the desktop app   

## Screenshots    

- 🔑 Login Page   
<img width="616" height="539" alt="Screenshot 2025-08-30 112456" src="https://github.com/user-attachments/assets/2cff344e-b7a7-4606-9e16-6aef611dba73" />

- 🆕 Register Page  
<img width="605" height="546" alt="Screenshot 2025-08-30 112507" src="https://github.com/user-attachments/assets/224f7f04-a005-4ebf-9430-d5e5e2db495f" />

- 📝 Notes Dashboard  
<img width="1892" height="815" alt="Screenshot 2025-08-30 112252" src="https://github.com/user-attachments/assets/4138e3df-046a-46ec-be2d-6120f637e833" />

- ➕ Add Note  
<img width="1569" height="584" alt="Screenshot 2025-08-30 112328" src="https://github.com/user-attachments/assets/0ac00893-0d1a-49b5-9369-b122b1c29394" />

## Packaging / Running .exe  

Once the app is packaged with Electron Builder, you can run it as a standalone Windows executable:  

```bash
Build the frontend:
npm run build --prefix frontend
```

```bash
Package the app:
npm run dist
```
Once packaged, navigate to the dist folder and double-click the .exe to run the app without needing Node.js or dev tools.  

## Design Choices / Assumptions  
Tech Stack: Electron for desktop, React for frontend, Node.js + Express + MongoDB for backend.  
Authentication: JWT-based authentication to secure API routes.  
Offline Support: Electron enables running the app without a constant internet connection.  
Folder Structure: Frontend and backend separated for modularity and maintainability.

## Assumptions:  
Users have a Windows system to run .exe.  
MongoDB connection is accessible from the local or cloud environment.  

## Limitations:  
No real-time sync between multiple devices yet.  
No rich-text editor; only plain text notes supported.  
Currently supports only Windows .exe (no Mac/Linux builds).

## Future Improvements:  
Add real-time sync with a cloud database.  
Support attachments and media in notes.  
Add search, tagging, and filtering functionality.  
Provide cross-platform builds for MacOS and Linux.  

## Contact
Sunidhi Garg
GitHub: https://github.com/Sunidhi23garg
