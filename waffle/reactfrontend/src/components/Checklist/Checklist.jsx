import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import ChecklistItem from "./ChecklistItem";
import { HiDotsVertical } from "react-icons/hi";
import ChecklistIcon from "./ChecklistIcon";

const ChecklistList = () => {
  //code
  let { id } = useParams();
  const token = localStorage.getItem("access_token");
  const [checklistData, setChecklistData] = useState();
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [color, setColor] = useState("");
  const [clear, setClear] = useState("");

  const [editName, setEditName] = useState("");
  const [editStart, setEditStart] = useState("");
  const [editEnd, setEditEnd] = useState("");
  const [editChecklist, setEditChecklist] = useState(false);
  const [editChecklistData, setEditChecklistData] = useState();

  const [addContent, setAddContent] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [addCurrency, setAddCurrency] = useState("");

  const [restart, setRestart] = useState("");

  useEffect(() => {
    axios
      .get(`/checklist/get-checklist/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data1 = response.data.list;
        const data2 = response.data.country;
        const data3 = response.data.name;
        const data4 = response.data.start;
        const data5 = response.data.end;
        const data6 = response.data.color;
        const data7 = response.data.clear;
        setChecklistData(data1);
        setEditChecklistData(data1);
        setCountry(data2);
        setName(data3);
        setEditName(data3);
        setStart(data4);
        setEditStart(data4);
        setEnd(data5);
        setEditEnd(data5);
        setColor(data6);
        setClear(data7);
        console.log(response.data);
      });
  }, [restart]);

  const [isListVisible, setListVisible] = useState(false);

  const toggleList = (e) => {
    setListVisible(!isListVisible);
    e.stopPropagation();
  };

  const editClear = () => {
    console.log(editChecklistData);
    axios
      .put(
        "/checklist/modify-checklist",
        {
          id: id,
          start: editStart,
          end: editEnd,
          name: editName,
          list: editChecklistData,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setEditChecklist(false);
        setRestart(response);
      });
  };

  const editCancle = () => {
    setEditChecklistData(checklistData);
    setEditName(name);
    setEditStart(start);
    setEditEnd(end);
    setEditChecklist(false);
  };

  const addChecklistItem = () => {
    console.log(id);
    console.log(addContent);
    console.log(addCurrency);
    console.log(addPrice);
    axios
      .post(
        "/checklist/add-checklist-item",
        {
          checklistListId: id,
          content: addContent,
          currency: addCurrency,
          order: 1000,
          price: addPrice,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setAddContent("");
        setAddCurrency("");
        setAddPrice("");
        setRestart(response);
      });
  };

  // html
  return (
    <ChecklistListWrapper>
      <div class="head">
        {editChecklist === false ? (
          <div class="title">
            <label style={{ width: "30px" }} />
            {name}
            <HiDotsVertical size="25" onClick={toggleList} />
          </div>
        ) : (
          <div class="title">
            <input
              type="text"
              class="editTitle"
              defaultValue={editName}
              onChange={(e) => {
                setEditName(e.target.value);
              }}
            />
          </div>
        )}
        {isListVisible === true ? (
          <div class="iconList">
            <ChecklistIcon
              isListVisible={isListVisible}
              setListVisible={setListVisible}
              setEditChecklist={setEditChecklist}
              id={id}
              clear={clear}
            />
          </div>
        ) : null}
        {editChecklist === false ? (
          <div class="date">
            {start} ~ {end}
          </div>
        ) : (
          <div class="editDate">
            <input
              type="text"
              class="editTitle"
              defaultValue={editStart}
              style={{ width: "30vw" }}
              onChange={(e) => {
                setEditStart(e.target.value);
              }}
            />
            <input
              type="text"
              class="editTitle"
              defaultValue={editEnd}
              style={{ width: "30vw" }}
              onChange={(e) => {
                setEditEnd(e.target.value);
              }}
            />
          </div>
        )}
      </div>
      <div class="body">
        <div class="bodyColumn">
          <div class="columnAll">전체</div>
          <div class="columnPrice">비용</div>
        </div>
        {editChecklistData?.map((list) => (
          <ChecklistItem
            key={list.id}
            checklistListId={id}
            id={list.id}
            price={list.price}
            currency={list.currency}
            content={list.content}
            check={list.check}
            editChecklist={editChecklist}
            editChecklistData={editChecklistData}
            setEditChecklistData={setEditChecklistData}
          />
        ))}
      </div>
      {editChecklist === false ? (
        <div class="foot">
          <div class="addInput">
            <input
              type="text"
              value={addContent}
              class="addContent"
              onChange={(e) => {
                setAddContent(e.target.value);
              }}
            />
            <input
              type="text"
              value={addPrice}
              class="addPrice"
              onChange={(e) => {
                setAddPrice(e.target.value);
              }}
            />
            <input
              type="text"
              value={addCurrency}
              class="addCurrency"
              onChange={(e) => {
                setAddCurrency(e.target.value);
              }}
            />
          </div>
          <div class="addButton">
            <button class="addBtn" onClick={() => addChecklistItem()}>
              +
            </button>
          </div>
        </div>
      ) : null}
      {editChecklist === false ? null : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            position: "absolute",
            left: "11vw",
            position: "sticky",
            bottom: "2vh",
          }}
        >
          <button class="editBtn" onClick={() => editClear()}>
            저장
          </button>
          <button class="editBtn" onClick={() => editCancle()}>
            취소
          </button>
        </div>
      )}
    </ChecklistListWrapper>
  );
};

// css
const ChecklistListWrapper = styled.div`
  .head {
    padding: 2vh;
    padding-bottom: 1vh;
  }
  .title {
    margin-top: 3vh;
    display: flex;
    justify-content: space-between;
    font-size: 4vh;
  }
  .editTitle {
    display: block;
    width: 67%;
    color: #909090;
    border: 0;
    border-bottom: 1px solid #8c8c8c;
    background-color: transparent;
    box-sizing: border-box;
    border-radius: 0;
    padding: 0;
    height: 36px;
    line-height: 1.33;
    font-size: 18px;
    font-family: inherit;
    vertical-align: baseline;
    -webkit-appearance: none;
    overflow: visible;
    margin: 0;
  }
  .editTitle:focus {
    outline: 0;
    border-color: #76a8de;
    border-width: 2px;
    color: #76a8de;
  }
  .iconList {
    position: absolute;
    z-index: 100;
    right: 3vh;
    background-color: white;
    padding: 0vh 2vh 0vh 2vh;
    border: 1px solid black;
    border-radius: 15px;
  }
  .date {
    display: flex;
    justify-content: right;
    margin-top: 1vh;
  }
  .editDate {
    margin-top: 1vh;
    display: flex;
    justify-content: space-between;
  }
  .body {
    padding: 2vh;
  }
  .bodyColumn {
    padding-top: 0;
    display: flex;
    justify-content: space-around;
  }
  .columnAll {
    padding: 1vh;
    width: 70%;
    border-top: 2px solid #76a8de;
    border-right: 2px solid #76a8de;
  }
  .columnPrice {
    padding: 1.5vh;
    width: 30%;
    border-top: 2px solid #76a8de;
    border-right: 2px solid #76a8de;
  }
  .threeDotIcon {
    display: flex;
    justify-content: right;
  }
  .editBtn {
    width: 35vw;
    height: 5vh;
    border: none;
    border-radius: 15px;
    background-color: #9ac5f4;
    color: white;
    font-size: 2.3vh;
    margin-right: 2vw;
    margin-left: 2vw;
    &:active {
      background-color: #56a2f4;
    }
  }
  .foot {
    border: 1px solid #69a768;
    border-radius: 20px;
    padding: 2vh;
    position: sticky;
    bottom: 2vh;
    background-color: white;
  }
  .addInput {
    margin-bottom: 2vh;
    display: flex;
    justify-content: space-around;
  }
  .addContent {
    display: block;
    color: #909090;
    width: 46vw;
    border: 0;
    border-bottom: 1px solid #8c8c8c;
    background-color: transparent;
    box-sizing: border-box;
    border-radius: 0;
    padding: 0;
    height: 36px;
    line-height: 1.33;
    font-size: 18px;
    font-family: inherit;
    vertical-align: baseline;
    -webkit-appearance: none;
    overflow: visible;
    margin: 0;
    &:focus {
      outline: 0;
      border-color: #76a8de;
      border-width: 2px;
      color: #76a8de;
    }
  }
  .addPrice {
    display: block;
    color: #909090;
    width: 20vw;
    border: 0;
    border-bottom: 1px solid #8c8c8c;
    background-color: transparent;
    box-sizing: border-box;
    border-radius: 0;
    padding: 0;
    height: 36px;
    line-height: 1.33;
    font-size: 18px;
    font-family: inherit;
    vertical-align: baseline;
    -webkit-appearance: none;
    overflow: visible;
    margin: 0;
    &:focus {
      outline: 0;
      border-color: #76a8de;
      border-width: 2px;
      color: #76a8de;
    }
  }
  .addCurrency {
    display: block;
    color: #909090;
    width: 5vw;
    border: 0;
    border-bottom: 1px solid #8c8c8c;
    background-color: transparent;
    box-sizing: border-box;
    border-radius: 0;
    padding: 0;
    height: 36px;
    line-height: 1.33;
    font-size: 18px;
    font-family: inherit;
    vertical-align: baseline;
    -webkit-appearance: none;
    overflow: visible;
    margin: 0;
    &:focus {
      outline: 0;
      border-color: #76a8de;
      border-width: 2px;
      color: #76a8de;
    }
  }
  .addBtn {
    background-color: white;
    border-radius: 5px;
    border-width: 2px;
    &:active {
      border-color: #76a8de;
      color: #76a8de;
    }
  }
`;

export default ChecklistList;
