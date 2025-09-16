import styled from "styled-components";

function TextInputWithLabel({ elementId, labelText, onChange, ref, value }) {
  const StyledInput = styled.input`
    background: white;
  `;

  return (
    <>
      <label htmlFor={elementId} style={{ padding: 10 }}>
        {labelText}
      </label>
      <StyledInput
        type="text"
        id={elementId}
        onChange={onChange}
        red={ref}
        value={value}
        placeholder="add todo"
      ></StyledInput>
    </>
  );
}

export default TextInputWithLabel;
