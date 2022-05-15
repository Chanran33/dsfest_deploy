import React, { useCallback, useState, useEffect } from "react";
import "../css/reset.css";
import styles from "../css/Menubar.module.css";
import googleADs from "../img/GoogleADs1.png";
import { Link, NavLink, Outlet } from "react-router-dom";
import FesLogo from "../img/FesLogo.svg";
import HeaderTitle from "../components/HeaderTitle";
import { useLocation } from "react-router-dom";
import Gate from "../components/Gate";
// import megaphone from "../img/emoji_megaphone.png";

const Menubar = () => {
  // 스크롤 시, 메뉴 상태
  const [show, setShow] = useState(false);
  // 메뉴 열림,닫힘 상태
  const [menuActive, setMenuActive] = useState(false);
  const MenuStateHandle = useCallback((e) => {
    setMenuActive(!menuActive);
  });
  useEffect(
    (e) => {
      if (menuActive) {
        console.log("열렸습니다.");
        // setShow(true);
      } else {
        console.log("닫혔습니다.");
        // setShow(false);
      }
    },
    [menuActive]
  );
  //페이지 이동 시, 메뉴 바 닫기
  const menuClose = useCallback((e) => {
    setMenuActive(false);
  });
  // 스크롤 시, 메뉴 색 변경
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  //태영: Home제외하고 나머지 Header영역 뜨게 하기
  const [home, setHome] = useState(true);
  const [title, setTitle] = useState("");
  const location = useLocation();

  const links = {
    "/Notice": ["총학생회에서", <br />, "알려드립니다."],
    "/Notice1": ["총학생회에서", <br />, "알려드립니다."],
    "/Notice2": ["총학생회에서", <br />, "알려드립니다."],
    "/Notice3": ["총학생회에서", <br />, "알려드립니다."],
    "/TimeTable": ["TIME TABLE"],
    "/Event": ["새로워진", <br />, "덕새를 찾아라"],
    "/Board": ["덕우들의 새로고침", <br />, "어떠셨나요?"],
    // 은빈 :  adminntc, update 추가
    "/adminntc": ["총학생회용", <br />, "페이지 입니다."],
    "/update": ["총학생회용", <br />, "수정 페이지 입니다. "],
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setHome(true);
    } else {
      setHome(false);
      setTitle(links[location.pathname]);
    }
  }, [location.pathname]);

  useEffect(() => {
    let ins = document.createElement('ins');
    let scr = document.createElement('script');
  
    ins.className = 'kakao_ad_area';
    ins.style = "display:none;";
    scr.async = 'true';
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    ins.setAttribute('data-ad-width', '320');
    ins.setAttribute('data-ad-height', '100');
    ins.setAttribute('data-ad-unit', 'DAN-xb5voNvTNo4ukHrs');
  
    document.querySelector('.adfit').appendChild(ins);
    document.querySelector('.adfit').appendChild(scr);
  },[]);

  return (
    <div className={styles.frame}>
      <div className={styles.menubar}>
        {home ? null : <div className={styles.menuSpaceBox} />}

        <div
          className={
            home
              ? show
                ? styles.HeaderScroll
                : styles.HeaderOpacity
              : styles.Header
          }
        >
          <div className={styles.HeaderTop}>
            <Link className={styles.FesLogoLink} to="/" onClick={menuClose}>
              {home ? null : <img src={FesLogo} />}
            </Link>
            <div
              className={
                menuActive
                  ? styles.hamburger + " " + styles.active
                  : styles.hamburger
              }
              onClick={MenuStateHandle}
            >
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </div>
          </div>
          <div className={styles.HeaderBottom}>
            <ul className={menuActive ? styles.NavMenuActive : styles.NavMenu}>
              <NavLink
                to="/Notice"
                className={({ isActive }) =>
                  isActive ? styles.navActive : styles.nav
                }
                onClick={menuClose}
              >
                <li className={styles.NavItem}>NOTICE</li>
              </NavLink>
              <NavLink
                to="/TimeTable"
                className={({ isActive }) =>
                  isActive ? styles.navActive : styles.nav
                }
                onClick={menuClose}
              >
                <li className={styles.NavItem}>TIME TABLE</li>
              </NavLink>
              <NavLink
                to="/Event"
                className={({ isActive }) =>
                  isActive ? styles.navActive : styles.nav
                }
                onClick={menuClose}
              >
                <li className={styles.NavItem}>EVENT</li>
              </NavLink>
              <NavLink
                to="/Board"
                className={({ isActive }) =>
                  isActive ? styles.navActive : styles.nav
                }
                onClick={menuClose}
              >
                <li className={styles.NavItem}>GUEST BOOK</li>
              </NavLink>
            </ul>
          </div>
        </div>

        {home === true ? "" : <HeaderTitle title={title} />}

        {home === true ? <Gate /> : ""}

        <div className={styles.Content}>
          <Outlet />
        </div>

        <div className={styles.FooterMenu}>
          <p className={styles.F_Head}>2022 덕성여자대학교 근화제 [새로고침]</p>
          <div className={styles.FooterContent1}>
            <p className={styles.F_Header}>개발</p>
            <div className={styles.F_Content}>
              <p className={styles.name}>멋쟁이 사자처럼 덕성여자대학교</p>
              <p>Front-end</p>
              <p className={styles.name}>강태영 권은빈 김수정 남서현 유다영 허은</p>
              <p>Back-end</p>
              <p className={styles.name}>홍인혜</p>
            </div>
          </div>
          <div className={styles.FooterContent2}>
            <p className={styles.F_Header}>디자인</p>
            <div className={styles.F_Content}>
              <p>UI/UX</p>
              <p className={styles.name}>정지영</p>
            </div>
          </div>
        </div>
        <div className={styles.AdBanner}>
          <div className="adfit"/>
          <img src={googleADs} />          
        </div>
      </div>
    </div>
  );
};
export default Menubar;
