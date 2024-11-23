import PropTypes from "prop-types";
import { useState } from "react";

function ListItems({ item, blocks, setBlocks }) {
  const [editingIndex, setEditingIndex] = useState(null);

  const handleDoubleClick = (index) => {
    setEditingIndex(index);
  };
  return (
    <ul>
      {item?.value?.list?.map((child, index) => {
        return (
          <li key={index}>
            {editingIndex === index ? (
              <input
                type="text"
                value={item}
                onChange={(e) => handleChange(index, e.target.value)}
                onBlur={(e) => {
                  let updateBlock = blocks;
                  let list = updateBlock[item.id]?.value?.list;
                  list[index] = e.target.textContent;
                  setBlocks((prevBlocks) =>
                    prevBlocks.map((block) =>
                      block.id === item.id
                        ? {
                            ...block,
                            value: {
                              ...block.value,
                              list: block.value.list.map((item, idx) =>
                                idx === index ? e.target.textContent : item
                              ),
                            },
                          }
                        : block
                    )
                  );
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    setBlocks((prevBlocks) =>
                      prevBlocks.map((block) =>
                        block.id === item.id
                          ? {
                              ...block,
                              value: {
                                ...block.value,
                                list: [...block.value.list, "New item"],
                              },
                            }
                          : block
                      )
                    );
                  }
                }}
                autoFocus
              />
            ) : (
              <span
                onDoubleClick={() => handleDoubleClick(index)}
                style={{ cursor: "pointer" }}
              >
                {child}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default ListItems;

ListItems.propTypes = {
  item: PropTypes.object.isRequired,

  blocks: PropTypes.array.isRequired,
  setBlocks: PropTypes.func.isRequired,
};
