import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DOMAIN_NAME, ADD_BOOK, GET_INTERESTS } from "../constant";
import AllInterests from "./AllInterests";

const AddBook = () => {
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  //   const [photo, setPhoto] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [status, setStatus] = useState("");
  const [interests, setInterests] = useState([]);
  const [allInterests, setAllInterests] = useState([]);

  const accessToken = localStorage.getItem("token");
  const navigate = useNavigate();

  async function getAllInterests() {
    const data = await fetch(DOMAIN_NAME + GET_INTERESTS);
    const json = await data.json();
    setAllInterests(json.topic_names);
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setInterests([...interests, value]);
    } else {
      setInterests(interests.filter((interest) => interest !== value));
    }
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
    getAllInterests();
    return () => {};
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = {
      book_name: bookName,
      author_name: authorName,
      description,
      topics: interests,
      rating: 4,
    };
    try {
      const response = await fetch(DOMAIN_NAME + ADD_BOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(bookData),
      });
      if (response.ok) {
        const data = await response.json();
        setStatus("Book added successfully");
        setBookName("");
        setAuthorName("");
        setDescription("");
        setStatusColor("green");
        setInterests([]);
      }
      if (!response.ok) {
        setStatus("Some error in adding book");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleImageChange = (e) => {
  //     const file = e.target.files[0];
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //         setBase64Image(reader.result);
  //         setImageName(file.name);
  //       };

  //       if (file) {
  //         reader.readAsDataURL(file);
  //       }
  //   };

  return (
    <>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1 style={{ color: "white" }}>Add Book</h1>
          <p style={{ color: statusColor }}>{status}</p>
          <div className="form-group">
            <label>BookName:</label>
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Author Name:</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Interests:</label>

            {allInterests.map((data, index) => (
              <AllInterests
                interest={data}
                handleCheckboxChange={handleCheckboxChange}
                key={index}
              />
            ))}
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          {/* <div className="form-group">
            <label>Book Cover:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div> */}

          <button type="submit">Add Book</button>
        </form>
      </div>
    </>
  );
};

export default AddBook;
