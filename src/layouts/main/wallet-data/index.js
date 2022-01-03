/* eslint-disable no-constant-condition */
import { Flex, Button, Tag, TagLabel, Badge, TagCloseButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { connector } from '../../../config/web3';

const WalletData = () => {
  const { activate, account } = useWeb3React();

  return (
    <Flex alignItems={'center'}>
      {true ? (
        <Tag colorScheme="green" borderRadius="full">
          <TagLabel>
            <Link to="/punks">0x0000000.0000000</Link>
          </TagLabel>
          <Badge
            d={{
              base: 'none',
              md: 'block'
            }}
            variant="solid"
            fontSize="0.8rem"
            ml={1}>
            ~1111 Ξ
          </Badge>
          <TagCloseButton
            onClick={() => {
              alert('diconect');
            }}
          />
        </Tag>
      ) : (
        <Button
          variant={'solid'}
          colorScheme={'green'}
          size={'sm'}
          leftIcon={<AddIcon />}
          onClick={() => {
            alert('conect');
          }}
          disabled={false}>
          {false ? 'Red no soportada' : 'Conectar wallet'}
        </Button>
      )}
    </Flex>
  );
};

export default WalletData;
