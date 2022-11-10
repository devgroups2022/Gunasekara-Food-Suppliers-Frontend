import React from "react";
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";
import { Table, Tr, Td, HStack, Button } from "@chakra-ui/react";

function ReadOnlyRowSellerCB({
  sellerbalence,
  handleEditClick,
  handlePrintRow,
  handleDeleteClick,
}) {
  return (
    <Tr>
      <Td>{sellerbalence.id}</Td>
      <Td>{sellerbalence.name}</Td>
      <Td>{sellerbalence.date}</Td>
      <Td>{sellerbalence.total}</Td>
      <Td>{sellerbalence.balence}</Td>
      <Td>{sellerbalence.arrears}</Td>

      <Td>{sellerbalence.discription}</Td>
      <Td>
        <HStack>
          <Button
            colorScheme="linkedin"
            variant="outline"
            leftIcon={<FaEdit />}
            onClick={(event) => handleEditClick(event, sellerbalence)}
          >
            Edit
          </Button>
          <Button
            colorScheme="twitter"
            leftIcon={<FaTrash />}
            onClick={() => handleDeleteClick(sellerbalence.id)}
          >
            Delete
          </Button>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={(event) => handlePrintRow(event, sellerbalence)}
          >
            Print
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default ReadOnlyRowSellerCB;
