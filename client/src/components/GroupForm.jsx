const GroupForm = ({ group, onGroupChange, onGroupSubmit, buttonLabel }) => {
  const handleGroupFormSubmission = (event) => {
    event.preventDefault();
    onGroupSubmit();
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
          value={group.name}
          onChange={(event) =>
            onGroupChange({ ...group, name: event.target.value })
          }
        />
      </div>

      <label htmlFor="input-listed">
        <p>Group description:</p>
      </label>
      <div>
        <input
          id="input-listed"
          type="text"
          placeholder="Add description"
          value={group.description}
          onChange={(event) =>
            onGroupChange({ ...group, description: event.target.value })
          }
        />
      </div>

      <button className="-green">{buttonLabel}</button>
    </form>
  );
};

export default GroupForm;
