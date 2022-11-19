/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-nested-ternary */

import {
  Button,
  Image,
  Flex,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  SkeletonCircle,
  Text,
  useDisclosure,
  VStack,
  Stack,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Select } from "chakra-react-select";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import ArrowLeftIcon from "../../assets/icons/arrow-left.svg";
import type { SingleUserType } from "lib/types/singleUserType";
import { apiClient } from "lib/utils/apiClient";

const accessOptions = [
  { value: "Denied", label: "Denied" },
  { value: "Approved", label: "Approved" },
  { value: "Pending", label: "Pending" },
  { value: "In-review", label: "In-review" },
];

const UserProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isInfoModalOpen,
    onOpen: onInfoModalOpen,
    onClose: onInfoModalClose,
  } = useDisclosure();

  const {
    isOpen: isUploadedDocOpen,
    onOpen: onUploadedDocOpen,
    onClose: onUploadedDocClose,
  } = useDisclosure();

  const router = useRouter();

  const { id } = router.query;

  const {
    data: user,
    isLoading,
    isError,
  }: Partial<{
    data: SingleUserType;
    isLoading: boolean;
    isError: boolean;
  }> = useQuery(["user", id], () =>
    apiClient.get(`/users/single?id=${id}`).then((res) => {
      return res?.data?.data;
    })
  );

  const [overallStatus, setOverallStatus] = useState("");

  const [status, setStatus] = useState<{
    [index: string]: {
      value: string | undefined;
      label: string | undefined;
    };
  }>({});

  useEffect(() => {
    setStatus({
      access: { value: user?.status?.access, label: user?.status?.access },
      accountInformation: {
        value: user?.status?.bank,
        label: user?.status?.bank,
      },
      investmentProfile: {
        value: user?.status?.investment,
        label: user?.status?.investment,
      },
      employmentInformation: {
        value: user?.status?.employment,
        label: user?.status?.employment,
      },
      bioInformation: {
        value: user?.status?.biodata,
        label: user?.status?.biodata,
      },
    });
  }, [user]);

  const handleStatusChange = (
    statusName: string,
    value: { value: string | undefined; label: string | undefined } | null
  ) => {
    if (value !== null) {
      setStatus((s: typeof status) => {
        return {
          ...s,
          [statusName]: { value: value.value, label: value.label },
        };
      });
    }
  };

  const handleUpdate = () => {
    if (Object.values(status).some((s) => s.value === "Pending")) {
      setOverallStatus("Pending");
    }
    if (Object.values(status).some((s) => s.value === "In review")) {
      setOverallStatus("In review");
    }
    if (Object.values(status).every((s) => s.value === "Approved")) {
      setOverallStatus("Approved");
    }
    onClose();
    onInfoModalOpen();
  };

  return (
    <Flex bg="white" direction="column">
      <Stack
        px={{ base: "3", md: "8" }}
        py="5"
        justify="space-between"
        borderBottom="1px solid"
        borderColor="neutral.200"
        spacing="3"
        direction={{ base: "column", sm: "row" }}
        align={{ base: "start", sm: "center" }}
        w="full"
      >
        <HStack>
          <Icon
            as={ArrowLeftIcon}
            boxSize="24px"
            onClick={() => router.back()}
          />
          <Skeleton
            isLoaded={!isLoading && !isError}
            h={isLoading ? "29px" : "fit-content"}
          >
            <Text
              color="primaryBlue.500"
              fontWeight="700"
              fontSize="24px"
              lineHeight="29px"
            >
              {`${user?.first_name} ${user?.last_name}`}
            </Text>
          </Skeleton>
        </HStack>
        <Button
          color="primaryBlue.500"
          bg="primaryBlue.100"
          fontWeight="500"
          fontSize="14px"
          px="12px"
          py="10px"
          height="min-content"
          onClick={() => (isLoading ? null : onOpen())}
          sx={{ ms: { base: "30px !important", sm: "0 !important" } }}
        >
          View profile status
        </Button>

        {/* Status Modal */}
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Status</ModalHeader>
            <ModalCloseButton color="secondaryGreen.600" />
            <ModalBody>
              {[
                {
                  title: "Access",
                  name: "access",
                  defaultValue: status.access,
                },
                {
                  title: "Account information",
                  name: "accountInformation",
                  defaultValue: status.accountInformation,
                },
                {
                  title: "Investment profile",
                  name: "investmentProfile",
                  defaultValue: status.investmentProfile,
                },
                {
                  title: "Employment information",
                  name: "employmentInformation",
                  defaultValue: status.employmentInformation,
                },
                {
                  title: "Bio information",
                  name: "bioInformation",
                  defaultValue: status.bioInformation,
                },
              ].map((item) => (
                <Box key={item.title} mb="4">
                  <Text color="neutral.700">{item.title}</Text>
                  <Select
                    name="access"
                    useBasicStyles
                    options={accessOptions}
                    onChange={(access) => handleStatusChange(item.name, access)}
                    defaultValue={item.defaultValue}
                    closeMenuOnSelect
                    isSearchable={false}
                  />
                </Box>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button
                bg="primaryBlue.500"
                fontWeight="500"
                fontSize="20px"
                lineHeight="24px"
                color="primaryBlue.50"
                px="6"
                py="4"
                onClick={() => {
                  onClose();
                  handleUpdate();
                }}
                _hover={{
                  color: "primaryBlue.50",
                }}
                _focus={{
                  color: "neutral.900",
                }}
              >
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* OverallStatus */}
        <Modal onClose={onInfoModalClose} isOpen={isInfoModalOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Status</ModalHeader>
            <ModalCloseButton color="secondaryGreen.600" />
            <ModalBody>
              <Text>Overall Status: {overallStatus}</Text>{" "}
              <Text>
                API call should happen now, The journey ends here. Update
                endpoints were not provided
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                bg="primaryBlue.500"
                fontWeight="500"
                fontSize="20px"
                lineHeight="24px"
                color="primaryBlue.50"
                px="6"
                py="4"
                onClick={() => {
                  onInfoModalClose();
                }}
                _hover={{
                  color: "primaryBlue.50",
                }}
                _focus={{
                  color: "neutral.900",
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>

      <Flex
        align="start"
        direction="column"
        px={{ base: "3", md: "8" }}
        pt="4"
        borderBottom="1px solid"
        borderColor="neutral.200"
        pb="8"
      >
        <SkeletonCircle size="64px" isLoaded={!isLoading && !isError}>
          <Image
            borderRadius="full"
            boxSize="64px"
            src={user?.image}
            alt="User Picture"
          />
        </SkeletonCircle>
        <Text
          fontWeight="600"
          fontSize="24px"
          lineHeight="29px"
          mt="4"
          color="primaryBlue.500"
        >
          Account Details
        </Text>
        <Flex columnGap="10" rowGap="3" mt="6" flexWrap="wrap">
          {[
            {
              title: "User ID",
              data: user?.client_id,
            },
            {
              title: "First name",
              data: user?.first_name,
            },
            {
              title: "Last name",
              data: user?.last_name,
            },
            {
              title: "Email address",
              data: user?.email,
            },
          ].map((item) => (
            <VStack key={item.title} align="start">
              <Text color="neutral.700">{item.title}</Text>
              <Skeleton h="20px" w="100%" isLoaded={!isLoading && !isError}>
                <Text>{item.data}</Text>
              </Skeleton>
            </VStack>
          ))}
        </Flex>
      </Flex>

      <Flex
        align="start"
        direction="column"
        px={{ base: "3", md: "8" }}
        pt="4"
        borderBottom="1px solid"
        borderColor="neutral.200"
      >
        <Text
          fontWeight="600"
          fontSize="24px"
          lineHeight="29px"
          mt="4"
          color="primaryBlue.500"
        >
          Investment Profile
        </Text>

        <Flex flexWrap="wrap" mt="-2" pb="8">
          {[
            {
              title: "Annual income",
              data: user?.employment?.annual_income,
            },
            {
              title: "Investment goal",
              data: user?.investment?.goal,
            },
            {
              title: "Investment experience",
              data: user?.investment?.experience,
            },
            {
              title: "Marital status",
              data: user?.investment?.marital_status,
            },
            {
              title: "Next of kin name",
              data: user?.investment?.next_of_kin_name,
            },
            {
              title: "Next of kin phone",
              data: user?.investment?.next_of_kin_phone,
            },
            {
              title: "Next of kin email",
              data: user?.investment?.next_of_kin_email,
            },
            {
              title: "Next of kin relationship",
              data: user?.investment?.next_of_kin_relationship,
            },
          ].map((item) => (
            <VStack key={item.title} mt="8" align="start" mr="10">
              <Text color="neutral.700">{item.title}</Text>
              <Skeleton h="20px" w="100%" isLoaded={!isLoading && !isError}>
                <Text>{item.data}</Text>
              </Skeleton>
            </VStack>
          ))}
        </Flex>
      </Flex>
      <Flex px={{ base: "3", md: "8" }} direction="column" w="100%" pb="8">
        <Text
          fontWeight="600"
          fontSize="24px"
          lineHeight="29px"
          mt="8"
          color="primaryBlue.500"
          mb="6"
        >
          Document upload
        </Text>

        {/* Image Uploaded Document */}
        <Modal
          isOpen={isUploadedDocOpen}
          onClose={onUploadedDocClose}
          isCentered
        >
          <ModalOverlay bg="rgba(0,0,0,0.8)" />
          <ModalContent bg="transparent">
            <ModalCloseButton
              bg="transparent"
              color="white"
              position="absolute"
              top="-40px"
            />
            <ModalBody
              display="flex"
              flexDirection="column"
              alignItems="center"
              bg="transparent"
            >
              {isLoading ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              ) : !!user?.document?.image ? (
                <>
                  <Image
                    src={user.document.image}
                    width="250px"
                    height="100px"
                    mb="4"
                  />
                  <Text color="white" fontSize="20px" textAlign="center">
                    Image from the Backend Api
                  </Text>
                </>
              ) : (
                <Text color="white" fontSize="20px" textAlign="center">
                  No Image Provided from Backend Api
                </Text>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>

        <Flex
          bg="primaryBlue.50"
          h="193px"
          w="100%"
          direction="column"
          justify="center"
          align="center"
          onClick={() => onUploadedDocOpen()}
        >
          <Skeleton h="24px" w="300px" isLoaded={!isLoading && !isError} mb="3">
            <Text
              textAlign="center"
              fontWeight="500"
              fontSize="20px"
              lineHeight="24px"
              mb="2"
              color="secondaryGre en.700"
            >
              {user?.document?.name}
            </Text>
          </Skeleton>
          <Text
            fontWeight="500"
            fontSize="14px"
            lineHeight="17px"
            color="neutral.800"
          >
            Tap to view uploaded document
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserProfile;
