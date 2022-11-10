import { ChakraProvider, theme } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import {
  Table,
  Heading,
  Stack,
  Thead,
  HStack,
  Tbody,
  SlideFade,
  Button,
  Tr,
  Th,
  Box,
  Select,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  VStack,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { FaPrint } from "react-icons/fa";
import Axios from "axios";
import { Fragment, useState, useEffect } from "react";
import ReadOnlyRow from "../components/ReadOnlyRowSale";

import Navbar from "../components/Navbar";
import { useDisclosure } from "@chakra-ui/react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Sale() {
  //print table
  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ tableWidth: [100], html: "#saleTable" });
    doc.text("Sale History", 10, 10);
    doc.save("Sale-History.pdf");
  };

  //print row
  const handlePrintRow = (event, sales) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      tableWidth: [100],
      margin: [20],
      head: [
        [
          "Sale From",
          "V-Number",
          "RP",
          "R_PRICE",
          "TOTAL_RP",
          "BR",
          "BR_PRICE",
          "TOTAL_BR",
          "BH",
          "BH_PRICE",
          "TOTAL_BH",
          "PEOCOCK",
          "PEOCOCK_PRICE",
          "TOTAL_PEOCOCK",
        ],
      ],
      body: [
        [
          sales.s_to,
          sales.number,
          sales.rp,
          sales.r_price,
          sales.tot_rp,
          sales.br,
          sales.br_price,
          sales.tot_br,
          sales.bh,
          sales.bh_price,
          sales.tot_bh,
          sales.peocock,
          sales.pe_price,
          sales.tot_pe,
          sales.tot_price,
        ],
      ],
    });
    doc.text("Details of a Sale ", 10, 10);
    doc.save("Sale.pdf");
  };
  //set sale data from mock-data.json
  const [sales, setSales] = useState([]);

  useEffect(() => {
    Axios.get("https://gunasefood.herokuapp.com/sale")
      .then((sales) => {
        console.log("Getting from::::", sales.data);
        setSales(sales.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const { isOpen, onToggle } = useDisclosure();

  //
  const [addFormData, setAddFormData] = useState({
    id:"",
    s_to: "",
    number: "",
    rp: "",
    r_price: "",
    tot_rp:"",
    br: "",
    br_price: "",
    tot_br:"",
    bh: "",
    bh_price: "",
    tot_bh:"",
    peocock: "",
    pe_price: "",
    tot_pe:"",
    tot_price:"",
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

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newSale = {
      id: addFormData.id,
      s_to: addFormData.s_to,
      number: addFormData.number,
      rp: addFormData.rp,
      r_price: addFormData.r_price,
      tot_rp: addFormData.tot_rp,
      br: addFormData.br,
      br_price: addFormData.br_price,
      tot_br: addFormData.tot_br,
      bh: addFormData.bh,
      bh_price: addFormData.bh_price,
      tot_bh: addFormData.tot_bh,
      peocock: addFormData.peocock,
      pe_price: addFormData.pe_price,
      tot_pe: addFormData.tot_pe,
      tot_price: addFormData.tot_price,
      discription: addFormData.discription,
    };
    Axios.post("https://gunasefood.herokuapp.com/sale", newSale)
      .then((res) => {
        if (res.status == 200) {
          // success
          console.log("Posting data", res);
          swal({
            title: "Successfuly added a Sale!",

            icon: "success",
            dangerMode: true,
          });

          const newSales = [...sales, newSale];
          setSales(newSales);
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

  const saleLists = [
    "ethimale",
    "bimmal mudalali",
    "samadi farm",
    "galgamuwa farm",
    "gampaha farm",
    "halawatha farm",
    "ms wasantha-kiwula",
    "kuliyapitiya-new",
    "kuliyapitiya",
    "manoharan",
    "ms rohitha kiwla",
    "nela",
    "prima",
    "pussellawa",
    "samanthure",
    "super feed",
    "tharindu farm",
    "tharul farm",
    "weehena",
  ];
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Navbar />
        <div>
          <HStack spacing={4} padding={4}>
          <FormControl>
              <FormLabel>ID</FormLabel>
              <Input
                type="id"
                name="integer"
                bgColor="blue.50"
                onChange={handleAddFormChange}
              />
            </FormControl>


            <FormControl>
              <FormLabel> Sale To</FormLabel>
              <Select placeholder="sale to" bgColor="blue.50">
                {saleLists.map((saleList, key) => (
                  <option key={key} value={saleList} name="s_to">
                    {saleList}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Vehical No</FormLabel>
              <Input
                type="Integer"
                name="number"
                bgColor="blue.50"
                placeholder="number"
                onChange={handleAddFormChange}
              />
            </FormControl>
          </HStack>
          <HStack spacing={4} padding={4}>
            <FormControl>
              <FormLabel>Bath Haal</FormLabel>
              <Input
                type="Integer"
                id="txtbh"
                bgColor="blue.50"
                name="bh"
                placeholder="Units"
                onChange={handleAddFormChange}
              />
              <Input
                type="number"
                name="bh_price"
                bgColor="blue.50"
                placeholder="price"
                onChange={handleAddFormChange}
              />
              <Input
                type="number"
                name="totalprice"
                bgColor="blue.50"
                placeholder="Total Price"
                onChange={handleAddFormChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Broken Rice</FormLabel>
              <Input
                type="Integer"
                name="br"
                bgColor="blue.50"
                placeholder="Units"
                onChange={handleAddFormChange}
              />
              <Input
                type="Integer"
                name="br_price"
                bgColor="blue.50"
                placeholder="price"
                onChange={handleAddFormChange}
              />
              <Input
                type="number"
                name="totalprice"
                bgColor="blue.50"
                placeholder="Total Price"
                onChange={handleAddFormChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Rice Polish</FormLabel>
              <Input
                type="Integer"
                name="rp"
                bgColor="blue.50"
                placeholder="Units"
                onChange={handleAddFormChange}
              />
              <Input
                type="Integer"
                name="rp_price"
                bgColor="blue.50"
                placeholder="price"
                onChange={handleAddFormChange}
              />
              <Input
                type="number"
                name="totalprice"
                bgColor="blue.50"
                placeholder="Total Price"
                onChange={handleAddFormChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Peocock</FormLabel>
              <Input
                type="Integer"
                name="peacock"
                bgColor="blue.50"
                placeholder="Units"
                onChange={handleAddFormChange}
              />
              <Input
                type="Integer"
                name="peacock_price"
                placeholder="price"
                bgColor="blue.50"
                onChange={handleAddFormChange}
              />
              <Input
                type="number"
                name="totalprice"
                bgColor="blue.50"
                placeholder="Total Price"
                onChange={handleAddFormChange}
              />
            </FormControl>
          </HStack>
          <HStack spacing={4} padding={4} alignItems="center">
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                bgColor="blue.50"
                placeholder="Description"
                onChange={handleAddFormChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Total price</FormLabel>
              <Input
                type="number"
                name="nettotal"
                bgColor="blue.50"
                placeholder="Net Total"
                onChange={handleAddFormChange}
              />
            </FormControl>
          </HStack>
          <Stack alignItems="center">
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

            <Button
              margin={10}
              size="md"
              height="48px"
              width="200px"
              alignSelf="flex-center"
              colorScheme="telegram"
              onClick={onToggle}
            >
              History
            </Button>
          </Stack>
        </div>

        <SlideFade in={isOpen} offsetY="20px">
          <Box p={10}>
            <Heading my={3}>Sales Table</Heading>
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
                <Table size="sm" id="saleTable">
                  <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Purchase_from</Th>
                    <Th>Number</Th>
                    <Th>RP</Th>
                    <Th>R_Price</Th>
                    <Th>TOTAL_RP</Th>
                    <Th>BR</Th>
                    <Th>B_Price</Th>
                    <Th>TOTAL_BR</Th>
                    <Th>BH</Th>
                    <Th>BH_Price</Th>
                    <Th>TOTAL_BH</Th>
                    <Th>Peacock</Th>
                    <Th>P_Price</Th>
                    <Th>TOTAL_PE</Th>
                    <Th>TOTAL</Th>
                    <Th>Description</Th>
                    <Th>Actions</Th>
                  </Tr>
                  </Thead>
                  <Tbody>
                    {sales.map((sale, index) => (
                      <Fragment key={index}>
                        <ReadOnlyRow
                          sale={sale}
                         
                        
                          handlePrintRow={handlePrintRow}
                        />
                      </Fragment>
                    ))}
                  </Tbody>
                </Table>
              </form>
            </VStack>
          </Box>
        </SlideFade>
      </div>
    </ChakraProvider>
  );
}
