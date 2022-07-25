import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useHistory } from "react-router";

const Register = () => {

  const history = useHistory();
  const [employeeId, setEmployeeId] = useState('');

  const onChange = (e) => {
    setEmployeeId(e.target.value);
  }


  const onSubmit = (e) => {

    if (employeeId === '') {
      alert('Please enter your employee id');
      return;
    }

    e.preventDefault();
    const url = `http://lucid.nassa.com.bd/api/Employee/GetEmployeeById?employeeId=${employeeId}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setEmployeeId(employeeId);
        history.push("/signup",
          {
            state:
            {
              employeeId: data.EmployeeId,
              name: data.FullName,
              email: data.OfficeEmail,
              image: data.Image,
              mobileNumber: data.MobileNo,
            }
          });
      })
  }

  return (
    <form action="" onSubmit={(e) => onSubmit(e)}>
      <VStack spacing="5px">
        <FormControl id="employee-id" isRequired>
          <FormLabel>Employee ID</FormLabel>
          <Input
            placeholder="Enter Your Nassa Employee ID"
            name="employeeId"
            value={employeeId}
            onChange={onChange}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          type="submit"
        >
          Register
        </Button>
      </VStack>
    </form>
  );
};

export default Register;
