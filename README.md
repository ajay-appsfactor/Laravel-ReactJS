### npm run dev
### php artisan serve
### php artisan migrate
### php -m

php artisan make:migration add_aadhaar_to_employees_table

php artisan config:clear
php artisan cache:clear
php artisan config:cache

php artisan session:table
php artisan make:controller UserController --resource
php artisan route:list

## if table not create
php artisan migrate


## if table already created 
php artisan make:migration add_aadhaar_to_employees_table
php artisan migrate

## Reset Table
php artisan migrate:fresh


# Model is create 
php artisan make:model Employee -m

# Schema Define
php artisan migrate

# Employee.php

php artisan key:generate


composer dump-autoload

# Pdf Upload Command
composer require barryvdh/laravel-dompdf