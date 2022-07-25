import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import {
  Box,
  Container,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

const Signup = () => {

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();
  const location = useLocation();

  const EmployeeInfo = location.state.state;
  console.log("EmployeeInfo", EmployeeInfo);


  const [name, setName] = useState(EmployeeInfo.name);
  const [employeeId, setEmployeeId] = useState(EmployeeInfo.employeeId);
  const [email, setEmail] = useState(EmployeeInfo.email);
  const [mobileNumber, setMobileNumber] = useState(EmployeeInfo.mobileNumber);
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();


  const submitHandler = async () => {
    if (!name || !employeeId || !email || !mobileNumber || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, employeeId, email, mobileNumber, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          employeeId,
          email,
          mobileNumber,
          password,
        },
        config
      );
      console.log("Register", data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          N Chat
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Text fontSize="4xl">Signup</Text>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack spacing="5px">
                <FormControl id="first-name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    disabled={true}
                  />
                </FormControl>
                <FormControl id="employee-id" isRequired>
                  <FormLabel>Employee ID</FormLabel>
                  <Input
                    placeholder="Enter Your Nassa Employee ID"
                    onChange={(e) => setEmployeeId(e.target.value)}
                    value={employeeId}
                    disabled={true}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    disabled={true}
                  />
                </FormControl>
                <FormControl id="mobile-number" isRequired>
                  <FormLabel>Mobile Number</FormLabel>
                  <Input
                    placeholder="Enter Your Mobile Number"
                    onChange={(e) => setMobileNumber(e.target.value)}
                    value={mobileNumber}
                    disabled={true}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Enter Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="confirm-password" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Confirm password"
                      onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  colorScheme="blue"
                  width="100%"
                  style={{ marginTop: 15 }}
                  onClick={submitHandler}
                >
                  Sign Up
                </Button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>

  );
};

export default Signup;
