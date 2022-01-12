import { useEffect, useState, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import usePlatziPunks from "../../hooks/usePlatziPunks";

function Home() {
  const { active } = useWeb3React();
  const [maxSupply, setMaxSupply] = useState();
  const platziPunks = usePlatziPunks();

  const getMaxSupply = useCallback(async () => {
    if (platziPunks) {
      const _maxSupply = await platziPunks.methods.maxSupply().call();
      setMaxSupply(_maxSupply);
    }
  }, [platziPunks]);

  useEffect(() => {
    getMaxSupply();
  }, [getMaxSupply]);

  if (!active) return <h1>Conecta tu Wallet !!</h1>;

  return <p>Hello world :D !! maxSupply: {maxSupply}</p>;
}

export default Home;
