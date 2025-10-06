import styled from "styled-components";

const StyledInput = styled.input`
  background: white;
`;

function TextInputWithLabel({ elementId, labelText, onChange, ref, value }) {
  return (
    <>
      <label htmlFor={elementId} style={{ padding: 10 }}>
        {labelText}
      </label>
      <StyledInput
        type="text"
        id={elementId}
        onChange={onChange}
        ref={ref}
        value={value}
        placeholder="add todo"
      ></StyledInput>
    </>
  );
}

export default TextInputWithLabel;
