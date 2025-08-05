'use client'

import { UserProfile } from '@clerk/nextjs'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-warm-cream py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-warm-brown mb-2">Your Profile</h1>
          <p className="text-warm-text-light">Manage your account settings and preferences</p>
        </div>
        <div className="flex justify-center">
          <UserProfile 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-warm-brown hover:bg-warm-brown-dark',
                card: 'border border-warm-border shadow-lg',
                formFieldInput: 'border-warm-border focus:border-warm-brown',
                navbarButton: 'text-warm-brown hover:text-warm-brown-dark'
              }
            }}
            routing="path" 
            path="/profile"
          />
        </div>
      </div>
    </div>
  )
}
