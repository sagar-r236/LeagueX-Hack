import { useState, useEffect } from "react";
import { DOMAIN_NAME, GET_PERSONAL_RECOMENDATIONS } from "../../constant";
import "../../../css/BookList.css";
import BookListCard from "../BookListCard";
import ListShimmer from "../ListShimmer";
import { useNavigate } from "react-router-dom";

const BookRecomendataion = () => {
  const [bookData, setBookData] = useState([]);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("token");

  async function getBooks() {
    var header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + accessToken);
    var requestOptions = {
      method: "GET",
      headers: header,
      // redirect: "follow",
    };
    console.log(header);

    const data = await fetch(
      DOMAIN_NAME + GET_PERSONAL_RECOMENDATIONS,
      requestOptions
    );
    const json = await data.json();
    setBookData(json.data);
  }

  useEffect(() => {
    getBooks();
    return () => {};
  }, []);

  console.log(bookData);
  return !accessToken ? (
    navigate("/login")
  ) : bookData?.length == 0 ? (
    <div style={{ width: "50%", margin: "0 auto", padding: "20px" }}>
      <ListShimmer />
    </div>
  ) : (
    bookData.map((bookData, index) => (
      <BookListCard {...bookData} key={index} />
    ))
  );
};

export default BookRecomendataion;
