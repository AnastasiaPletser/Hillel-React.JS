import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    username: "Пользователь",
    email: "user@example.com",
  });

  const [editMode, setEditMode] = useState(false);

  const handleSave = () => {
    setEditMode(false);
    // Здесь можно отправить изменения на сервер
  };

  return (
    <div>
      <h2>Профиль</h2>
      <div>
        <label>Имя пользователя:</label>
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
        <button onClick={handleSave}>Сохранить</button>
      ) : (
        <button onClick={() => setEditMode(true)}>Редактировать</button>
      )}
    </div>
  );
};

export default Profile;
