import { useEffect, useState } from 'react';

export default function TestApi() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching from the Next.js server running on port 3000
    fetch('http://localhost:3000/api/hello')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>API Test Result:</h1>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <h2>{message || 'Loading...'}</h2>
      )}
    </div>
  );
}