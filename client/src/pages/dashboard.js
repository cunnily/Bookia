import { useState, useEffect } from 'react';
import { Contract } from 'ethers';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import contactFactoryABI from '../lib/abi/contactFactoryABI';
import contactABI from '../lib/abi/contactABI';
import useEthersProvider from '../lib/customHooks/useEthersProvider'
import useEthersSigner from '../lib/customHooks/useEthersSigner'

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const provider = useEthersProvider();
  const signer = useEthersSigner();
  const [telegram, setTelegram] = useState('');
  const [discord, setDiscord] = useState('');
  const [description, setDescription] = useState('');
  const [newTelegram, setNewTelegram] = useState('');
  const [newDiscord, setNewDiscord] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Функция для получения существующих значений из контракта
  const fetchContactData = async () => {
    try {
    
      const contactFactoryAbi = contactFactoryABI;
      const contactFactoryAddress = "0xf693749ed7bb09570f3fb8d55c362b4c00d18a4c";
      
      const contactFactory = new Contract(contactFactoryAddress, contactFactoryAbi, provider);
      const contactAddress = await contactFactory.ownerToContact(address);
      if (contactAddress == '0x0000000000000000000000000000000000000000') {
        return
      }
      const contactAbi = contactABI;
      const contact = new Contract(contactAddress, contactAbi, provider);

      setTelegram(await contact.telegram());
      setDiscord(await contact.discord());
      setDescription(await contact.desc());
      setContact(contact);
      
    } catch (error) {
      console.error(error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для изменения данных в контракте
  const updateContactData = async () => {
    try {

      let contactWithSigner;
      if (contact) {
        contactWithSigner = contact.connect(signer);
      } else {
        throw new Error('create a Contact card first');
      }

      if (newTelegram) {
        const tx = await contactWithSigner.setTelegram(newTelegram);
        setMessage('Updating Telegram...');
        await tx.wait();
        setTelegram(newTelegram);
        setMessage('Telegram updated successfully! 🎉');
        setNewTelegram('');
      }
      if (newDiscord) {
        const tx = await contactWithSigner.setDiscord(newDiscord);
        setMessage('Updating Discord...');
        await tx.wait();
        setDiscord(newDiscord);
        setMessage('Discord updated successfully! 🎉')
        setNewDiscord('');
      }
      if (newDescription) {
        const tx = await contactWithSigner.setDesc(newDescription);
        setMessage('Updating description...');
        await tx.wait();
        setDescription(newDescription);
        setMessage('Description updated successfully! 🎉');
        setNewDescription('');
      }

    } catch (error) {
      console.error('Error updating contact data:', error);
      setMessage(`Error: ${error.message}`);
    }
  };

  // Получаем данные при монтировании компонента
  useEffect(() => {
    if (!isConnected && !isLoading) {
      router.push('/');
    } else if (isConnected) {
      fetchContactData();
    }
  }, [address, router, telegram, discord, description]);

  return isLoading ? (
    <div className="flex items-center justify-center h-[calc(100vh-72px)] bg-white">
      <p className="text-gray-900 text-xl">Loading...</p>
    </div>// Пока идет загрузка, показываем индикатор
    ) : (
    <div className="bg-white h-[calc(100vh-72px)] font-roboto">
      <div className="max-w-lg mx-auto p-4">
        <div className="mb-4 text-gray-900">
          <h2 className="text-3xl my-4">Current Contact Information</h2>
          <p className="text-lg"><strong>Telegram:</strong> {telegram}</p>
          <p className="text-lg"><strong>Discord:</strong> {discord}</p>
          <p className="text-lg"><strong>Description:</strong> {description}</p>
        </div>

        <div className="mb-4 text-gray-900">
          <h2 className="text-xl mb-2">Update Contact Information</h2>
          <input
            type="text"
            className="border p-2 mb-2 w-full"
            placeholder="New Telegram handle"
            value={newTelegram}
            onChange={(e) => setNewTelegram(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 mb-2 w-full"
            placeholder="New Discord handle"
            value={newDiscord}
            onChange={(e) => setNewDiscord(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 mb-2 w-full"
            placeholder="New description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button
            onClick={updateContactData}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>

        {message && (
          <div className={`mt-6 break-words ${message.includes('Error') ? 'text-red-500' : 'text-gray-900'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}


