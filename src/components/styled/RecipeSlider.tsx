import styled from "styled-components";

const RecipeSlider = styled.div<{
  $postsLength?: number | null;
  $currentRecipe?: number | null;
}>((props) => ({
  width: `${100 * props.$postsLength!}%`,
  marginLeft: `${-100 * props.$currentRecipe!}%`,
  height: "100%",
  display: "flex",
  flexDirection: "row",
  transition: "margin-left 1s ease-in-out",
}));

export default RecipeSlider;
