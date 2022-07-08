import ImageInput from "./ImageInput";

const GroupForm = ({ group, onGroupChange, onGroupSubmit, buttonLabel }) => {
  const handleGroupFormSubmission = (event) => {
    event.preventDefault();
    onGroupSubmit();
  };
  return (
    <form onSubmit={handleGroupFormSubmission}>
      <label htmlFor='input-listed'>{/* <p>Group name:</p> */}</label>
      <div>
        <input
          maxLength={20}
          id='input-listed'
          type='text'
          placeholder='Group title'
          value={group.name}
          onChange={(event) =>
            onGroupChange({ ...group, name: event.target.value })
          }
        />
      </div>

      <label htmlFor='input-listed'>{/* <p>Group description:</p> */}</label>
      <div>
        <input
          maxLength={100}
          id='input-listed'
          type='text'
          placeholder='Group description'
          value={group.description}
          onChange={(event) =>
            onGroupChange({ ...group, description: event.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor='input-picture'>
          <p>Group image</p>
        </label>
        <div>
          <ImageInput
            image={group.picture}
            onImageChange={(picture) => onGroupChange({ ...group, picture })}
          />
        </div>
      </div>
      <button className='-green'>{buttonLabel}</button>
    </form>
  );
};

export default GroupForm;
