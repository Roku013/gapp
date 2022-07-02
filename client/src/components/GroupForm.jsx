const GroupForm = ({ group, onGroupChange, onGroupSubmit, buttonLabel }) => {
  const handleGroupFormSubmission = (event) => {
    event.preventDefault();
    onGroupSubmit();
  };

  return (
    <form onSubmit={handleGroupFormSubmission}>
      <label htmlFor="input-listed">Group name:</label>
      <div>
        <input
          id="input-listed"
          type="text"
          value={group.name}
          onChange={(event) =>
            onGroupChange({ ...group, name: event.target.value })
          }
        />
      </div>

      <label htmlFor="input-listed">Group description:</label>
      <div>
        <input
          id="input-listed"
          type="text"
          value={group.description}
          onChange={(event) =>
            onGroupChange({ ...group, description: event.target.value })
          }
        />
      </div>

      <button>{buttonLabel}</button>
    </form>
  );
};

export default GroupForm;
