import { Link } from "react-router-dom";
import { useState } from "react";
import { DOMAIN_NAME, REQUEST_BOOK } from "../../constant";

const ProfileBooks = (props) => {
  console.log(props);
  const { book_name, description, rating, id, book_status } = props?.bookDetail;
  const { userId } = props;

  const [userIdProp, setUserIdProp] = useState(userId);
  const [bookId, setBookId] = useState(id);
  const accessToken = localStorage.getItem("token");

  const bookRequestBody = {
    user_id: Number(userIdProp),
    book_id: Number(bookId),
  };

  function handleClick(e) {
    const response = fetch(DOMAIN_NAME + REQUEST_BOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(bookRequestBody),
    });
  }

  return (
    <div className="card">
      <div className="book-image">
        <img
          src="https://m.media-amazon.com/images/I/41XuYWHsxEL._SX342_SY445_.jpg"
          alt="Book Image"
        />
      </div>
      <div className="book-details">
        <h2>Book Name: {book_name}</h2>
        <p>Description: {description}</p>
        <div className="ratings">Ratings: {rating}</div>
        <button user-id={userId} book-id={id} onClick={handleClick}>
          {book_status}
        </button>
      </div>
    </div>
  );
};

export default ProfileBooks;

//
