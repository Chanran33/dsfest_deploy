import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//수정이 제작
export default function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(()=>{
        window.scrollTo(0,0);
    }, [pathname]);
    return null;
}