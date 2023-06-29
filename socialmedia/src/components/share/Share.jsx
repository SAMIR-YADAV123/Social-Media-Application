import "./share.css";
import Cancel from '@mui/icons-material/Cancel';
import PermMedia from '@mui/icons-material/PermMedia';
import Label from '@mui/icons-material/Label';
import  Room  from "@mui/icons-material/Room";
import EmojiEmotions from '@mui/icons-material/EmojiEmotions';
import { useContext, useRef, useState } from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const {user}=useContext(AuthContext);
const desc=useRef();
const [file,setFile]=useState(null);

const submitHandler= async(e)=>{
  e.preventDefault();
  const newPost={
    userId:user._id,
    desc:desc.current.value
  }

  if(file){
    const data=new FormData();
    // const fileName=Date.now()+file.name;
    const fileName=file.name;
    data.append("file",file);
    data.append("name",fileName);
    newPost.img=fileName;

    try{
       await axios.post("/upload/",data);
    }catch(err){
     console.log(err);
     console.log("error aayya");
    }
  }

try{
   await axios.post("/posts/",newPost);
   window.location.reload();
}catch(err){
   console.log(err);
   console.log("posts me hai");
}

};

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ? PF+user.profilePicture :PF+"person/noAvatart"} alt="" />
          <input
            placeholder={"What's in your mind " + user.username +" ?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr"/>
        {file && (
          <div className="shareImgContainer">
           <img   src={URL.createObjectURL(file)} alt="" className="shareImg" />
              <Cancel className="shareCancelImg" onClick={()=>setFile(null)}/>
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input style={{display:"none"}} type="file" id="file" accept=".png.jpeg.jpg"  onChange={(e)=>setFile(e.target.files[0])}/>
                </label>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button  type="submit" className="shareButton">Share</button>
        </form>
      </div>
    </div>
  );
}