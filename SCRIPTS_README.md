# SchoolConnect Deployment Scripts

This directory contains convenient scripts for managing the SchoolConnect application deployment.

## Available Scripts

### 🚀 deploy.bat
**Complete clean build and deployment**
- Stops all existing containers
- Cleans Docker system
- Builds all services from scratch
- Starts all services
- **Use this for:** First-time setup or when you want a fresh start

```bash
deploy.bat
```

### ▶️ start.bat
**Quick start (uses existing builds)**
- Starts all services
- **Use this for:** Daily development when containers are already built

```bash
start.bat
```

### ⏹️ stop.bat
**Stop all services**
- Gracefully stops all running containers
- Preserves data and images

```bash
stop.bat
```

### 🧹 clean.bat
**Complete reset**
- Stops all services
- Removes all containers and volumes
- Cleans up Docker system
- **Warning:** This deletes all data!

```bash
clean.bat
```

### 📋 logs.bat
**View service logs**
- Shows real-time logs from all services
- Press Ctrl+C to stop

```bash
logs.bat
```

### 📊 status.bat
**Check service status**
- Shows which services are running
- Displays service URLs
- Checks Docker status

```bash
status.bat
```

### 🔧 rebuild.bat
**Rebuild single service**
- Rebuild and restart a specific service
- Useful for development when you change one service

```bash
rebuild.bat
```

## Quick Start Guide

### First Time Setup
1. Ensure Docker Desktop is running
2. Run `deploy.bat`
3. Wait 2-3 minutes for all services to start
4. Access http://localhost:3000

### Daily Development
1. Run `start.bat` to start services
2. Make code changes
3. Run `rebuild.bat` to rebuild changed service
4. Run `stop.bat` when done

### Troubleshooting
1. Run `status.bat` to check service status
2. Run `logs.bat` to view error messages
3. If issues persist, run `clean.bat` then `deploy.bat`

## Service URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| API Gateway | http://localhost:8080 |
| Eureka Dashboard | http://localhost:8761 |
| MySQL | localhost:3306 |

## Common Workflows

### Making Backend Changes
```bash
# Make your code changes
rebuild.bat
# Select the service you changed
# View logs to verify
logs.bat
```

### Making Frontend Changes
```bash
# Make your code changes
rebuild.bat
# Enter: frontend
```

### Complete Reset
```bash
clean.bat
deploy.bat
```

### View Specific Service Logs
```bash
docker-compose logs -f auth-service
docker-compose logs -f frontend
```

## Requirements

- Windows 10/11
- Docker Desktop installed and running
- At least 8GB RAM
- Ports 3000, 8080, 8761, 3306 available

## Troubleshooting

**"Docker is not running"**
- Start Docker Desktop and wait for it to be ready

**"Port already in use"**
- Stop other applications using ports 3000, 8080, 8761, or 3306
- Or modify ports in docker-compose.yml

**Services won't start**
- Run `clean.bat` followed by `deploy.bat`
- Check logs with `logs.bat`

**Out of memory**
- Increase Docker memory in Docker Desktop settings
- Allocate at least 8GB

For detailed deployment information, see DEPLOYMENT.md
