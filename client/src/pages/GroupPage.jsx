import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import GroupCard from "../components/GroupCard";
import { listGroups } from "../services/group";
import AuthenticationContext from "../context/authentication";

const GroupPage = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    listGroups().then((data) => {
      setGroups(data.groups);
    });
  }, []);

  const { user } = useContext(AuthenticationContext);
  // console.log(user);

  return (
    <div className='group-page'>
      {!user && <p>log in to see the list of groups</p>}
      {user && (
        <div className='group-info'>
          <Link className='return-btn' to={`/profile/${user._id}`}>
            BACK
          </Link>

          <Link to='/add'>
            <p className='create-group'>+</p>
          </Link>

          <h1 className='group-topic'>Groups</h1>

          {groups.map((group) => (
            <div className='group-name' key={group._id}>
              <GroupCard group={group} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupPage;
