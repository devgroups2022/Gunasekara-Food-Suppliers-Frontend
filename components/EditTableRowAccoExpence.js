import React from "react";
import { Tr, Td, Input, HStack, Button } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

function EditTableRowAccoExpence({
  editAccoFormData,
  handleAccoEditFormChange,
  handleAccoCancelClick,
  handleAccoEditFormSubmit,
}) {
  return (
    <Tr>
      <Td>
        <Input
          type="text"
          name="id"
          disabled
 
          value={editAccoFormData.id}
          onChange={handleAccoEditFormChange}
        />
      </Td>
      <Td>
        <Input
          type="date"
          required="required"
          name="date"
          value={editAccoFormData.date}
          onChange={handleAccoEditFormChange}
        ></Input>
      </Td>
      <Td>
        <Input
          type="text"
          name="amount"
          required="required"
          value={editAccoFormData.amount}
          onChange={handleAccoEditFormChange}
        ></Input>
      </Td>
      <Td>
        <Input
          type="text"
          name="discription"
        
          value={editAccoFormData.discription}
          onChange={handleAccoEditFormChange}
        ></Input>
      </Td>

      <Td>
        <HStack>
          <Button
            colorScheme="linkedin"
            variant="outline"
            leftIcon={<FaEdit />}
            onClick={handleAccoEditFormSubmit}
            type="submit"
          >
            Save
          </Button>
          <Button
            colorScheme="twitter"
            leftIcon={<FaTrash />}
            onClick={handleAccoCancelClick}
          >
            Cancel
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default EditTableRowAccoExpence;
