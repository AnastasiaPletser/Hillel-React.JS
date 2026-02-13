import { useState } from "react";
import "./search.css";

export default function SearchInput() {
  const [value, setValue] = useState("");

  const clearInput = () => {
    setValue("");
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Знайти книгу"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
<i className="fas fa-search search-icon"></i>
      {value && (
        <button className="clear-btn" onClick={clearInput}>
          ✕
        </button>
      )}
      
    </div>
  );
}
