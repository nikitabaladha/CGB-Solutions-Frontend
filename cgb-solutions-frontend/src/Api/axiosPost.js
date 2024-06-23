import axiosInstance from "../config/axiosConfig";

async function postAPI(url, payload, headers = {}, isPrivate = true) {
  try {
    let accessToken;
    if (isPrivate) {
      accessToken = JSON.parse(localStorage.getItem("accessToken"));
    }

    const response = await axiosInstance.post(url, payload, {
      headers: {
        access_token: accessToken,
        ...headers,
      },
    });

    if ((response.status = 200)) {
      return {
        message: response.data.message,
        hasError: response.data.hasError,
        data: response.data,
      };
    }
  } catch (error) {
    console.error("Error during Api request:", error);

    throw error;
  }
}

export const isAuthenticated = () => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo !== null;
};

export const handleUnauthorized = (navigate) => {
  navigate("/login");
};

export default postAPI;
