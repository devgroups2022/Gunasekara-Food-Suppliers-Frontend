import React from 'react'
import {FaEdit, FaTrash, FaPrint } from "react-icons/fa";
import {Tr,Td,HStack,Button} from "@chakra-ui/react"

function ReadOnlyRow({employee,handleEditClick,handleDeleteClick}) {
  return (
    <Tr >
    <Td>{employee.name}</Td>
    <Td>{employee.nic}</Td>
    <Td>{employee.tp}</Td>
    <Td>{employee.address}</Td>
    <Td>{employee.code}</Td>
    <Td>
        <HStack>
            <Button
                colorScheme="linkedin"
                variant="outline"
                leftIcon={<FaEdit />}
                onClick={(event) => handleEditClick(event,employee)}
            >
                Edit
            </Button>
            <Button colorScheme="twitter" leftIcon={<FaTrash />} onClick={()=>handleDeleteClick(vehicle.id)}>
                Delete
            </Button>
            <Button colorScheme="telegram" leftIcon={<FaPrint />}>
                Print
            </Button>
        </HStack>
    </Td>
</Tr>
  )
}

export default ReadOnlyRow
