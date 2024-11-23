import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./TextBlock.module.css";
import ListItems from "./listItems/ListItems";

function TextBlock(props) {
  const { item, blocks, setBlocks, setUndoStack } = props;

  const [isEdit, setIsEdit] = useState(false);
  const [txt, setTxt] = useState(item.value.text);

  const onSelectText = () => {
    setIsEdit(true);
  };

  const onBlur = () => {
    setIsEdit(false);

    let newBlocks = blocks.map((block) => {
      if (block.id === item.id) {
        return {
          ...block,
          value: {
            ...block.value,
            text: txt,
          },
        };
      }
      return block;
    });
    setUndoStack((prev) => [...prev, blocks]);
    setBlocks(newBlocks);
  };

  if (item.type === "img") {
    return (
      <img
        src={item.value.src}
        alt="img"
        style={{ width: "90vw", padding: "1rem 0rem" }}
      />
    );
  }

  if (item?.value.textStyle === "ul") {
    return <ListItems blocks={blocks} setBlocks={setBlocks} item={item} />;
  }

  return (
    <div onDoubleClick={onSelectText}>
      {isEdit ? (
        <input
          autoFocus
          value={txt}
          onChange={(e) => {
            console.log("###change", e.key);
            setTxt(e.target.value);
          }}
          onBlur={onBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log("###clcik", e.key);
            }
            console.log("###clcik", e.key);
          }}
          className={styles.inputbox}
        />
      ) : (
        <>
          <item.value.textStyle>{item?.value?.text}</item.value.textStyle>
        </>
      )}
    </div>
  );
}

export default TextBlock;

TextBlock.propTypes = {
  item: PropTypes.object.isRequired,
  blocks: PropTypes.array.isRequired,
  setBlocks: PropTypes.func.isRequired,
  setUndoStack: PropTypes.func.isRequired,
};
