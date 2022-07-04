const MemberForm = ({
  member,
  onMemberChange,
  onMemberSubmit,
  buttonLabel
}) => {
  const handleMemberFormSubmission = (event) => {
    event.preventDefault();
    onMemberSubmit();
  };
  return (
    <form onSubmit={handleMemberFormSubmission}>
      <label htmlFor="input-listed">
        <p>Member name:</p>
      </label>
      <div>
        <input
          id="input-listed"
          type="text"
          placeholder="Add member name"
          value={member.name}
          onChange={(event) =>
            onMemberChange({ ...member, name: event.target.value })
          }
        />
      </div>

      <button className="-green">{buttonLabel}</button>
    </form>
  );
};

export default MemberForm;
