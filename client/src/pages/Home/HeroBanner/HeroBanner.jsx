import ImageSlider from "../../../components/ImageSlider/ImageSlider.jsx";

import "./heroBanner.scss";

const HeroBanner = () => {
  return (
    <>
      <div className="container__top">
        <div className="content__top">
          <div className="advertisement-left">
            <h4>
              <strong>Відкрийте простір для читання і роздумів</strong>
            </h4>
            <p>
              Наш книжний магазин - це місце тиші, знань і натхнення. Серед
              високих полиць і сотень ретельно відібраних видань ви зможете
              спокійно обрати книгу, яка відгукнеться саме вам.
            </p>
            <p>
              Ми пропонуємо широкий вибір художньої літератури, нон-фікшн,
              класичних і сучасних творів, а також видання для саморозвитку та
              професійного зростання. Кожна книга в нашій колекції має свою
              історію та цінність.
            </p>
            <p>
              Тут не поспішають. Тут читають, думають і знаходять нові ідеї.
            </p>
            <br></br>
            <p>
              <strong>
                Ласкаво просимо до простору, де книги мають значення.
              </strong>
            </p>
          </div>
          <div className="advertisement-right">
            <ImageSlider />
          </div>
        </div>
        <div className="decor__line"></div>
      </div>
    </>
  );
};

export default HeroBanner;
