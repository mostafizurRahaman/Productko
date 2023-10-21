const baseURL = process.env.REACT_APP_BASE_URL;
const accessToken = `Bearer ${localStorage.getItem("productKoToken")}`;

export { baseURL, accessToken };
