import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Link,
    useLocation
} from "react-router-dom";


function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ReadBlog = () => {
    const query = useQuery();
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const fetchBlog = async () => {
        const token = await axios
        .get(`http://localhost:3000/auth/blog/${query.get("blogid")}`)
        .catch((err) => {
          console.log(err);
        })
        .then((res) => {
            console.log(res)
            setTitle(res.data[0].Title);
            setContent(res.data[0].content);
         });
    }

    useEffect(() => {
        fetchBlog();
    })

    return (
        <div className="container w-100">
            <center>
                <h1>
                    {title}
                </h1>
            </center>
            <center>
                <p>{content}</p>
            </center>
        </div>
    )
}

export default ReadBlog;