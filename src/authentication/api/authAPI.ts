import axios from "axios";

export const login = (
  login: string,
  password: string
): Promise<string | null> =>
  axios
    .post("api/Auth/login", {
      login,
      password,
    })
    .then((response) => response.data.token)
    .catch(() => null);

export const register = (
  email: string,
  username: string,
  password: string,
  name: string,
  surname: string,
  address: string,
  postalCode: string
): Promise<string | null> =>
  axios
    .post("api/Auth/register", {
      email,
      username,
      password,
      name,
      surname,
      address,
      postalCode
    })
    .then((response) => response.data)
    .catch(() => null);
