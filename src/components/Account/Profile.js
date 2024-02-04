import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { DOMAIN_NAME, GET_USER_PROFILE } from "../../constant";
import ProfileBooks from "./ProfileBooks";

const Profile = () => {
  const accessToken = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const [userBooks, setUserBooks] = useState([]);

  async function getUserData() {
    const data = await fetch(DOMAIN_NAME + GET_USER_PROFILE + id);
    const json = await data.json();
    setUserBooks(json?.data?.books_uploaded_by_user);
  }

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
    getUserData();
  }, []);

  return (
    <>
      {userBooks.map((data, index) => {
        return <ProfileBooks bookDetail={data} key={index} userId={id} />;
      })}
    </>
  );
};

export default Profile;
