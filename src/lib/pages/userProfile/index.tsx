import {
  Button,
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
  Select,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

import ArrowLeftIcon from "../../assets/icons/arrow-left.svg";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg";
import UserAvatar from "../../assets/icons/user-avatar.svg";
import type { UserType } from "lib/types/user";
import type { Users } from "lib/types/users";

const UserProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const users: Users | undefined = queryClient.getQueryData(["users"]);
  const router = useRouter();

  const { clientId } = router.query;

  const userDetail = users?.data?.filter(
    (detail: UserType) => detail.client_id === clientId
  )[0];

  const [overallStatus, setOverallStatus] = useState(
    userDetail?.status?.access
  );

  const [status, setStatus] = useState({
    access: "Denied",
    accountInformation: "Denied",
    investmentProfile: "Denied",
    employmentInformation: "Denied",
    bioInformation: "Denied",
  });

  const handleStatusChange = (e, statusName) => {
    setStatus({ ...status, [statusName]: e.target.value });
  };

  const handleUpdate = () => {};

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
            {`${userDetail?.first_name} ${userDetail?.last_name}`}
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
                  value: status.access,
                },
                {
                  title: "Account information",
                  value: status.accountInformation,
                },
                {
                  title: "Investment profile",
                  value: status.investmentProfile,
                },
                {
                  title: "Employment information",
                  value: status.employmentInformation,
                },
                {
                  title: "Bio information",
                  value: status.bioInformation,
                },
              ].map((item) => (
                <Fragment key={item.value}>
                  <Text color="neutral.700">{item.title}</Text>
                  <Select
                    w="100%"
                    mb="8"
                    variant="filled"
                    onChange={(e) => handleStatusChange(e, item.title)}
                    icon={
                      <Icon
                        as={ChevronDownIcon}
                        boxSize="24px"
                        color="primaryBlue.600"
                      />
                    }
                    placeholder="Select option"
                  >
                    <option value="Denied" selected>
                      Denied
                    </option>
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
                onClick={onClose}
                fontWeight="500"
                fontSize="20px"
                lineHeight="24px"
                color="primaryBlue.50"
                px="6"
                py="4"
                onClick={() => handleUpdate()}
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
        <Icon as={UserAvatar} boxSize="64px" />
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
              data: userDetail?.client_id,
            },
            {
              title: "First name",
              data: userDetail?.first_name,
            },
            {
              title: "Last name",
              data: userDetail?.last_name,
            },
            {
              title: "Email address",
              data: userDetail?.email,
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
              data: "$470.48",
            },
            {
              title: "Investment goal",
              data: "$470.48",
            },
            {
              title: "Investment experience",
              data: "None",
            },
            {
              title: "Marital status",
              data: "Single",
            },
            {
              title: "Next of kin name",
              data: "Kathryn Murphy",
            },
            {
              title: "Next of kin phone",
              data: "nil",
            },
            {
              title: "Next of kin email",
              data: "nil",
            },
            {
              title: "Next of kin relationship",
              data: "Sister",
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
            Document.pdf
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
