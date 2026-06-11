import { useState } from 'react';
import { useLmsStore } from './store/useLmsStore';
import { DemoConsole } from './components/DemoConsole';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { StudentDashboard } from './components/StudentDashboard';
import { CourseLearningPage } from './components/CourseLearningPage';
import { QuizInterface } from './components/QuizInterface';
import { AssignmentPage } from './components/AssignmentPage';
import { StudentProfile } from './components/StudentProfile';
import { TeacherDashboard } from './components/TeacherDashboard';
import { ContentUpload } from './components/ContentUpload';
import { QuizBuilder } from './components/QuizBuilder';
import { AdminPortal } from './components/AdminPortal';
import { AdvancedFeatures } from './components/AdvancedFeatures';

function App() {
  const { activeView, isDarkMode } = useLmsStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Define simple routing function based on state
  const renderActiveScreen = () => {
    switch (activeView) {
      case 'student-dash':
        return <StudentDashboard />;
      case 'course-view':
        return <CourseLearningPage />;
      case 'quiz-view':
        return <QuizInterface />;
      case 'assignment-view':
        return <AssignmentPage />;
      case 'profile-view':
        return <StudentProfile />;
      case 'teacher-dash':
        return <TeacherDashboard />;
      case 'content-upload':
        return <ContentUpload />;
      case 'quiz-builder':
        return <QuizBuilder />;
      case 'admin-structure':
      case 'admin-analytics':
        return <AdminPortal />;
      case 'webrtc-live':
      case 'ai-tutor':
      case 'drm-security':
      case 'parent-portal':
        return <AdvancedFeatures />;
      default:
        return <StudentDashboard />;
    }
  };

  const isPublicPage = activeView === 'landing' || activeView === 'login' || activeView === 'signup';

  return (
    <div className={`${isDarkMode ? 'dark' : 'light'} min-h-screen bg-slate-50 dark:bg-brand-navy-dark transition-colors duration-300`}>
      {isPublicPage ? (
        // Public pages do not require Sidebar/Header shells
        <>
          {activeView === 'landing' && <LandingPage />}
          {activeView === 'login' && <LoginPage />}
          {activeView === 'signup' && <SignupPage />}
        </>
      ) : (
        // Dashboard Shell structure
        <div className="flex min-h-screen">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          
          <div className="flex-1 flex flex-col min-h-screen max-w-full overflow-x-hidden">
            <Header onToggleSidebar={() => setIsSidebarOpen(true)} />
            
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              {renderActiveScreen()}
            </main>
          </div>
        </div>
      )}

      {/* Globally mounted interactive Demo console helper */}
      <DemoConsole />
    </div>
  );
}

export default App;
