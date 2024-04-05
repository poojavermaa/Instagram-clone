import React, { useEffect, useState } from "react";
// import "./Profile.css";
import "../css/Profile.css";

import PostDetail from "../components/PostDetail";
import ProfilePic from "../components/ProfilePic";

function Profile() {
  var picLink =
    "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg";
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [changePic, setChangePic] = useState(false);

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  const changeprofile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };

  useEffect (() => {
    fetch(`/user/${JSON.parse(localStorage.getItem("user"))._id}`,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setPic(result.post);
        setUser(result.user);
        // console.log(pic);
      });
  }, []);

  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        {/* profile pic */}
        <div className="profile-pic">
          <img
            onClick={changeprofile}
            src={user.Photo ? user.Photo : picLink}
            alt=""
          />
        </div>
        <div className="profile-data">
          <h2>{JSON.parse(localStorage.getItem("user")).name}</h2>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{pic ? pic.length : "0"} posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
          </div>
        </div>
      </div>
      <hr style={{ width: "90%", opacity: "0.8", margin: "25px auto" }} />
      {/* Gallery */}
      <div className="gallery">
        {pic.map((pics) => {
          return (
            <img
              key={pics._id}
              src={pics.photo}
              onClick={() => {
                toggleDetails(pics);
              }}
              className="item"
              alt=""
            />
          );
          // );
        })}
      </div>
      {show && 
      <PostDetail item={posts} toggleDetails={toggleDetails} />
      }
      {changePic && 
      <ProfilePic changeprofile={changeprofile} />
      }
    </div>
  );
}

export default Profile;
