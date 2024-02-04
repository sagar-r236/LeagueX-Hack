const AllInterests = (props) => {
  const { interest, handleCheckboxChange } = props;
  return (
    <label>
      <input type="checkbox" value={interest} onChange={handleCheckboxChange} />{" "}
      {interest}
    </label>
  );
};

export default AllInterests;
