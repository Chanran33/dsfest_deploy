import React, { useState, useEffect, useCallback, useRef } from "react";
import BoardInsert from "../components/BoardInsert";
import BoardList from "../components/BoardList";
import styles from "../css/Board.module.css";
import HeaderTitle from "../components/HeaderTitle";
import axios from "axios";
const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'

const Board = () => {
  const [texts, setTexts] = useState([]);

  const changeTexts = (text) => {
    setTexts(texts.concat(text));
  };

  useEffect(() => {
    axios
      .get(URL + "/api/board")
      .then((res) => {
        setTexts(res.data);
      })
      .catch((error) => {
        console.log("Network Error : ", error);
        console.log(">>>>>> URL " + URL);
      });
  }, []);

//새로고침하면 스크롤 위치를 상단으로 이동하도록 하기
useEffect(() => {
  window.onbeforeunload = function pushRefresh(){
    window.scrollTo(0,0);
  };
},[]);

  return (
    <div className={styles.boardbody}>
      <BoardInsert texts={texts} changeTexts={changeTexts} />
      <BoardList texts={texts} />
    </div>
  );
};
export default Board;
