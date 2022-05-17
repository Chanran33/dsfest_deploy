import React, { useEffect, useState, useCallback } from "react";
import BoardItem from "./BoardItem";
import styles from "../css/Board.module.css";

const BoardList = ({ texts }) => {
  const [datalist, setDatalist] = useState([]);

  //자를 길이
  const DATA_SIZE = 10;

  const [count, setCount] = useState(1);

  const fetchMoreData = useCallback(() => {
    //console.log("fetchMoreData");
    setDatalist(texts.slice(-DATA_SIZE * count));
  }, [count,texts]);

  const handleScroll =  useCallback(()=>{
    //console.log("handleScroll");
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if(datalist.length < texts.length){
      if (scrollTop + clientHeight + 200 >= scrollHeight) {
        fetchMoreData();
        setCount((count) => count + 1);
      }
    }
  },[datalist.length, fetchMoreData, texts.length]);
    

  useEffect(() => {
    setDatalist(texts.slice(-DATA_SIZE));
  }, [texts]);

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);

    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  },[handleScroll]);

  return (
    <div className={styles.scrollcontent}>
      {datalist
        .slice()
        .reverse()
        .map((text) => (
          <BoardItem text={text} key={text.id} />
        ))}
    </div>
  );
};

export default BoardList;