export const validateAuth = ({
  email,
  password,
  repeatPassword,
  agree,
  isLogin,
}) => {
  try {
    if (!email || email.trim() === "") {
      throw new Error("email:Введіть email");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("email:Некоректний email");
    }

    if (!password) {
      throw new Error("password:Введіть пароль");
    }

    if (password.length < 3) {
      throw new Error("password:Пароль має містити мінімум 3 символів");
    }

    if (!isLogin) {
      if (!repeatPassword) {
        throw new Error("repeatPassword:Повторіть пароль");
      }

      if (password !== repeatPassword) {
        throw new Error("repeatPassword:Паролі не співпадають");
      }

      if (!agree) {
        throw new Error("agree:Потрібно погодитись з обробкою персональних даних");
      }
    }

    return {};
  } catch (error) {
    const [field, message] = error.message.split(":");
    return { [field]: message };
  }
};
