import React,{useEffect} from "react";
import NoticeList from "../components/NoticeList";
import styles from "../css/Notice.module.css";
import { NavLink } from "react-router-dom";

function AdminNotice() {
  //새로고침하면 스크롤 위치를 상단으로 이동하도록 하기
useEffect(() => {
  window.onbeforeunload = function pushRefresh(){
    window.scrollTo(0,0);
  };
},[]);
  return (
    <div className={styles.fCon}>
      <NavLink to="/manager">
        <button className={styles.toWrite}>글쓰기</button>
      </NavLink>
      <NoticeList />
    </div>
  );
}

export default AdminNotice;
