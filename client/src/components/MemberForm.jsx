const MemberForm = ({ name, onSearchQueryChange, onSearchSubmit }) => {
  const handleMemberFormSubmission = (event) => {
    event.preventDefault();
    onSearchSubmit();
  };
  return (
    <form onSubmit={handleMemberFormSubmission}>
      <label htmlFor="input-listed">{/* <p>Member name:</p> */}</label>
      <div>
        <input
          id="input-listed"
          type="text"
          placeholder="Add member name"
          value={name}
          onChange={(event) => onSearchQueryChange(event.target.value)}
        />
      </div>

      <button className="-green">Search</button>
    </form>
  );
};

export default MemberForm;
