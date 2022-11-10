import React from "react";
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";
import { Table, Tr, Td, HStack, Button } from "@chakra-ui/react";

function ReadOnlyRowEmployeeCB({
  empcashbal,
  handleEditClick,
  handlePrintRow,
  handleDeleteClick,
}) {
  return (
    <Tr>
      <Td>{empcashbal.id}</Td>
      <Td>{empcashbal.name}</Td>
      <Td>{empcashbal.date}</Td>
      <Td>{empcashbal.amount}</Td>
            <Td>{empcashbal.discription}</Td>
      <Td>
        <HStack>
          <Button
            colorScheme="linkedin"
            variant="outline"
            leftIcon={<FaEdit />}
            onClick={(event) => handleEditClick(event, empcashbal)}
          >
            Edit
          </Button>
          <Button
            colorScheme="twitter"
            leftIcon={<FaTrash />}
            onClick={() => handleDeleteClick(empcashbal.id)}
          >
            Delete
          </Button>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={(event) => handlePrintRow(event, empcashbal)}
          >
            Print
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default ReadOnlyRowEmployeeCB;
