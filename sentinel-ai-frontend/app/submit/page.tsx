"use client"; // This directive marks it as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitPage() {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const router = useRouter(); // For redirecting the user

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    const newClaim = {
      text: text,
      source: source,
      // We'll hardcode the label for now
      label: "Unverified",
      // The backend will handle the timestamp
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/claims/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClaim),
      });

      if (!res.ok) {
        throw new Error('Failed to submit claim');
      }

      alert('Claim submitted successfully!');
      router.push('/'); // Redirect to the homepage

    } catch (error) {
      console.error(error);
      alert('Error submitting claim. See console for details.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Submit a New Claim</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-gray-800 p-8 rounded-lg">
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-300 text-sm font-bold mb-2">
            Claim Text
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="source" className="block text-gray-300 text-sm font-bold mb-2">
            Source URL
          </label>
          <input
            type="text"
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Claim
          </button>
        </div>
      </form>
    </div>
  );
}