import styled from "styled-components";

const RecipePreviewSLider = styled.div<{
  $postsLength: number | null | undefined;
  $checkedIndex: number | null | undefined;
}>((props) => ({
  width: "100%",
  height: `${47 * props.$postsLength!}px`,
  marginTop: `${-47 * props.$checkedIndex!}px`,
  display: "flex",
  flexDirection: "column",
  transition: "margin-top 0.5s ease-in-out",
}));

export default RecipePreviewSLider;
