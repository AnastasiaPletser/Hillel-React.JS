import React, { useState, useEffect } from "react";
import "../../components/ImageSlider/ImageSlider.scss";

const images = [
  "https://img.freepik.com/free-photo/large-collection-old-books-wooden-bookshelf-generated-by-artificial-intelligence_188544-127262.jpg?t=st=1739140181~exp=1739143781~hmac=cb48308cae167b47aa4991b10d42788dc500971cf02b947b2423f065520e280e&w=1060",
  "https://img.freepik.com/free-photo/young-beautiful-woman-with-glasses-holding-notebook-looking-bookshelf_1153-8935.jpg?t=st=1739140481~exp=1739144081~hmac=11b7cea580023ca0721a8e9b9cf26c3907d94e87961e078b6bc455b8d8eefd38&w=996",
  "https://img.freepik.com/free-photo/close-up-hot-chocolate-with-book_23-2148312071.jpg?t=st=1739140802~exp=1739144402~hmac=2f3776b48199c6101dfd9f7a366cf4911cdc1ac6e3733350b1e06c3e53a84f16&w=996",
  "https://img.freepik.com/free-photo/close-up-woman-holding-book_23-2149141904.jpg?t=st=1739207648~exp=1739211248~hmac=8deada8bdbf08e98f31e649ab104c110debe39145a6b5dbe9d649b41c2c04301&w=996",
  "https://img.freepik.com/free-photo/portrait-man-while-leafing-through-magazine_641386-1099.jpg?t=st=1739142091~exp=1739145691~hmac=994cbf0432446b3747ba06bdf5e193f3458e9eb2804abb6bb26fa5ee5b131207&w=996",
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <img src={images[currentIndex]} alt="Slider" className="slider__image" />
      {/* <p className="sale">Акції та знижки</p> */}
    </div>
  );
}
