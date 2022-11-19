/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable no-param-reassign */

import { chakra, Flex, Icon, IconButton, Select } from "@chakra-ui/react";
import ReactDatePicker, {
  type ReactDatePickerProps,
  type ReactDatePickerCustomHeaderProps,
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ChevronLeftIcon from "../../assets/icons/chevron-left.svg";
import ChevronRightIcon from "../../assets/icons/chevron-right.svg";

const ChakraDatePicker = chakra(ReactDatePicker);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const range = (start: number, end: number, step: number) => {
  const length = end - start;
  /*
          Create an array of certain length and set the elements within it from
        start value to end value.
      */
  return Array.from({ length }, (_, idx) => idx * step + start);
};

const CustomDatePickerHeader = (props: ReactDatePickerCustomHeaderProps) => {
  const years = range(2005, new Date().getFullYear() + 1, 1);

  const {
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  } = props;

  return (
    <Flex justify="space-around" align="center">
      <IconButton
        icon={<Icon as={ChevronLeftIcon} boxSize="20px" />}
        bg="transparent"
        _hover={{ bg: "transparent" }}
        _focusVisible={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        px="0"
        boxSize="20px"
        aria-label="Go to previous month"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      />

      <Select
        value={months[date.getMonth()]}
        variant="unstyled"
        _focusVisible={{ borderColor: "secondaryGreen.300" }}
        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
      >
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>

      <Select
        value={date.getFullYear()}
        variant="unstyled"
        _focusVisible={{ borderColor: "secondaryGreen.300" }}
        onChange={({ target: { value } }) => changeYear(Number(value))}
      >
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>

      <IconButton
        icon={<Icon as={ChevronRightIcon} boxSize="20px" />}
        bg="transparent"
        _hover={{ bg: "transparent" }}
        _focusVisible={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        px="0"
        boxSize="20px"
        aria-label="Go to Next month"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      />
    </Flex>
  );
};

const DatePicker = ({ onChange, ...props }: ReactDatePickerProps) => {
  //   const [scrollPosition, setScrollPosition] = useState<number>();

  //   useEffect(() => {
  //     document
  //       ?.getElementById("dashboard-page-parent")
  //       ?.addEventListener("scroll", () => {
  //         setScrollPosition(document.body.scrollTop);
  //       });
  //   });

  //   useEffect(() => {
  //     const pickers = document.querySelectorAll(
  //       ".react-datepicker-popper"
  //     ) as unknown as HTMLCollectionOf<HTMLElement>;
  //     document.addEventListener("scroll", () => {
  //       for (let i = 0; i < pickers.length; i += 1) {
  //         pickers[i].style.display = "none";
  //       }
  //     });
  //   });

  return (
    <ChakraDatePicker
      showPopperArrow={false}
      px="5px"
      borderBottom="1px solid"
      borderColor="neutral.600"
      py="7px"
      display="inline"
      dateFormat="dd/MM/yyyy"
      placeholderText="dd/mm/yyyy"
      closeOnScroll
      selectsEnd
      _focusVisible={{
        outline: "0",
        borderColor: "primaryBlue.500",
      }}
      renderCustomHeader={CustomDatePickerHeader}
      onChange={onChange}
      {...props}
    />
  );
};

export default DatePicker;
