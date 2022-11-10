import React from "react";
import { Tr, Td, Input, HStack, Button } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

function EditTableRowExpence({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  handleEditFormSubmit,
}) {
  return (
    <Tr>
      <Td>
        <Input
          type="text"
          name="id"
          placeholder="id"
          disabled
          maxLength="6"
          value={editFormData.id}
          onChange={handleEditFormChange}
        />
      </Td>
      <Td>
        <Input
           type="date"
          required="required"
          name="date"
          value={editFormData.date}
          onChange={handleEditFormChange}
        ></Input>
      </Td>
      <Td>
        <Input
          type="text"
          name="amount"
          required="required"
          value={editFormData.amount}
          onChange={handleEditFormChange}
        ></Input>
      </Td>
      <Td>
        <Input
          type="text"
          name="discription"
          value={editFormData.discription}
          onChange={handleEditFormChange}
        ></Input>
      </Td>

      <Td>
        <HStack>
          <Button
            colorScheme="linkedin"
            variant="outline"
            leftIcon={<FaEdit />}
            onClick={handleEditFormSubmit}
            type="submit"
          >
            Save
          </Button>
          <Button
            colorScheme="twitter"
            leftIcon={<FaTrash />}
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default EditTableRowExpence;
