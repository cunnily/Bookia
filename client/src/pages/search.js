import { useState } from 'react';
import { Contract, ethers } from 'ethers';
import contactFactoryABI from '../lib/abi/contactFactoryABI';
import contactABI from '../lib/abi/contactABI';
import useEthersProvider from '../lib/customHooks/useEthersProvider'

async function fetchContactInfo(address, _provider) {
  let provider = _provider;
  if (!_provider) {
    provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com", "sepolia")

  }
  const contactFactoryAbi = contactFactoryABI;
  const contactFactoryAddress = "0xf693749ed7bb09570f3fb8d55c362b4c00d18a4c"
  const contactFactory = new Contract(contactFactoryAddress, contactFactoryAbi, provider)
  const contactAddress = await contactFactory.ownerToContact(address)
  if (contactAddress == "0x0000000000000000000000000000000000000000") {
    throw new Error("Contact is not found")
  } 
  const contactAbi = contactABI;
  return new Contract(contactAddress, contactAbi, provider)
}

export default function Search() {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [contactInfo, setContactInfo] = useState([]);
  const provider = useEthersProvider();

  const handleSearchSubmit = async () => {
    setError(null);
    setContactInfo([]);

    try {
      const contact = await fetchContactInfo(address, provider);
      setContactInfo([address, await contact.telegram(), await contact.discord(), await contact.desc()])
    } catch (error) {
      setError(error);
      console.error(error.message)
    } finally {
      setAddress('')
    }
  };

  return (
    <div className="bg-white h-[calc(100vh-72px)] font-roboto">
      <div className="flex flex-col items-center justify-center bg-white pt-20">
        <h1 className="text-3xl text-gray-900 font-bold mb-8">Search for a Contact</h1>

        {/* Input field для ввода запроса */}
        <input
          type="text"
          className="border-2 text-gray-900 border-gray-300 p-2 rounded mb-4 w-[400px] focus:outline-none"
          placeholder="Enter the address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* Кнопка поиска */}
        <button
          onClick={handleSearchSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>

        {/* Отображение информации о контакте, если она найдена */}
        {contactInfo.length > 0 && <div className="text-gray-900 mt-8 p-4 border-2 border-gray-300 rounded w-120 ">
          {contactInfo[0] && <p><strong>Address:</strong> {contactInfo[0]}</p>}
          {contactInfo[1] && <p><strong>Telegram:</strong> {contactInfo[1]}</p>}
          {contactInfo[2] && <p><strong>Discord:</strong> {contactInfo[2]}</p>}
          {contactInfo[3] && <p><strong>Description:</strong> {contactInfo[3]}</p>}
        </div>}

        {/* Отображение ошибки, если контакт не найден */}
        {error && (
          <div className="mt-4 text-red-500">
            {error.message}
          </div>
        )}
      </div>
      {/* Responsive adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          nav {
            flex-direction: column;
          }
          nav div {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
}


