# Docker Quick Reference Guide

## Setup Environment Variables

1. **Create `.env` file:**

```bash
cp .env.example .env
```

2. **Add your API keys to `.env`:**

```bash
VITE_NEWS_API_KEY=your_newsapi_key_here
VITE_GUARDIAN_API_KEY=your_guardian_key_here
VITE_NYT_API_KEY=your_nyt_key_here
```

## Quick Commands

### Production Mode

```bash
# Start
docker-compose up -d news-aggregator

# Check status
docker-compose ps

# View logs
docker-compose logs -f news-aggregator

# Stop
docker-compose down

# Rebuild after code changes
docker-compose up -d --build news-aggregator
```

**Access:** http://localhost:3000

### Development Mode

```bash
# Start with hot reload
docker-compose --profile dev up news-aggregator-dev

# Stop
docker-compose --profile dev down
```

**Access:** http://localhost:5174

## Testing Docker Setup

### 1. Verify Container is Running

```bash
docker-compose ps
```

Expected output:

```
NAME                     STATUS         PORTS
modern-news-aggregator   Up (healthy)   0.0.0.0:3000->80/tcp
```

### 2. Check Health Status

```bash
docker inspect --format='{{.State.Health.Status}}' modern-news-aggregator
```

Expected: `healthy`

### 3. Test HTTP Response

```bash
curl -I http://localhost:3000
```

Expected: `HTTP/1.1 200 OK`

### 4. Verify Security Headers

```bash
curl -I http://localhost:3000 | grep -E "X-Frame-Options|X-Content-Type-Options|X-XSS-Protection"
```

Expected headers:

- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`

### 5. Test Application Functionality

Open http://localhost:3000 in browser and verify:

- [ ] Application loads
- [ ] News articles are fetched
- [ ] Search works
- [ ] Filters work
- [ ] Favorites work
- [ ] No console errors related to API keys

## Troubleshooting

### Issue: "unhealthy" status

**Problem:** Health check is failing

**Solution:**

```bash
# Check if Nginx is responding
docker exec modern-news-aggregator wget -O- http://127.0.0.1/

# Check Nginx logs
docker logs modern-news-aggregator
```

### Issue: No news articles loading

**Problem:** API keys not working

**Solution:**

```bash
# 1. Verify .env file exists and has keys
cat .env

# 2. Rebuild with fresh environment variables
docker-compose down
docker-compose up -d --build news-aggregator

# 3. Check browser console for API errors
# Open http://localhost:3000 and check DevTools Console
```

### Issue: Port already in use

**Problem:** Port 3000 is already taken

**Solutions:**

**Option 1:** Stop conflicting service

```bash
# Find process using port 3000
sudo lsof -i :3000

# Stop the old container if it exists
docker stop modern-news-aggregator
docker rm modern-news-aggregator
```

**Option 2:** Change port in `docker-compose.yml`

```yaml
ports:
  - '8080:80' # Changed from 3000:80
```

### Issue: Changes not reflected

**Problem:** Code changes don't appear

**Solution:**

```bash
# Rebuild without cache
docker-compose build --no-cache news-aggregator
docker-compose up -d news-aggregator
```

## How It Works

### 1. Build Process

```
.env file (on host)
    ↓
docker-compose.yml reads variables
    ↓
Passes to Dockerfile as build args
    ↓
Dockerfile sets as ENV variables
    ↓
npm run build (Vite embeds ENV into JS)
    ↓
Static files with embedded API keys
    ↓
Copied to Nginx container
    ↓
Served as production app
```

### 2. File Structure

```
.
├── .env                    # Your API keys (not in git)
├── .env.example            # Template file
├── .dockerignore           # Excludes .env from image
├── Dockerfile              # Production build
├── Dockerfile.dev          # Development build
├── docker-compose.yml      # Orchestration
└── nginx.conf              # Nginx configuration
```

### 3. Security

- ✅ `.env` excluded from Docker image
- ✅ `.env` in `.gitignore`
- ✅ `.env.example` provided as template
- ⚠️ API keys embedded in client-side JavaScript
- ⚠️ Use backend proxy for production with real secrets

## Advanced Usage

### Custom Environment File

```bash
# Use different environment file
docker-compose --env-file .env.production up -d
```

### View Built JavaScript

```bash
# Extract and inspect the built files
docker cp modern-news-aggregator:/usr/share/nginx/html ./dist-check
cat dist-check/assets/index-*.js | grep -o "VITE_[A-Z_]*"
```

### Manual Build with Inline Keys

```bash
docker build \
  --build-arg VITE_NEWS_API_KEY=abc123 \
  --build-arg VITE_GUARDIAN_API_KEY=def456 \
  --build-arg VITE_NYT_API_KEY=ghi789 \
  -t news-aggregator .
```

### Development with Live Reload

```bash
# Edit files on host, see changes in container
docker-compose --profile dev up

# Container uses volume mount:
# - .:/app              (sync code)
# - /app/node_modules   (use container's node_modules)
```

## Production Checklist

Before deploying to production:

- [ ] All API keys are valid and active
- [ ] `.env` file is properly configured
- [ ] Health check shows "healthy"
- [ ] No errors in container logs
- [ ] Application loads in browser
- [ ] All three news sources work
- [ ] Search functionality works
- [ ] Filters work correctly
- [ ] No console errors
- [ ] Security headers present
- [ ] Gzip compression enabled
- [ ] Static assets cached

## Common Commands Reference

```bash
# View running containers
docker ps

# View all containers
docker ps -a

# Remove stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove everything (careful!)
docker system prune -a

# Access container shell
docker exec -it modern-news-aggregator sh

# Copy files from container
docker cp modern-news-aggregator:/usr/share/nginx/html ./extracted

# View container resource usage
docker stats modern-news-aggregator

# Export container logs
docker logs modern-news-aggregator > app.log 2>&1
```

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
