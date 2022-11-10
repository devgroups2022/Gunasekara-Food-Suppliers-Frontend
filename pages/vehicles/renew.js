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
import ReadOnlyRowRenew from "../../components/ReadOnlyRowRenew";
import Navbar from "../../components/Navbar";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Renew() {
  //print table
  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ html: "#renewTable" });
    doc.text("Renew History", 10, 10);
    doc.save("Renew-History.pdf");
  };

  //print row
  const handlePrintRow = (event, renews) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      margin: [20],
      head: [["NUMBER", "VALID FROM", "VALID TO"]],
      body: [[renews.number, renews.v_from, renews.v_to]],
    });
    doc.text("Details of a Renew ", 10, 10);
    doc.save("Renew.pdf");
  };

  const [renews, setRenews] = useState([]);

  useEffect(() => {
    Axios.get("https://gunasefood.herokuapp.com/renew")
      .then((renews) => {
        console.log("Getting from::::", renews.data);
        setServices(renews.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //
  const [addFormData, setAddFormData] = useState({
    number: "",
    v_from: "",
    v_to: "",
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

    const newRenew = {
      id: nanoid(),
      number: addFormData.number,
      v_from: addFormData.v_from,
      v_to: addFormData.v_to,
    };
    Axios.post("https://gunasefood.herokuapp.com/renew", newRenew)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log(newRenew);
          console.log("Posting data", res);
          swal({
            title: "Successfuly added a Renew!",
            icon: "success",
            dangerMode: true,
          });
          const newRenews = [...renews, newRenew];
          setRenews(newRenews);
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
    const newRenews = [...renews, newRenew];
    setRenews(newRenews);
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
                name="v_from"
                bgColor="blue.50"
                placeholder="valid from"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="date"
                name="v_to"
                bgColor="blue.50"
                placeholder="valid to"
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
          <Heading my={3}>Renew Table</Heading>
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
              <Table size="sm" id="renewTable">
                <Thead>
                  <Tr>
                    <Th>Number</Th>
                    <Th>Valid from</Th>
                    <Th>Valid to</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {renews.map((renew, index) => (
                    <Fragment key={index}>
                      <ReadOnlyRowRenew
                        renew={renew}
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
