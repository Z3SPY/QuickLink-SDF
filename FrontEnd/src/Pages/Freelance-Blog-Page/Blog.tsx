import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/GeneralLoggedInHeader.tsx";

import "./Blog.css";
import gooseHatImage from "./goosehat.png";

function Blog() {
  const location = useLocation();
  const [DataCont, setDataCont] = useState(location.state.recievedData);
  return (
    <>
      <Header UserData={DataCont}> </Header>

      <div className="body">
        <header className="dashboard">
          <h1>Space For Dashboard</h1>
        </header>
        <div
          className="content"
          style={{ backgroundImage: `url(${gooseHatImage})` }}
        >
          <h1>We Are Currently Working on this Page right now</h1>
        </div>
      </div>
    </>
  );
}

export default Blog;
