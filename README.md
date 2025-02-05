# 💰 Personal Finance Tracker

A modern web application built with Laravel and React to help you manage your personal finances with ease.

## 🌟 Features

- 📊 Track daily, weekly, monthly and yearly transactions
- 💸 Categorize income and expenses
- 📅 Calendar view for transaction history
- 📱 Responsive design for mobile and desktop
- 🔒 Secure user authentication
- 📤 Export transaction data in CSV
- 🌓 Dark mode

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS, Inertia.js
- **Backend:** Laravel 11
- **Database:** MySQL
- **Authentication:** Laravel Breeze
- **Containerization:** Docker
- **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites

- Docker
- Node.js (v18+)
- PHP 8.2+
- Composer

### Installation

1. Clone the repository
```bash
git clone https://github.com/mehedi37/Discipline.git
cd Discipline
```

2. Install dependencies
```bash
composer install
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
php artisan key:generate
```

4. Start Docker containers
```bash
docker-compose up -d
```

5. Run migrations
```bash
docker-compose exec app php artisan migrate
```

6. Start development server
```bash
npm run dev
```

## 🏗️ Docker Configuration

The project uses a multi-container setup with:
- PHP 8.2 FPM Alpine
- Nginx
- MySQL
- Node.js

Key configuration files:
 - [Dockerfile](https://github.com/mehedi37/Discipline/blob/main/Dockerfile) - PHP application container
 - [docker-compose.yml](https://github.com/mehedi37/Discipline/blob/main/docker-compose.yml) - Container orchestration
 - [nginx.conf](https://github.com/mehedi37/Discipline/blob/main/nginx.conf) - Nginx web server configuration

## 📦 Deployment

### Vercel Deployment

1. Install Vercel CLI
```bash
npm i -g vercel
```

2. Deploy
```bash
vercel
```

Make sure to configure your environment variables in Vercel's dashboard.

## 🧪 Testing

Run the test suite:
```bash
php artisan test
```

## 🔧 Development

Build assets:
```bash
npm run build
```

Watch for changes:
```bash
npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- Laravel Framework
- React
- Tailwind CSS
- Inertia.js
- All contributors who help improve this project

---
Made with ❤️ by [Mehedi](https://github.com/mehedi37)
