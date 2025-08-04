# Interactive Syllabus Project

This is a full-stack project for the Interactive Syllabus application for RRB Technician Grade I Signal exam preparation with user authentication and progress tracking.

## 🚀 Features

- ✅ **Interactive Syllabus Tracking** - Check off completed topics
- ✅ **Progress Visualization** - Charts and analytics for your study progress
- ✅ **User Authentication** - Secure login with Clerk
- ✅ **Progress Persistence** - Your progress is saved to Supabase database
- ✅ **Study Analytics** - Track study time, streaks, and completion rates
- ✅ **Cross-device Sync** - Access your progress from any device
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Real-time Updates** - See your progress update instantly

## 🏗️ Project Structure

```
syllabus_webpage/
├── frontend/                    # Next.js React application
│   ├── src/
│   │   ├── app/                # Next.js 14 App Router pages
│   │   ├── components/         # React components
│   │   │   ├── ui/            # Reusable UI components
│   │   │   ├── Header.tsx     # Navigation header
│   │   │   ├── SyllabusChart.tsx      # Progress visualization
│   │   │   ├── SyllabusSection.tsx    # Interactive topic sections
│   │   │   └── ProgressDashboard.tsx  # Analytics dashboard
│   │   ├── hooks/             # Custom React hooks
│   │   │   └── useProgressTracker.ts  # Progress tracking logic
│   │   ├── lib/               # Utility libraries
│   │   │   ├── supabase.ts    # Supabase client & types
│   │   │   ├── progressTracker.ts # Database functions
│   │   │   └── utils.ts       # General utilities
│   │   ├── data/              # Static data
│   │   ├── types/             # TypeScript type definitions
│   │   └── middleware.ts      # Clerk authentication middleware
│   ├── package.json           # Frontend dependencies
│   ├── .env.local.example     # Environment variables template
│   └── ...                    # Next.js configuration files
├── database/                   # Database schema and migrations
│   └── supabase_schema.sql    # Supabase database setup
├── backend/                   # Backend API (ready for future development)
├── SUPABASE_SETUP.md         # Detailed setup instructions
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier available)
- Clerk account (free tier available)

### 1. Clone and Install

```bash
cd frontend
npm install
```

### 2. Set Up Authentication (Clerk)

1. Create an account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your API keys from the Clerk dashboard

### 3. Set Up Database (Supabase)

1. Create an account at [supabase.com](https://supabase.com)
2. Create a new project
3. Follow the detailed setup in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

### 4. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your credentials:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key
   CLERK_SECRET_KEY=sk_test_your_clerk_secret
   
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 5. Run the Application

```bash
npm run dev
```

The application will be available at http://localhost:3000

## 🏛️ Architecture

### Frontend Stack
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Clerk** for authentication
- **Supabase** for database
- **Chart.js** for data visualization
- **Lucide React** for icons

### Database Schema
- **user_progress** - Topic completion tracking
- **study_sessions** - Study time and session data
- **user_stats** - Aggregated user statistics

### Authentication Flow
1. User signs in via Clerk
2. Clerk provides user ID for database operations
3. Supabase RLS ensures data privacy
4. Progress is automatically synced

## 📊 Progress Tracking Features

### Study Analytics
- **Overall Progress** - Percentage across all topics
- **Subject Breakdown** - Progress by exam section
- **Study Streaks** - Daily study habit tracking
- **Time Tracking** - Total study hours
- **Accuracy Metrics** - Question answering statistics

### Data Privacy
- **Row Level Security** - Users only see their own data
- **Encrypted Storage** - All data encrypted at rest
- **GDPR Compliant** - Data deletion and export available
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
