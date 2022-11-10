import React from "react";
import { Tr, Td, Input, HStack, Button } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

function EditTableRow({
  editFormData,
  handleEditFormChange,
  handleEditFormSubmit,
  handleCancelClick,
}) {
  return (
    <Tr>
      <Td>
        <Input
          type="text"
          required="required"
          disabled
          name="id"
          value={editFormData.id}
          onChange={handleEditFormChange}
        ></Input>
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
          type="Integer"
          name="tp"
          maxLength="9"
          value={editFormData.tp}
          onChange={handleEditFormChange}
        ></Input>
      </Td>
      <Td>
        <Input
          type="Integer"
          name="whatsapp"
          maxLength="9"
          value={editFormData.whatsapp}
          onChange={handleEditFormChange}
        ></Input>
      </Td>
      <Td>
        <Input
          type="text"
          name="address"
          placeholder="Address"
          value={editFormData.address}
          onChange={handleEditFormChange}
        ></Input>
      </Td>
      <Td>
        <Input
          type="text"
          name="email"
          placeholder="email"
          value={editFormData.email}
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

export default EditTableRow;
