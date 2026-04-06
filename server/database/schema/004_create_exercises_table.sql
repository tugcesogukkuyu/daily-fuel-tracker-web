USE daily_fuel_tracker;
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
