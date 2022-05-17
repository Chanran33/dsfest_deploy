import React, { useEffect, useState, useCallback } from "react";
import BoardItem from "./BoardItem";
import styles from "../css/Board.module.css";

const BoardList = ({ texts }) => {
  //console.log(texts);
  const [datalist, setDatalist] = useState([]);

  // 추가 데이터를 로드하는지 아닌지를 담기위한 state
  const [fetching, setFetching] = useState(false);

  //자를 길이
  const DATA_SIZE = 20;

  const [count, setCount] = useState(0);

  const fetchMoreData = useCallback(() => {
    setFetching(true);
    setDatalist(texts.slice(-DATA_SIZE * count));
    setFetching(false);
  }, [count]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight + 1 >= scrollHeight && fetching === false) {
      fetchMoreData();
      setCount(count + 1);
      //console.log(count);
    }
  };

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
  });

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