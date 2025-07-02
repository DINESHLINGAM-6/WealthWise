import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OnboardingForm from './pages/OnboardingForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnboardingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
