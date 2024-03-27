import styled from "styled-components";

const SliderFavourites = styled.div<{ $categoryIndex: number }>((props) => ({
  width: "200%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  transition: "margin-left 1s ease-in-out",
  marginLeft: `${-100 * props.$categoryIndex}%`,
}));

export default SliderFavourites;
