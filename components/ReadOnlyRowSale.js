import React from "react";
import { FaPrint } from "react-icons/fa";
import { Tr, Td, HStack, Button } from "@chakra-ui/react";

function ReadOnlyRowSale({ sale, handlePrintRow }) {
  return (
    <Tr>
      <Td>{sale.id}</Td>
      <Td>{sale.p_from}</Td>
      <Td>{sale.number}</Td>
      <Td>{sale.rp}</Td>
      <Td>{sale.r_price}</Td>
      <Td>{sale.tot_rp}</Td>
      <Td>{sale.br}</Td>
      <Td>{sale.br_price}</Td>
      <Td>{sale.tot_br}</Td>
      <Td>{sale.bh}</Td>
      <Td>{sale.bh_price}</Td>
      <Td>{sale.tot_bh}</Td>
      <Td>{sale.peacock}</Td>
      <Td>{sale.peacock_price}</Td>
      <Td>{sale.tot_pe}</Td>
      <Td>{sale.tot_price}</Td>
      <Td>{sale.description}</Td>
      <Td>
        <HStack>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={(event) => handlePrintRow(event, sale)}
          >
            Print
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default ReadOnlyRowSale;
