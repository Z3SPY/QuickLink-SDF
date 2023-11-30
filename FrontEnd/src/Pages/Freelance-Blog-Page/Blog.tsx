import { useState } from "react";
import "./Blog.css";
import gooseHatImage from "./goosehat.png";


function Blog(){
    return(
        
        
        <div className="body">
            <header className="dashboard">
                <h1>Space For Dashboard</h1>
            </header>
            <div className="content"style={{ backgroundImage: `url(${gooseHatImage})` }}>
                <h1>We Are Currently Working on this Page right now</h1>
            </div>
        </div>
        
    );
        
}

export default Blog;