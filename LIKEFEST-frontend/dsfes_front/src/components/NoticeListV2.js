import React, { useState, useEffect } from "react";
import axios from "axios";
import NoticeItem from "./NoticeItem";
const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'

const NoticeListV2 = () => {
  const [contents, setContents] = useState([]);
  // 데이터 불러오기
  useEffect(() => {
    axios
      .get(URL + "/api/notice")
      .then((res) => {
        const filtering = [];
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].noTag === 2) {
            filtering.push(res.data[i]);
          }
        }
        console.log(res.data[0].noTag);
        setContents(filtering);
        console.log(contents);
      })
      .catch((error) => console.log("Network Error : ", error));
  }, []);

  return (
    <div style={{ marginTop: "25px" }}>
      {contents.reverse().map((content) => (
        <NoticeItem content={content} key={content.id} />
      ))}
    </div>
  );
};

export default NoticeListV2;