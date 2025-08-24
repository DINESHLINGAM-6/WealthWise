import React, { useState } from "react";
import { useUser as useClerkUser } from "@clerk/clerk-react";
import { useUser } from "../context/UserContext";

export default function OnboardingForm() {
  const { user } = useClerkUser(); // Clerk user
  const { saveUser } = useUser();  // our custom context

  const [formData, setFormData] = useState({
    stage: "",
    medication: "",
    doctor: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      console.error("No Clerk user found!");
      return;
    }

    // Save user in our context
    saveUser({
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      ...formData,
    });

    console.log("✅ User saved:", formData);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Onboarding</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cancer Stage:</label>
          <input
            type="text"
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Medication:</label>
          <input
            type="text"
            name="medication"
            value={formData.medication}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Doctor:</label>
          <input
            type="text"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save & Continue</button>
      </form>
    </div>
  );
}
