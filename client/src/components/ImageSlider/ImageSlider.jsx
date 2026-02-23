import React, { useState, useEffect } from "react";
import "../../components/ImageSlider/imageSlider.scss";

const sliderBooks = "/images/slider/slider-books.avif";
const sliderChocolate = "/images/slider/slider-chocolate.avif";
const sliderGirl = "/images/slider/slider-girl.avif";
const sliderMan = "/images/slider/slider-man.avif";
const sliderWoman = "/images/slider/slider-woman.avif";

const images = [
  sliderBooks,
  sliderChocolate,
  sliderGirl,
  sliderMan,
  sliderWoman
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
    </div>
  );
}
