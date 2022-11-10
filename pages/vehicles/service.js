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
import swal from "sweetalert";
import { FaPrint } from "react-icons/fa";
import Axios from "axios";
import { Fragment, useState, useEffect } from "react";
import ReadOnlyRowService from "../../components/ReadOnlyRowService";
import Navbar from "../../components/Navbar";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Service() {
  //print

  //print table
  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ html: "#serviceTable" });
    doc.text("Service History", 10, 10);
    doc.save("Service-History.pdf");
  };

  //print row
  const handlePrintRow = (event, services) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      margin: [20],
      head: [["NUMBER", "DATE", "PRESENT", "NEXT"]],
      body: [[services.number, services.date, services.present, services.next]],
    });
    doc.text("Details of a Service ", 10, 10);
    doc.save("Service.pdf");
  };

  const [services, setServices] = useState([]);

  useEffect(() => {
    Axios.get("https://gunasefood.herokuapp.com/service")
      .then((services) => {
        console.log("Getting from::::", services.data);
        setServices(services.data);
      })
      .catch((err) => console.log(err));
  }, []);
  //
  const [addFormData, setAddFormData] = useState({
    number: "",
    date: "",
    present: "",
    next: "",
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

    const newService = {
      number: addFormData.number,
      date: addFormData.date,
      present: addFormData.present,
      next: addFormData.next,
    };
    Axios.post("https://gunasefood.herokuapp.com/service", newService)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log(newService);
          console.log("Posting data", res);
          swal({
            title: "Successfuly added a Service!",
            icon: "success",
            dangerMode: true,
          });

          const newServices = [...services, newService];
          setServices(newServices);
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
                type="Integer"
                name="present"
                bgColor="blue.50"
                placeholder="present"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="Integer"
                name="next"
                bgColor="blue.50"
                placeholder="next"
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
          <Heading my={3}>Service Table</Heading>
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
              <Table size="sm" id="serviceTable">
                <Thead>
                  <Tr>
                    <Th>Number</Th>
                    <Th>Date</Th>
                    <Th>Present</Th>
                    <Th>Next</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {services.map((service, index) => (
                    <Fragment key={index}>
                      <ReadOnlyRowService
                        service={service}
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
