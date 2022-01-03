import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import Home from './views/home';
import Web3 from 'web3';

function App() {
  useEffect(async () => {
    //   window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
    //     console.log('accounts:', accounts);
    //   });
    // const web3 = new Web3(window.ethereum);
    // const accounts = await web3.eth.requestAccounts();

    // injecting the provider now all the app has provider = window.ethereum
    const web3 = new Web3(window.ethereum);
    web3.eth.requestAccounts();
  }, []);

  return (
    <>
      <Route path="/" exact component={Home} />
    </>
  );
}

export default App;
