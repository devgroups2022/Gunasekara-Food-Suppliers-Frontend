import { ChakraProvider, theme } from "@chakra-ui/react";

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
import ReadOnlyRowCustomer from "../components/ReadOnlyRowCustomer";
import EditTableRowCustomer from "../components/EditTableRowCustomer";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import swal from "sweetalert";

export default function Customer() {
  //print table
  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ html: "#customerTable" });
    doc.text("Customer History", 10, 10);
    doc.save("Customer-History.pdf");
  };

  //print row
  const handlePrintRow = (event, customers) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      margin: [20],
      head: [["Name", "MOBILE NO", "WHATSAPP NO", "ADDRESS", "EMAIL"]],
      body: [
        [
          customers.name,
          customers.tp,
          customers.whatsapp,
          customers.address,
          customers.email,
        ],
      ],
    });
    doc.text("Details of a Customer ", 10, 10);
    doc.save("Customer.pdf");
  };

  //GET- data
  //initialize customers array from getting data from useEffect hook
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    Axios.get("https://gunasefood.herokuapp.com/customer")
      .then((customers) => {
        console.log("Getting from::::", customers.data);
        setCustomers(customers.data);
      })
      .catch((err) => console.log(err));
  }, []);
  //
  //data for add customer form
  const [addFormData, setAddFormData] = useState({
    id: "",
    name: "",
    tp: "",
    whatsapp: "",
    address: "",
    email: "",
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


  //POST-data
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    //take the data that the user enter to the form
    const newCustomer = {
      //id-to identify which Employee added

      id: addFormData.id,
      name: addFormData.name,
      tp: addFormData.tp,
      whatsapp: addFormData.whatsapp,
      address: addFormData.address,
      email: addFormData.email,
    };

    Axios.post("https://gunasefood.herokuapp.com/customer", newCustomer)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log(newCustomer);
          console.log("Posting data", res);
          swal({
            title: "Successfuly added a customer!",

            icon: "success",
            dangerMode: true,
          });

          //assign new employee to the end of exsisting customers array
          const newCustomers = [...customers, newCustomer];
          //pass New customers array to Employees array
          setCustomers(newCustomers);
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

  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    tp: "",
    whatsapp: "",
    address: "",
    email: "",
  });


  const [editCustomerId, setEditCustomerId] = useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditClick = (event, customer) => {
    event.preventDefault();
    setEditCustomerId(customer.id);

    const formValues = {
      id: customer.id,
      name: customer.name,
      tp: customer.tp,
      whatsapp: customer.whatsapp,
      address: customer.address,
      email: customer.email,
    };

    setEditFormData(formValues);
  };

  //PUT
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedCustomer = {
      id: editCustomerId,
      name: editFormData.name,
      tp: editFormData.tp,
      whatsapp: editFormData.whatsapp,
      address: editFormData.address,
      email: editFormData.email,
    };
    Axios.put("https://gunasefood.herokuapp.com/customer/id", editedCustomer)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Puting data", res);
          swal({
            title: "Successfuly Updated a customer!",

            icon: "success",
            dangerMode: true,
          });

          const newCustomers = [...customers];

          const index = customers.findIndex(
            (customer) => customer.id === editCustomerId
          );

          newCustomers[index] = editedCustomer;

          setCustomers(newCustomers);
          setEditCustomerId(null);
        
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

  const handleCancelClick = () => {
    setEditCustomerId(null);
  };

  const handleDeleteClick = (customerId) => {
    Axios.delete(`https://gunasefood.herokuapp.com/customer/${customerId}`)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Puting data", res);
          swal({
            title: "Successfuly deleted a customer!",

            icon: "success",
            dangerMode: true,
          });
          const newCustomers = [...customers];

          const index = customers.findIndex(
            (customer) => customer.id === customerId
          );

          newCustomers.splice(index, 1);

          setCustomers(newCustomers);
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
                type="text"
                name="id"
                bgColor="blue.50"
                placeholder="id"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="text"
                name="name"
                bgColor="blue.50"
                placeholder="name"
                onChange={handleAddFormChange}
              />
            </InputGroup>

            <InputGroup>
              <Input
                type="Integer"
                name="tp"
                bgColor="blue.50"
                placeholder="TP-711436578"
                maxLength="9"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="Integer"
                name="whatsapp"
                placeholder="TP-711436578"
                bgColor="blue.50"
                maxLength="9"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="text"
                name="address"
                bgColor="blue.50"
                placeholder="Address"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="text"
                name="email"
                bgColor="blue.50"
                placeholder="email"
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
          <Heading my={3}>Customer Table</Heading>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={handlePrint}
          >
            Print
          </Button>
          <VStack>
            <Stack direction="row" alignSelf="flex-end" spacing={4}></Stack>

            <form onSubmit={handleEditFormSubmit}>
              <Table size="sm" id="customerTable">
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Name</Th>
                    <Th>Telephone No</Th>
                    <Th>whatsapp No</Th>
                    <Th>Address</Th>
                    <Th>Email</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {customers.map((customer, index) => (
                    <Fragment key={index}>
                      {editCustomerId === customer.id ? (
                        <EditTableRowCustomer
                          editFormData={editFormData}
                          handleEditFormSubmit={handleEditFormSubmit}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRowCustomer
                          customer={customer}
                          handleEditClick={handleEditClick}
                          handleDeleteClick={handleDeleteClick}
                          handlePrintRow={handlePrintRow}
                        />
                      )}
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
