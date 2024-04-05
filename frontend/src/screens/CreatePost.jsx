import React, {useState, useEffect} from "react";
import "../css/Createpost.css";
// import "../css/CreatePost.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreatePost () {
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const navigate = useNavigate()

    // Toast functions
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

    useEffect(() => {
        // saving post to mongodb
        if (url) {
            fetch("/createPost", {
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=> {
            if(data.error){
            notifyA(data.error)
        }else{
            notifyB("Successfully Posted")
            navigate("/")
        }})
        .catch(err => console.log(err))
        }
    }, [url])

    //posting image to clodunary
    const postDetails = () => {
        console.log(body, image)
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "instagram")
        data.append("cloud_name", "vermacloud")
        fetch("https://api.cloudinary.com/v1_1/vermacloud/image/upload", 
        {
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data => setUrl(data.url))
        .catch(err => console.log(err))
    }

    const loadfile = (event) => {
        var output = document.getElementById("output");
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
            URL.revokeObjectURL(output.src)  // free memory
        };
    };
    return (
        <div className="createPost">
            {/* header */}
           <div className="post-header">
                <h4 style={{margin:"3px auto"}}>Create New Post</h4>
                <button id="post-btn" onClick={()=>{ postDetails() }}>Share</button>
           </div>
           {/* image preview */}
           <div className="main-div">
                <img id="output" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png"/>
                <input type="file" accept="image/*" onChange={(event)=>{loadfile(event); setImage(event.target.files[0])}}  />
           </div>
           {/* details */}
            <div className="details">
                <div className="card-header">
                    <div className="card-pic">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" alt="" />
                    </div>
                    <h5>Ramesh</h5>
                </div>
                <textarea value={body} onChange={(e)=> {
                    setBody(e.target.value)
                }} type="text" placeholder="Write a caption..."></textarea>
            </div>
        </div>
    );
};

export default CreatePost;