import { useState } from 'react';
import { Contract } from 'ethers';
import { useWallet } from './contexts/walletContext';


async function connectToContract(provider, connectWallet) {
  const contactFactoryAddress = "0xf693749ED7bb09570F3fb8D55c362b4c00D18a4c"; // Адрес контракта
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
  ];

  let currentProvider = provider;
  if (!provider) {
    currentProvider = await connectWallet();
  }

  const signer = await currentProvider.getSigner();
  return new Contract(contactFactoryAddress, contactFactoryAbi, signer);
}

export default function Create() {
  const [telegram, setTelegram] = useState('');
  const [discord, setDiscord] = useState('');
  const [message, setMessage] = useState('');
  const [addDiscord, setAddDiscord] = useState(false);
  const {connectWallet, provider} = useWallet();

  // Функция для отправки данных в контракт
  const handleSubmitClick = async () => {

    try {
      const contract = await connectToContract(provider, connectWallet)
      let tx;
      if (addDiscord && discord) {
        tx = await contract["deploy(string,string)"](telegram, discord);
      } else {
        tx = await contract["deploy(string)"](telegram);
      }
      setMessage('Creating...');
      await tx.wait();
      setMessage('Congratulations! The contact card has been successfully created!🎉');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bg-white min-h-screen font-roboto">
      <div className="max-w-lg mx-auto p-4">
        <h1 className="flex text-3xl text-gray-900 justify-center font-bold mb-4 pt-16">Create a Contact Card</h1>

        {/* Поле Telegram */}
        <div className="mb-4">
          <label className="block font-medium text-gray-900 mb-2">Telegram</label>
          <input
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            className="border-2 text-gray-900 border-gray-300 p-2 rounded w-full"
            placeholder="Enter Telegram handle"
          />
        </div>

        {/* Чекбокс для добавления Discord */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={addDiscord}
              onChange={() => setAddDiscord(!addDiscord)}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2 text-gray-900 text-sm ">add Discord handle</span>
          </label>
        </div>

        {/* Поле Discord, если пользователь хочет его добавить */}
        {addDiscord && (
          <div className="mb-4">
            <label className="block font-medium text-gray-900 mb-2">Discord</label>
            <input
              type="text"
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
              className="border-2 text-gray-900 border-gray-300 p-2 rounded w-full"
              placeholder="Enter Discord handle (optional)"
            />
          </div>
        )}

        {/* Кнопка сохранения */}
        <button
          onClick={handleSubmitClick}
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${!telegram ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!telegram}
        >
          Save Contact
        </button>

        {/* Сообщение об успехе или ошибке */}
        {message && (
          <div className={`mt-6 break-words ${message.includes('Error') ? 'text-red-500' : 'text-gray-900'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
