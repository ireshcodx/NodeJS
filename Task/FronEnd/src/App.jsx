import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/LogIn/Login';
import Welcome from './Components/Welcome/Welcome';

function App() {

  return (
    <Router>
      <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  )
}

export default App;