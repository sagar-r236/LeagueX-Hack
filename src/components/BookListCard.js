import { Link } from "react-router-dom";

const BookListCard = (props) => {
  console.log(props, 2);
  const {
    added_by_users_list,
    added_by_user_ids,
    book_name,
    author_name,
    description,
    rating,
    added_by_users,
  } = props;

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
        <div className="book-holders">
          <p>Bookholders:</p>
          {added_by_users_list.map((userObj, index) => {
            const keys = Object.keys(userObj);
            const name = keys[0];
            const id = userObj[name];

            return (
              <>
                <Link to={`/profile/${id}`} style={{ color: "green" }}>
                  {name}
                </Link>{" "}
                <br></br>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookListCard;
