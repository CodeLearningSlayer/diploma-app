import { jwtDecode } from "jwt-decode";

export const getTokenExpirationTime = (token: string) => {
  const decodedToken = jwtDecode(token);

  const timeOfExpiration = Date.now() + (decodedToken.exp! * 1000 - decodedToken.nbf! * 1000) * 0.9;
  return timeOfExpiration;
};
