import styled from "styled-components";

const ButtonFavourites = styled.button<{
  $categoryIndex?: number;
  $buttonIndex?: number;
}>((props) => ({
  borderBottom:
    props.$categoryIndex == props.$buttonIndex ? "2px solid orange" : "none",
}));

export default ButtonFavourites;

// border-bottom: ${props=>props.$categoryIndex==props.$buttonIndex?"2px solid orange":"none"};
