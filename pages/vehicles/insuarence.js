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
import ReadOnlyRowInsuarence from "../../components/ReadOnlyRowInsuarence";
import Navbar from "../../components/Navbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import swal from "sweetalert";

export default function Insuarence() {
  //print table
  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ html: "#insuarenceTable" });
    doc.text("Insuarences History", 10, 10);
    doc.save("Insuarences-History.pdf");
  };

  //print row
  const handlePrintRow = (event, insuarences) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      margin: [20],
      head: [["NUMBER", "VALID FROM", "VALID TO"]],
      body: [[insuarences.number, insuarences.v_from, insuarences.v_to]],
    });
    doc.text("Details of a Insuarence ", 10, 10);
    doc.save("Insuarence.pdf");
  };

  const [insuarences, setInsuarences] = useState([]);

  useEffect(() => {
    Axios.get("https://gunasefood.herokuapp.com/insuarance")
      .then((insuarances) => {
        console.log("Getting from::::", insuarances.data);
        setServices(insuarances.data);
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

    const newInsuarence = {
      number: addFormData.number,
      v_from: addFormData.v_from,
      v_to: addFormData.v_to,
    };
    Axios.post("https://gunasefood.herokuapp.com/insuarence", newInsuarence)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log(newInsuarence);
          console.log("Posting data", res);
          swal({
            title: "Successfuly added a Insuarence!",
            icon: "success",
            dangerMode: true,
          });

          const newInsuarences = [...insuarences, newInsuarence];
          setInsuarences(newInsuarences);
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
                placeholder="valid to"
                bgColor="blue.50"
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
          <Heading my={3}>Insuarence Table</Heading>
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
              <Table size="sm" id="insuarenceTable">
                <Thead>
                  <Tr>
                    <Th>Number</Th>
                    <Th>Valid from</Th>
                    <Th>Valid to</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {insuarences.map((insuarence, index) => (
                    <Fragment key={index}>
                      <ReadOnlyRowInsuarence
                        insuarence={insuarence}
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
