import { Link as DefaultLink, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NavLink({ children, ...props }) {
  return (
    <DefaultLink
      px={2}
      py={1}
      as={Link}
      rounded="md"
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      {...props}
    >
      {children}
    </DefaultLink>
  );
}

export default NavLink;
