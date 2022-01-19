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
import { Link } from "react-router-dom";
import PunkCard from '../../components/punk-card';
import Loading from '../../components/loading';
import RequestAccess from '../../components/request-access';
import { SearchIcon } from "@chakra-ui/icons";
import {usePlatziPunksData} from '../../hooks/usePlatziPunksData';
import { useState } from 'react';
import { useHistory, useLocation  } from 'react-router-dom';

const Punks = () => {
  const { search } = useLocation();
  const [address, setAddress] = useState(
    new URLSearchParams(search).get("address")
  );
  const [submitted, setSubmitted] = useState(true);
  const [validAddress, setValidAddress] = useState(true);
  const {active, library} = useWeb3React();
  const {loading, punks} = usePlatziPunksData({
    owner: (submitted && validAddress) ? address : null
  });
  const { push } = useHistory()
  

  if (!active) return <RequestAccess />

  const submit = (event) => {
    event.preventDefault()

    if (address) {
      const isValidAddress = library.utils.isAddress(address);
      setSubmitted(true);
      setValidAddress(isValidAddress);
      if (isValidAddress) push(`/punks?address=${address}`)
    } else {
      push("/punks")
    }
  }

  const handleInputAddress = ({target: {value}}) => {
    setSubmitted(false)
    setValidAddress(false)
    setAddress(value)
  }

  return(
    <>
      <form onSubmit={submit}>
        <FormControl>
          <InputGroup mb={3}>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.600" />}
            />
            <Input
              isInvalid={false}
              value={address ?? ""}
              onChange={handleInputAddress}
              placeholder="Buscar por dirección"
            />
            <InputRightElement width="5.5rem">
              <Button type="submit" h="1.75rem" size="sm">
                Buscar
              </Button>
            </InputRightElement>
          </InputGroup>
          {submitted && !validAddress && (
            <FormHelperText>Dirección inválida</FormHelperText>
          )}
        </FormControl>
      </form>
      {loading ? (
        <Loading />
      )  : (
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
      )
      }
    </>
  )
}

export default Punks;