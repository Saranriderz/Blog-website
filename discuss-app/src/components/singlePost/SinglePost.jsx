import { Link, useLocation } from "react-router-dom"
import React, {  useState, useEffect } from "react";
import "./singlePost.css"
import axios from "axios"

export default function SinglePost() {
  const locatiion = useLocation()
  const path = (locatiion.pathname.split("/")[2])
  const [post, setPost] = useState({})

  useEffect(() => {
    const getPost = async ()=> {
      const res = await axios.get("/posts/"+path)
      setPost(res.data)
    }
    getPost()
  },[path])

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && 
          <img className="singlePostImg"
          src={post.photo}
          alt=""  />
        }
        

        <h1 className="siglePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon fa-regular fa-pen-to-square"></i>
            <i className="singlePostIcon fa-regular fa-trash-can"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">Author: 
            <Link to={`/?user=${post.username}`} className="link" >
              <b>{post.username}</b>
            </Link>
          </span>
          
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <p className="singlePostDesc">{post.desc}</p>
      </div>
    </div>
  )
}
