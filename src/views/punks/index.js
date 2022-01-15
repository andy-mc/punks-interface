import { useWeb3React } from '@web3-react/core';
import { Grid, Text } from '@chakra-ui/react';
import Loading from '../../components/loading';
import PunkCard from '../../components/punk-card';
import RequestAccess from '../../components/request-access';
import {usePlatziPunksData} from '../../hooks/usePlatziPunksData';

const Punks = () => {
  const {active} = useWeb3React();
  const {loading, punks} = usePlatziPunksData();
  

  if (!active) return <RequestAccess></RequestAccess>

  return(
    <>
      {loading ? <Loading /> :
      <>
        <Text fontSize='5xl' color='gray.500' align="center" mb={4}>Gallery</Text>
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {punks.map(({tokenId, name, image}) => <PunkCard key={tokenId} name={name} image={image} />)}
        </Grid>
      </>
      }
    </>
  )
}

export default Punks;