import React from "react";
import { Link, useLocation } from "react-router-dom";
import s from "../css/HeaderTitle.module.css";
const HeaderTitle = (props) => {
  function TagList() {
    return (
      <div className={s.htContainer}>
        <div className={s.htALL}>
          <Link className={s.tagNone} to="/Notice">
            ALL
          </Link>
        </div>
        <div className={s.htNotice}>
          <Link className={s.tagNone} to="/Notice1">
            NOTICE
          </Link>{" "}
        </div>
        <div className={s.htEvent}>
          <Link className={s.tagNone} to="/Notice2">
            EVENT
          </Link>
        </div>
        <div className={s.htProgram}>
          <Link className={s.tagNone} to="/Notice3">
            PROGRAM
          </Link>
        </div>
      </div>
    );
  }
  const location = useLocation();
  return (
    <div className={s.header}>
      <p className={s.headerTitle}>{props.title}</p>
      <div>
        {`${location.pathname}` === "/Notice" ||
        `${location.pathname}` === "/Notice1" ||
        `${location.pathname}` === "/Notice2" ||
        `${location.pathname}` === "/Notice3" ? (
          <TagList />
        ) : null}{" "}
      </div>
    </div>
  );
};

export default HeaderTitle;