import React from "react";
import { FaPrint } from "react-icons/fa";
import { Tr, Td, HStack, Button } from "@chakra-ui/react";

function ReadOnlyRow({ purchase, handlePrintRow }) {
  return (
    <Tr>
      <Td>{purchase.id}</Td>
      <Td>{purchase.p_from}</Td>
      <Td>{purchase.number}</Td>
      <Td>{purchase.rp}</Td>
      <Td>{purchase.r_price}</Td>
      <Td>{purchase.tot_rp}</Td>
      <Td>{purchase.br}</Td>
      <Td>{purchase.br_price}</Td>
      <Td>{purchase.tot_br}</Td>
      <Td>{purchase.bh}</Td>
      <Td>{purchase.bh_price}</Td>
      <Td>{purchase.tot_bh}</Td>
      <Td>{purchase.peacock}</Td>
      <Td>{purchase.peacock_price}</Td>
      <Td>{purchase.tot_pe}</Td>
      <Td>{purchase.tot_price}</Td>
      <Td>{purchase.description}</Td>
      <Td>
        <HStack>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={(event) => handlePrintRow(event, purchase)}
          >
            Print
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default ReadOnlyRow;
