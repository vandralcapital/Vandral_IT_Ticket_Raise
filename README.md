
# IT Ticketing System

A full-stack IT Ticketing System for managing, tracking, and resolving IT support requests within an organization. Built with a React frontend and a Node.js/Express/MongoDB backend.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User authentication (signup/login)
- Role-based dashboards (Employee, IT Head, etc.)
- Ticket creation, assignment, and resolution
- Real-time chat on tickets
- File upload support for tickets
- FAQ and support panel
- Responsive, modern UI

---

## Project Structure

```
it/
  backend/         # Node.js/Express/MongoDB backend
    models/        # Mongoose models (User, Ticket)
    uploads/       # Uploaded files
    index.js       # Main server file
    package.json   # Backend dependencies
  frontend/        # React frontend (Vite)
    src/
      components/  # React components (Dashboards, Chat, Tickets, etc.)
      assets/      # Static assets
      App.jsx      # Main app component
      main.jsx     # Entry point
    public/        # Static files
    package.json   # Frontend dependencies
```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm (v8+ recommended)
- MongoDB (local or cloud instance)

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   - Create a `.env` file in `backend/` (if required by your code) for MongoDB URI, JWT secret, etc.

3. **Start the backend server:**
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000` (or as configured).

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the frontend dev server:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (or as configured by Vite).

---

## Usage

- **Sign up** as a new user or log in with existing credentials.
- **Create a new ticket** describing your IT issue.
- **Chat** with IT staff in real-time within each ticket.
- **IT Head/Staff** can view, assign, and resolve tickets.
- **Upload files** (screenshots, logs) to support your ticket.
- **View FAQs** for common issues.

---

## Screenshots

> _Add screenshots of your dashboards, ticket forms, chat, etc. here for better documentation._

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

---

## License

This project is licensed under the MIT License.

---

## Contact

For questions or support, open an issue or contact the maintainer.

---
