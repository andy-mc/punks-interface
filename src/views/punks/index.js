import { useWeb3React } from '@web3-react/core';
import Loading from '../../components/loading';
import PunkCard from '../../components/punk-card';
import RequestAccess from '../../components/request-access';

const Punks = () => {
  const {active} = useWeb3React()
  
  if(!active) return <RequestAccess></RequestAccess>
  
  return(
    <>
    <h1>Gallery</h1>
    <Loading></Loading>
    <PunkCard></PunkCard>
    </>
  )
}

export default Punks;