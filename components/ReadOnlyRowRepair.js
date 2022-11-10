import React from "react";
import { FaTrash, FaPrint } from "react-icons/fa";
import { Tr, Td, HStack, Button } from "@chakra-ui/react";

function ReadOnlyRow({ repair, handlePrintRow }) {
  return (
    <Tr>
      <Td>{repair.number}</Td>
      <Td>{repair.date}</Td>
      <Td>{repair.discription}</Td>
      <Td>{repair.amount}</Td>

      <Td>
        <HStack>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={(event) => handlePrintRow(event, repair)}
          >
            Print
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default ReadOnlyRow;
