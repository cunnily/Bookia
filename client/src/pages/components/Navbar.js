import Link from 'next/link';
import ConnectButtonCustom  from './ConnectButton';

export default function Navbar() {
    
    return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="w-[30px] h-[30px] bg-gray-900">
          <Link href="/"><img src="icons8.svg" alt="Bookia" className="w-full h-full object-cover" /></Link>
        </div>
        <div className="flex space-x-8 ml-32">
          <Link href="/create" className="text-lg hover:text-gray-300">Create a Contact card</Link>
          <Link href="/search" className="text-lg hover:text-gray-300">Search for a Contact</Link>
        </div>
        <div >
          <ConnectButtonCustom />
          {/* account ? (
            <Link href="/dashboard" className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded inline-block min-w-[171px] text-center">Dashboard</Link>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Connect Metamask
            </button>
          ) */}
        </div>
      </nav>
    )
}