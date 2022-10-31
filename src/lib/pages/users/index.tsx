/* eslint-disable no-nested-ternary */
/* eslint no-underscore-dangle: 0 */

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
  Box,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

import CancelIcon from "../../assets/icons/cancel.svg";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg";
import DateIcon from "../../assets/icons/date.svg";
import SearchIcon from "../../assets/icons/search.svg";
import type { UserType } from "lib/types/user";
import { apiClient } from "lib/utils/apiClient";
import { formatDate } from "lib/utils/formatDate";

const colorStatusText = (status: string) => {
  let color = "";
  switch (status) {
    case "Approved":
      color = "#5CA37B";
      break;
    case "Pending":
      color = "#DABC29";
      break;
    case "In-review":
      color = "#296DDA";
      break;
    case "Denied":
      color = "#ff4d4d";
      break;
    default:
      color = "";
  }
  return color;
};

const Users = () => {
  const [page, setPage] = useState(1);
  const {
    data: { data: users = [], metadata: pageInfo = {} } = {},
    isPreviousData,
  } = useQuery(
    ["users", page],
    () =>
      apiClient.get(`/users?pageNo=${page}`).then((res) => {
        return res?.data?.data?.[0];
      }),
    { keepPreviousData: true }
  );

  return (
    <Flex bg="white" direction="column" mb="10">
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
              {[
                "Date joined",
                "User ID",
                "Name",
                "Email address",
                "Phone no.",
                "Status",
                "Action",
              ].map((heading) => (
                <Th
                  key={heading}
                  py="8"
                  px={heading === "Action" ? "2" : "5"}
                  color="primaryBlue.700"
                  textTransform="none"
                  fontSize="md"
                  fontWeight="400"
                  lineHeight="19px"
                >
                  {heading}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <>
              {users.map((user: UserType) => (
                <Tr color="neutral.900" key={user?.client_id}>
                  <Td h="69px" px="4">
                    {formatDate(user?.createdAt)}
                  </Td>
                  <Td h="69px" color="tertiaryBlue.700">
                    {user?.client_id}
                  </Td>
                  <Td
                    h="69px"
                    px="4"
                  >{`${user?.first_name} ${user?.last_name}`}</Td>
                  <Td h="69px" px="4">
                    {user?.email}
                  </Td>
                  <Td h="69px" px="4">
                    {user?.phone}
                  </Td>
                  <Td h="69px" px="3">
                    <Box
                      as="span"
                      p="8px 16px"
                      borderRadius="16px"
                      bg={
                        user?.status?.access === "Approved"
                          ? "#DEEDE5"
                          : user?.status?.access === "Pending"
                          ? "#F8F2D4"
                          : user?.status?.access === "In-review"
                          ? "#D4E2F8"
                          : user?.status?.access === "Denied"
                          ? "#ffe6e6"
                          : ""
                      }
                      color={colorStatusText(user?.status?.access)}
                    >
                      {user?.status?.access}
                    </Box>
                  </Td>
                  <Td h="69px" color="secondaryGreen.600" px="3">
                    <Link href={`/user/${user?._id}`}>View</Link>
                  </Td>
                </Tr>
              ))}
            </>
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justify="end" mb="29px">
        <VStack spacing="4" pr="8" align="center">
          <HStack spacing="4" mt="9">
            <Button
              colorScheme="secondaryGreen"
              disabled={page === 1}
              p="2"
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
            >
              Prev
            </Button>
            <Button
              colorScheme="secondaryGreen"
              p="2"
              onClick={() => {
                if (!isPreviousData || pageInfo.page <= 50) {
                  setPage((old) => old + 1);
                }
              }}
              disabled={isPreviousData || pageInfo.page >= 50}
            >
              Next
            </Button>
          </HStack>
          <Text color="neutral.900">
            {pageInfo.page || ""} of {pageInfo.pages || ""}
          </Text>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Users;
