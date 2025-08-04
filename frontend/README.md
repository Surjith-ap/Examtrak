# Frontend - Interactive Syllabus (Next.js)

This is the frontend Next.js application for the Interactive Syllabus project with **Clerk Authentication**.

## Features

- 🔐 **User Authentication** - Secure sign up/sign in with Clerk
- 📊 **Progress Tracking** - Interactive syllabus tracking for RRB Technician Grade I Signal exam
- ✅ **Interactive Checklists** - Progress tracking with checkboxes for each topic
- 📈 **Visual Analytics** - Chart.js doughnut chart for overview
- 📱 **Responsive Design** - Tailwind CSS for all screen sizes
- 🔒 **Protected Routes** - Content requires authentication
- 👤 **User Profiles** - Complete profile management
- 🎨 **Custom Styling** - Warm color scheme throughout

## Getting Started

### Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager
- Clerk account for authentication

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up Clerk authentication:
   - Follow the detailed guide in `CLERK_SETUP.md`
   - Get your keys from [Clerk Dashboard](https://dashboard.clerk.com/)
   - Update `.env.local` with your actual keys

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) (or 3001 if 3000 is in use)

### Authentication Setup

**Important**: You must set up Clerk authentication for the app to work properly.

1. Read `CLERK_SETUP.md` for detailed instructions
2. Update `.env.local` with your Clerk keys
3. Restart the development server

### Building for Production

```bash
npm run build
npm run start
```

### Static Export

```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── globals.css           # Global styles with Tailwind
│   ├── layout.tsx            # Root layout with ClerkProvider
│   ├── page.tsx              # Landing page + authenticated app
│   ├── sign-in/              # Clerk sign-in pages
│   ├── sign-up/              # Clerk sign-up pages
│   └── user-profile/         # User profile management
├── components/
│   ├── Header.tsx            # Navigation with auth
│   ├── SyllabusChart.tsx     # Chart.js doughnut chart
│   └── SyllabusSection.tsx   # Individual syllabus sections
├── data/
│   └── syllabusData.ts       # Syllabus content data
├── types/
│   └── syllabus.ts           # TypeScript type definitions
└── middleware.ts             # Clerk route protection
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **Clerk**: Authentication and user management
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: Data visualization
- **react-chartjs-2**: React wrapper for Chart.js

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Authentication Flow

1. **Landing Page**: Displays features and sign-in button for anonymous users
2. **Sign In/Up**: Clerk-powered authentication with custom styling
3. **Protected Content**: Interactive syllabus requires authentication
4. **User Profile**: Full profile management via Clerk

## Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

See `CLERK_SETUP.md` for detailed setup instructions.

## License

This project is open source and available under the MIT License.
