# Hackathon2023

## Setting up the environment
- Create an environment (Some of these command are just for windows)
    1. `python -m venv .venv` (creates venv)
    2. `path/to/venv/bin/activate` EX `.venv/Scripts/activate ` (activates venv)
        - `Set-ExecutionPolicy Unrestricted -Scope Process` if UnauthorizedAccess
    3. `pip install -r requirements.txt` (installs the required libraries)


- set up the database (cd into bulletFighter)
1. 'python manage.py makemigrations'
2. 'python manage.py migrate'
