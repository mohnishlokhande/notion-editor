import PropTypes from "prop-types";

function SelectStyle({ setTag }) {
  return (
    <select
      name="styleType"
      onChange={(e) => {
        setTag(e.target.value);
      }}
    >
      <option value="p">Paragraph</option>
      <option value="h3">Heading 3</option>
      <option value="ul">List</option>
      {/* <option value="ul">List item</option> */}
    </select>
  );
}

export default SelectStyle;
SelectStyle.propTypes = {
  setTag: PropTypes.func.isRequired,
};
