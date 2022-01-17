import { useCallback, useEffect, useState } from "react";
import usePlatziPunks from "../usePlatziPunks";
import { useWeb3React } from '@web3-react/core';

const getPunkData = async ({ platziPunks, tokenId }) => {
  const [
    tokenURI,
    dna,
    owner,
    accessoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyeBrowType,
    facialHairColor,
    facialHairType,
    hairColor,
    hatColor,
    graphicType,
    mouthType,
    skinColor,
    topType,
  ] = await Promise.all([
    platziPunks.methods.tokenURI(tokenId).call(),
    platziPunks.methods.DnaByToken(tokenId).call(),
    platziPunks.methods.ownerOf(tokenId).call(),
    platziPunks.methods.getAccessoriesType(tokenId).call(),
    platziPunks.methods.getAccessoriesType(tokenId).call(),
    platziPunks.methods.getClotheColor(tokenId).call(),
    platziPunks.methods.getClotheType(tokenId).call(),
    platziPunks.methods.getEyeType(tokenId).call(),
    platziPunks.methods.getEyeBrowType(tokenId).call(),
    platziPunks.methods.getFacialHairColor(tokenId).call(),
    platziPunks.methods.getFacialHairType(tokenId).call(),
    platziPunks.methods.getHairColor(tokenId).call(),
    platziPunks.methods.getHatColor(tokenId).call(),
    platziPunks.methods.getGraphicType(tokenId).call(),
    platziPunks.methods.getMouthType(tokenId).call(),
    platziPunks.methods.getSkinColor(tokenId).call(),
    platziPunks.methods.getTopType(tokenId).call(),
  ]);

  const responseMetadata = await fetch(tokenURI);
  const metadata = await responseMetadata.json();

  return {
    tokenId,
    attributes: {
      accessoriesType,
      clotheColor,
      clotheType,
      eyeType,
      eyeBrowType,
      facialHairColor,
      facialHairType,
      hairColor,
      hatColor,
      graphicType,
      mouthType,
      skinColor,
      topType,
    },
    tokenURI,
    dna,
    owner,
    ...metadata,
  };
};

// Plural
const usePlatziPunksData = ({owner = null} = {}) => {
  const [punks, setPunks] = useState([]);
  const {account, library} = useWeb3React();
  const [loading, setLoading] = useState(true);
  const platziPunks = usePlatziPunks();

  const update = useCallback(async () => {
    if (platziPunks) {
      setLoading(true);

      let tokenIds;

      if(!library.utils.isAddress(owner)) {
        const totalSupply = await platziPunks.methods.totalSupply().call();
        tokenIds = new Array(Number(totalSupply)).fill().map((_, index) => index + 1);
      } else {
        const balanceof = await platziPunks.methods.balanceof().call();
        const tokenIdsPromises = new Array(Number(balanceof)).fill().map((_, index) => {
          return platziPunks.methods.tokenOfOwnerByIndex(account, index).call()
        });
        tokenIds = await Promise.all(tokenIdsPromises);
      }

      const punksPromise = tokenIds.map((tokenId) => {
        return getPunkData({ tokenId, platziPunks })
      });
      
      const punks = await Promise.all(punksPromise);

      setPunks(punks);
      setLoading(false);
    }
  }, [platziPunks, library?.utils, owner]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    punks,
    update,
  };
};

// Singular
const usePlatziPunkData = (tokenId = null) => {
  const [punk, setPunk] = useState({});
  const [loading, setLoading] = useState(true);
  const platziPunks = usePlatziPunks();

  const update_one = useCallback(async () => {
    if (platziPunks && tokenId !== null) {
      setLoading(true);

      const _punk = await getPunkData({ tokenId, platziPunks })

      setPunk(_punk);
      setLoading(false);
    }
  }, [tokenId, platziPunks]);

  useEffect(() => {
    update_one();
  }, [update_one]);

  return {
    loading, 
    punk,
    update_one
  };
}

export { usePlatziPunkData, usePlatziPunksData };
