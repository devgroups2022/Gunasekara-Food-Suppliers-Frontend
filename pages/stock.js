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
import {} from "react-icons/fa";
import axios from "axios";
import { Fragment, useState ,useEffect} from "react";
import ReadOnlyRowStock from "../components/ReadOnlyRowStock";
import EditTableRowStock from "../components/EditTableRowStock";
import Navbar from "../components/Navbar";

export default function Stock() {

  //set stock data from mock-data.json
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    async function getAllStudent() {
     try {
      const stocks = await axios.get("https://gunasefood.herokuapp.com/")
      // console.log(students.data);
      setStocks(stocks.data);
     } catch (error) {
      console.log("Something is Wrong");
     }
    }
    getAllStudent();
   },[])

  //
  const [addFormData, setAddFormData] = useState({
    name: "",
    nic: "",
    address: "",
    tp: "",
    code: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    nic: "",
    address: "",
    tp: "",
    code: "",
  });

  const [editStocksId, setEditStockId] = useState(null);

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

    const newStock = {
      id: nanoid(),
      name: addFormData.name,
      nic: addFormData.nic,
      address: addFormData.address,
      tp: addFormData.tp,
      code: addFormData.code,
    };

    const newStocks = [...stocks, newStocks];
    setStocks(newStocks);
  };

  const handleEditClick = (event, stock) => {
    event.preventDefault();
    setEditStockId(stock.id);

    const formValues = {
      name: stock.name,
      nic: stock.nic,
      tp: stock.tp,
      address: stock.address,
      code: stock.code,
    };

    setEditFormData(formValues);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedStock = {
      id: editStockId,
      name: editFormData.name,
      nic: editFormData.nic,
      tp: editFormData.tp,
      address: editFormData.address,
      code: editFormData.code,
    };

    const newStocks = [...stocks];

    const index = stocks.findIndex(
      (stock) => stock.id === editStockId
    );

    newStocks[index] = editedStock;

    setStocks(newStocks);
    setEditStockId(null);
  };

  const handleCancelClick = () => {
    setEditStockId(null);
  };

  const handleDeleteClick = (stockId) => {
    const newStocks = [...stocks];

    const index = stocks.findIndex((stock) => stock.id === stockId);

    newStocks.splice(index, 1);

    setStocks(newStocks);
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
                name="name"
                placeholder="name"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="text"
                name="nic"
                placeholder="nic"
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
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="text"
                name="code"
                placeholder="code"
                maxLength="6"
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
          <Heading my={3}>Stock Table</Heading>
          <VStack>
            <Stack direction="row" alignSelf="flex-end" spacing={4}>
              
          
            </Stack>
            <form onSubmit={handleEditFormSubmit} >
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>NIC</Th>
                    <Th>Mobile No</Th>
                    <Th>Address</Th>
                    <Th>code</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {stocks.map((stock, index) => (
                    <Fragment key={index}>
                      {editStocksId === stock.id ? (
                        <EditTableRowStock
                          editFormData={editFormData}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRowStock
                          stock={stock}
                          handleEditClick={handleEditClick}
                          handleDeleteClick={handleDeleteClick}
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
};

