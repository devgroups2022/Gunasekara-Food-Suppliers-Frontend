import React from "react";
import { FaTrash, FaPrint } from "react-icons/fa";
import { Tr, Td, HStack, Button } from "@chakra-ui/react";

function ReadOnlyRow({ fuel, handlePrintRow }) {
  return (
    <Tr>
      <Td>{fuel.number}</Td>
      <Td>{fuel.date}</Td>
      <Td>{fuel.liters}</Td>

      <Td>
        <HStack>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={(event) => handlePrintRow(event, fuel)}
          >
            Print
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default ReadOnlyRow;
