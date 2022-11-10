import React from "react";
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";
import { Tr, Td, HStack, Button } from "@chakra-ui/react";

function ReadOnlyRow({ service, handlePrintRow }) {
  return (
    <Tr>
      <Td>{service.number}</Td>
      <Td>{service.date}</Td>
      <Td>{service.present}</Td>
      <Td>{service.next}</Td>

      <Td>
        <HStack>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={(event) => handlePrintRow(event, service)}
          >
            Print
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default ReadOnlyRow;
