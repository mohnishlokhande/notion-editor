import { useState, useRef } from "react";

const EditableList = () => {
  const [list, setList] = useState(["Item 1", "Item 2", "Item 3"]);
  const [editingIndex, setEditingIndex] = useState(null);
  const inputRefs = useRef([]);

  const handleDoubleClick = (index) => {
    setEditingIndex(index);
  };

  const handleBlur = (index, value) => {
    setList((prevList) =>
      prevList.map((item, i) => (i === index ? value : item))
    );
    setEditingIndex(null);
  };

  const handleKeyDown = (e, index, value) => {
    if (e.key === "Enter") {
      // Add a new item below the current one
      const newList = [...list];
      newList.splice(index + 1, 0, ""); // Insert a blank item
      setList(newList);
      setEditingIndex(index + 1);

      // Focus the next input
      //   setTimeout(() => {
      //     inputRefs.current[index + 1]?.focus();
      //   }, 0);
    }
  };

  const handleChange = (index, value) => {
    setList((prevList) =>
      prevList.map((item, i) => (i === index ? value : item))
    );
  };

  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <li
            key={index}
            style={{ listStyleType: "none", marginBottom: "8px" }}
          >
            {editingIndex === index ? (
              <input
                type="text"
                ref={(el) => (inputRefs.current[index] = el)}
                value={item}
                onChange={(e) => handleChange(index, e.target.value)}
                onBlur={(e) => handleBlur(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index, e.target.value)}
                autoFocus
              />
            ) : (
              <span
                onDoubleClick={() => handleDoubleClick(index)}
                style={{ cursor: "pointer" }}
              >
                {item}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditableList;
