import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/GeneralLoggedInHeader.tsx";

import "./Blog.css";
import gooseHatImage from "./goosehat.png";

function Blog() {
  const location = useLocation();
  const [DataCont, setDataCont] = useState(location.state.receivedData);
  return (
    <>
      <Header UserData={DataCont}> </Header>

      <div className="body">
        <header className="dashboard">
          <h1>Space For Dashboard</h1>
        </header>
        <div className="content text-blue-700">
          <img
            src={gooseHatImage}
            alt=""
            className="absolute bottom-0 left-0 z-0"
          />
          <h1 className="z-10">
            ​🇸​​🇴​​🇷​​🇷​​🇾​ ​🇫​​🇴​​🇷​ ​🇹​​🇭​​🇪​
            ​🇮​​🇳​​🇨​​🇴​​🇳​​🇻​​🇪​​🇳​​🇮​​🇪​​🇳​​🇨​​🇪​. ​🇹​​🇭​​🇪​
            ​🇵​​🇦​​🇬​​🇪​ ​🇮​​🇸​ ​🇨​​🇺​​🇷​​🇷​​🇪​​🇳​​🇹​​🇱​​🇾​
            ​🇺​​🇳​​🇩​​🇪​​🇷​ ​🇷​​🇪​​🇳​​🇴​​🇻​​🇦​​🇹​​🇮​​🇴​​🇳​
          </h1>
        </div>
      </div>
    </>
  );
}

export default Blog;
