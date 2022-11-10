import React from "react";
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";
import { Table, Tr, Td, HStack, Button } from "@chakra-ui/react";

function ReadOnlyRowAccoExpence({
  accoexpence,
  handleAccoEditClick,
  handleAccExpencePrintRow,
  handleAccoDeleteClick,
}) {
  return (
    <Tr>
    <Td>{accoexpence.id}</Td>
      <Td>{accoexpence.date}</Td>
      <Td>{accoexpence.amount}</Td>
      <Td>{accoexpence.discription}</Td>
      
      <Td>
        <HStack>
          <Button
            colorScheme="linkedin"
            variant="outline"
            size='sm'
            leftIcon={<FaEdit />}
            onClick={(event) => handleAccoEditClick(event, accoexpence)}
          >
            Edit
          </Button>
          <Button
            colorScheme="twitter"
            leftIcon={<FaTrash />}
            size='sm'
            onClick={() => handleAccoDeleteClick(accoexpence.id)}
          >
            Delete
          </Button>
          <Button
            colorScheme="telegram"
            size='sm'
            leftIcon={<FaPrint />}
            onClick={(event) => handleAccExpencePrintRow(event, accoexpence)}
          >
            Print
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default ReadOnlyRowAccoExpence;
