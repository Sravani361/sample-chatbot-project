import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/pages/registration';
import Setup from './components/pages/setup';
import Integration from './components/pages/integration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/integration" element={<Integration />} />
      </Routes>
    </Router>
  );
}

export default App;

