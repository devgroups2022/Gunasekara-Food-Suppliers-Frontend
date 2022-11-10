import React from "react";
import { Tr, Td, Input, HStack, Button } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

function EditTableRowEmployeeCB({
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
          placeholder="code"
          disabled
          maxLength="6"
          value={editFormData.id}
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
          name="nic"
          required="required"
          placeholder="nic"
          value={editFormData.date}
          onChange={handleEditFormChange}
        ></Input>
      </Td>
      <Td>
        <Input
          type="Integer"
          name="tp"
          placeholder="TP-711436578"
          maxLength="9"
          value={editFormData.amount}
          onChange={handleEditFormChange}
        ></Input>
      </Td>
      
      <Td>
        <Input
          type="text"
          name="date"
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

export default EditTableRowEmployeeCB;
