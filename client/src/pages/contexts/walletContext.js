import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    // Проверяем, был ли пользователь подключен ранее
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ 
            method: 'eth_accounts' 
          });
          
          if (accounts.length > 0) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            setAccount(accounts[0]);
            setProvider(provider);
          }
        } catch (error) {
          console.error("An error occurred while checking the connection:", error);
        }
      }
    };

    checkConnection();

    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
          setProvider(null);
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        const provider = new ethers.BrowserProvider(window.ethereum);
        setAccount(accounts[0]);
        setProvider(provider);

        return provider;
      } catch (error) {
        console.error("An error occurred while connecting:", error);
      } finally {
      }
    } else {
      window.open('https://metamask.io/download/', '_blank');
    }
  };

  return (
    <WalletContext.Provider 
      value={{ 
        account, 
        provider,  
        connectWallet, 
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);