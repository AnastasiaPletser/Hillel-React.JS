import React from "react";
import "./vacancies.scss";

const Vacancies = () => {
  return (
    <>
      <section className="vacancies">
        <div className="vacancies_ua">
          <h4>Вакансії:</h4>
        </div>
        <div className="vacancies_description">
          <h4>У нашій компанії зараз є такі вакансії:</h4>
          <ul> 
            <li>
                Оператор контакт-центру, 20 000 – 25 000 грн* Киев
            </li>
          </ul>
          
        </div>
      </section>
    </>
  );
};

export default Vacancies;
