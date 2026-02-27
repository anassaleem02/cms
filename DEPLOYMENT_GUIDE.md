# Deployment Guide — FM's Power Solar CMS

This guide covers deploying the full-stack application (Angular frontend + .NET 8 backend + PostgreSQL) to a Linux VPS.

---

## 1. Server Requirements

| Component | Minimum |
|-----------|---------|
| OS | Ubuntu 22.04 LTS |
| RAM | 2 GB |
| Storage | 20 GB SSD |
| CPU | 2 vCPU |

---

## 2. Install Dependencies on Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install .NET 8
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt update && sudo apt install dotnet-sdk-8.0 -y

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y
sudo systemctl enable postgresql && sudo systemctl start postgresql

# Install Node.js (for building Angular)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y

# Install Nginx (reverse proxy)
sudo apt install nginx -y
sudo systemctl enable nginx
```

---

## 3. PostgreSQL Setup

```bash
sudo -u postgres psql
```

```sql
CREATE USER solarcms_user WITH PASSWORD 'your_secure_password';
CREATE DATABASE SolarCMS OWNER solarcms_user;
GRANT ALL PRIVILEGES ON DATABASE SolarCMS TO solarcms_user;
\q
```

---

## 4. Deploy the Backend

```bash
# Clone the repo
git clone https://github.com/anassaleem02/cms.git /var/www/solarcms
cd /var/www/solarcms/phase-2-backend/SolarCMS.API

# Update production settings
nano appsettings.Production.json
```

Create `appsettings.Production.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=SolarCMS;Username=solarcms_user;Password=your_secure_password"
  },
  "Jwt": {
    "Key": "CHANGE_THIS_TO_A_SECURE_64_CHAR_RANDOM_STRING",
    "Issuer": "SolarCMS",
    "Audience": "SolarCMSClient",
    "ExpiryHours": 24
  },
  "UploadSettings": {
    "Path": "/var/www/solarcms/uploads"
  },
  "Serilog": {
    "MinimumLevel": "Warning"
  }
}
```

```bash
# Publish
dotnet publish -c Release -o /var/www/solarcms-api

# Create uploads directory
mkdir -p /var/www/solarcms/uploads
```

### Create systemd service

```bash
sudo nano /etc/systemd/system/solarcms.service
```

```ini
[Unit]
Description=FM's Power Solar CMS API
After=network.target

[Service]
WorkingDirectory=/var/www/solarcms-api
ExecStart=/usr/bin/dotnet SolarCMS.API.dll
Restart=always
RestartSec=10
SyslogIdentifier=solarcms
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=ASPNETCORE_URLS=http://localhost:5000

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable solarcms
sudo systemctl start solarcms
sudo systemctl status solarcms
```

---

## 5. Build and Deploy the Frontend

```bash
cd /var/www/solarcms/phase-3-angular

# Update production API URL
# Edit src/environments/environment.prod.ts:
# apiUrl: 'https://your-domain.com/api'

npm install
npm run build -- --configuration production

# Copy built files to web server
sudo cp -r dist/phase-3-angular/browser/* /var/www/html/
```

---

## 6. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/solarcms
```

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Angular app
    root /var/www/html;
    index index.html;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # Static files cache
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Angular SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API to .NET backend
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve uploads
    location /uploads/ {
        alias /var/www/solarcms/uploads/;
        expires 30d;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/solarcms /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 7. SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
sudo systemctl reload nginx
```

---

## 8. Firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

---

## 9. Verify Deployment

```bash
# Check API is running
curl http://localhost:5000/api/settings

# Check Nginx is serving Angular
curl http://your-domain.com

# Check logs
sudo journalctl -u solarcms -f
```

---

## 10. Updates / Redeployment

```bash
cd /var/www/solarcms
git pull origin master

# Rebuild and restart backend
cd phase-2-backend/SolarCMS.API
dotnet publish -c Release -o /var/www/solarcms-api
sudo systemctl restart solarcms

# Rebuild and redeploy frontend
cd /var/www/solarcms/phase-3-angular
npm install
npm run build -- --configuration production
sudo cp -r dist/phase-3-angular/browser/* /var/www/html/
```

---

## Default Credentials (Change After First Login!)

- Admin Email: `admin@fmspower.com`
- Admin Password: `Admin@1234`

**Change the password immediately via:** Admin Panel → Settings → Change Password
