import {
  Button,
  Flex,
  HStack,
  VStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import CancelIcon from "../../assets/icons/cancel.svg";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg";
import DateIcon from "../../assets/icons/date.svg";
import SearchIcon from "../../assets/icons/search.svg";
import type { UserType } from "lib/types/user";
import { apiClient } from "lib/utils/apiClient";

const Users = () => {
  const { data: { data: users = [] } = {} } = useQuery(["users"], () =>
    apiClient.get("/users").then((res) => {
      return res?.data?.data?.[0];
    })
  );

  return (
    <Flex bg="white" direction="column">
      <HStack color="neutral.800" ml="8" mt="8" mb="6">
        <Menu>
          <MenuButton
            mb="8"
            as={Button}
            rightIcon={
              <Icon
                as={ChevronDownIcon}
                boxSize="24px"
                color="primaryBlue.600"
              />
            }
          >
            <Text textAlign="start">All</Text>
          </MenuButton>
          <MenuList w="400px">
            <MenuItem>Pending</MenuItem>
            <MenuItem>In Review</MenuItem>
            <MenuItem>Approved</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <Flex justify="space-between" px="8">
        <HStack>
          <Text color="neutral.600">From</Text>
          <HStack
            spacing="27px"
            px="5px"
            borderBottom="1px solid"
            borderColor="neutral.600"
            py="7px"
          >
            <Text color="neutral.800">dd/mm/yyyy</Text>
            <Icon as={DateIcon} boxSize="24px" />
          </HStack>
          <Text color="neutral.600" ml="4">
            To
          </Text>
          <HStack
            spacing="27px"
            px="5px"
            borderBottom="1px solid"
            borderColor="neutral.600"
            py="7px"
          >
            <Text color="neutral.800">dd/mm/yyyy</Text>
            <Icon as={DateIcon} boxSize="24px" />
          </HStack>
        </HStack>

        <HStack spacing="8px">
          <IconButton
            aria-label="Cancel Search"
            icon={<CancelIcon />}
            bg="#5CA37B"
            borderRadius="4px"
            _hover={{
              bg: "#5CA37B",
            }}
          />
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search"
              border="0"
              borderBottom="1px solid"
              borderBottomColor="neutral.500"
              borderRadius="0"
            />
          </InputGroup>
        </HStack>
      </Flex>

      <TableContainer mt="8" borderTop="1px solid" borderColor="neutral.200">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th py="8">Date joined</Th>
              <Th py="8">User ID</Th>
              <Th py="8">Name</Th>
              <Th py="8">Email address</Th>
              <Th py="8">Phone no.</Th>
              <Th py="8">Status</Th>
              <Th py="8">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <>
              {users.map((user: UserType) => (
                <Tr color="neutral.900" key={user?.client_id}>
                  <Td>{user?.createdAt}</Td>
                  <Td color="tertiaryBlue.700">{user?.client_id}</Td>
                  <Td>{`${user?.first_name} ${user?.last_name}`}</Td>
                  <Td>{user?.email}</Td>
                  <Td>{user?.phone}</Td>
                  <Td>{user?.status?.access}</Td>
                  <Td color="secondaryGreen.600">
                    <Link href={`/user-profile/${user?.client_id}`}>View</Link>
                  </Td>
                </Tr>
              ))}
            </>
          </Tbody>
        </Table>
        <Flex justify="end" mb="29px">
          <VStack spacing="4" pr="8" align="center">
            <HStack spacing="4" mt="9">
              <Button bg="secondaryGreen.500" color="primaryBlue.50" p="2">
                Prev
              </Button>
              <Button bg="secondaryGreen.500" color="primaryBlue.50" p="2">
                Next
              </Button>
            </HStack>
            <Text color="neutral.900">
              {1} of {21}
            </Text>
          </VStack>
        </Flex>
      </TableContainer>
    </Flex>
  );
};

export default Users;
