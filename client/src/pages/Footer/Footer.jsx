import React, { useState } from "react";
import {
  ABOUT_ROUTE,
  NEWS_ROUTE,
  VACANCIES_ROUTE,
  OFERTA_ROUTE,
  DELIVERY_PAYMENT_ROUTE,
  RETURN_ROUTE,
  BONUS_ROUTE,
  GIFT_SERTIFICATES_ROUTE,
} from "../../utils/consts";
import "./footer.scss";
import { NavLink } from "react-router-dom";


export default function Footer() {
    const [subscribed, setSubscribed] = useState(false);

  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-container">
            <div className="col-Lg-3 col-md-6">
              <div className="footer-info">
                 <h1 className="bookstore-title">
                  <NavLink to="/" className="bookstore-title-link">
                    Librix
                  </NavLink>
                </h1>
                <p>
                  м.Київ <br />
                  вул. Харкова, 3
                  <br />
                  <br />
                  <i className="bi bi-phone d-flex align-items-center">
                    {" "}
                    &nbsp;
                    <strong> (044)195-14-00 </strong>
                  </i>
                  <i className="bi bi-envelope">
                    {" "}
                    &nbsp;
                    <strong> info@librex.com.ua </strong>
                  </i>
                </p>
                <div className="social-links mt-3">
                  <a href="https://www.tiktok.com" className="tiktok">
                    <i className="bi bi-tiktok"></i>
                  </a>
                  <a href="https://www.facebook.com" className="facebook">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="https://www.instagram.com" className="instagram">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="https://www.youtube.com" className="youtube">
                    <i className="bi bi-youtube"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-1g-2 col-md-6 footer-links">
              <h4>Librix</h4>
              <ul>
                <li>
                  <NavLink
                    to={ABOUT_ROUTE}
                    className={({ isActive }) =>
                      isActive ? "link active" : "link"
                    }
                  >
                    Про нас
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={NEWS_ROUTE}
                    className={({ isActive }) =>
                      isActive ? "link active" : "link"
                    }
                  >
                    Новини
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={VACANCIES_ROUTE}
                    className={({ isActive }) =>
                      isActive ? "link active" : "link"
                    }
                  >
                    Вакансії
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={OFERTA_ROUTE}
                    className={({ isActive }) =>
                      isActive ? "link active" : "link"
                    }
                  >
                    Договір публічної офери
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-1g-2 col-md-6 footer-links">
              <h4>Інформація</h4>
              <ul>
                <li>
                  <NavLink
                    to={DELIVERY_PAYMENT_ROUTE}
                    className={({ isActive }) =>
                      isActive ? "link active" : "link"
                    }
                  >
                    Доставка і оплата
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={RETURN_ROUTE}
                    className={({ isActive }) =>
                      isActive ? "link active" : "link"
                    }
                  >
                    Повернення товару
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={BONUS_ROUTE}
                    className={({ isActive }) =>
                      isActive ? "link active" : "link"
                    }
                  >
                    Програма лояльності
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={GIFT_SERTIFICATES_ROUTE}
                    className={({ isActive }) =>
                      isActive ? "link active" : "link"
                    }
                  >
                    Подарункові сертифікати
                  </NavLink>
                </li>
              </ul>
            </div>

 <div className="col-lg-4 col-md-6 footer-newsletter">
  <h4>Підписатися на новини:</h4>
  <p>Бути в курсі останніх подій та новин.</p>
  {subscribed ? (
    <p>Дякуємо за підписку! </p>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubscribed(true);
      }}
    >
      <input type="email" name="email" placeholder="Enter your email" required />
      <input type="submit" value="Підписатися" />
    </form>
  )}
</div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">© 2023-2026 Всі права захищені</div>
        <div className="credits">
          Designed by{" "}
          <a href="https://www.linkedin.com/in/anastasiia-pletser/">
            Anastasiya Pletser
          </a>
        </div>
      </div>
    </footer>
  );
}
