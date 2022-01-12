/* eslint-disable no-constant-condition */
import {
  Flex,
  Button,
  Tag,
  TagLabel,
  Badge,
  TagCloseButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { connector } from "../../../config/web3";

function WalletData() {
  const [balance, setBalance] = useState(0);
  const { activate, deactivate, account, active, error, library } =
    useWeb3React();

  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem("previouslyConnected", "true");
  }, [activate]);

  const disconnect = () => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  };

  const shortAccount = (account) =>
    `${account.slice(0, 4)} ... ${account.slice(account.length - 4)}`;

  const getBalance = async () => {
    const _balance = await library.eth.getBalance(account);
    setBalance((_balance / 1e18).toFixed(4));
  };

  useEffect(() => {
    if (active) getBalance();
  }, [active, account]);

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);

  return (
    <Flex alignItems="center">
      {active ? (
        <Tag colorScheme="green" borderRadius="full">
          <TagLabel>
            <Link to="/punks">{shortAccount(account)}</Link>
          </TagLabel>
          <Badge
            d={{
              base: "none",
              md: "block",
            }}
            variant="solid"
            fontSize="0.8rem"
            ml={1}
          >
            ~ {balance} Ξ
          </Badge>
          <TagCloseButton onClick={disconnect} />
        </Tag>
      ) : (
        <Button
          variant="solid"
          colorScheme="green"
          size="sm"
          leftIcon={<AddIcon />}
          onClick={connect}
          disabled={isUnsupportedChain}
        >
          {isUnsupportedChain ? "Red No Soportada" : "Conectar wallet"}
        </Button>
      )}
    </Flex>
  );
}

export default WalletData;
