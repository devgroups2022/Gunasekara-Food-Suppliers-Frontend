import React from 'react'
import { Tr, Td, Input, HStack, Button } from "@chakra-ui/react"
import { FaEdit, FaTrash } from "react-icons/fa";


function EditTableRow({ editFormData, handleEditFormChange, handleCancelClick }) {
    return (
        <Tr>
            <Td>
                <Input
                    type="text"
                    required="required"
                    placeholder="Enter a name.."
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}>
                </Input>
            </Td>
            <Td>
                <Input
                    type="text"
                    name="nic"
                    required="required"
                    placeholder="nic"
                    value={editFormData.nic}
                    onChange={handleEditFormChange}
                >
                </Input>
            </Td>
            <Td>
                <Input
                    type="Integer"
                    name="tp"
                    placeholder="TP-711436578"
                    maxLength="9"
                    value={editFormData.tp}
                    onChange={handleEditFormChange}
                >
                </Input>
            </Td>
            <Td>
                <Input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={editFormData.address}
                    onChange={handleEditFormChange}
                >
                </Input>
            </Td>
            <Td>
                <Input
                    type="text"
                    name="code"
                    placeholder="code"
                    maxLength="6"
                    value={editFormData.code}
                    onChange={handleEditFormChange}
                />
            </Td>
            <Td>
                <HStack>
                    <Button
                        colorScheme="linkedin"
                        variant="outline"
                        leftIcon={<FaEdit />}
                    >
                        Save
                    </Button>
                    <Button colorScheme="twitter" leftIcon={<FaTrash />} onClick={handleCancelClick} >
                        Cancel
                    </Button>
                </HStack>
            </Td>
        </Tr>
    )
}

export default EditTableRow