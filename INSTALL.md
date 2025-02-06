# ArchCloudHub Installation Guide

This guide provides detailed instructions for installing ArchCloudHub on an Ubuntu server with Apache and MySQL.

## System Requirements

- Ubuntu 20.04 LTS or later
- 16GB RAM
- 4 CPU cores
- 50GB storage
- Root access or sudo privileges

## 1. Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y apache2 mysql-server nodejs npm git
```

## 2. MySQL Setup

```bash
# Secure MySQL installation
sudo mysql_secure_installation

# Create database and user
sudo mysql -u root -p
```

```sql
CREATE DATABASE archcloudhub;
CREATE USER 'archcloud'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON archcloudhub.* TO 'archcloud'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## 3. Node.js Setup

```bash
# Install Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js 18
nvm install 18
nvm use 18
```

## 4. Application Installation

```bash
# Create application directory
sudo mkdir -p /var/www/archcloudhub
sudo chown -R $USER:$USER /var/www/archcloudhub

# Clone repository
cd /var/www/archcloudhub
git clone https://github.com/yourusername/archcloudhub.git .

# Install dependencies
npm install

# Build application
npm run build
```

## 5. Environment Configuration

```bash
# Copy environment file
cp .env.example .env

# Edit environment variables
nano .env
```

Required environment variables:
```env
# App
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Database
DATABASE_URL="mysql://archcloud:your_secure_password@localhost:3306/archcloudhub"

# Auth (Google OAuth)
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.com
```

## 6. Apache Configuration

```bash
# Create Apache virtual host
sudo nano /etc/apache2/sites-available/archcloudhub.conf
```

Add the following configuration:
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    ServerAdmin webmaster@your-domain.com
    DocumentRoot /var/www/archcloudhub

    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/

    ErrorLog ${APACHE_LOG_DIR}/archcloudhub-error.log
    CustomLog ${APACHE_LOG_DIR}/archcloudhub-access.log combined

    <Directory /var/www/archcloudhub>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

Enable required Apache modules and site:
```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo a2ensite archcloudhub
sudo systemctl restart apache2
```

## 7. SSL Configuration

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-apache

# Obtain SSL certificate
sudo certbot --apache -d your-domain.com
```

## 8. Process Management

Install PM2 for process management:
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "archcloudhub" -- start

# Enable startup script
pm2 startup
pm2 save
```

## 9. Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push
```

## 10. Final Steps

1. Set up firewall:
```bash
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

2. Set up monitoring:
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

3. Test the installation:
```bash
# Check application status
pm2 status
pm2 logs archcloudhub

# Test Apache configuration
sudo apache2ctl -t
```

## Troubleshooting

1. If the application isn't accessible:
   - Check Apache error logs: `sudo tail -f /var/log/apache2/error.log`
   - Check PM2 logs: `pm2 logs archcloudhub`
   - Verify ports: `sudo netstat -tulpn | grep LISTEN`

2. Database connection issues:
   - Check MySQL status: `sudo systemctl status mysql`
   - Verify credentials: `mysql -u archcloud -p`
   - Check connection string in .env

3. Permission issues:
   - Set correct ownership: `sudo chown -R www-data:www-data /var/www/archcloudhub`
   - Set correct permissions: `sudo chmod -R 755 /var/www/archcloudhub`

## Security Recommendations

1. Enable UFW firewall
2. Regular system updates
3. Secure MySQL configuration
4. Use strong passwords
5. Regular backups
6. Monitor system logs
7. Keep Node.js and npm packages updated

## Maintenance

1. Regular updates:
```bash
# Update application
git pull
npm install
npm run build
pm2 restart archcloudhub
```

2. Database backups:
```bash
# Create backup script
sudo nano /usr/local/bin/backup-db.sh
```

Add the following content:
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/archcloudhub"
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u archcloud -p'your_secure_password' archcloudhub > "$BACKUP_DIR/backup_$DATE.sql"
```

Make it executable and schedule with cron:
```bash
sudo chmod +x /usr/local/bin/backup-db.sh
sudo crontab -e
```

Add daily backup at 2 AM:
```
0 2 * * * /usr/local/bin/backup-db.sh
```

For additional help or issues:
- Create an issue in the GitHub repository
- Contact support@archcloudhub.com