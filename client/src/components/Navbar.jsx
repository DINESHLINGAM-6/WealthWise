import React from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="brand">
        🧠 WealthWise
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">Mission</Link>

        <SignedIn>
          <Link to="/dashboard" className="nav-link">My Dashboard</Link>
          <div style={{ marginLeft: '12px' }}>
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn-primary">Sign In</button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
