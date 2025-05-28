# Book Management API

A secure RESTful API for managing books with JWT authentication, role-based authorization, and file uploads.

## Features

- 🔐 JWT authentication with refresh tokens
- 👨‍💼 Role-based authorization (user/admin)
- 📚 Book management with ownership
- 📁 File uploads for book covers
- ✅ Input validation with express-validator
- 🏗️ Service-layer architecture
- 🛡️ Secure password hashing with bcryptjs

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT, bcryptjs
- **File Upload**: Multer
- **Validation**: express-validator

## Installation

```bash
# Clone repository
git clone https://github.com/YasserSoltan/Book-Management-API.git
cd Book-Management-API

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configurations

# Start development server
npm run dev