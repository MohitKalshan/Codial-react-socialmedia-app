import { useEffect, useState } from "react";
import {getPost, getPosts} from '../api';
import { Home } from "../pages";
import {Loader} from "./";
function App() {
 const [posts,setPosts]= useState([]);
 const [loading,setLoading]= useState(true);
  useEffect(()=>{
    const fetchPost = async ()=>{
    const response = await getPosts()
    console.log('Response',response);
    if(response.success){
      setPosts(response.data.posts);
    }
    setLoading(false);
    };
    fetchPost();
  },[]);
  if(loading){
    return <Loader/>
  }
  return (
    <div className="App">
     <Home posts={posts}/>
    </div>
  );
}

export default App;
