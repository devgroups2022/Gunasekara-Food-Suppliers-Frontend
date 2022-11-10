import React from "react";
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";
import { Table, Tr, Td, HStack, Button } from "@chakra-ui/react";

function ReadOnlyRowBuyerCB({
  balence,
  handleEditClick,
  handlePrintRow,
  handleDeleteClick,
}) {
  return (
    <Tr>
      <Td>{balence.id}</Td>
      <Td>{balence.name}</Td>
      <Td>{balence.date}</Td>
      <Td>{balence.total}</Td>
      <Td>{balence.arrears}</Td>

      <Td>{balence.discription}</Td>
      <Td>
        <HStack>
          <Button
            colorScheme="linkedin"
            variant="outline"
            leftIcon={<FaEdit />}
            onClick={(event) => handleEditClick(event, balence)}
          >
            Edit
          </Button>
          <Button
            colorScheme="twitter"
            leftIcon={<FaTrash />}
            onClick={() => handleDeleteClick(balence.code)}
          >
            Delete
          </Button>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={(event) => handlePrintRow(event, balence)}
          >
            Print
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default ReadOnlyRowBuyerCB;
