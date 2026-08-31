# CampusAccess

> A university visitor management system that digitizes visitor requests, approvals, and campus entry/exit tracking.

CampusAccess is a full-stack university visitor management system designed to streamline how visitors are registered, approved, and tracked within a campus.

The system provides separate workflows for **Students, Administrators, and Security Guards**, with a Spring Boot backend and PostgreSQL database.

---

## ✨ Features

### 👨‍🎓 Student
- Create visitor requests
- View submitted visitor requests
- Track request status
- View visitor details

### 🛡️ Admin
- View pending visitor requests
- Approve or reject visitor requests
- Manage visitor request statuses
- Monitor visitor activity

### 👮 Security Guard
- View approved visitors
- Mark visitor entry
- Mark visitor exit
- Track active visitors on campus

### ⚙️ Backend
- RESTful APIs
- Spring Data JPA
- PostgreSQL database integration
- Role-based workflow
- Request status management
- JWT authentication *(in progress)*

---

## 🏗️ System Workflow

```text
Student
   │
   │ Create Visitor Request
   ▼
Admin
   │
   ├── Approve ──────┐
   │                 │
   └── Reject        │
                     ▼
                  Guard
                     │
              Mark Entry / Exit
                     │
                     ▼
              Visitor Tracking
