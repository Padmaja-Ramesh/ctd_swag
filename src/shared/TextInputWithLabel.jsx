function TextInputWithLabel({ elementId, labelText, onChange, ref, value }) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        type="text"
        id={elementId}
        onChange={onChange}
        red={ref}
        value={value}
      ></input>
    </>
  );
}

export default TextInputWithLabel;
