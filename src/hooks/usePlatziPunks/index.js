import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import {PlatziPunksArtifact} from '../../config/artifacts/PlatziPunks';

const {abi, address} = PlatziPunksArtifact;

const usePlatziPunks = () => {
  const { active, chainId, library } = useWeb3React();

  const platziPunks = useMemo(() => {
      if (active) return new library.eth.Contract(abi, address[chainId]);
    }, [active, library?.eth?.Contract, chainId]
  )

  return platziPunks;
};

export default usePlatziPunks;
