import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const config = getDefaultConfig({
    appName: 'Bookia',
    projectId: '63b4af226e2259a6913984592270229c',
    chains: [sepolia],
    transports: {
        [sepolia.id]: http('https://sepolia.infura.io/v3/4c3f30bf61654b41ad626a44f98adb49')
    },    
    ssr: false, // If your dApp uses server side rendering (SSR)
});
  

const WalletProvider = ({ children }) => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
            {children}
        </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default WalletProvider;