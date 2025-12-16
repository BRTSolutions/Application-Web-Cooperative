import Api from "./api";

export const LoginApi = async (loginData, setErr) => {
  try {
    const res = await Api.post("/login", loginData);
    return res.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.errors) {
      const errorsArray = Object.values(err.response.data.errors).flat();
      setErr(errorsArray);
    } else {
      setErr(["Something went wrong."]);
    }
  }
};

export const LogOut = async () => {
  try {
    await Api.post("/logout");
  } catch (err) {
    console.error(err);
  }
};
