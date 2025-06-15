import { useState } from 'react';
import './index.css';

// Your live backend:
const API_BASE = 'https://resume-backend-6dsy.onrender.com';

export default function App() {
  const [resume, setResume] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);

  const getSuggestions = async () => {
    if (!resume.trim()) return alert('Paste some resume text first.');
    setLoading(true);
    setSuggestions('');

    try {
      const res = await fetch(`${API_BASE}/api/suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: resume })
      });
      const data = await res.json();
      setSuggestions(data.suggestions || 'No suggestions returned.');
    } catch (err) {
      console.error(err);
      setSuggestions('Failed to fetch suggestions.');
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <h1>Smart Resume Builder</h1>

      <textarea
        placeholder="Paste your resume here…"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <button onClick={getSuggestions}>
        {loading ? 'Loading…' : 'Get AI Suggestions'}
      </button>

      {suggestions && (
        <section className="suggest-box">
          <h2>Suggestions</h2>
          <pre>{suggestions}</pre>
        </section>
      )}
    </div>
  );
}
