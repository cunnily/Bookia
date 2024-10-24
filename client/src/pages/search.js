import { useState } from 'react';
import { Contract, ethers } from 'ethers';
import { useWallet } from './contexts/walletContext';

async function fetchContactInfo(address, _provider) {
  let provider = _provider;
  if (!provider) {
    provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com", "sepolia")
  }
  const contactFactoryAbi = [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_telegram",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_discord",
              "type": "string"
            }
          ],
          "name": "deploy",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_telegram",
              "type": "string"
            }
          ],
          "name": "deploy",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "ownerToContact",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
  ]
  const contactFactoryAddress = "0xf693749ed7bb09570f3fb8d55c362b4c00d18a4c"
  const contactFactory = new Contract(contactFactoryAddress, contactFactoryAbi, provider)
  const contactAddress = await contactFactory.ownerToContact(address)
  if (contactAddress == "0x0000000000000000000000000000000000000000") {
    throw new Error("Contact is not found")
  } 
  const contactAbi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_telegram",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_discord",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "desc",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "discord",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_desc",
          "type": "string"
        }
      ],
      "name": "setDesc",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_discord",
          "type": "string"
        }
      ],
      "name": "setDiscord",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_telegram",
          "type": "string"
        }
      ],
      "name": "setTelegram",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "telegram",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  return new Contract(contactAddress, contactAbi, provider)
}

export default function Search() {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [contactInfo, setContactInfo] = useState([]);
  const {provider} = useWallet();

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
    <div className="bg-white min-h-screen font-roboto">
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


