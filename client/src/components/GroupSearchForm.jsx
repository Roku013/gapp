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
      <label htmlFor="input-listed">
        <p>Group name:</p>
      </label>
      <div>
        <input
          id="input-listed"
          type="text"
          placeholder="Add group name"
          value={groupName}
          onChange={(event) => onSearchQueryChange(event.target.value)}
        />
      </div>

      <button className="-green">Search</button>
      <br />
    </form>
  );
};

export default GroupSearchForm;
