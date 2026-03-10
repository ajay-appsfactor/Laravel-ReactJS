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

# php artisan migrate:rollback

Schema::table('users', function (Blueprint $table) {
    $table->uuid('uuid')->after('id');
});

php artisan model:show User


After create a helpers.php file 

composer.json file :
"autoload": {
    "files": [
        "app/helpers.php"
    ]
}
composer dump-autoload


php artisan make:enum EmployeeHelper

$employees = Employee::oldest()->get();




Migration file Update or Add New Coulmn Inside Table 
1. php artisan make:migration add_gender_to_employees_table
2.
<pre>

public function up(): void
{
    Schema::table('employees', function (Blueprint $table) {
        $table->string('gender')->nullable()->after('aadhaar_hash');
    });
}

public function down(): void
{
    Schema::table('employees', function (Blueprint $table) {
        $table->dropColumn('gender');
    });
}
</pre>
 

 3.php artisan migrate