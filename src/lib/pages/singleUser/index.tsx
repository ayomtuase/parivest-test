import {
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { type ChangeEvent, Fragment, useState } from "react";

import ArrowLeftIcon from "../../assets/icons/arrow-left.svg";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg";
import type { SingleUserType } from "lib/types/singleUserType";
import { apiClient } from "lib/utils/apiClient";

const UserProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isInfoModalOpen,
    onOpen: onInfoModalOpen,
    onClose: onInfoModalClose,
  } = useDisclosure();

  // const queryClient = useQueryClient();

  // const users: Users | undefined = queryClient.getQueryData(["users"]);
  const router = useRouter();

  const { id } = router.query;

  const { data: user }: Partial<{ data: SingleUserType }> = useQuery(
    ["user", id],
    () =>
      apiClient.get(`/users/single?id=${id}`).then((res) => {
        return res?.data?.data;
      })
  );

  // const userDetail = users?.data?.filter(
  //   (detail: UserType) => detail.client_id === clientId
  // )[0];

  const [overallStatus, setOverallStatus] = useState("");

  const [status, setStatus] = useState({
    access: "Denied",
    accountInformation: "Denied",
    investmentProfile: "Denied",
    employmentInformation: "Denied",
    bioInformation: "Denied",
  });

  const handleStatusChange = (
    e: ChangeEvent<HTMLSelectElement>,
    statusName: string
  ) => {
    setStatus((s) => {
      return { ...s, [statusName]: e.target.value };
    });
  };

  const handleUpdate = () => {
    if (Object.values(status).some((s) => s === "Pending")) {
      setOverallStatus("Pending");
    }
    if (Object.values(status).some((s) => s === "In review")) {
      setOverallStatus("In review");
    }
    if (Object.values(status).every((s) => s === "Approved")) {
      setOverallStatus("Approved");
    }
    onClose();
    onInfoModalOpen();
  };

  return (
    <Flex bg="white" direction="column">
      <Flex
        px="8"
        py="5"
        justify="space-between"
        borderBottom="1px solid"
        borderColor="neutral.200"
      >
        <HStack>
          <Icon
            as={ArrowLeftIcon}
            boxSize="24px"
            onClick={() => router.back()}
          />
          <Text
            color="primaryBlue.500"
            fontWeight="700"
            fontSize="24px"
            lineHeight="29px"
          >
            {`${user?.first_name} ${user?.last_name}`}
          </Text>
        </HStack>
        <Button
          color="primaryBlue.500"
          bg="primaryBlue.100"
          fontWeight="500"
          fontSize="14px"
          lineHeight="17px"
          onClick={onOpen}
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
                  value: status.access,
                },
                {
                  title: "Account information",
                  name: "accountInformation",
                  value: status.accountInformation,
                },
                {
                  title: "Investment profile",
                  name: "investmentProfile",
                  value: status.investmentProfile,
                },
                {
                  title: "Employment information",
                  name: "employmentInformation",
                  value: status.employmentInformation,
                },
                {
                  title: "Bio information",
                  name: "bioInformation",
                  value: status.bioInformation,
                },
              ].map((item) => (
                <Fragment key={item.title}>
                  <Text color="neutral.700">{item.title}</Text>
                  <Select
                    w="100%"
                    mb="8"
                    variant="filled"
                    onChange={(e) => handleStatusChange(e, item.name)}
                    icon={
                      <Icon
                        as={ChevronDownIcon}
                        boxSize="24px"
                        color="primaryBlue.600"
                      />
                    }
                    placeholder="Select option"
                    defaultValue={item.value}
                  >
                    <option value="Denied">Denied</option>
                    <option value="Pending">Pending</option>
                    <option value="In review">In review</option>
                    <option value="Approved">Approved</option>
                  </Select>
                </Fragment>
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
        <Modal onClose={onClose} isOpen={isInfoModalOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Status</ModalHeader>
            <ModalCloseButton color="secondaryGreen.600" />
            <ModalBody>
              <Text>Overall Status: {overallStatus}</Text>{" "}
              <Text>API call should happen now</Text>
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
      </Flex>

      <Flex
        align="start"
        direction="column"
        px="8"
        pt="4"
        borderBottom="1px solid"
        borderColor="neutral.200"
        pb="8"
      >
        <Image
          borderRadius="full"
          boxSize="64px"
          src={user?.image}
          alt="User Picture"
        />
        <Text
          fontWeight="600"
          fontSize="24px"
          lineHeight="29px"
          mt="4"
          color="primaryBlue.500"
        >
          Account Details
        </Text>
        <HStack spacing="10" mt="6">
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
              <Text>{item.data}</Text>
            </VStack>
          ))}
        </HStack>
      </Flex>

      <Flex
        align="start"
        direction="column"
        px="8"
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
              <Text>{item.data}</Text>
            </VStack>
          ))}
        </Flex>
      </Flex>
      <Flex px="8" direction="column" w="100%" pb="8">
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

        <Flex
          bg="primaryBlue.50"
          h="193px"
          w="100%"
          direction="column"
          justify="center"
          align="center"
        >
          <Text
            fontWeight="500"
            fontSize="20px"
            lineHeight="24px"
            mb="2"
            color="secondaryGreen.700"
          >
            {user?.document?.name}
          </Text>
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
