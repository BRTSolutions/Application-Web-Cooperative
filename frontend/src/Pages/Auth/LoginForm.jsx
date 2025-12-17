import React, { useContext, useState } from "react";
import Input from "../../components/Input";
import { Context } from "../../Context/ContextProvider";
import { LoginApi } from "../../Services/Auth";
import { Lock, Mail } from "lucide-react";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { err, setErr } = useContext(Context);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    LoginApi(loginData, setErr);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 relative">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-1">Connexion</h2>
        <p className="text-gray-500 mb-6">
          Entrez vos identifiants pour accéder à votre espace
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <Input
              type={"email"}
              name={"email"}
              value={loginData.email}
              onChange={handleChange}
              placeholder={"email@exemple.com"}
              LabelName={"Adress email"}
              icon={<Mail />}
            />
          </div>

          <div>
            <Input
              type={"password"}
              name={"password"}
              value={loginData.password}
              onChange={handleChange}
              placeholder={"******************"}
              LabelName={"mot de pass"}
              icon={<Lock />}
            />
          </div>

          <div>
            {err.map((err, index) => (
              <div
                key={index}
                className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 shadow-sm animate-fadeIn"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm">{err}</span>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-900 hover:bg-indigo-950
              text-white py-2 rounded-lg transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
