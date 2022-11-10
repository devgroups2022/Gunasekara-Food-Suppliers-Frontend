import { ChakraProvider, theme } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import {
  Table,
  Heading,
  Stack,
  Thead,
  HStack,
  Tbody,
  Button,
  Tr,
  Th,
  Box,
  VStack,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { FaPrint } from "react-icons/fa";

import Axios from "axios";
import { Fragment, useState, useEffect } from "react";
import ReadOnlyRowAttendence from "../components/ReadOnlyRowAttendence";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import swal from "sweetalert";

export default function Attendence() {
  //print table
  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ html: "#attendenceTable" });
    doc.text("Attendence History", 10, 10);
    doc.save("Attendence-History.pdf");
  };

  //print row
  const handlePrintRow = (event, attendences) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      margin: [20],
      head: [["INDEX", "DATE", "TIME"]],
      body: [[attendences.id, attendences.date, attendences.time]],
    });
    doc.text("Details of a Attendenceling ", 10, 10);
    doc.save("Attendence.pdf");
  };

  const [attendences, setAttendences] = useState([]);

  useEffect(() => {
    Axios.get("https://gunasefood.herokuapp.com/attendence")
      .then((attendences) => {
        console.log("Getting from::::", attendences.data);
        setAttendences(attendences.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //
  const [addFormData, setAddFormData] = useState({
    id: "",
    date: "",
    time: "",
  });

  const handleAddFormChange = (event) => {
    event.preventDefault();
    //get  name of attribute to the field name variiable
    const fieldName = event.target.getAttribute("name");
    //get value of the name that the user enter  to the field name variiable
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newAttendence = {
      id: addFormData.id,
      date: addFormData.date,
      time: addFormData.time,
    };

    Axios.post("https://gunasefood.herokuapp.com/attendence", newAttendence)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log(newAttendence);
          console.log("Posting data", res);
          swal({
            title: "Successfuly added a Attendence!",
            icon: "success",
            dangerMode: true,
          });

          const newAttendences = [...attendences, newAttendence];
          setAttendences(newAttendences);
        } else {
          //fail
          swal({
            title: "Something went wrong!",
            icon: "Warning",
            dangerMode: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Navbar />
        <Box p={10}>
         
          <VStack spacing={5}>
            <InputGroup>
              <Input
                type="integer"
                name="id"
                bgColor="blue.50"
                placeholder="id"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="date"
                name="date"
                bgColor="blue.50"
                placeholder="date"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="integer"
                name="time"
                bgColor="blue.50"
                placeholder="time"
                onChange={handleAddFormChange}
              />
            </InputGroup>

            <Button
              size="md"
              height="48px"
              width="200px"
              alignSelf="flex-end"
              colorScheme="telegram"
              onClick={handleAddFormSubmit}
            >
              Add
            </Button>
          </VStack>
      
     
        </Box>
        <Box p={10}>
          <Heading my={3}>Attendence Table</Heading>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={handlePrint}
          >
            Print
          </Button>
          <VStack>
            <Stack direction="row" alignSelf="flex-end" spacing={4}></Stack>
            <form>
              <Table size="sm" id="attendenceTable">
                <Thead>
                  <Tr>
                    <Th>Number</Th>
                    <Th>Date</Th>
                    <Th>Liters</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {attendences.map((attendence, index) => (
                    <Fragment key={index}>
                      <ReadOnlyRowAttendence
                        attendence={attendence}
                        handlePrintRow={handlePrintRow}
                      />
                    </Fragment>
                  ))}
                </Tbody>
              </Table>
            </form>
          </VStack>
        </Box>
      </div>
    </ChakraProvider>
  );
}
