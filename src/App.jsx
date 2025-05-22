import './App.css';
import LoginRegistro from './components/LoginRegistro';
import UserDashboard from './components/UserDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página inicial mostra o login/registro */}
        <Route path="/" element={<LoginRegistro />} />

        {/* Dashboard é acessado após login */}
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
