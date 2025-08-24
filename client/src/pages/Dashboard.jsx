import React from "react";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import HeroCanvas from "../three/HeroCanvas";

export default function Dashboard() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-left">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            Your Daily AI Money Mentor
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .1 }}>
            Track, learn, and act—get personalized ideas to grow your wealth faster.
          </motion.p>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn-primary">Get Started</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <a href="/dashboard" className="btn-primary">Go to My Dashboard</a>
          </SignedIn>
        </div>

        <div className="hero-right">
          <HeroCanvas />
        </div>
      </section>

      {/* some public “teaser” widgets */}
      <section className="grid">
        <motion.div className="card" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}>
          <h3>Daily Tip</h3>
          <p>Come back daily to unlock 1 actionable idea powered by AI.</p>
        </motion.div>
        <motion.div className="card" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}>
          <h3>Goal Tracker</h3>
          <p>Visualize your net worth and progress toward financial freedom.</p>
        </motion.div>
        <motion.div className="card" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}>
          <h3>Playbooks</h3>
          <p>Step-by-step playbooks for side-income, investing, and saving.</p>
        </motion.div>
      </section>
    </div>
  );
}
