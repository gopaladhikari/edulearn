# 📘 Product Requirements Document (PRD)

## 🧾 Product Overview

**Edulearn – Learning Management System (LMS)**

**Product Name:** Edulearn
**Version:** 1.0.0  
**Product Type:** MERN stack LMS system.

---

## 🎯 1. Problem Statement

Many learners struggle to find structured, affordable, and trackable online courses, while instructors lack a simple platform to create and monetize content.

Edulearn provides:

- A platform for instructors to create and manage courses
- A system for students to enroll in free and paid courses
- Progress tracking for effective learning

---

## 🎯 2. Goals & Objectives

### Primary Goals

- Enable course creation and publishing
- Allow enrollment in free and paid courses
- Track user learning progress
- Provide secure authentication and role-based access

### Secondary Goals

- Integrate payment systems (Stripe/Razorpay)
- Ensure scalable content delivery
- Deliver a clean and responsive user experience

---

## 👥 3. Target Users

### Students

- Browse and enroll in courses
- Watch lectures
- Track progress

### Instructors

- Create and manage courses
- Upload lectures
- Publish content

### Admin

- Manage users and platform operations

---

## 🔑 4. Core Features (MVP Scope)

### Authentication

- Register / Login
- Email verification
- Password reset
- JWT-based authentication

### Role-Based Access

- Student
- Instructor
- Admin

### Course Management

- Create, edit, delete courses
- Add metadata (title, description, category, level, language)
- Publish/unpublish courses

### Lecture Management

- Upload video lectures
- Add lecture metadata (title, description, duration, order)
- Mark preview lectures

### Enrollment System

- Free enrollment (instant access)
- Paid enrollment (payment required)
- Prevent duplicate enrollments

### Progress Tracking

- Track lecture completion
- Track watch time
- Calculate completion percentage
- Resume last watched lecture

---

## 🔄 5. User Flows

### 🟢 Free Course Enrollment

User → selects course → clicks enroll → enrollment created → access granted

---

### 💳 Paid Course Enrollment

User → clicks buy → payment initiated → payment verified → enrollment created → access granted

---

### 📚 Learning Flow

User → opens course → watches lecture → progress updated → completion tracked

---

### 🔁 Refund Flow

User requests refund → validation → refund processed → enrollment status updated

---

## 📦 6. Core Data Entities

- **User**
  - Authentication & identity
  - Role-based access

- **Course**
  - Metadata (title, description, level, price, etc.)
  - Multiple instructors

- **Lecture**
  - Linked to course
  - Ordered content with video

- **CourseEnrollment**
  - Links user and course
  - Handles payment and access

- **CourseProgress**
  - Linked to enrollment
  - Tracks lecture-level progress

---

## ⚠️ 7. Business Rules & Constraints

- One user cannot enroll in the same course twice
- Progress is tied to enrollment, not directly to user
- Only enrolled users can access course content
- Only instructors can create courses
- Course must have at least one instructor
- Lecture order must be unique within a course
- Payment required before access for paid courses
- Refund only allowed for completed payments

---

## 🏗 8. System Architecture Overview

Frontend: React (`/client`)  
Backend: Node.js + Express (`/server`)  
Database: MongoDB (Mongoose)

### Communication Flow

Client → REST API → Server → Database

---

## 🔐 9. Authentication & Security

- JWT-based authentication (access + refresh tokens)
- Password hashing using bcrypt
- Role-based protected routes
- Input sanitization (mongo-sanitize, hpp)
- Rate limiting
- Secure headers via Helmet

---

## 💳 10. Payment System

### Supported Methods

- Stripe
- Razorpay
- Free (for free courses)

### Flow

User initiates payment → Payment provider processes → Backend verifies → Enrollment created/updated

### Rules

- `paymentId` must be unique (when present)
- Free courses use `paymentMethod = "free"`
- Paid courses require verified payment before enrollment

---

## 📊 11. Progress Tracking Logic

Completion Percentage:
(completed lectures / total lectures in course) × 100

Rules:

- One progress document per enrollment
- Each lecture tracked individually
- No duplicate lecture progress entries
- `isCompleted = true` only when 100%

---

## ⚠️ 12. Edge Cases

- Payment succeeds but enrollment fails
- Payment fails after initiation
- Duplicate enrollment attempts
- Lecture deleted after progress started
- Unauthorized access to course
- Refund requested multiple times

---

## 📈 13. Success Metrics

- Number of enrollments
- Course completion rate
- Active users
- Revenue from paid courses

---

## 🚀 14. Future Improvements

- Course reviews and ratings
- Wishlist system
- Certificates on completion
- Instructor analytics dashboard
- Notifications (email/in-app)
- Video streaming optimization

---

## 📱 15. Non-Functional Requirements

- API response time < 300ms
- Scalable database design
- Secure payment handling
- Mobile responsive UI

---

## 🧠 Notes

This PRD defines the MVP scope and core architecture for Edulearn.  
Future iterations will expand features based on user feedback and platform growth.
