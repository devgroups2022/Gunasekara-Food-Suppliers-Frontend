import React from "react";
import { FaTrash, FaPrint } from "react-icons/fa";
import { Tr, Td, HStack, Button } from "@chakra-ui/react";

function ReadOnlyRow({ renew, handlePrintRow }) {
  return (
    <Tr>
      <Td>{renew.number}</Td>
      <Td>{renew.v_from}</Td>
      <Td>{renew.v_to}</Td>

      <Td>
        <HStack>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={(event) => handlePrintRow(event, renew)}
          >
            Print
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default ReadOnlyRow;
