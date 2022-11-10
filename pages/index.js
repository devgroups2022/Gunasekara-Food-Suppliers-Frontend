import React from "react";
import { Grid, Box, Image, Button } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Link from "next/link";

function Home() {
  const property = {
    imageUrl1:
      "https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?cs=srgb&dl=pexels-sora-shimazaki-5668859.jpg&fm=jpg",
    imageUrl2:
      "https://images.pexels.com/photos/6328938/pexels-photo-6328938.jpeg?cs=srgb&dl=pexels-karolina-grabowska-6328938.jpg&fm=jpg",
    imageUrl3:
      "https://images.pexels.com/photos/2832/vehicle-vintage-old-truck.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageUrl4:
      "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4386431.jpg&fm=jpg",
    imageUrl5:
      "https://images.pexels.com/photos/5650041/pexels-photo-5650041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageUrl6:
      "https://images.pexels.com/photos/12935064/pexels-photo-12935064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageUrl7:
      "https://images.pexels.com/photos/4386339/pexels-photo-4386339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageUrl8:
      "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageUrl9:
      "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageUrl10:
      "https://images.pexels.com/photos/262353/pexels-photo-262353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };

  return (
    <div>
      <Navbar />
      <Grid templateColumns="repeat(5, 1fr)" p={5} gap={5}>
        <Box>
          <Image src={property.imageUrl1} alt={property.imageAlt} p={5} />
          <Link href="/employee">
            <Button colorScheme="linkedin" color="white" px={4} w="full" h={8}>
              Employee
            </Button>
          </Link>
        </Box>
        <Box>
          <Image src={property.imageUrl2} alt={property.imageAlt} p={5} />
          <Link href="/cashbalance">
            <Button colorScheme="linkedin" color="white" px={4} w="full" h={8}>
              Cash Balence
            </Button>
          </Link>
        </Box>
        <Box>
          <Image src={property.imageUrl3} alt={property.imageAlt} p={5} />
          <Link href="/vehicles">
            <Button colorScheme="linkedin" color="white" w="full" h={8}>
              Vehicles
            </Button>
          </Link>
        </Box>
        <Box>
          <Image src={property.imageUrl4} alt={property.imageAlt} p={5} />
          <Link href="/purchase">
            <Button colorScheme="linkedin" color="white" w="full" h={8}>
              Purchase
            </Button>
          </Link>
        </Box>
        <Box>
          <Image src={property.imageUrl5} alt={property.imageAlt} p={5} />
          <Link href="/sales">
            <Button colorScheme="linkedin" color="white" w="full" h={8}>
              Sales
            </Button>
          </Link>
        </Box>
        <Box>
          <Image src={property.imageUrl6} alt={property.imageAlt} p={5} />
          <Link href="/attendance">
            <Button colorScheme="linkedin" color="white" w="full" h={8}>
              Attendance
            </Button>
          </Link>
        </Box>

        <Box>
          <Image src={property.imageUrl7} alt={property.imageAlt} p={5} />
          <Link href="/expence">
            <Button colorScheme="linkedin" color="white" w="full" h={8}>
              Expences
            </Button>
          </Link>
        </Box>

       
        <Box>
          <Image src={property.imageUrl8} alt={property.imageAlt} p={5} />
          <Link href="/customer">
            <Button colorScheme="linkedin" color="white" w="full" h={8}>
              Customers
            </Button>
          </Link>
        </Box>
        <Box>
          <Image src={property.imageUrl10} alt={property.imageAlt} p={5} />
          <Link href="/supplier">
            <Button colorScheme="linkedin" color="white" w="full" h={8}>
              Suppliers
            </Button>
          </Link>
        </Box>
        <Box>
          <Image src={property.imageUrl9} alt={property.imageAlt} p={5} />
          <Link href="/">
            <Button colorScheme="linkedin" color="white" w="full" h={8}>
              Report
            </Button>
          </Link>
        </Box>
      </Grid>
    </div>
  );
}

export default Home;
