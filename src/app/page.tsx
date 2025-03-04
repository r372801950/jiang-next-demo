'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnectKitButton } from 'connectkit';

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <div>
        {/*<h2>Account</h2>*/}
        {/*<ConnectKitButton />*/}

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>
    </>
  );
}

export default App;