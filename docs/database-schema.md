# Database Schema

## users
- id
- full_name
- email
- password_hash
- created_at

## meals
- id
- user_id
- food_name
- serving_quantity
- serving_unit
- calories
- protein
- carbs
- fat
- meal_type
- logged_at
- created_at

## exercises
- id
- user_id
- exercise_name
- duration_minutes
- calories_burned
- logged_at
- created_at

## water_logs
- id
- user_id
- log_date
- cups_count
- total_ml
- created_at
- updated_at