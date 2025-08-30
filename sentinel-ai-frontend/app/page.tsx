type Claim = {
  id: number;
  text: string;
  source: string;
  label: string;
  timestamp: string;
};

async function getClaims(): Promise<Claim[]> {
  // Make sure your FastAPI backend server is running!
  const res = await fetch('http://127.0.0.1:8000/claims/', { cache: 'no-store' });
  if (!res.ok) {
    console.error('Failed to fetch claims');
    return []; // Return an empty array on error
  }
  return res.json();
}

export default async function HomePage() {
  const claims = await getClaims();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Latest Claims</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {claims.map((claim) => (
          <div key={claim.id} className="bg-gray-800 rounded-lg p-6 flex flex-col">
            <p className="text-gray-400 text-sm mb-2">Source: {claim.source}</p>
            <h2 className="text-lg font-semibold mb-4 flex-grow">{claim.text}</h2>
            <span className="inline-block bg-blue-600 text-white text-xs font-bold mt-2 px-3 py-1 rounded-full self-start">
              {claim.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}