import { useEffect, useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import usePlatziPunks from '../../hooks/usePlatziPunks'

const Home = () => {
  const [maxSupply, setMaxSupply] = useState(0);
  const { active } = useWeb3React()
  const platziPunks = usePlatziPunks()

  const getMaxSupply = useCallback(
    async () => {
      if (active) {
        const _maxSupply = await platziPunks.methods.maxSupply().call()
        console.log('_maxSupply:', _maxSupply)
        setMaxSupply(_maxSupply);        
      }
    },
    [active, platziPunks]
  )

  useEffect(() => {
    getMaxSupply()
  }, [getMaxSupply])

  console.log('!active:', !active)
  if (!active) {
    return <h1>not active</h1>
  }

  return (
    <>
      <p>Hello world :D !! {maxSupply}</p>
    </>
  );
};

export default Home;
