# 🎓 SchoolConnect V3.0

> A comprehensive, modern, and microservices-based School Management System designed for the future of education.

![SchoolConnect Banner](https://via.placeholder.com/1200x400?text=SchoolConnect+Dashboard) *<!-- Replace with actual screenshot if available -->*

## 📖 Overview

**SchoolConnect** is a robust platform that bridges the gap between schools, students, parents, and teachers. Built with a **mobile-first** philosophy and a **glassmorphic** design aesthetic, it offers a seamless experience for all stakeholders.

The system handles everything from **attendance tracking** and **grade management** to **real-time communication** and **event scheduling**.

## ✨ Key Features

-   **👨‍🎓 Student Dashboard**: View grades, attendance, assignments, and schedule.
-   **👨‍🏫 Teacher Dashboard**: Manage classes, enter marks, take attendance, and create assignments.
-   **👨‍👩‍👧‍👦 Parent Dashboard**: Track multiple children's progress, view analytics, and communicate with staff.
-   **🏫 Principal/Admin Dashboard**: School-wide analytics, staff management, and notice board control.
-   **💬 Unified Chat System**: Real-time messaging between students, teachers, and parents.
-   **📊 Advanced Analytics**: Interactive charts for performance trends and school overview.
-   **📅 Calendar & Events**: Integrated scheduling for exams, holidays, and meetings.

## 🛠️ Tech Stack

### Frontend
-   **Framework**: [Next.js 14](https://nextjs.org/) (React)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (with Glassmorphism)
-   **Charts**: [Recharts](https://recharts.org/)
-   **Icons**: [Lucide React](https://lucide.dev/)

### Backend
-   **Framework**: [Spring Boot 3](https://spring.io/projects/spring-boot) (Java 21)
-   **Architecture**: Microservices (Auth, Academic, Communication, Calendar)
-   **Service Discovery**: Netflix Eureka
-   **Gateway**: Spring Cloud Gateway

### Infrastructure
-   **Database**: MySQL 8.0
-   **Containerization**: Docker & Docker Compose
-   **Build Tool**: Maven

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Running)
-   [Git](https://git-scm.com/)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/SchoolConnect.git
    cd SchoolConnect
    ```

2.  **Start the Application**
    Run the following command to build and start all services:
    ```bash
    docker-compose up --build
    ```
    *Note: The first run may take a few minutes to download images and build the project.*

3.  **Access the Application**
    Once the services are running (check logs for "Started Application"), access the dashboards:

    -   **Frontend**: [http://localhost:3000](http://localhost:3000)
    -   **API Gateway**: [http://localhost:8080](http://localhost:8080)
    -   **Service Registry**: [http://localhost:8761](http://localhost:8761)

## 🔐 Default Credentials

The database is seeded with demo data. You can use the following accounts to log in:

| Role          | Email                     | Password    |
| ------------- | ------------------------- | ----------- |
| **Admin**     | `admin@school.com`        | `password`  |
| **Principal** | `headmaster@school.com`   | `password`  |
| **Teacher**   | `teacher1@school.com`     | `password`  |
| **Parent**    | `parent1@school.com`      | `password`  |
| **Student**   | `student1@school.com`     | `password`  |

*(Note: Passwords are hashed in the database. If `password` doesn't work, check `seed.sql` or reset via the database).*

## 📂 Project Structure

```
SchoolConnect/
├── backend/
│   ├── academic-service/       # Grades, Attendance, Subjects
│   ├── api-gateway/            # Central entry point
│   ├── auth-service/           # Users, Roles, JWT
│   ├── calendar-service/       # Events, Schedules
│   ├── communication-service/  # Chat, Notices
│   └── discovery-service/      # Eureka Registry
├── frontend/                   # Next.js Web Application
├── database/                   # SQL Seeds & Python Generators
├── docker-compose.yml          # Container Orchestration
└── README.md                   # Project Documentation
```

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
