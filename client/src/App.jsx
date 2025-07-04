import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import OnboardingForm from './components/OnboardingForm';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SignedIn>
            <OnboardingForm />
          </SignedIn>
        }
      />
      <Route
        path="/dashboard"
        element={
          <SignedIn>
            <Dashboard />
          </SignedIn>
        }
      />
      <Route
        path="*"
        element={
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        }
      />
    </Routes>
  );
}

export default App;
