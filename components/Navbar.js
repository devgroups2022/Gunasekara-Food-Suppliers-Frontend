import {
  VStack,
  Heading,
  Text,
  HStack,
  Box,
  Button,
  Stack,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";

function Navbar() {
  return (
    <Fragment>
      <Stack
        direction="row"
        bgGradient="linear(to-r, linkedin.100, linkedin.300, blue.500)"
        p={4}
        width="100%"
      >
        <Link href="/">
          <Button leftIcon={<BiArrowBack />}></Button>
        </Link>

        <Box width={280}></Box>
        <VStack direction="column">
          <Heading color="white">Gunasekara food suppliers (PVT) Ltd.</Heading>
          <Text fontWeight="bold" color="white">
            No.414,D16 Cannel,Kuttigala,Padalangala.
          </Text>
          <Text fontWeight="semibold">Tel-077-9338165/071-7722435 </Text>
          <Text fontWeight="semibold">
            Email-
            gunasekarafoodssuppliers@gmail.com/indikasanjeewa781010@gmail.com
          </Text>
        </VStack>
      </Stack>
    </Fragment>
  );
}

export default Navbar;
