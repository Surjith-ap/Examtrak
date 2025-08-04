'use client';

import { SignedIn, SignedOut } from '@clerk/nextjs';
import Header from '../components/Header';
import SyllabusChart from '../components/SyllabusChart';
import SyllabusSection from '../components/SyllabusSection';
import { syllabusData } from '../data/syllabusData';

function LandingPage() {
  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-warm-brown mb-6">
            Interactive Syllabus
          </h1>
          <h2 className="text-xl md:text-2xl text-warm-text-light mb-8">
            RRB Technician Grade I Signal Exam Preparation
          </h2>
          <p className="text-lg text-warm-text-light mb-12 leading-relaxed">
            Track your preparation progress with our interactive syllabus. 
            Get visual insights into your study progress and stay organized 
            with topic-wise tracking across all exam sections.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="bg-white rounded-2xl p-8 border border-warm-border shadow-sm">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-warm-text mb-2">Progress Tracking</h3>
              <p className="text-warm-text-light">
                Visual charts and progress bars to track your preparation across all syllabus sections.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-warm-border shadow-sm">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-warm-text mb-2">Interactive Checklists</h3>
              <p className="text-warm-text-light">
                Check off completed topics and see your progress update in real-time.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-warm-border shadow-sm">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-warm-text mb-2">Comprehensive Coverage</h3>
              <p className="text-warm-text-light">
                Complete syllabus coverage for General Awareness, Reasoning, Computers, Maths, and Science.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-warm-border shadow-sm">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="text-xl font-semibold text-warm-text mb-2">Save Your Progress</h3>
              <p className="text-warm-text-light">
                Your progress is automatically saved and synced across all your devices.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-warm-text-light mb-4">Ready to start your preparation journey?</p>
            <p className="text-sm text-warm-text-light">Sign in to access the interactive syllabus</p>
          </div>
        </div>
      </main>
      
      <footer className="bg-warm-bg-light mt-12 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-warm-text-light">
          <p>&copy; 2025 Interactive Syllabus. All the best for your exam preparation!</p>
        </div>
      </footer>
    </div>
  );
}

function AuthenticatedApp() {
  return (
    <>
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <SyllabusChart />
        
        <div className="space-y-8">
          {Object.values(syllabusData).map(section => (
            <SyllabusSection key={section.id} section={section} />
          ))}
        </div>
      </main>

      <footer className="bg-warm-bg-light mt-12 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-warm-text-light">
          <p>&copy; 2025 Interactive Syllabus. All the best for your exam!</p>
        </div>
      </footer>
    </>
  );
}

export default function Home() {
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      
      <SignedIn>
        <AuthenticatedApp />
      </SignedIn>
    </>
  );
}
