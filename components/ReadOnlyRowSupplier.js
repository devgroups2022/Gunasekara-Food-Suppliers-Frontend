import React from "react";
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";
import { Tr, Td, HStack, Button } from "@chakra-ui/react";

function ReadOnlyRow({
  supplier,
  handleEditClick,
  handleDeleteClick,
  handlePrintRow,
}) {
  return (
    <Tr>
      <Td>{supplier.id}</Td>
      <Td>{supplier.name}</Td>
      <Td>{supplier.tp}</Td>
      <Td>{supplier.whatsapp}</Td>
      <Td>{supplier.address}</Td>
      <Td>{supplier.email}</Td>
      <Td>
        <HStack>
          <Button
            colorScheme="linkedin"
            variant="outline"
            leftIcon={<FaEdit />}
            onClick={(event) => handleEditClick(event, supplier)}
          >
            Edit
          </Button>
          <Button
            colorScheme="twitter"
            leftIcon={<FaTrash />}
            onClick={() => handleDeleteClick(supplier.id)}
          >
            Delete
          </Button>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={(event) => handlePrintRow(event, supplier)}
          >
            Print
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default ReadOnlyRow;
