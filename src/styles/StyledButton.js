import styled from "styled-components";

export const StyledButton = styled.button`
  margin: 0 10px;
  font-style: ${(props) => (props.disabled ? "italic" : "none")};
  border: none;
  background-color: ${(props) => (props.disabled ? "none" : "burlywood")};
`;
