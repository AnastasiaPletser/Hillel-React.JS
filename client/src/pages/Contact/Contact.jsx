import React from "react";
import "./contact.scss";

const Contact = () => {
  return (
    <div>
      <h2>Книжковий магазин Librix</h2>
      <div className="footer-description">
        <span>магазин Librix</span>
        <span>вулиця Харкова, 3, Київ, Україна</span>
        <pre />
        <i class="bi bi-telephone-fill"></i>
        <a href="tel:(044)195-14-00" className="phoneCall">
          (044)195-14-00
        </a>
      </div>
    </div>
  );
};

export default Contact;
