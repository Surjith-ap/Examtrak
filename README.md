# Interactive Syllabus Project

This is a full-stack project structure for the Interactive Syllabus application for RRB Technician Grade I Signal exam preparation.

## Project Structure

```
syllabus_webpage/
├── frontend/           # Next.js React application
│   ├── src/           # Source code
│   ├── package.json   # Frontend dependencies
│   └── ...           # Next.js configuration files
├── backend/           # Backend API (ready for future development)
└── README.md         # This file
```

## Getting Started

### Frontend (Next.js Application)

The frontend contains a modern React-based interactive syllabus with:
- Progress tracking with checkboxes
- Visual charts showing topic distribution
- Responsive design with Tailwind CSS
- TypeScript for type safety

To run the frontend:

```bash
cd frontend
npm install
npm run dev
```

The application will be available at http://localhost:3000

### Backend (Future Development)

The backend folder is ready for future API development. You could add:
- User authentication
- Progress data persistence
- Study analytics
- Study reminders and notifications

## Features

- ✅ Interactive syllabus tracking
- ✅ Progress visualization with Chart.js
- ✅ Responsive design
- ✅ Modern React architecture
- ✅ TypeScript support
- 🔄 Backend API (planned)
- 🔄 User accounts (planned)
- 🔄 Cloud sync (planned)

## Technologies

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Chart.js

### Backend (Planned)
- Node.js/Express or Python/FastAPI
- Database (MongoDB/PostgreSQL)
- Authentication (JWT)

## License

This project is open source and available under the MIT License.
