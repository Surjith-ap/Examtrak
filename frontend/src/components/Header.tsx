'use client';

import { SignedIn, SignedOut, UserButton, SignInButton, useUser } from '@clerk/nextjs';

export default function Header() {
  const { user } = useUser();

  return (
    <header className="bg-warm-cream/80 backdrop-blur-lg sticky top-0 z-50 border-b border-warm-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-lg font-bold text-warm-brown">RRB Technician Syllabus</h1>
          </div>
          
          {/* Navigation Links - Only show when signed in */}
          <SignedIn>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#overview" className="text-warm-text-light hover:text-warm-brown px-3 py-2 rounded-md text-sm font-medium">Overview</a>
                <a href="#awareness" className="text-warm-text-light hover:text-warm-brown px-3 py-2 rounded-md text-sm font-medium">Awareness</a>
                <a href="#reasoning" className="text-warm-text-light hover:text-warm-brown px-3 py-2 rounded-md text-sm font-medium">Reasoning</a>
                <a href="#computers" className="text-warm-text-light hover:text-warm-brown px-3 py-2 rounded-md text-sm font-medium">Computers</a>
                <a href="#maths" className="text-warm-text-light hover:text-warm-brown px-3 py-2 rounded-md text-sm font-medium">Maths</a>
                <a href="#science" className="text-warm-text-light hover:text-warm-brown px-3 py-2 rounded-md text-sm font-medium">Science & Engg.</a>
              </div>
            </div>
          </SignedIn>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            <SignedIn>
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-sm text-warm-text-light">
                  Welcome, {user?.firstName || 'Student'}!
                </span>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: 'w-8 h-8'
                    }
                  }}
                />
              </div>
              <div className="md:hidden">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: 'w-8 h-8'
                    }
                  }}
                />
              </div>
            </SignedIn>
            
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-warm-brown hover:bg-warm-brown-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </nav>
    </header>
  );
}
