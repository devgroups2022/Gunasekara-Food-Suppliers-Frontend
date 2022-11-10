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
import Navbar from "../components/Navbar";
import { FaPrint } from "react-icons/fa";
import Axios from "axios";
import { Fragment, useState, useEffect } from "react";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditTableRow from "../components/EditTableRow";
import swal from "sweetalert";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Employee() {
  //print table
  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ html: "#empTable" });
    doc.text("Employee History", 10, 10);
    doc.save("Employee-History.pdf");
  };

  //print row
  const handlePrintRow = (event, employees) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      margin: [20],
      head: [["Name", "NIC", "MOBILE NO", "ADDRESS", "CODE"]],
      body: [
        [
          employees.code,
          employees.name,
          employees.nic,
          employees.tp,
          employees.address,
          employees.date,
        ],
      ],
    });
    doc.text("Details of a Employee ", 10, 10);
    doc.save("Employee.pdf");
  };

  //GET- data
  //initialize employees array from getting data from useEffect hook
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    Axios.get("https://gunasefood.herokuapp.com/")
      .then((employees) => {
        console.log("Getting from::::", employees.data);
        setEmployees(employees.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //data for add employee form
  const [addFormData, setAddFormData] = useState({
    //initializing this to be an object
    code: "",
    name: "",
    nic: "",
    address: "",
    tp: "",
    date: "",
  });

  //get the value that enter to the text field
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
    const newEmployee = {
      //id-to identify which Employee added
      code: addFormData.code,
      name: addFormData.name,
      nic: addFormData.nic,
      tp: addFormData.tp,
      address: addFormData.address,
      date: addFormData.date,
    };

    Axios.post("https://gunasefood.herokuapp.com/employee", newEmployee)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Posting data", res);
          swal({
            title: "Successfuly added a employee!",

            icon: "success",
            dangerMode: true,
          });

          //assign new employee to the end of exsisting employees array
          const newEmployees = [...employees, newEmployee];
          //pass New emplooyes array to Employees array
          setEmployees(newEmployees);
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
    code: "",
    name: "",
    nic: "",
    tp: "",
    address: "",
    date: "",
  });
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditClick = (event, employee) => {
    event.preventDefault();

    setEditEmployeeId(employee.code);

    const formValues = {
      code: employee.code,
      name: employee.name,
      nic: employee.nic,
      tp: employee.tp,
      address: employee.address,
      date: employee.date,
    };

    setEditFormData(formValues);
  };

  //PUT
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedEmployee = {
      code: editFormData.code,
      name: editFormData.name,
      nic: editFormData.nic,
      tp: editFormData.tp,
      address: editFormData.address,
      date: editFormData.date,
    };

    Axios.put("https://gunasefood.herokuapp.com/employee", editedEmployee)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Puting data", res);
          swal({
            title: "Successfuly Updated a employee!",

            icon: "success",
            dangerMode: true,
          });
          const newEmployees = [...employees];

          const index = employees.findIndex(
            (employee) => employee.code === editEmployeeId
          );

          newEmployees[index] = editedEmployee;
          setEmployees(newEmployees);
          setEditEmployeeId(null);
          console.log(editedEmployee);
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
    setEditEmployeeId(null);
  };

  const handleDeleteClick = (code, employee) => {
    Axios.delete(`https://gunasefood.herokuapp.com/employee/${code}`)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Puting data", res);
          swal({
            title: "Successfuly deleted a employee !",

            icon: "success",
            dangerMode: true,
          });
          const newEmployees = [...employees];

          const index = employees.findIndex(
            (employee) => employee.code === code
          );

          newEmployees.splice(index, 1);

          setEmployees(newEmployees);
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
          <form onSubmit={handleEditFormSubmit}>
            <HStack spacing={5}>
              <InputGroup>
                <Input
                  type="text"
                  name="code"
                  bgColor="blue.50"
                  placeholder="Code"
                  maxLength="6"
                  onChange={handleAddFormChange}
                />
              </InputGroup>
              <InputGroup>
                <Input
                  type="text"
                  name="name"
                  bgColor="blue.50"
                  placeholder="Name"
                  onChange={handleAddFormChange}
                />
              </InputGroup>
              <InputGroup>
                <Input
                  type="text"
                  name="nic"
                  bgColor="blue.50"
                  placeholder="NIC"
                  onChange={handleAddFormChange}
                />
              </InputGroup>
              <InputGroup>
                <Input
                  type="Integer"
                  name="tp"
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
                  type="date"
                  name="date"
                  bgColor="blue.50"
                  placeholder="Date"
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
          </form>
        </Box>
        <Box p={10}>
          <Heading my={3}>Employee Table</Heading>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={handlePrint}
          >
            Print
          </Button>
          <VStack padding={5}>
            <Stack direction="row" alignSelf="flex-end" spacing={4}></Stack>
            <form onSubmit={handleAddFormSubmit}>
              <Table size="sm" id="empTable">
                <Thead>
                  <Tr>
                    <Th>code</Th>
                    <Th>Name</Th>
                    <Th>NIC</Th>
                    <Th>Mobile No</Th>
                    <Th>Address</Th>
                    <Th>Date</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {/**map each employee in a employees array */}
                  {employees.map((employee, index) => (
                    <Fragment key={index}>
                      {editEmployeeId === employee.code ? (
                        <EditTableRow
                          handleEditFormSubmit={handleEditFormSubmit}
                          editFormData={editFormData}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRow
                          employee={employee}
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
