import { useWeb3React } from '@web3-react/core';
import {
  Grid,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  FormHelperText,
  FormControl,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Loading from '../../components/loading';
import PunkCard from '../../components/punk-card';
import RequestAccess from '../../components/request-access';
import {usePlatziPunksData} from '../../hooks/usePlatziPunksData';
import { Link } from "react-router-dom";
import { useState } from 'react';

const Punks = () => {
  const [address, setAddress] = useState('')
  const {active} = useWeb3React();
  const {loading, punks} = usePlatziPunksData();
  

  if (!active) return <RequestAccess />

  return(
    <>
      <form onSubmit={() => {console.log('submit !!')}}>
        <FormControl>
          <InputGroup mb={3}>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              isInvalid={false}
              value={address ?? ""}
              onChange={() => {}}
              placeholder="Buscar por dirección"
            />
            <InputRightElement width="5.5rem">
              <Button type="submit" h="1.75rem" size="sm">
                Buscar
              </Button>
            </InputRightElement>
          </InputGroup>
          {/* {submitted && !validAddress && (
            <FormHelperText>Dirección inválida</FormHelperText>
          )} */}
        </FormControl>
      </form>
      {loading ? <Loading /> :
      <>
        <Text fontSize='5xl' color='gray.500' align="center" mb={4}>Gallery</Text>
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
            {punks.map(({tokenId, name, image}) => {
              return (
                <Link to={`/punk/${tokenId}`} key={tokenId}>
                  <PunkCard name={name} image={image} />
                </Link>
              )
            })}  
        </Grid>
      </>
      }
    </>
  )
}

export default Punks;