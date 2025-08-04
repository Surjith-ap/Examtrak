import { UserProfile } from '@clerk/nextjs'

// Required for static export
export async function generateStaticParams() {
  return [{ 'user-profile': [] }]
}

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-warm-cream py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-warm-brown mb-2">User Profile</h1>
            <p className="text-warm-text-light">Manage your account settings and preferences</p>
          </div>
          
          <div className="flex justify-center">
            <UserProfile 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-warm-brown hover:bg-warm-brown-dark',
                  card: 'border border-warm-border shadow-lg',
                  headerTitle: 'text-warm-text',
                  headerSubtitle: 'text-warm-text-light',
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
