# Backend - Interactive Syllabus API

This directory is prepared for the backend API development for the Interactive Syllabus project.

## Planned Features

- User authentication and authorization
- Progress data persistence
- Study analytics and reporting
- Study reminders and notifications
- Multi-user support
- Cloud synchronization

## Suggested Technology Stack

### Option 1: Node.js + Express
```
- Node.js with Express.js
- MongoDB or PostgreSQL database
- JWT for authentication
- bcrypt for password hashing
- cors for cross-origin requests
```

### Option 2: Python + FastAPI
```
- Python with FastAPI
- SQLAlchemy ORM
- PostgreSQL or SQLite database
- JWT for authentication
- Pydantic for data validation
```

### Option 3: Python + Django
```
- Django REST Framework
- PostgreSQL database
- Django's built-in authentication
- Django ORM
```

## Getting Started (When Ready)

1. Choose your preferred technology stack
2. Initialize the project:
   ```bash
   # For Node.js
   npm init -y
   npm install express mongoose cors bcryptjs jsonwebtoken
   
   # For Python
   pip install fastapi uvicorn sqlalchemy psycopg2-binary python-jose[cryptography] passlib[bcrypt]
   ```

3. Set up the basic project structure
4. Configure database connection
5. Implement authentication endpoints
6. Create progress tracking APIs

## API Endpoints (Planned)

```
Authentication:
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

Progress Tracking:
GET    /api/progress
POST   /api/progress
PUT    /api/progress/:id
DELETE /api/progress/:id

Analytics:
GET /api/analytics/overview
GET /api/analytics/progress-history
```

## Database Schema (Planned)

```sql
Users Table:
- id (Primary Key)
- email (Unique)
- password (Hashed)
- name
- created_at
- updated_at

Progress Table:
- id (Primary Key)
- user_id (Foreign Key)
- section_id
- topic_id
- completed (Boolean)
- completed_at
- created_at
- updated_at
```

## Environment Variables (When Implemented)

```
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

## Contributing

When ready to implement the backend:

1. Create your preferred framework setup
2. Follow the planned API structure
3. Implement authentication first
4. Add progress tracking endpoints
5. Write tests for all endpoints
6. Update this README with actual implementation details

## License

This project is open source and available under the MIT License.
