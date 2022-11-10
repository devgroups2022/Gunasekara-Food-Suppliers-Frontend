import React from "react";
import { FaTrash, FaPrint } from "react-icons/fa";
import { Tr, Td, HStack, Button } from "@chakra-ui/react";

function ReadOnlyRowAttendence({ attendence, handlePrintRow }) {
  return (
    <Tr>
      <Td>{attendence.id}</Td>
      <Td>{attendence.date}</Td>
      <Td>{attendence.time}</Td>

      <Td>
        <HStack>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={(event) => handlePrintRow(event, attendence)}
          >
            Print
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default ReadOnlyRowAttendence;
