import React from 'react';
import {Route, Link, Routes, useParams} from 'react-router-dom';

function JobsContentPage() {
    const params = useParams();

    console.log(params); // 👉️ {userId: '4200'}


    return (
        <div>
            
        </div>
    )
}

export default JobsContentPage;
