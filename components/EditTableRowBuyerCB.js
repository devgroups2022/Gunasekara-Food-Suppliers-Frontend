import React from "react";
import { Tr, Td, Input, HStack, Button } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

function EditTableRowBuyerCB({
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
          name="code"
          placeholder="id"
          disabled="true"
          maxLength="6"
          value={editFormData.code}
          onChange={handleEditFormChange}
        />
      </Td>
      <Td>
        <Input
          type="text"
          required="required"
          placeholder="Enter a name.."
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></Input>
      </Td>
      <Td>
        <Input
          type="text"
          name="date"
          required="required"
         
          value={editFormData.date}
          onChange={handleEditFormChange}
        ></Input>
      </Td>
      <Td>
        <Input
          type="Integer"
          name="total"
         
          value={editFormData.total}
          onChange={handleEditFormChange}
        ></Input>
      </Td>
      <Td>
        <Input
          type="text"
          name="arrears"
          
          value={editFormData.arrears}
          onChange={handleEditFormChange}
        ></Input>
      </Td>
      <Td>
        <Input
          type="text"
          name="discription"
          value={editFormData.discription}
          onChange={handleEditFormChange}
        />
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

export default EditTableRowBuyerCB;
