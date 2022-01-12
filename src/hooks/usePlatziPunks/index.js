import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import {abi, address} from '../../config/artifacts/platziPunks';

const usePlatziPunks = () => {
  const { 
    active,
    chainId, 
    library
  } = useWeb3React()

  const platziPunks = useMemo(
    () => {
      if (active) {
        console.log('chainId:', chainId)
        console.log('address:', address)
        console.log('address[chainId]:', address[chainId])
        return new library.eth.Contract(abi, address[chainId]);
      }
    },
    [active, library?.eth?.Contract, chainId]
  )

  return platziPunks;
};

export default usePlatziPunks;
