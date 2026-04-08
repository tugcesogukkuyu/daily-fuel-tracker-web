/* =========================================================
   DAILY FUEL TRACKER
   SQL TESLİM DOSYASI
   Veritabanı Adı: daily_fuel_tracker
========================================================= */

/* =========================================================
   1. VERİTABANI OLUŞTURMA / SEÇME
========================================================= */

IF NOT EXISTS (
    SELECT name
    FROM sys.databases
    WHERE name = 'daily_fuel_tracker'
)
BEGIN
    CREATE DATABASE daily_fuel_tracker;
END;
GO

USE daily_fuel_tracker;
GO

/* Veritabanının başarıyla oluşturulup oluşturulmadığını kontrol etme */
SELECT name
FROM sys.databases
WHERE name = 'daily_fuel_tracker';
GO

/* =========================================================
   2. TABLO OLUŞTURMA
========================================================= */

/* USERS TABLOSU */
IF NOT EXISTS (
    SELECT 1
    FROM sys.tables
    WHERE name = 'users'
)
BEGIN
    CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        full_name NVARCHAR(100) NOT NULL,
        email NVARCHAR(150) NOT NULL UNIQUE,
        password_hash NVARCHAR(255) NOT NULL,
        created_at DATETIME2 NOT NULL DEFAULT GETDATE()
    );
END;
GO

/* MEALS TABLOSU */
IF NOT EXISTS (
    SELECT 1
    FROM sys.tables
    WHERE name = 'meals'
)
BEGIN
    CREATE TABLE meals (
        id INT IDENTITY(1,1) PRIMARY KEY,
        user_id INT NOT NULL,
        name NVARCHAR(150) NOT NULL,
        meal_type NVARCHAR(50) NOT NULL,
        calories INT NOT NULL,
        protein DECIMAL(6,2) NOT NULL,
        carbs DECIMAL(6,2) NOT NULL,
        fat DECIMAL(6,2) NOT NULL,
        created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT FK_meals_users FOREIGN KEY (user_id) REFERENCES users(id)
    );
END;
GO

/* EXERCISES TABLOSU */
IF NOT EXISTS (
    SELECT 1
    FROM sys.tables
    WHERE name = 'exercises'
)
BEGIN
    CREATE TABLE exercises (
        id INT IDENTITY(1,1) PRIMARY KEY,
        user_id INT NOT NULL,
        name NVARCHAR(150) NOT NULL,
        duration_minutes INT NOT NULL,
        calories_burned INT NOT NULL,
        created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT FK_exercises_users FOREIGN KEY (user_id) REFERENCES users(id)
    );
END;
GO

/* WATER_LOGS TABLOSU */
IF NOT EXISTS (
    SELECT 1
    FROM sys.tables
    WHERE name = 'water_logs'
)
BEGIN
    CREATE TABLE water_logs (
        id INT IDENTITY(1,1) PRIMARY KEY,
        user_id INT NOT NULL,
        log_date DATE NOT NULL,
        cup_count INT NOT NULL DEFAULT 0,
        created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
        updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT FK_water_logs_users FOREIGN KEY (user_id) REFERENCES users(id)
    );
END;
GO

/* Tablo yapısını ve kayıtları kontrol etme */
SELECT * FROM users;
GO

/* =========================================================
   3. VERİ EKLEME (INSERT)
========================================================= */

/* USERS TABLOSUNA ÖRNEK VERİ EKLEME */
IF NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'demo@dailyfuel.local'
)
BEGIN
    INSERT INTO users (full_name, email, password_hash)
    VALUES ('Demo Kullanıcı', 'demo@dailyfuel.local', 'demo_hash_value');
END;
GO

IF NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'auth.route@example.com'
)
BEGIN
    INSERT INTO users (full_name, email, password_hash)
    VALUES ('Auth Route User', 'auth.route@example.com', 'auth_hash_value');
END;
GO

/* USERS VERİLERİNİ DOĞRULAMA */
SELECT *
FROM users
WHERE email IN ('demo@dailyfuel.local', 'auth.route@example.com');
GO

/* MEALS TABLOSUNA ÖRNEK VERİ EKLEME */
IF NOT EXISTS (
    SELECT 1 FROM meals WHERE user_id = 1 AND name = 'Yulaf Ezmesi'
)
BEGIN
    INSERT INTO meals (user_id, name, meal_type, calories, protein, carbs, fat, created_at)
    VALUES
    (1, 'Yulaf Ezmesi', 'Kahvaltı', 320, 12, 45, 8, DATEADD(DAY, -9, GETDATE())),
    (1, 'Muz', 'Ara Öğün', 210, 2, 50, 1, DATEADD(DAY, -9, GETDATE()));
END;
GO

/* =========================================================
   4. İLİŞKİSEL SORGULAR (JOIN)
========================================================= */

SELECT
    users.full_name,
    users.email,
    meals.name AS meal_name,
    meals.meal_type,
    meals.calories
FROM users
INNER JOIN meals
    ON users.id = meals.user_id;
GO

/* =========================================================
   5. GROUP BY SORGULARI
========================================================= */

SELECT
    user_id,
    SUM(calories) AS total_consumed_calories
FROM meals
GROUP BY user_id;
GO

/* =========================================================
   6. VIEW SORGULARI
========================================================= */

IF OBJECT_ID('vw_user_daily_summary', 'V') IS NOT NULL
    DROP VIEW vw_user_daily_summary;
GO

CREATE VIEW vw_user_daily_summary AS
SELECT
    users.id AS user_id,
    users.full_name,
    ISNULL(SUM(meals.calories), 0) AS total_meal_calories
FROM users
LEFT JOIN meals
    ON users.id = meals.user_id
GROUP BY users.id, users.full_name;
GO

SELECT * FROM vw_user_daily_summary;
GO

/* =========================================================
   7. SUBQUERY KULLANIMI
========================================================= */

SELECT
    name,
    calories,
    meal_type
FROM meals
WHERE calories > (
    SELECT AVG(calories)
    FROM meals
);
GO

/* =========================================================
   8. ZAMAN ANALİZİ (DATEDIFF)
========================================================= */

SELECT
    u.full_name,
    m.name AS meal_name,
    m.created_at,
    DATEDIFF(DAY, m.created_at, GETDATE()) AS days_passed
FROM meals m
INNER JOIN users u
    ON m.user_id = u.id;
GO

/* =========================================================
   9. VERİTABANI YEDEKLEME (BACKUP)
   Mac / Docker SQL Server ortamına uygun yol kullanılmıştır.
========================================================= */

BACKUP DATABASE daily_fuel_tracker
TO DISK = '/var/opt/mssql/backup/daily_fuel_tracker.bak'
WITH FORMAT;
GO