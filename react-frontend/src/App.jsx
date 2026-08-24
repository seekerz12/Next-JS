import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TestApi from './TestApi';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '20px' }}>
        <Link to="/test_api">Go to Test API Route</Link>
      </nav>
      <Routes>
        {/* This new route tells the app what to show on the default "/" path */}
        <Route 
          path="/" 
          element={<h2 style={{ padding: '20px' }}>Welcome! Click the link above to test the API.</h2>} 
        />
        <Route path="/test_api" element={<TestApi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;