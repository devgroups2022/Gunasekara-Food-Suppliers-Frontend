import React from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { VStack, Button } from "@chakra-ui/react";

function vehicles() {
  return (
    <div>
      <Navbar />
      <VStack spacing={4} padding={10}>
        <Link href="/vehicles/service">
          <Button colorScheme="twitter" width={80} variant="solid">
            Service
          </Button>
        </Link>
        <Link href="/vehicles/repair">
          <Button colorScheme="twitter" width={80} variant="outline">
            Repair
          </Button>
        </Link>
        <Link href="/vehicles/renew">
          <Button colorScheme="twitter" width={80} variant="outline">
            Renew
          </Button>
        </Link>
        <Link href="/vehicles/insuarence">
          <Button colorScheme="twitter" width={80} variant="outline">
            Insurance
          </Button>
        </Link>
        <Link href="/vehicles/fuel">
          <Button colorScheme="twitter" width={80} variant="outline">
            Fuel
          </Button>
        </Link>
      </VStack>
    </div>
  );
}

export default vehicles;
