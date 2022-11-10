import { ChakraProvider, theme } from "@chakra-ui/react";

import {
  Table,
  Heading,
  Thead,
  HStack,
  Tbody,
  Button,
  Tr,
  Th,
  Spacer,
  FormControl,
  FormLabel,
  Box,
  Flex,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { FaPrint } from "react-icons/fa";
import Axios from "axios";
import { Fragment, useState, useEffect } from "react";
import ReadOnlyRowAccoExpence from "../components/ReadOnlyRowAccoExpence";
import EditTableRowAccoExpence from "../components/EditTableRowAccoExpence";
import ReadOnlyRowExpence from "../components/ReadOnlyRowExpence";
import EditTableRowExpence from "../components/EditTableRowExpence";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import swal from "sweetalert";

export default function Accoexpence() {
  //Cash Expences
  //printTable
  const handleAccoExpencePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ html: "#expenceTable" });
    doc.text("Account Expence History", 10, 10);
    doc.save("Account Expence-History.pdf");
  };

  //print row
  const handlePrintRow = (event, expences) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      margin: [20],
      head: [["ID", "DATE", "AMOUNT", "DISCRIPTION"]],
      body: [
        [expences.id, expences.date, expences.amount, expences.discription],
      ],
    });
    doc.text("Details of a Account Expence ", 10, 10);
    doc.save("Account expence.pdf");
  };

  //Account Expences
  //printTable
  //print table

  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ html: "#accoexpenceTable" });
    doc.text(" Expence History", 10, 10);
    doc.save(" Expence-History.pdf");
  };

  //print row
  const handleAccExpencePrintRow = (event, accoexpences) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      margin: [20],
      head: [["ID", "DATE", "AMOUNT", "DISCRIPTION"]],
      body: [
        [
          accoexpences.id,
          accoexpences.date,
          accoexpences.amount,
          accoexpences.discription,
        ],
      ],
    });
    doc.text("Details of a Cash Expence ", 10, 10);
    doc.save("Cash expence.pdf");
  };

  //Cash expence
  //GET- data
  //initialize Cash expence array from getting data from useEffect hook
  const [expences, setExpences] = useState([]);

  useEffect(() => {
    Axios.get("https://gunasefood.herokuapp.com/expence")
      .then((expences) => {
        console.log("Getting from::::", expences.data);
        setExpences(expences.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //POST-data
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

  const [addFormData, setAddFormData] = useState({
    id: "",
    date: "",
    amount: "",
    discription: "",
  });

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    //take the data that the user enter to the form
    const newExpence = {
      //id-to identify which Employee added

      id: addFormData.id,
      date: addFormData.date,
      amount: addFormData.amount,
      discription: addFormData.discription,
    };

    Axios.post("https://gunasefood.herokuapp.com/expence", newExpence)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log(newExpence);
          console.log("Posting data", res);
          swal({
            title: "Successfuly added a Expence!",

            icon: "success",
            dangerMode: true,
          });

          //assign new expence to the end of exsisting expences array
          const newExpences = [...expences, newExpence];
          //pass New expences array to expences array
          setExpences(newExpences);
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

  //PUT Data
  const [editFormData, setEditFormData] = useState({
    id: "",
    date: "",
    amount: "",
    discription: "",
  });

  const [editExpenceId, setEditExpenceId] = useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditClick = (event, expence) => {
    event.preventDefault();
    setEditExpenceId(expence.id);

    const formValues = {
      id: expence.id,
      date: expence.date,
      amount: expence.amount,
      discription: expence.discription,
    };

    setEditFormData(formValues);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedeExpence = {
      id: editExpenceId,
      date: editFormData.date,
      amount: editFormData.amount,
      discription: editFormData.discription,
    };
    Axios.put("https://gunasefood.herokuapp.com/expence/id", editedeExpence)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Puting data", res);
          swal({
            title: "Successfuly Updated a expence!",

            icon: "success",
            dangerMode: true,
          });

          const newExpences = [...expences];

          const index = expences.findIndex(
            (expence) => expence.id === editExpenceId
          );

          newExpences[index] = editedeExpence;

          setExpences(newExpences);
          setEditExpenceId(null);
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

  //Cancel
  const handleCancelClick = () => {
    setEditExpenceId(null);
  };

  //DELETE DATA
  const handleDeleteClick = (expenceId) => {
    Axios.delete(`https://gunasefood.herokuapp.com/expence/${expenceId}`)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Puting data", res);
          swal({
            title: "Successfuly deleted a expence!",

            icon: "success",
            dangerMode: true,
          });
          const newExpences = [...expences];

          const index = expences.findIndex(
            (expence) => expence.id === expenceId
          );

          newExpences.splice(index, 1);

          setExpences(newExpences);
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

  //Acco-expences
  //GET- data
  //initialize accoexpences array from getting data from useEffect hook
  const [accoexpences, setAccoexpences] = useState([]);

  useEffect(() => {
    Axios.get("https://gunasefood.herokuapp.com/accoexpence")
      .then((accoexpences) => {
        console.log("Getting from::::", accoexpences.data);
        setAccoexpences(accoexpences.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //POST-data
  const handleAccoExpenceAddFormSubmit = (event) => {
    event.preventDefault();

    //take the data that the user enter to the form
    const newAccoExpence = {
      //id-to identify which Employee added

      id: addFormData.id,
      date: addFormData.date,
      amount: addFormData.amount,
      discription: addFormData.discription,
    };

    Axios.post("https://gunasefood.herokuapp.com/accoexpence", newAccoExpence)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log(newAccoExpence);
          console.log("Posting data", res);
          swal({
            title: "Successfuly added a Account Expence!",

            icon: "success",
            dangerMode: true,
          });

          //assign new expence to the end of exsisting expences array
          const newAccoExpences = [...expences, newAccoExpence];
          //pass New expences array to expences array
          setAccoexpences(newAccoExpences);
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

  //PUT DATA
  const [editAccoFormData, setAccoEditFormData] = useState({
    id: "",
    date: "",
    amount: "",
    discription: "",
  });

  const [editAccoExpenceId, setAccoEditExpenceId] = useState(null);

  const handleAccoEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newAccoFormData = { ...editAccoFormData };
    newAccoFormData[fieldName] = fieldValue;

    setAccoEditFormData(newAccoFormData);
  };

  const handleAccoEditClick = (event, accoexpence) => {
    event.preventDefault();
    setAccoEditExpenceId(accoexpence.id);

    const formValues = {
      id: accoexpence.id,
      date: accoexpence.date,
      amount: accoexpence.amount,
      discription: accoexpence.discription,
    };

    setAccoEditFormData(formValues);
  };

  const handleAccoEditFormSubmit = (event) => {
    event.preventDefault();

    const editedAccoExpence = {
      id: editAccoExpenceId,
      date: editAccoFormData.date,
      amount: editAccoFormData.amount,
      discription: editAccoFormData.discription,
    };
    Axios.put(
      "https://gunasefood.herokuapp.com/accoexpence/id",
      editedAccoExpence
    )
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Puting data", res);
          swal({
            title: "Successfuly Updated a Account Expence !",

            icon: "success",
            dangerMode: true,
          });

          const newAccoExpences = [...accoexpences];

          const index = accoexpences.findIndex(
            (accoexpence) => accoexpence.id === editAccoExpenceId
          );

          newAccoExpences[index] = editedAccoExpence;

          setAccoexpences(newAccoExpences);
          setAccoEditExpenceId(null);
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

  //CANCEL
  const handleAccoCancelClick = () => {
    setAccoEditExpenceId(null);
  };

  //DELETE DATA
  const handleAccoDeleteClick = (accoexpenceId) => {
    Axios.delete(
      `https://gunasefood.herokuapp.com/accoexpence/${accoexpenceId}`
    )
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Puting data", res);
          swal({
            title: "Successfuly deleted a Account Expence!",

            icon: "success",
            dangerMode: true,
          });
          const newAccoExpences = [...accoexpences];

          const index = accoexpences.findIndex(
            (accoexpence) => accoexpence.id === accoexpenceId
          );

          newAccoExpences.splice(index, 1);

          setAccoexpences(newAccoExpences);
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

        {/**Form */}
        <Flex>
          <Box p="12" w="50%">
            <Heading my={3}>From Cash</Heading>

            <FormControl>
              <FormLabel>Id</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  name="id"
                  bgColor="blue.50"
                  placeholder="id"
                  onChange={handleAddFormChange}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                name="date"
                bgColor="blue.50"
                onChange={handleAddFormChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                type="Integer"
                name="amount"
                placeholder="Amount"
                bgColor="blue.50"
                onChange={handleAddFormChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="discription"
                bgColor="blue.50"
                placeholder="discription"
                onChange={handleAddFormChange}
              />
            </FormControl>
            <HStack>
              <Button
                margin={10}
                size="md"
                height="48px"
                width="200px"
                alignSelf="flex-center"
                colorScheme="telegram"
                onClick={handleAddFormSubmit}
              >
                Add
              </Button>
            </HStack>
          </Box>
          <Spacer />
          <Box p="12" w="50%">
            <Heading my={3}>From Account</Heading>

            <FormControl>
              <FormLabel>Id</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  name="id"
                  bgColor="blue.50"
                  placeholder="id"
                  onChange={handleAddFormChange}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                name="date"
                bgColor="blue.50"
                onChange={handleAddFormChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                type="Integer"
                name="amount"
                placeholder="Amount"
                bgColor="blue.50"
                onChange={handleAddFormChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="discription"
                bgColor="blue.50"
                placeholder="discription"
                onChange={handleAddFormChange}
              />
            </FormControl>
            <HStack>
              <Button
                margin={10}
                size="md"
                height="48px"
                width="200px"
                alignSelf="flex-center"
                colorScheme="telegram"
                onClick={handleAccoExpenceAddFormSubmit}
              >
                Add
              </Button>
            </HStack>
          </Box>
        </Flex>

        {/**Table */}
        <Flex>
          <Box w="50%" m="4">
            <form>
              <Heading my={3}>Cash Expences Table</Heading>
              <Button
                colorScheme="telegram"
                leftIcon={<FaPrint />}
                onClick={handlePrint}
              >
                Print
              </Button>
              <Table size="sm" mt="6" id="expenceTable">
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Date</Th>
                    <Th>Amount</Th>
                    <Th>Description</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {expences.map((expence, index) => (
                    <Fragment key={index}>
                      {editExpenceId === expence.id ? (
                        <EditTableRowExpence
                          editFormData={editFormData}
                          handleEditFormSubmit={handleEditFormSubmit}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRowExpence
                          expence={expence}
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
          </Box>
          <Spacer />
          <Box w="50%" m="4">
            <form>
              <Heading my={3}>Account Expences Table</Heading>
              <Button
                colorScheme="telegram"
                leftIcon={<FaPrint />}
                onClick={handleAccoExpencePrint}
              >
                Print
              </Button>
              <Table size="sm" mt="6" id="accoexpenceTable">
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Date</Th>
                    <Th>Amount</Th>
                    <Th>Description</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {accoexpences.map((accoexpence, index) => (
                    <Fragment key={index}>
                      {editAccoExpenceId === accoexpence.id ? (
                        <EditTableRowAccoExpence
                          editAccoFormData={editAccoFormData}
                          handleAccoEditFormSubmit={handleAccoEditFormSubmit}
                          handleAccoEditFormChange={handleAccoEditFormChange}
                          handleAccoCancelClick={handleAccoCancelClick}
                        />
                      ) : (
                        <Fragment>
                          <ReadOnlyRowAccoExpence
                            accoexpence={accoexpence}
                            handleAccoDeleteClick={handleAccoDeleteClick}
                            handleAccoEditClick={handleAccoEditClick}
                            handleAccExpencePrintRow={handleAccExpencePrintRow}
                          />
                        </Fragment>
                      )}
                    </Fragment>
                  ))}
                </Tbody>
              </Table>
            </form>
          </Box>
        </Flex>
      </div>
    </ChakraProvider>
  );
}
