import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export const ConnectButtonCustom = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        openAccountModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected = ready && account && (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded min-w-[171px] text-center"
                  >
                    Connect Wallet
                  </button>
                );
              }

              return (
                <div className="flex items-center bg-gray-700 rounded overflow-hidden min-w-[171px]">
                  <Link
                    href="/dashboard"
                    className="hover:bg-gray-600 text-white px-4 py-2 w-full text-center"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="hover:bg-gray-600 text-white px-4 py-2 w-[40px] text-center border-l border-gray-500"
                  >
                    ...
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};