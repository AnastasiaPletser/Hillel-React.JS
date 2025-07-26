import { $authHost, $host } from "./index.js";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password, role = "USER") => {
  try {
    const { data } = await $host.post("api/user/registration", {
      email,
      password,
      role,
    });
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  } catch (error) {
    console.error(
      "Помилка реєстрації:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const { data } = await $host.post("api/user/login", { email, password });
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  } catch (error) {
    console.error(
      "Помилка авторизації:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const check = async () => {
  try {
    const { data } = await $authHost.get("api/user/auth");
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  } catch (error) {
    console.error(
      "Помилка перевірки токена:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
