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
import ReadOnlyRowSupplier from "../components/ReadOnlyRowSupplier";
import EditTableRowSupplier from "../components/EditTableRowSupplier";
import Navbar from "../components/Navbar";
import swal from "sweetalert";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Supplier() {
  //print table
  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ html: "#supplierTable" });
    doc.text("Supplier History", 10, 10);
    doc.save("Supplier-History.pdf");
  };

  //print row
  const handlePrintRow = (event, suppliers) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      margin: [20],
      head: [["Name", "MOBILE NO", "WHATSAPP NO", "ADDRESS", "EMAIL"]],
      body: [
        [
          suppliers.name,
          suppliers.tp,
          suppliers.whatsapp,
          suppliers.address,
          suppliers.email,
        ],
      ],
    });
    doc.text("Details of a supplier ", 10, 10);
    doc.save("Supplier.pdf");
  };
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    Axios.get("https://gunasefood.herokuapp.com/supplier")
      .then((suppliers) => {
        console.log("Getting from::::", suppliers.data);
        setSuppliers(suppliers.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //
  const [addFormData, setAddFormData] = useState({
    id: "",
    name: "",
    tp: "",
    whatsapp: "",
    address: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    tp: "",
    whatsapp: "",
    address: "",
    email: "",
  });

  const [editSupplierId, setEditSupplierId] = useState(null);

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

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newSupplier = {
      id: addFormData.id,
      name: addFormData.name,
      tp: addFormData.tp,
      whatsapp: addFormData.whatsapp,
      address: addFormData.address,
      email: addFormData.email,
    };
    Axios.post("https://gunasefood.herokuapp.com/supplier", newSupplier)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Posting data", res);
          swal({
            title: "Successfuly added a Supplier!",

            icon: "success",
            dangerMode: true,
          });

          //assign new Supplier to the end of exsisting Suppliers array
          const newSuppliers = [...suppliers, newSupplier];
          //pass New Suppliers array to Suppliers array
          setSuppliers(newSuppliers);
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

  const handleEditClick = (event, supplier) => {
    event.preventDefault();
    setEditSupplierId(supplier.id);

    const formValues = {
      id: supplier.id,
      name: supplier.name,
      tp: supplier.tp,
      whatsapp: supplier.whatsapp,
      address: supplier.address,
      email: supplier.email,
    };

    setEditFormData(formValues);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedSupplier = {
      id: editSupplierId,
      name: editFormData.name,
      tp: editFormData.tp,
      whatsapp: editFormData.whatsapp,
      address: editFormData.address,
      email: editFormData.email,
    };

    Axios.put("https://gunasefood.herokuapp.com/supplier/id", editedSupplier)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Puting data", res);
          swal({
            title: "Successfuly Updated a supplier!",

            icon: "success",
            dangerMode: true,
          });
          const newSuppliers = [...suppliers];

          const index = suppliers.findIndex(
            (supplier) => supplier.id === editSupplierId
          );

          newSuppliers[index] = editedSupplier;

          setSuppliers(newSuppliers);
          setEditSupplierId(null);
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
    setEditSupplierId(null);
  };

  const handleDeleteClick = (supplierId) => {
    Axios.delete(`https://gunasefood.herokuapp.com/supplier/${supplierId}`)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Puting data", res);
          swal({
            title: "Successfuly deleted a supplier!",

            icon: "success",
            dangerMode: true,
          });
          const newSuppliers = [...suppliers];

          const index = suppliers.findIndex(
            (supplier) => supplier.id === supplierId
          );

          newSuppliers.splice(index, 1);

          setSuppliers(newSuppliers);
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
                placeholder="id"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="text"
                name="name"
                placeholder="name"
                onChange={handleAddFormChange}
              />
            </InputGroup>

            <InputGroup>
              <Input
                type="Integer"
                name="tp"
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
                maxLength="9"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="text"
                name="email"
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
          <Heading my={3}>Supplier Table</Heading>
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
              <Table size="sm" id="supplierTable">
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
                  {suppliers.map((supplier, index) => (
                    <Fragment key={index}>
                      {editSupplierId === supplier.id ? (
                        <EditTableRowSupplier
                          editFormData={editFormData}
                          handleEditFormSubmit={handleEditFormSubmit}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRowSupplier
                          supplier={supplier}
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
