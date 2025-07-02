import React, { useState } from 'react';
import axios from 'axios';

const OnboardingForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    interests: '',
    goals: '',
    skillLevel: 'Beginner',
  });

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
      const res = await axios.post('http://localhost:5000/api/users/create', payload);
      alert('User saved! ✅');
      console.log(res.data);
    } catch (err) {
      alert('Error saving user ❌');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🧠 WealthWise Onboarding</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="text" name="interests" placeholder="Interests (comma separated)" onChange={handleChange} required />
        <input type="text" name="goals" placeholder="Your Financial Goal" onChange={handleChange} required />
        <select name="skillLevel" onChange={handleChange}>
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
