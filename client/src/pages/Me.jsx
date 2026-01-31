import React, { useEffect, useState } from "react";
import { useAuth, useUser as useClerkUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (!profile) return (
    <div className="page center-screen">
      <div style={{ color: 'var(--brand-primary)', fontFamily: 'Outfit, sans-serif', fontSize: '24px' }}>
        Loading your wealth profile...
      </div>
    </div>
  );

  return (
    <div className="page">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span style={{ color: "var(--txt-secondary)", fontSize: "16px", fontWeight: 500 }}>
          Dashboard
        </span>
        <h2 style={{ fontSize: "36px", marginTop: "4px", background: "var(--brand-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Welcome back, {profile.name || clerkUser?.firstName} 👋
        </h2>
      </motion.div>

      <motion.div
        className="grid mt-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="card" variants={item}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>🎯</div>
          <h3>Current Focus</h3>
          <p style={{ fontSize: '18px', color: 'var(--txt-primary)' }}>{profile.goals}</p>
          <div style={{ marginTop: '16px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
            <div style={{ width: '45%', height: '100%', background: 'var(--brand-primary)', borderRadius: '2px' }}></div>
          </div>
        </motion.div>

        <motion.div className="card" variants={item}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>📚</div>
          <h3>Knowledge Level</h3>
          <p style={{ fontSize: '18px', color: 'var(--txt-primary)', textTransform: 'capitalize' }}>{profile.skillLevel}</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>Keep learning to reach the next tier!</p>
        </motion.div>

        <motion.div className="card" variants={item} style={{ borderColor: 'var(--brand-primary)' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>💡</div>
          <h3>Daily Wealth Tip</h3>
          <p>
            "Compound interest is the eighth wonder of the world. He who understands it, earns it... he who doesn't... pays it."
          </p>
          <button className="btn-primary" style={{ marginTop: '20px', width: '100%', fontSize: '14px' }}>
            View Full Analysis
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
