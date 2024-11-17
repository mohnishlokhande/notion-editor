import { useState } from "react";
import "./App.css";
import TextBlock from "./component/textBlock/TextBlock";
import SelectStyle from "./component/selectStyle/SelectStyle";

// const initState = {
//   id: 0,
//   type: "text",
//   value: {
//     textStyle: "p",
//     text: "",
//     list: [],
//   },
// };

function App() {
  const [blocks, setBlocks] = useState([]);
  const [currentBlock, setCurrentBlock] = useState("");
  const [text, setText] = useState("");
  const [tag, setTag] = useState("p");
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const addBlock = (type) => () => {
    if (type === "text") {
      setCurrentBlock("text");
    } else if (type === "img") {
      setCurrentBlock("img");
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      console.log("called: ", reader);
    };
  };

  const onUndo = () => {
    setBlocks(undoStack[undoStack.length - 1]);
    let undoCur = undoStack;
    undoCur.splice(undoCur.length - 1);
    setUndoStack(undoCur);
    setRedoStack([...redoStack, blocks]);
  };

  const onRedo = () => {
    console.log("###", redoStack);
    setBlocks(redoStack[redoStack.length - 1]);
    let redoCur = redoStack;
    console.log("###", redoStack);
    redoStack.splice(redoStack.length - 1);
    setRedoStack(redoCur);
    setUndoStack([...undoStack, blocks]);
  };

  console.log("###blocks", undoStack, "|", redoStack, "|", blocks);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <button onClick={addBlock("text")} style={{ marginRight: "1rem" }}>
            Add Text
          </button>
          <button onClick={addBlock("img")} style={{ marginRight: "1rem" }}>
            Add Image
          </button>
          <button
            onClick={onUndo}
            style={{ marginRight: "1rem" }}
            disabled={!undoStack.length}
          >
            Undo
          </button>
          <button onClick={onRedo} disabled={!redoStack.length}>
            Redo
          </button>
        </div>

        {currentBlock === "text" && (
          <div className="textRow">
            <SelectStyle setTag={setTag} />
            <input
              value={text}
              type="text"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <button
              onClick={() => {
                let newBlock = {
                  id: blocks.length,
                  type: "text",
                  value: {
                    textStyle: tag,
                  },
                };
                if (tag === "li") {
                  newBlock.value.list = [text];
                } else newBlock.value.text = text;

                setBlocks([...blocks, newBlock]);
                setText("");
                setCurrentBlock("");
              }}
            >
              Save
            </button>
          </div>
        )}
        {currentBlock === "img" && (
          <input
            type="file"
            onChange={(e) => {
              console.log(
                "###file",
                e.target.files[0],
                "|",
                URL.createObjectURL(e.target.files[0])
              );
              let newBlock = {
                id: blocks.length,
                type: "img",
                value: {
                  src: URL.createObjectURL(e.target.files[0]),
                },
              };
              convertToBase64(e.target.files[0]);
              setBlocks([...blocks, newBlock]);
              setCurrentBlock("");
              // let base64String = "";
              // let reader = new FileReader();
              // console.log("next");

              // reader.onload = function () {
              //   base64String = reader.result
              //     .replace("data:", "")
              //     .replace(/^.+,/, "");

              //   // let imageBase64Stringsep = base64String;

              //   // alert(imageBase64Stringsep);
              //   console.log("###base64 =>", base64String);
              // };
            }}
          />
        )}
      </div>

      <div className="contentBlocks">
        {blocks?.map((item, idx) => {
          return (
            <TextBlock
              key={idx}
              item={item}
              blocks={blocks}
              setBlocks={setBlocks}
              setUndoStack={setUndoStack}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
