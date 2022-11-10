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
import ReadOnlyRowRepair from "../../components/ReadOnlyRowRepair";
import Navbar from "../../components/Navbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import swal from "sweetalert";

export default function Repair() {
  //print table
  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ html: "#repairTable" });
    doc.text("Repair History", 10, 10);
    doc.save("Repair-History.pdf");
  };

  //print row
  const handlePrintRow = (event, repairs) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      margin: [20],
      head: [["NUMBER", "DATE", "DESCRIPTION", "AMOUNT"]],
      body: [
        [repairs.number, repairs.date, repairs.description, repairs.amount],
      ],
    });
    doc.text("Details of a Repair ", 10, 10);
    doc.save("Repair.pdf");
  };

  const [repairs, setRepairs] = useState([]);

  useEffect(() => {
    Axios.get("https://gunasefood.herokuapp.com/repair")
      .then((repairs) => {
        console.log("Getting from::::", repairs.data);
        setRepairs(repairs.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //
  const [addFormData, setAddFormData] = useState({
    number: "",
    date: "",
    discription: "",
    amount: "",
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

    const newRepair = {
      number: addFormData.number,
      date: addFormData.date,
      discription: addFormData.discription,
      amount: addFormData.amount,
    };
    Axios.post("https://gunasefood.herokuapp.com/repair", newRepair)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log(newRepair);
          console.log("Posting data", res);
          swal({
            title: "Successfuly added a Repair!",
            icon: "success",
            dangerMode: true,
          });

          const newRepairs = [...repairs, newRepair];
          setRepairs(newRepairs);
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
          <HStack spacing={5}>
            <InputGroup>
              <Input
                type="integer"
                name="number"
                bgColor="blue.50"
                placeholder="number"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="date"
                name="date"
                bgColor="blue.50"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="text"
                name="discription"
                bgColor="blue.50"
                placeholder="discription"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="Integer"
                name="amount"
                bgColor="blue.50"
                placeholder="amount"
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
          </HStack>
        </Box>
        <Box p={10}>
          <Heading my={3}>Repair Table</Heading>
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
              <Table size="sm" id="repairTable">
                <Thead>
                  <Tr>
                    <Th>Number</Th>
                    <Th>Date</Th>
                    <Th>Description</Th>
                    <Th>Amount</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {repairs.map((repair, index) => (
                    <Fragment key={index}>
                      <ReadOnlyRowRepair
                        repair={repair}
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
