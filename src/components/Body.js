import { useState, useEffect } from "react";
import {
  DOMAIN_NAME,
  GET_BOOKS,
  GET_PERSONAL_RECOMENDATIONS,
} from "../constant";
import "../../css/BookList.css";
import BookListCard from "./BookListCard";
import ListShimmer from "./ListShimmer";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const [bookData, setBookData] = useState([]);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("token");

 
  if (!accessToken) {
    navigate("/login");
  }

  async function getBooks() {
    
    const data = await fetch(DOMAIN_NAME + GET_BOOKS);
    const json = await data.json();
    setBookData(json.data);
    console.log(json.data);
  }

  useEffect(() => {
    getBooks();
    return () => {};
  }, []);

  return bookData.length == 0 ? (
    <div style={{ width: "50%", margin: "0 auto", padding: "20px" }}>
      <ListShimmer />
    </div>
  ) : (
    bookData.map((bookData) => <BookListCard {...bookData} key={bookData.id} />)
  );
};

export default Body;
