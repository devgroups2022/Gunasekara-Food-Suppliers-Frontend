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
import ReadOnlyRowFuel from "../../components/ReadOnlyRowFuel";
import Navbar from "../../components/Navbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import swal from "sweetalert";

export default function Fuel() {
  //print table
  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ html: "#fuelTable" });
    doc.text("Fuel History", 10, 10);
    doc.save("Fuel-History.pdf");
  };

  //print row
  const handlePrintRow = (event, fuels) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      margin: [20],
      head: [["VEHICLE NO", "DATE", "LITERS"]],
      body: [[fuels.number, fuels.date, fuels.liters]],
    });
    doc.text("Details of a Fuelling ", 10, 10);
    doc.save("Fuel.pdf");
  };

  const [fuels, setFuels] = useState([]);

  useEffect(() => {
    Axios.get("https://gunasefood.herokuapp.com/fuel")
      .then((fuels) => {
        console.log("Getting from::::", fuels.data);
        setFuels(fuels.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //
  const [addFormData, setAddFormData] = useState({
    number: "",
    date: "",
    liters: "",
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

    const newFuel = {
      number: addFormData.number,
      date: addFormData.date,
      liters: addFormData.liters,
    };

    Axios.post("https://gunasefood.herokuapp.com/fuel", newFuel)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log(newFuel);
          console.log("Posting data", res);
          swal({
            title: "Successfuly added a Fuel!",
            icon: "success",
            dangerMode: true,
          });

          const newFuels = [...fuels, newFuel];
          setFuels(newFuels);
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
                placeholder="date"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="integer"
                name="liters"
                bgColor="blue.50"
                placeholder="liters"
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
          <Heading my={3}>Fuel Table</Heading>
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
              <Table size="sm" id="fuelTable">
                <Thead>
                  <Tr>
                    <Th>Number</Th>
                    <Th>Date</Th>
                    <Th>Liters</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {fuels.map((fuel, index) => (
                    <Fragment key={index}>
                      <ReadOnlyRowFuel
                        fuel={fuel}
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
