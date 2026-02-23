import { useEffect } from "react";
import styles from "./OrderSuccessModal.module.scss";

export default function OrderSuccessModal({
  open,
  onClose,
  title = "Дякуємо!",
  message = "Ваше замовлення оформлено!",
}) {
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onClose();
    }, 1800);

    return () => clearTimeout(timer);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icon}>✓</div>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
