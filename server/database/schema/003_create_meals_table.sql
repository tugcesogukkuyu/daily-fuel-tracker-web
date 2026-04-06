USE daily_fuel_tracker;
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
