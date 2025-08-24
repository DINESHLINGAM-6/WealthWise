import React from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="brand">🧠 WealthWise</Link>
      <div className="spacer" />
      <SignedOut>
        <SignInButton mode="modal">
          <button className="btn-primary">Sign in / Sign up</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <Link to="/dashboard" className="nav-link">My Dashboard</Link>
        <UserButton />
      </SignedIn>
    </nav>
  );
}
