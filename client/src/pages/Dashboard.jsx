import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useUser();
  const [tip, setTip] = useState('');

  const handleGenerateTip = () => {
    // Future: fetch from OpenAI or custom API
    const mockTips = [
      "Start investing ₹500 monthly in index funds.",
      "Track expenses using a budgeting app.",
      "Automate savings to a high-interest account.",
      "Learn a high-demand skill to boost your income.",
    ];
    const randomTip = mockTips[Math.floor(Math.random() * mockTips.length)];
    setTip(randomTip);
  };

  if (!user) {
    return (
      <div className="dashboard">
        <h2>🚫 No user found</h2>
        <p>Please complete the onboarding form first.</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name} 👋</h1>
      <p className="goal">🎯 Goal: {user.goals}</p>

      <div className="card">
        <h3>👤 Profile Overview</h3>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Skill Level:</strong> {user.skillLevel}</p>
        <p><strong>Interests:</strong> {user.interests.join(', ')}</p>
      </div>

      <div className="tip-card">
        <h3>💡 Daily Wealth Tip</h3>
        <p>Click below to get your personalized money insight!</p>
        <button onClick={handleGenerateTip}>Generate Tip</button>
        {tip && <div className="tip-output">👉 {tip}</div>}
      </div>
    </div>
  );
};

export default Dashboard;
