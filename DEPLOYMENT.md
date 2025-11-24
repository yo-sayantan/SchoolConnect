# SchoolConnect Deployment Guide

## Prerequisites

- Docker Desktop installed and running
- At least 8GB RAM available
- Ports 3000, 8080, 8081, 8761, 3306 available

## Quick Start

### 1. Build and Start All Services

From the project root directory (`d:\GitHub\SchoolConnect`):

```bash
docker-compose up --build
```

This single command will:
- Build all microservices (auth, academic, communication, calendar)
- Build the API Gateway
- Build the Discovery Service (Eureka)
- Build the Frontend (Next.js)
- Start MySQL database
- Initialize databases with demo data
- Start all services in the correct order

### 2. Wait for Services to Start

The services will start in this order:
1. **MySQL** (port 3306) - ~10 seconds
2. **Discovery Service** (port 8761) - ~30 seconds
3. **Auth Service** (port 8081) - ~40 seconds
4. **Academic Service** (port 8082) - ~40 seconds
5. **Communication Service** (port 8083) - ~40 seconds
6. **Calendar Service** (port 8084) - ~40 seconds
7. **API Gateway** (port 8080) - ~50 seconds
8. **Frontend** (port 3000) - ~60 seconds

**Total startup time: ~2-3 minutes**

### 3. Access the Application

Once all services are running:

- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:8080
- **Eureka Dashboard**: http://localhost:8761
- **MySQL**: localhost:3306 (user: root, password: root)

## Service URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Main application UI |
| API Gateway | http://localhost:8080/api | Unified API endpoint |
| Auth Service | http://localhost:8081 | Authentication (via gateway) |
| Academic Service | http://localhost:8082 | Academic data (via gateway) |
| Communication Service | http://localhost:8083 | Notices/Q&A (via gateway) |
| Calendar Service | http://localhost:8084 | Events (via gateway) |
| Discovery Service | http://localhost:8761 | Service registry |
| MySQL | localhost:3306 | Database |

## Docker Commands

### Start Services (Detached Mode)
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### Stop and Remove Volumes (Clean Slate)
```bash
docker-compose down -v
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f auth-service
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Rebuild Specific Service
```bash
docker-compose up -d --build auth-service
```

### Check Service Status
```bash
docker-compose ps
```

### Restart a Service
```bash
docker-compose restart auth-service
```

## Troubleshooting

### Services Not Starting

**Check if ports are available:**
```bash
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :8080
netstat -ano | findstr :3306
```

**Solution**: Stop any processes using these ports or change ports in docker-compose.yml

### Database Connection Issues

**Wait for MySQL to be ready:**
```bash
docker-compose logs mysql
```

Look for: `ready for connections`

**Manually initialize database:**
```bash
docker exec -it schoolconnect-db mysql -uroot -proot
```

Then run:
```sql
SOURCE /docker-entrypoint-initdb.d/init.sql;
```

### Service Won't Register with Eureka

**Check Eureka dashboard:**
http://localhost:8761

**Restart the service:**
```bash
docker-compose restart <service-name>
```

### Frontend Can't Connect to Backend

**Check API Gateway is running:**
```bash
docker-compose logs api-gateway
```

**Verify environment variable:**
Frontend should use: `NEXT_PUBLIC_API_URL=http://localhost:8080/api`

### Out of Memory

**Increase Docker memory:**
- Docker Desktop → Settings → Resources → Memory
- Allocate at least 8GB

### Clean Start

If things aren't working, try a complete reset:
```bash
# Stop everything
docker-compose down -v

# Remove all containers and images
docker system prune -a

# Rebuild from scratch
docker-compose up --build
```

## Development Workflow

### Making Code Changes

**Backend Services:**
1. Make changes to Java code
2. Rebuild the specific service:
   ```bash
   docker-compose up -d --build auth-service
   ```

**Frontend:**
1. Make changes to React/Next.js code
2. Rebuild frontend:
   ```bash
   docker-compose up -d --build frontend
   ```

### Hot Reload (Development Mode)

For faster development, run services locally without Docker:

**Backend:**
```bash
cd backend/auth-service
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## Production Deployment

### Environment Variables

Create `.env` file in project root:
```env
# Database
MYSQL_ROOT_PASSWORD=your_secure_password
MYSQL_DATABASE=schoolconnect_auth

# JWT
JWT_SECRET=your_very_long_secure_secret_key_here

# API
API_URL=https://your-domain.com/api
```

### Build for Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Health Checks

Monitor service health:
```bash
# Check all services
docker-compose ps

# Check specific service logs
docker-compose logs -f api-gateway
```

## Database Management

### Backup Database

```bash
docker exec schoolconnect-db mysqldump -uroot -proot --all-databases > backup.sql
```

### Restore Database

```bash
docker exec -i schoolconnect-db mysql -uroot -proot < backup.sql
```

### Access MySQL CLI

```bash
docker exec -it schoolconnect-db mysql -uroot -proot
```

### View Tables

```sql
USE schoolconnect_auth;
SHOW TABLES;
SELECT * FROM users;

USE schoolconnect_academic;
SHOW TABLES;
SELECT * FROM marks;
```

## Monitoring

### Check Resource Usage

```bash
docker stats
```

### View Container Logs

```bash
# Real-time logs
docker-compose logs -f --tail=100

# Specific service
docker-compose logs -f auth-service --tail=50
```

### Service Discovery

Check registered services at:
http://localhost:8761

All microservices should appear here.

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port already in use | Change port in docker-compose.yml or stop conflicting process |
| Service won't start | Check logs: `docker-compose logs <service>` |
| Database not initialized | Wait 30 seconds, check MySQL logs |
| Frontend 404 errors | Verify API_URL environment variable |
| Services can't communicate | Check they're on same Docker network |
| Out of disk space | Run `docker system prune -a` |

## Next Steps

After deployment:
1. Access http://localhost:3000
2. Login with demo credentials (see walkthrough.md)
3. Test registration flow
4. View scoreboard
5. Try Q&A system

For detailed API documentation, see walkthrough.md
