import React, { useState, useEffect, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_SEARCH_PRODUCTS } from "../../graphql/query";
import "./search.scss";

const NO_IMAGE_PLACEHOLDER = "/images/no-image.png";

const Search = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  const [searchProducts, { data, loading, error }] = useLazyQuery(
    GET_SEARCH_PRODUCTS,
    {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  );

  useEffect(() => {
    if (error) return <p>Error: {error.message}</p>;
  }, [error]);

  useEffect(() => {
    const trimmed = name.trim();

    if (trimmed.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    const delay = setTimeout(() => {
      searchProducts({ variables: { name: trimmed } });
    }, 350);

    return () => clearTimeout(delay);
  }, [name]);

  useEffect(() => {
    if (data?.searchProducts) {
      setResults(data.searchProducts);
      setOpen(true);
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToProduct = (id) => {
    setOpen(false);
    setName("");
    navigate(`/product/${id}`);
  };

  const clearInput = () => {
    setName("");
    setResults([]);
    setOpen(false);
  };

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <div className="search-input-box">
        <i className="fas fa-search search-icon"></i>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Пошук товару..."
          onFocus={() => results.length && setOpen(true)}
        />

        {name && (
          <button className="clear-btn" onClick={clearInput}>
            ✕
          </button>
        )}
      </div>

      {open && (
        <div className="search-dropdown">
          {loading && <div className="search-item">Пошук...</div>}

          {!loading && results.length === 0 && (
            <div className="search-item">Нічого не знайдено</div>
          )}

          {results.map((p) => (
            <div
              key={p.id}
              className="search-item"
              onClick={() => goToProduct(p.id)}
            >
              <img
                src={
                  p?.imgUrl && p.imgUrl.length > 0
                    ? p.imgUrl[0]
                    : NO_IMAGE_PLACEHOLDER
                }
                alt=""
              />

              <span>{p.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
