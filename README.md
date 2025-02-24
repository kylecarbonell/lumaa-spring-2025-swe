Installation
1. Clone the repository [git clone https://github.com/kylecarbonell/lumaa-spring-2025-swe.git] 
2. Enter the file structure [cd /lumaa-spring-2025-swe (i.e the name of the folder)]
3. Open the folder on chose IDE
4. Copy contents of `.env.example` into `.env` in their respective folders (Frontend and Backend)

Frontend:
1. Enter the frontend folder [`cd frontend`]
2. Run `npm install` to install needed dependencies
3. Run `npm run start` to start the client

Backend:
1. Enter the backend folder [`cd backend`]
2. Run `npm install` to install needed dependencies
3. Run `npm run start` to start server

Database:
1. Ensure you have docker  [https://www.docker.com/get-started/] installed
2. Start the Docker Desktop and Start the Docker Engine
3. Run `cd backend` to enter the backend folder
4. Run `docker compose -f docker-compose.yml up`
5. Run `npx drizzle-kit migrate` to migrate data

NOTES:
- Salary expectations : 20-25/hr