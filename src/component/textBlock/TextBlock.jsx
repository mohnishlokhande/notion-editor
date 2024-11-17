import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./TextBlock.module.css";

function TextBlock(props) {
  const { item, blocks, setBlocks, setUndoStack } = props;
  const [count, setCount] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [txt, setTxt] = useState(item.value.text);
  // console.log("###txt", item, "|", blocks);
  const onSelectText = () => {
    if (count == 1) {
      setIsEdit(true);
    }
    setCount(count + 1);
    setTimeout(() => {
      setCount(0);
    }, 500);
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
    return <img src={item.value.src} alt="img" />;
  }

  if (item?.value.textStyle === "ul") {
    return (
      <ul>
        {item?.value?.list?.map((child, index) => {
          return <li key={index}>{child}</li>;
        })}
      </ul>
    );
  }

  return (
    <div onClick={onSelectText}>
      {isEdit ? (
        <input
          value={txt}
          onChange={(e) => {
            console.log("###change", e.key);
            setTxt(e.target.value);
          }}
          onBlur={onBlur}
          onKeyPress={(e) => {
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
