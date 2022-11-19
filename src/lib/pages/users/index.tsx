/* eslint-disable no-nested-ternary */
/* eslint no-underscore-dangle: 0 */
/* eslint-disable react/no-array-index-key */

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
  Box,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Select } from "chakra-react-select";
import Link from "next/link";
import { useEffect, useState } from "react";

import CancelIcon from "../../assets/icons/cancel.svg";
import SearchIcon from "../../assets/icons/search.svg";
import DatePicker from "lib/components/DatePicker";
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

const colorStatusBg = (status: string) => {
  let color = "";
  switch (status) {
    case "Approved":
      color = "#DEEDE5";
      break;
    case "Pending":
      color = "#F8F2D4";
      break;
    case "In-review":
      color = "#D4E2F8";
      break;
    case "Denied":
      color = "#ffe6e6";
      break;
    default:
      color = "";
  }
  return color;
};
const filterOptions = [
  { value: "", label: "All" },
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
  { value: "in-review", label: "In-review" },
];

const pageLimitNoOptions = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 40, label: "40" },
  { value: 50, label: "50" },
];

const Users = () => {
  const [page, setPage] = useState(1);
  const [accessValue, setAccessValue] = useState<string | undefined>("");
  const [search, setSearch] = useState("");
  const [pageLimitNo, setPageLimitNo] = useState<number | undefined>(20);

  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const {
    isLoading,
    isLoadingError,
    data: { data: users = [], metadata: pageInfo = {} } = {},
  } = useQuery(
    ["users", { page, fromDate, toDate, accessValue, search, pageLimitNo }],
    () =>
      apiClient
        .get(
          `/users?pageNo=${page}&fromDate=${
            fromDate?.toLocaleDateString("en-US") ?? ""
          }&toDate=${
            toDate?.toLocaleDateString("en-US") ??
            new Date().toLocaleDateString("en-US")
          }&access=${accessValue}&search=${search}&limitNo=${pageLimitNo ?? ""}`
        )
        .then((res) => {
          return res?.data?.data?.[0];
        }),
    {}
  );

  useEffect(() => {
    setPage(1);
  }, [pageLimitNo, accessValue, search, fromDate, toDate]);

  return (
    <Flex bg="white" direction="column" mb="10" id="dashboard-page-parent">
      <Box
        color="neutral.800"
        ml={{ base: "3", md: "8" }}
        mt="8"
        mb="6"
        w={{ base: "150px", md: "330px" }}
      >
        <Select
          name="access"
          useBasicStyles
          options={filterOptions}
          onChange={(access) => setAccessValue(access?.value)}
          defaultValue={filterOptions[0]}
          closeMenuOnSelect
          isSearchable={false}
        />
      </Box>
      <Stack
        justify={{ base: "start", md: "space-between" }}
        direction={{ base: "column", md: "row" }}
        px={{ base: "3", md: "8" }}
        spacing="4"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "start", md: "center" }}
        >
          <Flex align="center">
            <Text color="neutral.600" mr="3">
              From
            </Text>

            <DatePicker
              selected={fromDate}
              onChange={(date: Date | null) => date && setFromDate(date)}
              selectsStart
              startDate={fromDate}
              endDate={toDate}
            />
          </Flex>
          <HStack ms="4">
            <Text color="neutral.600">To</Text>
            <DatePicker
              selected={toDate}
              selectsEnd
              startDate={fromDate}
              endDate={toDate}
              minDate={fromDate}
              onChange={(date: Date | null) => date && setToDate(date)}
            />
          </HStack>
        </Flex>

        <HStack spacing="8px">
          <IconButton
            aria-label="Cancel Search"
            position="static"
            icon={<CancelIcon />}
            bg="#5CA37B"
            borderRadius="4px"
            _hover={{
              bg: "#5CA37B",
            }}
            onClick={() => setSearch("")}
          />
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={SearchIcon} w="16px" h="17px" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search"
              border="0"
              borderBottom="1px solid"
              borderBottomColor="neutral.500"
              borderRadius="0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </HStack>
      </Stack>

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
            {isLoading || isLoadingError
              ? Array(20)
                  .fill("")
                  .map((_, index) => (
                    <Tr key={index}>
                      <Td key={index} h="69px" colSpan={9999} px="4">
                        <Skeleton
                          isLoaded={!isLoading && !isLoadingError}
                          height="100%"
                        />
                      </Td>
                    </Tr>
                  ))
              : users.map((user: UserType) => (
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
                        bg={colorStatusBg(user?.status?.access)}
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
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justify="space-between" align="center" px="8" mb="29px">
        <HStack w="35%" spacing="5" align="center">
          <Text>Showing</Text>
          <Box w="30%">
            <Select
              name="pageLimitNo"
              menuPlacement="top"
              useBasicStyles
              options={pageLimitNoOptions}
              onChange={(pageLimit) => setPageLimitNo(pageLimit?.value)}
              defaultValue={pageLimitNoOptions[1]}
              closeMenuOnSelect
              isSearchable={false}
            />
          </Box>
          <Text>users per page</Text>
        </HStack>
        <VStack spacing="4" align="center">
          <HStack spacing="4" mt="9">
            <Button
              colorScheme="secondaryGreen"
              disabled={page === 1}
              p="2"
              zIndex=""
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
            >
              Prev
            </Button>
            <Button
              colorScheme="secondaryGreen"
              p="2"
              onClick={() => {
                if (pageInfo.page <= pageInfo.pages) {
                  setPage((old) => old + 1);
                }
              }}
              disabled={pageInfo.page >= pageInfo.pages}
            >
              Next
            </Button>
          </HStack>
          <HStack color="neutral.900" spacing="6px" w="full" justify="center">
            <Skeleton boxSize="6" isLoaded={!isLoading}>
              <Text textAlign="center">{pageInfo.page || ""}</Text>
            </Skeleton>
            <Text>of</Text>
            <Skeleton boxSize="6" isLoaded={!isLoading} w="30px">
              <Text textAlign="center">{pageInfo.pages || ""}</Text>
            </Skeleton>
          </HStack>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Users;
