import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/api';
import { useUser } from '../context/UserContext';
import './Form.css';

const OnboardingForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    interests: '',
    goals: '',
    skillLevel: 'Beginner',
  });

  const navigate = useNavigate();
  const { saveUser } = useUser(); // 🔥 Access the context function

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        interests: form.interests.split(',').map((i) => i.trim()),
      };

      const { data } = await createUser(payload); // backend returns user object

      saveUser(data.user); // 🌍 Save globally
      alert('User saved! ✅');
      setForm({ name: '', email: '', age: '', interests: '', goals: '', skillLevel: 'Beginner' });
      navigate('/dashboard');
    } catch (err) {
      alert('Error saving user ❌');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>🧠 Welcome to WealthWise</h2>
      <p className="subtitle">Let’s understand your goals to help you grow rich 💸</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Your Age"
          value={form.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="interests"
          placeholder="Interests (e.g. coding, investing)"
          value={form.interests}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="goals"
          placeholder="Your Financial Goal"
          value={form.goals}
          onChange={handleChange}
          required
        />
        <select name="skillLevel" value={form.skillLevel} onChange={handleChange}>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OnboardingForm;
