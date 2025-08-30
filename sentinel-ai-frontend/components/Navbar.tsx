import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700">
      <Link href="/" className="text-white text-xl font-bold">Sentinel AI</Link>
      <div className="flex space-x-4">
        <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
        <Link href="/map" className="text-gray-300 hover:text-white">Map View</Link>
        <Link href="/submit" className="text-gray-300 hover:text-white">Submit Tip</Link>
      </div>
    </nav>
  );
}