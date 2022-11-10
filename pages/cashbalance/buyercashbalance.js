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
import ReadOnlyRowBuyerCB from "../../components/ReadOnlyRowBuyerCB";
import EditTableRowBuyerCB from "../../components/EditTableRowBuyerCB";
import Navbar from "../../components/Navbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import swal from "sweetalert";

export default function BuyerCashBalence() {
  //print table
  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ html: "#balenceTable" });
    doc.text("Balence History", 10, 10);
    doc.save("Balence-History.pdf");
  };

  //print row
  const handlePrintRow = (event, balences) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      margin: [20],
      head: [["ID", "NAME", "DATE", "TOTAL", "BALANCE","ARREARS","DISCRIPTION"]],
      body: [
        [
          balences.id,
          balences.name,
          balences.date,
          balences.total,
          balences.balence,
          balences.arrears,
          balences.discription,
        ],
      ],
    });
    doc.text("Details of a Balence ", 10, 10);
    doc.save("Balence.pdf");
  };

  //GET- data
  //initialize balences array from getting data from useEffect hook
  const [balences, setBalences] = useState([]);

  useEffect(() => {
    Axios.get("https://gunasefood.herokuapp.com/balence")
      .then((balences) => {
        console.log("Getting from::::", balences.data);
        setBalences(balences.data);
      })
      .catch((err) => console.log(err));
  }, []);
  //
  //data for add balence form
  const [addFormData, setAddFormData] = useState({
    id: "",
    name: "",
    date: "",
    total: "",
    balence: "",
    arrears: "",
    discription: "",
  });
  //POST-data
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    //take the data that the user enter to the form
    const newBalence = {
      //id-to identify which Employee added

      id: addFormData.id,
      
    name:addFormData.id,
    date:addFormData.date,
    total:addFormData.total,
    balence:addFormData.balence,
    arrears:addFormData.arrears,
    discription:addFormData.discription,
    };

    Axios.post("https://gunasefood.herokuapp.com/balence", newBalence)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log(newBalence);
          console.log("Posting data", res);
          swal({
            title: "Successfuly added a balence!",

            icon: "success",
            dangerMode: true,
          });

          //assign new employee to the end of exsisting balences array
          const newBalences = [...balences, newBalence];
          //pass New balences array to Employees array
          setBalences(newBalences);
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
    total: "",
    balence: "",
    arrears: "",
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

  const [editBalenceId, setEditBalenceId] = useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditClick = (event, balence) => {
    event.preventDefault();
    setEditBalenceId(balence.id);

    const formValues = {
      id: balence.id,
     
      name:balence.name,
      date: balence.date,
      total:balence.total,
      balence:balence.balence,
      arrears:balence.arrears,
      discription:balence.discription,
    };

    setEditFormData(formValues);
  };

  //PUT
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedBalence = {
      id: editBalenceId,
      name: editFormData.name,
        date:editFormData.date,
    total:editFormData.total,
    balence:editFormData.balence,
    arrears:editFormData.arrears,
    discription:editFormData.discription,
    };
    Axios.put("https://gunasefood.herokuapp.com/balence/id", editedBalence)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Puting data", res);
          swal({
            title: "Successfuly Updated a balence!",

            icon: "success",
            dangerMode: true,
          });

          const newBalences = [...balences];

          const index = balences.findIndex(
            (balence) => balence.id === editBalenceId
          );

          newBalences[index] = editedBalence;

          setBalences(newBalences);
          setEditBalenceId(null);
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
    setEditBalenceId(null);
  };

  const handleDeleteClick = (balenceId) => {
    Axios.delete(`https://gunasefood.herokuapp.com/balence/${balenceId}`)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Puting data", res);
          swal({
            title: "Successfuly deleted a balence!",

            icon: "success",
            dangerMode: true,
          });
          const newBalences = [...balences];

          const index = balences.findIndex(
            (balence) => balence.id === balenceId
          );

          newBalences.splice(index, 1);

          setBalences(newBalences);
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
                name="total"
                placeholder="Total"
                bgColor="blue.50"
               
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="Integer"
                name="balence"
                placeholder="Balence"
                bgColor="blue.50"
               
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="text"
                name="arrears"
                bgColor="blue.50"
                placeholder="Arrears"
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
          <Heading my={3}>Balence Table</Heading>
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
              <Table size="sm" id="balenceTable">
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>NAME</Th>
                    <Th>DATE</Th>
                    <Th>TOTAL</Th>
                    <Th>Balence</Th>
                    <Th>ARREARS</Th>
                    <Th>DISCRIPTION</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {balences.map((balence, index) => (
                    <Fragment key={index}>
                      {editBalenceId === balence.id ? (
                        <EditTableRowBuyerCB
                          editFormData={editFormData}
                          handleEditFormSubmit={handleEditFormSubmit}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRowBuyerCB
                          balence={balence}
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
