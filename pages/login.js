import React from 'react'
import {
    Box,
    Heading,
    VStack,
    Text,
    FormControl,
    FormLabel,
    Input,
    Link,
    IconButton,
    Button,
    HStack,
    Checkbox,
    Avatar,
    Wrap,
    WrapItem,
  
} from "@chakra-ui/react";


function Login() {

    return (
        
        <VStack >
            <Box w={['full', 'md']}
                p={[10, 10]}
                mt={[20, '10vh']}
                mx='auto'
                border={['none', '2px']}
                borderColor={['', 'linkedin.300']}
                borderRadius={10}>
                <VStack >
                    <Wrap>
                        <WrapItem>
                            <Avatar size='xl' name='Gunasekara Food Suppliers' src='https://bit.ly/dan-abramov' />
                        </WrapItem>
                    </Wrap>
                    <VStack>
                        <Heading>
                            Login
                        </Heading>
                        <Text>Enter your username and password</Text>
                    </VStack>
                    <FormControl>
                        <FormLabel>User Name</FormLabel>
                        <Input type='text' variant='filled' bgColor="blue.50"/>

                        <FormLabel>Password</FormLabel>
                        <Input type='password' variant='filled' bgColor="blue.50"/>
                        <HStack justify='space-between'>
                            <Checkbox>Remember me</Checkbox>
                            <Link color='blue.500' href='#'>Forgot password? </Link>
                        </HStack>
                        <Button w='full'
                            mt={4}
                            type='login'
                            colorScheme='linkedin'
                        >
                            Login
                        </Button>
                    </FormControl>

                </VStack>
            </Box>
        </VStack>
    )
}

export default Login