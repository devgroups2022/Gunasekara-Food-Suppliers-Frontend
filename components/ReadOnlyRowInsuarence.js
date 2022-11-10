import React from "react";
import { FaTrash, FaPrint } from "react-icons/fa";
import { Tr, Td, HStack, Button } from "@chakra-ui/react";

function ReadOnlyRow({ insuarence, handlePrintRow }) {
  return (
    <Tr>
      <Td>{insuarence.number}</Td>
      <Td>{insuarence.v_from}</Td>
      <Td>{insuarence.v_to}</Td>

      <Td>
        <HStack>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={(event) => handlePrintRow(event, insuarence)}
          >
            Print
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default ReadOnlyRow;
