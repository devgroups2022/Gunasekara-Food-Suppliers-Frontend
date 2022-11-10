import React from "react";
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";
import { Tr, Td, HStack, Button } from "@chakra-ui/react";

function ReadOnlyRow({
  customer,
  handleEditClick,
  handleDeleteClick,
  handlePrintRow,
}) {
  return (
    <Tr>
      <Td>{customer.id}</Td>
      <Td>{customer.name}</Td>
      <Td>{customer.tp}</Td>
      <Td>{customer.whatsapp}</Td>
      <Td>{customer.address}</Td>
      <Td>{customer.email}</Td>
      <Td>
        <HStack>
          <Button
            colorScheme="linkedin"
            variant="outline"
            leftIcon={<FaEdit />}
            onClick={(event) => handleEditClick(event, customer)}
          >
            Edit
          </Button>
          <Button
            colorScheme="twitter"
            leftIcon={<FaTrash />}
            onClick={() => handleDeleteClick(customer.id)}
          >
            Delete
          </Button>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={(event) => handlePrintRow(event, customer)}
          >
            Print
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default ReadOnlyRow;
