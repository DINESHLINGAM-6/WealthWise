import React, { useEffect, useState } from "react";
import { useAuth, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children, needProfile = false }) {
  const { isSignedIn, getToken } = useAuth();
  const navigate = useNavigate();
  const [ok, setOk] = useState(!needProfile); // if no profile needed, allow

  useEffect(() => {
    let mounted = true;

    (async () => {
      if (!needProfile || !isSignedIn) return;

      try {
        const token = await getToken({ template: "default" });
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/users/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (mounted) setOk(Boolean(data?.user));
      } catch {
        if (mounted) setOk(false);
      }
    })();

    return () => { mounted = false; };
  }, [isSignedIn, needProfile, getToken]);

  return (
    <>
      <SignedOut>
        <div className="center-screen">
          <p>Please sign in to continue.</p>
          <SignInButton mode="modal">
            <button className="btn-primary">Sign in / Sign up</button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        {!needProfile ? children : ok ? children : (
          <div className="center-screen">
            <p>No profile found. Complete onboarding first.</p>
            <button className="btn-primary" onClick={() => navigate("/onboarding")}>
              Go to Onboarding
            </button>
          </div>
        )}
      </SignedIn>
    </>
  );
}
