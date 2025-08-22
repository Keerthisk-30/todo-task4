# Task 4 - To-Do List (LocalStorage + API)

## Run locally
1) Install Node.js LTS.
2) In this folder, run:
   npm install
   npm run dev   # auto-restart on changes (or: npm start)
3) Open http://localhost:3000

## Features
- Instant UI via LocalStorage
- Periodic sync with backend (POST /api/sync, GET /api/tasks)
- Last-write-wins conflict resolution (by updatedAt)
- Soft delete; server prunes deleted items after a week
