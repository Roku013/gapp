const GroupSearchForm = ({
  groupName,
  onSearchQueryChange,
  onSearchSubmit
}) => {
  const handleGroupFormSubmission = (event) => {
    event.preventDefault();
    onSearchSubmit();
  };
  return (
    <form onSubmit={handleGroupFormSubmission}>
      <div>
        <input
          id="input-listed"
          type="text"
          placeholder="Search for a group..."
          value={groupName}
          onChange={(event) => onSearchQueryChange(event.target.value)}
        />
      </div>
      {/**  <button className="-green">Search</button>  <br />*/}
    </form>
  );
};

export default GroupSearchForm;
