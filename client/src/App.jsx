import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import OnboardingForm from "./components/OnboardingForm";
import Me from "./pages/Me";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      {/* Navbar will always be visible */}
      <Navbar />

      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<Dashboard />} />

        {/* Onboarding (requires sign-in) */}
        <Route
          path="/onboarding"
          element={
            <SignedIn>
              <OnboardingForm />
            </SignedIn>
          }
        />

        {/* Personalized dashboard (requires sign-in + profile) */}
        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <ProtectedRoute needProfile>
                <Me />
              </ProtectedRoute>
            </SignedIn>
          }
        />

        {/* Signed-out users → redirect to Clerk sign-in */}
        <Route
          path="/sign-in/*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />

        {/* Catch-all → redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
