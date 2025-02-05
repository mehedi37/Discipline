# Use PHP 8.2 FPM Alpine as base
FROM php:8.4

# Install system dependencies
RUN apt-get update -y && apt-get install -y \
    linux-headers \
    bash \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    nodejs \
    npm

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql bcmath gd

# Set working directory
WORKDIR /app

# Copy composer files
COPY composer.json composer.lock ./

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the rest of the application code
COPY . .

# Install dependencies and build assets
RUN composer install --optimize-autoloader --no-dev
RUN npm install

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache


CMD npm run dev && php artisan serve --host=0.0.0.0 --port=8000
EXPOSE 8000
