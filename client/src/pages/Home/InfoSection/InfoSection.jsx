import "../InfoSection/infoSection.scss"

const pakunokShkolyara = "/images/pakunok-shkolyara.webp";
const zimovaPidtrumka = "/images/zimova-pidtrumka.jpg"
const nacKechback = "/images/nac-kechback.png"
const bonusProgram = "/images/loyalty-program.jpg"


const InfoSection = () => {
  return (
    <div className="section">
      <div className="card">
        <img className="card-img" src={zimovaPidtrumka } alt="" />
        <div className="card-body">
          <h4><strong>«Зимова єПідтримка»</strong></h4>
          <p className="card-text">
            Витрачайте тисячу на книжки з librix.com.ua
          </p>
        </div>
      </div>
      <div className="card">
        <img className="card-img" src={pakunokShkolyara} alt="" />
        <div className="card-body">
          <h4><strong>Зробіть навчання цікавим</strong></h4>
          <p className="card-text">
            Які книги варто придбати для першокласника
          </p>
        </div>
      </div>
      <div className="card">
        <img className="card-img" src={nacKechback} alt="" />
        <div className="card-body">
          <h4><strong>Отримуй кешбек за книжки</strong></h4>
          <p className="card-text">
            Повертаємо до 15% на твій рахунок
          </p>
        </div>
      </div>
      <div className="card">
        <img className="card-img" src={bonusProgram} alt="" />
        <div className="card-body">
          <h4><strong>Отримуй бонуси при покупці</strong></h4>
          <p className="card-text">
            Купуй більше, витрачай менше
          </p>
        </div>
      </div>
    </div>
  );
};
export default InfoSection;
