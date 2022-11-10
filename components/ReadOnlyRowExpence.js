import React from "react";
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";
import { Table, Tr, Td, HStack, Button } from "@chakra-ui/react";

function ReadOnlyRowExpence({
  expence,
  handleEditClick,
  handlePrintRow,
  handleDeleteClick,
}) {
  return (
    <Tr>
      <Td>{expence.id}</Td>
      <Td>{expence.date}</Td>
      <Td>{expence.amount}</Td>
      <Td>{expence.discription}</Td>
      
      <Td>
        <HStack>
          <Button
            colorScheme="linkedin"
            variant="outline"
            size='sm'
            leftIcon={<FaEdit />}
            onClick={(event) => handleEditClick(event, expence)}
          >
            Edit
          </Button>
          <Button
            colorScheme="twitter"
            size='sm'
            leftIcon={<FaTrash />}
            onClick={() => handleDeleteClick(expence.id)}
          >
            Delete
          </Button>
          <Button
            colorScheme="telegram"
            size='sm'
            leftIcon={<FaPrint />}
            onClick={(event) => handlePrintRow(event, expence)}
          >
            Print
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default ReadOnlyRowExpence;
