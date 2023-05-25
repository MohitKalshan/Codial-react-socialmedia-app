import { useEffect } from "react";
import {getPost, getPosts} from '../api';
import { Home } from "../pages";

function App() {
  useEffect(()=>{

    const fetchPost = async ()=>{
    const response = await getPosts()
    console.log('Response',response);
    }
    fetchPost();
  },[]);
  return (
    <div className="App">
     <Home/>
    </div>
  );
}

export default App;
