import { useEffect } from "react";
import styles from "./OrderSuccessModal.module.scss";

export default function OrderSuccessModal({ open, onClose }) {

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onClose();
    }, 1500);

    return () => clearTimeout(timer);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icon}>✓</div>
        <h2>Дякуємо!</h2>
        <p>Ваше замовлення оформлено!</p>
      </div>
    </div>
  );
}
