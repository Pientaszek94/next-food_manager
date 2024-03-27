import styled from "styled-components";

const SlideFavourites = styled.div<{ $categoryIndex: number; $index: number }>(
  (props) => ({
    width: "80%",
    height: "500px",
    opacity: props.$categoryIndex == props.$index ? "1" : "0",
    overflowY: "scroll",
    transition: "opacity 1s ease-in-out",
  }),
);

export default SlideFavourites;
