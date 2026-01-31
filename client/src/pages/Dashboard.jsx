import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import HeroCanvas from "../three/HeroCanvas";

export default function Dashboard() {
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

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-left">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span style={{ color: "var(--brand-primary)", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", fontSize: "14px" }}>
              AI-Powered Financial Freedom
            </span>
            <h1>
              Your Personal<br />
              <span className="text-gradient">Wealth Architect</span>
            </h1>
            <p>
              Stop guessing with your money. Get personalized, AI-driven insights to track your net worth,
              optimize spending, and build long-term wealth—automagically.
            </p>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn-primary" style={{ fontSize: '18px', padding: '16px 32px' }}>
                  Start Your Journey Free
                </button>
              </SignInButton>
              <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--txt-muted)' }}>
                No credit card required · Free plan available
              </p>
            </SignedOut>

            <SignedIn>
              <Link to="/dashboard" className="btn-primary">
                Go to My Dashboard &rarr;
              </Link>
            </SignedIn>
          </motion.div>
        </div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <HeroCanvas />
        </motion.div>
      </section>

      <motion.section
        className="grid mt-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="card" variants={item}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>💡</div>
          <h3>Daily Wealth Wisdom</h3>
          <p>
            Receive a daily, bite-sized financial tip tailored to your goals.
            Learn about compounding, tax-efficiency, and asset allocation in just 2 minutes a day.
          </p>
        </motion.div>

        <motion.div className="card" variants={item}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>📊</div>
          <h3>Smart Goal Tracking</h3>
          <p>
            Set targets for retirement, a dream home, or that dream vacation.
            Watch visually satisfying progress bars fill up as you save.
          </p>
        </motion.div>

        <motion.div className="card" variants={item}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚀</div>
          <h3>Actionable Playbooks</h3>
          <p>
            Don't just read—do. specific step-by-step guides on how to start a side hustle,
            open a Roth IRA, or negotiate your salary.
          </p>
        </motion.div>

        <motion.div className="card" variants={item}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔒</div>
          <h3>Bank-Grade Security</h3>
          <p>
            Your data is encrypted and secure. We never sell your personal information.
            Focus on growing your wealth with peace of mind.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}
