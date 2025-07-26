import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="footer-description">
        <span>магазин Книгарня</span>
        <span>Сумська, 42, Харків, Україна, 61110</span>
        <a href="tel:+380 97 777 7777" className="phoneCall">
          +380 97 777 7777
        </a>
      </div>
    </footer>
  );
}
export default Footer;
