/* =========================================================
   DAILY FUEL TRACKER
   SQL ODEV TESLIM DOSYASI
   Veritabani Adi: daily_fuel_tracker
========================================================= */

/* =========================================================
   1. VERITABANI OLUSTURMA / SECME
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

/* =========================================================
   2. TABLO OLUSTURMA
========================================================= */

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

/* =========================================================
   3. ORNEK VERI EKLEME
========================================================= */

INSERT INTO users (full_name, email, password_hash)
VALUES
('Demo Kullanıcı', 'demo@dailyfuel.local', 'demo_hash_value'),
('Test Kullanıcı', 'test@dailyfuel.local', 'test_hash_value');
GO

INSERT INTO meals (user_id, name, meal_type, calories, protein, carbs, fat, created_at)
VALUES
(1, 'Menemen', 'Kahvaltı', 250, 12, 10, 18, GETDATE()),
(1, 'Mercimek Çorbası', 'Öğle Yemeği', 150, 6, 22, 4, GETDATE()),
(1, 'Izgara Tavuk', 'Akşam Yemeği', 220, 30, 0, 10, GETDATE()),
(2, 'Yoğurt', 'Ara Öğün', 110, 6, 8, 5, GETDATE());
GO

INSERT INTO exercises (user_id, name, duration_minutes, calories_burned, created_at)
VALUES
(1, 'Yürüyüş', 30, 120, GETDATE()),
(1, 'Pilates', 40, 200, GETDATE()),
(1, 'Bisiklet', 45, 315, GETDATE()),
(2, 'Koşu', 20, 180, GETDATE());
GO

INSERT INTO water_logs (user_id, log_date, cup_count, created_at, updated_at)
VALUES
(1, CAST(GETDATE() AS DATE), 6, GETDATE(), GETDATE()),
(2, CAST(GETDATE() AS DATE), 4, GETDATE(), GETDATE());
GO

/* =========================================================
   4. TEMEL SELECT SORGULARI
========================================================= */

SELECT * FROM users;
GO

SELECT * FROM meals;
GO

SELECT * FROM exercises;
GO

SELECT * FROM water_logs;
GO

/* =========================================================
   5. UPDATE ORNEGI
   Uygulamada en dogal update mantigi su takibi tarafinda vardir.
========================================================= */

UPDATE water_logs
SET cup_count = 8,
    updated_at = GETDATE()
WHERE user_id = 1
  AND log_date = CAST(GETDATE() AS DATE);
GO

/* =========================================================
   6. DELETE ORNEGI
========================================================= */

DELETE FROM exercises
WHERE user_id = 2
  AND name = 'Koşu';
GO

/* =========================================================
   7. JOIN SORGULARI
========================================================= */

SELECT
    users.full_name,
    users.email,
    meals.name AS meal_name,
    meals.meal_type,
    meals.calories,
    meals.created_at
FROM users
INNER JOIN meals
    ON users.id = meals.user_id;
GO

SELECT
    users.full_name,
    exercises.name AS exercise_name,
    exercises.duration_minutes,
    exercises.calories_burned
FROM users
INNER JOIN exercises
    ON users.id = exercises.user_id;
GO

/* =========================================================
   8. GROUP BY SORGULARI
========================================================= */

SELECT
    user_id,
    SUM(calories) AS total_consumed_calories
FROM meals
GROUP BY user_id;
GO

SELECT
    user_id,
    SUM(calories_burned) AS total_burned_calories
FROM exercises
GROUP BY user_id;
GO

/* =========================================================
   9. SUBQUERY ORNEGI
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
   10. VIEW ORNEGI
========================================================= */

IF OBJECT_ID('vw_user_daily_summary', 'V') IS NOT NULL
    DROP VIEW vw_user_daily_summary;
GO

CREATE VIEW vw_user_daily_summary AS
SELECT
    users.id AS user_id,
    users.full_name,
    ISNULL(SUM(meals.calories), 0) AS total_meal_calories,
    ISNULL((
        SELECT SUM(exercises.calories_burned)
        FROM exercises
        WHERE exercises.user_id = users.id
    ), 0) AS total_exercise_calories
FROM users
LEFT JOIN meals
    ON users.id = meals.user_id
GROUP BY users.id, users.full_name;
GO

SELECT * FROM vw_user_daily_summary;
GO

/* =========================================================
   11. BACKUP DATABASE ORNEGI
   Not: Dosya yolu kullanilan bilgisayara gore degistirilmelidir.
========================================================= */

BACKUP DATABASE daily_fuel_tracker
TO DISK = 'C:\\SQLBackups\\daily_fuel_tracker.bak'
WITH FORMAT, INIT, NAME = 'Daily Fuel Tracker Full Backup';
GO
