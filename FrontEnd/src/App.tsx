import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useState } from "react";
import LandingPage from "./Pages/Landing-Page/Landing-Page";
import FreelanceSelector from "./Pages/Freelance-Lists/Freelance";
import UserContentPage from "./Pages/Freelance-Content-Page/UserContentPage";
import ProfilePage from "./Pages/Profile/ProfilePage";
import JobsContentPage from "./Pages/Job-Page-Content-Page/JobsContentPage";
import JobsPage from "./Pages/Jobs-Page/JobsPage";
import LoggedInHeader from "./Components/Header/LoggedInHeader";
import UploadPage from "./Pages/UploadPage/Upload.tsx";
import Blog from "./Pages/Freelance-Blog-Page/Blog.tsx";
import Support from "./Pages/Contact-Support/Support.tsx";

import "./css/App.css";

function App() {
  const [count, setCount] = useState(0);

  //<LandingPage/>
  //<FreelanceSelector />
  //<Login />

  ///PLEASE PUT HEADER IN APS SECTION TO AVOID RERENDERING

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Posts" element={<FreelanceSelector />} />
        <Route
          path="/UserPost/:PostsID"
          element={<UserContentPage />}
          loader={({ params }) => {
            // console.log(params.PostsID);
            return params;
          }}
        />

        <Route path="/Blog" element={<Blog />} />
        <Route path="/Support" element={<Support />} />

        <Route path="/Jobs" element={<JobsPage />} />
        <Route path="/JobsPage" element={<JobsContentPage />} />

        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/Profile/Upload" element={<UploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;

/** npx tailwindcss -i ./src/input.css -o ./output.css --watch */
