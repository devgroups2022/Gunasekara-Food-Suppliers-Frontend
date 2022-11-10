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
import ReadOnlyRowSellerCB from "../../components/ReadOnlyRowSellerCB";
import EditTableRowSellerCB from "../../components/EditTableRowSellerCB";
import Navbar from "../../components/Navbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import swal from "sweetalert";

export default function BuyerCashSellerbalence() {
  //print table
  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ html: "#sellersellerbalenceTable" });
    doc.text("Sellerbalence History", 10, 10);
    doc.save("Sellerbalence-History.pdf");
  };

  //print row
  const handlePrintRow = (event, sellersellerbalences) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      margin: [20],
      head: [
        ["ID", "NAME", "DATE", "TOTAL", "BALANCE", "ARREARS", "DISCRIPTION"],
      ],
      body: [
        [
          sellerbalences.id,
          sellerbalences.name,
          sellerbalences.date,
          sellerbalences.total,
          sellerbalences.balence,
          sellerbalences.arrears,
          sellerbalences.discription,
        ],
      ],
    });
    doc.text("Details of a Sellerbalence ", 10, 10);
    doc.save("Sellerbalence.pdf");
  };

  //GET- data
  //initialize sellerbalences array from getting data from useEffect hook
  const [sellerbalences, setSellerbalences] = useState([]);

  useEffect(() => {
    Axios.get("https://gunasefood.herokuapp.com/sellerbalence")
      .then((sellerbalences) => {
        console.log("Getting from::::", sellerbalences.data);
        setSellerbalences(sellerbalences.data);
      })
      .catch((err) => console.log(err));
  }, []);
  //
  //data for add sellerbalence form
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
    const newSellerbalence = {
      //id-to identify which Employee added

      id: addFormData.id,
      name: addFormData.id,
      date: addFormData.date,
      total: addFormData.total,
      balence: addFormData.balence,
      arrears: addFormData.arrears,
      discription: addFormData.discription,
    };

    Axios.post(
      "https://gunasefood.herokuapp.com/sellerbalence",
      newSellerbalence
    )
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log(newSellerbalence);
          console.log("Posting data", res);
          swal({
            title: "Successfuly added a balence!",

            icon: "success",
            dangerMode: true,
          });

          //assign new employee to the end of exsisting sellerbalences array
          const newSellerbalences = [...sellerbalences, newSellerbalence];
          //pass New sellerbalences array to Employees array
          setSellerbalences(newSellerbalences);
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

  const [editSellerbalenceId, setEditSellerbalenceId] = useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditClick = (event, sellerbalence) => {
    event.preventDefault();
    setEditSellerbalenceId(sellerbalence.id);

    const formValues = {
      id: sellerbalence.id,
      name: sellerbalence.name,
      date: sellerbalence.date,
      total: sellerbalence.total,
      balence: sellerbalence.balence,
      arrears: sellerbalence.arrears,
      discription: sellerbalence.discription,
    };

    setEditFormData(formValues);
  };

  //PUT
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedSellerbalence = {
      id: editSellerbalenceId,
      name: editFormData.name,
      date: editFormData.date,
      total: editFormData.total,
      balence: editFormData.balence,
      arrears: editFormData.arrears,
      discription: editFormData.discription,
    };
    Axios.put(
      "https://gunasefood.herokuapp.com/balence/id",
      editedSellerbalence
    )
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Puting data", res);
          swal({
            title: "Successfuly Updated a sellerbalence!",

            icon: "success",
            dangerMode: true,
          });

          const newSellerbalences = [...sellerbalences];

          const index = sellerbalences.findIndex(
            (sellerbalence) => sellerbalence.id === editSellerbalenceId
          );

          newSellerbalences[index] = editedSellerbalence;

          setSellerbalences(newSellerbalences);
          setEditSellerbalenceId(null);
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
    setEditSellerbalenceId(null);
  };

  const handleDeleteClick = (sellerbalenceId) => {
    Axios.delete(
      `https://gunasefood.herokuapp.com/sellerbalence/${sellerbalenceId}`
    )
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Puting data", res);
          swal({
            title: "Successfuly deleted a sellerbalence!",

            icon: "success",
            dangerMode: true,
          });
          const newSellerbalences = [...sellerbalences];

          const index = sellerbalences.findIndex(
            (sellerbalence) => sellerbalence.id === sellerbalenceId
          );

          newSellerbalences.splice(index, 1);

          setSellerbalences(newSellerbalences);
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
          <Heading my={3}>Seller balence Table</Heading>
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
              <Table size="sm" id="sellerbalenceTable">
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>NAME</Th>
                    <Th>DATE</Th>
                    <Th>TOTAL</Th>
                    <Th>BALENCE</Th>
                    <Th>ARREARS</Th>
                    <Th>DISCRIPTION</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {sellerbalences.map((sellerbalence, index) => (
                    <Fragment key={index}>
                      {editSellerbalenceId === sellerbalence.id ? (
                        <EditTableRowSellerCB
                          editFormData={editFormData}
                          handleEditFormSubmit={handleEditFormSubmit}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRowSellerCB
                          sellerbalence={sellerbalence}
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
