import UserProfileCard from '../components/profile/UserProfile';
import SessionBookingForm from '../components/sessions/SessionBookingForm';

// Test data - will be replaced with real data later
const testMentor = {
  id: 1,
  username: "Jane Smith",
  email: "jane.smith@example.com",
  skills: ["JavaScript", "React", "Node.js", "TypeScript"],
  role: "mentor",
  rating: 4.8,
  profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  bio: "Senior full-stack developer with 8 years of experience. Passionate about teaching and helping others grow in their tech journey.",
  availability: ["Monday", "Wednesday", "Friday"],
  location: "New York, NY",
  linkedin: "https://linkedin.com/in/janesmith",
  github: "https://github.com/janesmith",
  twitter: "https://twitter.com/janesmith"
};

const MentorProfile: React.FC = () => {
  const handleBookingSubmit = async (formData: any): Promise<void> => {
    // This will be replaced with actual API call later
    console.log('Booking submitted:', formData);
    return Promise.resolve();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Profile */}
          <div>
            <UserProfileCard user={testMentor} />
          </div>

          {/* Right column - Booking Form */}
          <div>
            <SessionBookingForm 
              menteeId={1} // This will come from auth context later
              mentorId={2} // This will come from route params later
              onSubmit={handleBookingSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile; 