# SchoolConnect API Quick Reference

## Authentication Flow

### 1. Login (Get OTP)
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "student1@school.com"
  }'
```

**Response:**
```json
{
  "message": "OTP sent successfully",
  "identifier": "student1@school.com",
  "otp": "123456"
}
```

### 2. Verify OTP (Get JWT Token)
```bash
curl -X POST http://localhost:8080/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "student1@school.com",
    "otpCode": "123456"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "role": "STUDENT",
  "name": "Emma Anderson",
  "email": "student1@school.com"
}
```

### 3. Use Token for Protected Endpoints
```bash
curl -X GET http://localhost:8080/api/academic/classes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## Demo Users

| Email | Password | Role |
|-------|----------|------|
| principal@school.com | password123 | PRINCIPAL |
| admin@school.com | password123 | ADMIN_ASSISTANT |
| teacher1@school.com | password123 | TEACHER |
| student1@school.com | password123 | STUDENT |
| parent1@school.com | password123 | PARENT |

---

## API Endpoints

### Academic Service
```bash
# Get all classes
GET /api/academic/classes

# Get all subjects
GET /api/academic/subjects

# Get attendance by student
GET /api/academic/attendance?studentId=9

# Get marks by student
GET /api/academic/marks?studentId=9

# Get syllabus by class
GET /api/academic/syllabus?classId=1
```

### Communication Service
```bash
# Get all notices
GET /api/communication/notices

# Get active notices
GET /api/communication/notices/active

# Get notifications for user
GET /api/communication/notifications?userId=9

# Get unread notifications
GET /api/communication/notifications/unread?userId=9
```

### Calendar Service
```bash
# Get all events
GET /api/calendar/events

# Get upcoming events
GET /api/calendar/events/upcoming

# Get events by type
GET /api/calendar/events?type=EXAM

# Get events for specific class
GET /api/calendar/events?classId=1
```

---

## Starting the Application

```bash
# Start all services with Docker Compose
cd d:\GitHub\SchoolConnect
docker-compose up --build

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (clean database)
docker-compose down -v
```

---

## Service URLs

- **API Gateway**: http://localhost:8080
- **Eureka Dashboard**: http://localhost:8761
- **MySQL**: localhost:3306
- **Frontend**: http://localhost:3000

---

## Database Access

```bash
# Connect to MySQL container
docker exec -it schoolconnect-db mysql -uroot -proot

# View users
USE schoolconnect_auth;
SELECT id, email, name, role FROM users;

# View classes
USE schoolconnect_academic;
SELECT * FROM classes;

# View notices
USE schoolconnect_communication;
SELECT * FROM notices;

# View events
USE schoolconnect_calendar;
SELECT * FROM events;
```
