import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    username: "Користувач",
    email: "user@example.com",
  });

  const [editMode, setEditMode] = useState(false);

  const handleSave = () => {
    setEditMode(false);
  };

  return (
    <div>
      <h2>Профиль</h2>
      <div>
        <label>Ім'я користувача:</label>
        {editMode ? (
          <input
            type="text"
            value={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
        ) : (
          <p>{profile.username}</p>
        )}
      </div>
      <div>
        <label>Email:</label>
        {editMode ? (
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        ) : (
          <p>{profile.email}</p>
        )}
      </div>
      {editMode ? (
        <button onClick={handleSave}>Зберегти</button>
      ) : (
        <button onClick={() => setEditMode(true)}>Редагувати</button>
      )}
    </div>
  );
};

export default Profile;
