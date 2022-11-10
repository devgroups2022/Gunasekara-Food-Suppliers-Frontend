import React from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { VStack, Button } from "@chakra-ui/react";
function cashbalence() {
  return (
    <div>
    <Navbar />
    <VStack spacing={4} padding={10}>
      <Link href="/cashbalance/sellercashbalance">
        <Button colorScheme="twitter" width={80} variant="solid">
          Seller Cash Balence
        </Button>
      </Link>
      <Link href="/cashbalance/buyercashbalance">
        <Button colorScheme="twitter" width={80} variant="outline">
        Buyer Cash Balence
        </Button>
      </Link>
      <Link href="/cashbalance/employeecashbalance">
        <Button colorScheme="twitter" width={80} variant="outline">
        Employee Cash Balence
        </Button>
      </Link>
          
    </VStack>
  </div>
  )
}

export default cashbalence