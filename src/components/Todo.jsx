import React, { useEffect, useState } from "react";
import * as Unicons from "@iconscout/react-unicons";
import {
  handleOnFocus,
  handleOnBlur,
  handleMouseEnter,
} from "./JSStyleHandlers.js";

const imgData = {
  path: require("../assets/icons/todolist_Image.png"),
  alt: "todolist image here",
};

// *====================================GETTING DATA FROM LOCAL STORAGE============================
const getItems = () => {
  const listItems = localStorage.getItem("item");

  if (listItems) {
    return JSON.parse(localStorage.getItem("item"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getItems());
  const [toggle, setToggle] = useState(true);
  const [edit, setEdit] = useState(null);
  const [id, setId] = useState();
  const [done, setDone] = useState(true);

  // *=======================================ADD ITEM==============================================
  const handleAddItem = (e) => {
    e.preventDefault();
    if (inputData === "") {
      window.alert("Can't add empty data");
    } else if (inputData && !toggle) {
      {
        setItems(
          items.map((item) => {
            if (item.id === edit) {
              return {
                ...item,
                name: inputData,
              };
            } else {
              return item;
            }
          })
        );
        setToggle(true);
        setInputData("");
        setEdit(null);
      }
    } else {
      const itemsData = {
        id: items.length + 1,
        name: inputData,
      };
      setItems([...items, itemsData]);
      setInputData("");
    }
  };

  // *========================================DELETE ITEM================================
  const handleDeleteItem = (i) => {
    const deletedItems = items.filter((item) => {
      return i !== item.id;
    });
    setItems(deletedItems);
  };

  // *========================================EDIT ITEM==================================
  const handleEditItem = (i) => {
    let newEditedItem = items.find((item) => {
      if (item.id === i + 1) {
        return item;
      }
    });
    setInputData(newEditedItem.name);
    setId(newEditedItem.id);
    setDone(!true);
    setToggle(false);
  };

  // *===========================================UPDATE ITEM================================

  const handleUpdate = () => {
    const newArr = items.map((item) => {
      if (item.id === id) {
        return { ...item, name: inputData };
      }
      return item;
    });
    setItems(newArr);
    setInputData("");
    setToggle(true);
    setDone(true);
  };
  // *======================================REMOVE ALL ITEMS===============================

  const removeAll = () => {
    setItems([]);
  };

  //*=========================================STORING DATA TO LOCAL STORAGE==============
  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main h-100-v w-100 flex-centered">
        <div className="main-inner flex-column-centered h-90-p w-80">
          {/* ======================HEADER========================= */}
          <figure className="flex-column-centered">
            <img src={imgData.path} alt={imgData.alt} />
            <figcaption>Add Todo Items Here 👇</figcaption>
          </figure>

          {/* ======================ITEMS ADDER==================== */}
          <form
            onSubmit={(e) => {
              handleAddItem(e);
            }}
            className="w-30"
          >
            <div className="add-items w-100 flex-evenly">
              <input
                type="text"
                placeholder="✍ Add items..."
                className="w-80"
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
              {toggle && (
                <button type="submit" className="btn">
                  <Unicons.UilPlusCircle
                    color="var(--white)"
                    size="28"
                    onMouseEnter={handleMouseEnter}
                  />
                </button>
              )}
              {/* =========================UPDATE ITEMS================ */}
              {!done && (
                <button type="button" className="btn">
                  <Unicons.UilCheckCircle
                    color="var(--white)"
                    size="28"
                    onMouseEnter={handleMouseEnter}
                    onClick={handleUpdate}
                  />
                </button>
              )}
            </div>
          </form>

          {/* ======================SHOWN ITEMS==================== */}
          <div className="show-items w-30">
            {items.map((item, index) => {
              return (
                <div
                  className="shown-item w-100 flex-spaced margin-t-15"
                  key={item.id}
                >
                  <h3>{item.name}</h3>
                  <div className="inputbuttons w-20 flex-spaced">
                    <Unicons.UilPen
                      color="var(--bluish-green)"
                      size="25"
                      onMouseEnter={handleMouseEnter}
                      onClick={() => {
                        handleEditItem(index);
                      }}
                    />
                    <Unicons.UilTrashAlt
                      color="var(--deep-blue)"
                      size="25"
                      onMouseEnter={handleMouseEnter}
                      onClick={() => handleDeleteItem(item.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ======================ITEMS REMOVER=================== */}
          <div className="remove-all-items">
            <button
              onClick={removeAll}
              onMouseEnter={handleMouseEnter}
              className="remover-btn"
            >
              Remove All Items
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
