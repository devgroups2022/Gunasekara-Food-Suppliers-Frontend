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
import ReadOnlyRowEmployeeCB from "../../components/ReadOnlyRowEmployeeCB";
import EditTableRowEmployeeCB from "../../components/EditTableRowEmployeeCB";
import Navbar from "../../components/Navbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import swal from "sweetalert";

export default function Employeebalence() {
  //print table
  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ html: "#empcashbalTable" });
    doc.text("Employeebalence History", 10, 10);
    doc.save("Employeebalence-History.pdf");
  };

  //print row
  const handlePrintRow = (event, empcashbals) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      margin: [20],
      head: [["ID", "NAME", "DATE", "AMOUNT","DISCRIPTION"]],
      body: [
        [
          empcashbals.id,
          empcashbals.name,
          empcashbals.date,
          empcashbals.amount,
          empcashbals.discription,
        ],
      ],    });
    doc.text("Details of a Employeebalence ", 10, 10);
    doc.save("Employeebalence.pdf");
  };

  //GET- data
  //initialize empcashbals array from getting data from useEffect hook
  const [empcashbals, setEmployeebalences] = useState([]);

  useEffect(() => {
    Axios.get("https://gunasefood.herokuapp.com/empcashbal")
      .then((empcashbals) => {
        console.log("Getting from::::", empcashbals.data);
        setEmployeebalences(empcashbals.data);
      })
      .catch((err) => console.log(err));
  }, []);
  //
  //data for add empcashbal form
  const [addFormData, setAddFormData] = useState({
    id: "",
    name: "",
    date: "",
    amount: "",
    discription: "",
  });
  //POST-data
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    //take the data that the user enter to the form
    const newEmployeebalence = {
      //id-to identify which Employee added

      id: addFormData.id,
       name:addFormData.name,
    date:addFormData.date,
    amount:addFormData.amount,
       discription:addFormData.discription,
    };

    Axios.post("https://gunasefood.herokuapp.com/empcashbal", newEmployeebalence)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log(newEmployeebalence);
          console.log("Posting data", res);
          swal({
            title: "Successfuly added a empcashbal!",

            icon: "success",
            dangerMode: true,
          });

          //assign new employee to the end of exsisting empcashbals array
          const newEmployeebalences = [...empcashbals, newEmployeebalence];
          //pass New empcashbals array to Employees array
          setEmployeebalences(newEmployeebalences);
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
    date: "",
    amount: "",
       discription: "",
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

  const [editEmployeebalenceId, setEditEmployeebalenceId] = useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditClick = (event, empcashbal) => {
    event.preventDefault();
    setEditEmployeebalenceId(empcashbal.id);

    const formValues = {
      id: empcashbal.id,
      name:empcashbal.name,
      date: empcashbal.date,
      amount:empcashbal.amount,
      discription:empcashbal.discription,
    };

    setEditFormData(formValues);
  };

  //PUT
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedEmployeebalence = {
      id: editEmployeebalenceId,
      name: editFormData.name,
        date:editFormData.date,
    amount:editFormData.amount,
        discription:editFormData.discription,
    };
    Axios.put("https://gunasefood.herokuapp.com/empcashbal/id", editedEmployeebalence)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Puting data", res);
          swal({
            title: "Successfuly Updated a empcashbal!",

            icon: "success",
            dangerMode: true,
          });

          const newEmployeebalences = [...empcashbals];

          const index = empcashbals.findIndex(
            (empcashbal) => empcashbal.id === editEmployeebalenceId
          );

          newEmployeebalences[index] = editedEmployeebalence;

          setEmployeebalences(newEmployeebalences);
          setEditEmployeebalenceId(null);
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
    setEditEmployeebalenceId(null);
  };

  const handleDeleteClick = (empcashbalId) => {
    Axios.delete(`https://gunasefood.herokuapp.com/empcashbal/${empcashbalId}`)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Puting data", res);
          swal({
            title: "Successfuly deleted a empcashbal!",

            icon: "success",
            dangerMode: true,
          });
          const newEmployeebalences = [...empcashbals];

          const index = empcashbals.findIndex(
            (empcashbal) => empcashbal.id === empcashbalId
          );

          newEmployeebalences.splice(index, 1);

          setEmployeebalences(newEmployeebalences);
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
                type="date"
                name="date"
                bgColor="blue.50"
                              onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="Integer"
                name="amount"
                placeholder="Amount"
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
          <Heading my={3}>Employee balence Table</Heading>
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
              <Table size="sm" id="empcashbalTable">
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>NAME</Th>
                    <Th>DATE</Th>
                    <Th>AMOUNT</Th>
                    <Th>DISCRIPTION</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {empcashbals.map((empcashbal, index) => (
                    <Fragment key={index}>
                      {editEmployeebalenceId === empcashbal.id ? (
                        <EditTableRowEmployeeCB
                          editFormData={editFormData}
                          handleEditFormSubmit={handleEditFormSubmit}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRowEmployeeCB
                          empcashbal={empcashbal}
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
