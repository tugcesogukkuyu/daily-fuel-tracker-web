USE daily_fuel_tracker;
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
