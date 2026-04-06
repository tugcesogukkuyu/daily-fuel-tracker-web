IF NOT EXISTS (
    SELECT name
    FROM sys.databases
    WHERE name = 'daily_fuel_tracker'
)
BEGIN
    CREATE DATABASE daily_fuel_tracker;
END;
GO
