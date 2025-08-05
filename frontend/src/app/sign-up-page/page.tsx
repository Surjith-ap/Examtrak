'use client'

import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-warm-cream">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-warm-brown mb-2">Join Us</h1>
          <p className="text-warm-text-light">Create your account to start exam preparation</p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-warm-brown hover:bg-warm-brown-dark',
              card: 'border border-warm-border shadow-lg',
              formFieldInput: 'border-warm-border focus:border-warm-brown',
              footerActionLink: 'text-warm-brown hover:text-warm-brown-dark'
            }
          }}
          routing="path" 
          path="/sign-up-page"
        />
      </div>
    </div>
  )
}
