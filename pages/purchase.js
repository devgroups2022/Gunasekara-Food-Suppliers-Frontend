import { ChakraProvider, theme } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useDisclosure } from "@chakra-ui/react";

import {
  Table,
  Heading,
  Stack,
  Thead,
  HStack,
  Tbody,
  Button,
  Tr,
  Select,
  Th,
  SlideFade,
  Box,
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
import ReadOnlyRow from "../components/ReadOnlyRowPurchase";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import swal from "sweetalert";

export default function Purchase() {
  //print table
  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ tableWidth: [100], html: "#purchaseTable" });
    doc.text("Purchase History", 10, 10);
    doc.save("Purchase-History.pdf");
  };

  //print row
  const handlePrintRow = (event, purchases) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      tableWidth: [100],
      margin: [20],
      head: [
        [
          "Purchase From",
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
          purchases.p_from,
          purchases.number,
          purchases.rp,
          purchases.r_price,
          purchases.tot_rp,
          purchases.br,
          purchases.br_price,
          purchases.tot_br,
          purchases.bh,
          purchases.bh_price,
          purchases.tot_bh,
          purchases.peocock,
          purchases.pe_price,
          purchases.tot_pe,
          purchases.tot_price,
        ],
      ],
    });
    doc.text("Details of a Purchase ", 10, 10);
    doc.save("Purchase.pdf");
  };

  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    Axios.get("https://gunasefood.herokuapp.com/purchase")
      .then((purchases) => {
        console.log("Getting from::::", purchases.data);
        setPurchases(purchases.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    
    const newPurchase = {
      id: addFormData.id,
      p_from: addFormData.p_from,
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


    Axios.post("https://gunasefood.herokuapp.com/purchase", newPurchase)
    .then((res) => {
      if (res.status == 200) {
        // success
        console.log("Posting data", res);
        swal({
          title: "Successfuly added a Purchase!",

          icon: "success",
          dangerMode: true,
        });

        //assign new Supplier to the end of exsisting purchases array
        const newPurchases = [...purchases, newPurchase];
        //pass New Suppliers array to purchases array
        setPurchases(newPurchases);
        console.log(newPurchase)
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

  
  const { isOpen, onToggle } = useDisclosure();
  //
  const [addFormData, setAddFormData] = useState({
    id:"",
    p_from: "",
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

  const p_froms = [
    "Rice mills",
    "Abeysekara rice mill",
    "Ajantha 42",
    "Ajantha rice mill madunagala",
    "albert thissa",
    "ambala rice mill-4 junction",
    "amaya-kumara",
    "amayuru rice mill ms shantha",
    "amila rice mill hakuruwela",
    "ms prasanna angunukola(yakadaya)",
    "Bahirawa rice mill aiya",
    "Bahirawa rice mill malli",
    "barawakumbuka akka",
    "beliatta bath hal",
    "chaminda rice mil kiribban ara",
    "lahiru rice mill (chuti mahattaya)",
    "danduma",
    "dehiwattha kade",
    "deniya rice mill",
    "jac dilruk rice mill",
    "dissanayaka stores",
    "dissanayaka rice mill",
    "gamaralagama bath hal",
    "gamaralagama sudu mama",
    "guruthuma hakuruwela",
    " hakuruwela",
    "handy mudalali",
    "tharanga rice mill hathporuwa",
    "hichchi mahaththaya kiribbanara",
    " jandura rice mill angunukola",
    "jayasekara rice mill urusitawewa",
    "kadurugasara farm",
    "kahawattha rice mill",
    " kamburupitiya rice mill",
    "kanthale rice mill",
    "karawala kalu mahaththaya",
    " katuwana bath hal",
    "kuttigala bath hal",
    "lakmali rice mill",
    "lakmini rice mill welangahawela",
    "lal rice mill hath poruwa",
    " mjm zaric",
    " madunagala bala mahaththaya",
    "mele kolaniya",
    "mallika rice mill",
    "manamperi rice mill",
    "mathara rice mill",
    "asanka bath hal",
    "moraketiya bebi mahatha",
    "moraketiya rice mill",
    " ms achala",
    "ms ashik",
    "ms chamara",
    "chandana kachchigala",
    "ms-chandana-malli",
    "ms-chandana",
    "ms kalidasa",
    "ms kasun",
    "ms kumara hungama",
    "ms lily",
    "ms mahinda",
    "pradeep rice mill",
    "ms rawi",
    "ms sajee-ambalanthota",
    "ms sameera",
    "ms sandun",
    "ms ruwan",
    "kadiragodage",
    "ms sarath angunukola",
    "ms sujeewa nabadagaswewa",
    "lakshan rice mill",
    "ms thushara kachchigala",
    "mora yaya",
    "middeniya rice mill",
    "katuwana rice mill",
    "kirama rice mill",
    "near the asapuwa",
    "paranamana rice mill",
    " pasindu rice mill padalangala",
    "pk rice mill",
    "priyantha rice mill",
    " harsha rice mill ranmuthuwewa",
    "saman aiya",
    "samarasekara rice mill",
    "sameera thissa",
    "shantha rice mill ambalanthota",
    "siri wimal rice mill",
    "siriwardhana rice mill",
    "sithumina bath hal",
    "sithumina rice mill",
    "susantha",
    "tharindu kachchigala",
    "thukama bath hal",
    "thushara bath hal 16  ela",
    "thushara rice mill",
    "thissa rice mill",
    "welipitiya stores",
    "weniwelara chandana",
    "yatiyana rice mill",
    "wije angunukola",
    "carpet handiya",
    "other rice mill",
    " sarath rice mill",
    "kowul ara rice mill",
    " ms dhanushka",
  ];

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Navbar />
        <Box>
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
              <FormLabel>Purchase From</FormLabel>
              <Select placeholder="Select a purchase from" bgColor="blue.50">
                {p_froms.map((p_from, key) => (
                  <option key={key} value={p_from} name="p_from">
                    {p_from}
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
                name="bh"
                bgColor="blue.50"
                placeholder="Units"
                onChange={handleAddFormChange}
              />
              <Input
                type="Integer"
                name="bh_price"
                bgColor="blue.50"
                placeholder="price"
                onChange={handleAddFormChange}
              />
              <Input
                type="Integer"
                name="total_bh"
                placeholder="Total Price"
                bgColor="blue.50"
                onChange={handleAddFormChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Broken Rice</FormLabel>
              <Input
                type="Integer"
                name="br"
                placeholder="Units"
                bgColor="blue.50"
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
                type="Integer"
                name="totalprice"
                placeholder="total_br"
                bgColor="blue.50"
                onChange={handleAddFormChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Rice Polish</FormLabel>
              <Input
                type="Integer"
                name="rp"
                placeholder="Units"
                bgColor="blue.50"
                onChange={handleAddFormChange}
              />
              <Input
                type="Integer"
                name="rpe_price"
                placeholder="price"
                bgColor="blue.50"
                onChange={handleAddFormChange}
              />
              <Input
                type="Integer"
                name="total_rp"
                placeholder="Total Price"
                bgColor="blue.50"
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
                name="pe_price"
                placeholder="price"
                bgColor="blue.50"
                onChange={handleAddFormChange}
              />
              <Input
                type="Integer"
                name="total_pe"
                placeholder="Total Price"
                bgColor="blue.50"
                onChange={handleAddFormChange}
              />
            </FormControl>
          </HStack>
          <HStack spacing={4} padding={4} alignItems="center">
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="discription"
                placeholder="Description"
                bgColor="blue.50"
                onChange={handleAddFormChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Net Total</FormLabel>
              <Input
                type="number"
                name="tot_price"
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
        </Box>

        <SlideFade in={isOpen} offsetY="20px">
          <Box p={10}>
            <Heading my={3}>Purchase Table</Heading>
            <Button
              colorScheme="telegram"
              leftIcon={<FaPrint />}
              onClick={handlePrint}
            >
              Print
            </Button>
            <VStack>
              <Stack direction="row" alignSelf="flex-end" spacing={4}></Stack>

              <Table size="sm" id="purchaseTable" margin={5} bgColor="blue.100">
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
                  {purchases.map((purchase, index) => (
                    <Fragment key={index}>
                      <ReadOnlyRow
                        purchase={purchase}
                        handlePrintRow={handlePrintRow}
                      />
                    </Fragment>
                  ))}
                </Tbody>
              </Table>
            </VStack>
          </Box>
        </SlideFade>
      </div>
    </ChakraProvider>
  );
}
