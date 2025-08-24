import React, { useEffect, useState } from "react";
import { useAuth, useUser as useClerkUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Me() {
  const { getToken } = useAuth();
  const { user: clerkUser } = useClerkUser();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const token = await getToken({ template: "default" });
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (mounted) setProfile(data.user);
      } catch {
        navigate("/onboarding");
      }
    })();
    return () => { mounted = false; };
  }, [getToken, navigate]);

  if (!profile) return <div className="page"><p>Loading…</p></div>;

  return (
    <div className="page">
      <h2>Welcome back, {profile.name || clerkUser?.firstName} 👋</h2>
      <div className="grid">
        <div className="card">
          <h3>🎯 Goal</h3>
          <p>{profile.goals}</p>
        </div>
        <div className="card">
          <h3>📚 Skill Level</h3>
          <p>{profile.skillLevel}</p>
        </div>
        <div className="card">
          <h3>💡 Today’s Tip</h3>
          <p>Return daily to unlock a fresh, personalized tip.</p>
        </div>
      </div>
    </div>
  );
}
