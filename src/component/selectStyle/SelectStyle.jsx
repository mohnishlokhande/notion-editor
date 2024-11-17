import PropTypes from "prop-types";

function SelectStyle({ setTag }) {
  return (
    <select
      name="styleType"
      //   onSelect={(e) => {
      //     console.log("###select", e.target);
      //   }}
      onChange={(e) => {
        setTag(e.target.value);
        console.log("###selec%%%%t", e.target.value);
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
