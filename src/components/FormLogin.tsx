"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/User";
import { Validate } from "@/utils/validateLogin";

const Form = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data: User = {
      name,
      email,
      password,
      confirmPassword,
      agree,
      ok: successMessage,
    };

    const validationErrors = Validate(data);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Simular requisição de login
        const response = await fetch("/all/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          setSuccessMessage("Login realizado com sucesso!");
          setFadeOut(false);

          // Redirecionar para a página inicial após o login bem-sucedido
          setTimeout(() => {
            router.push("/all/home");
          }, 3000);

          // Limpar os campos do formulário
          setName("");
          setPassword("");
          setConfirmPassword("");
          setEmail("");
          setAgree(false);
          setErrors({});
        } else {
          setErrors({ general: "Login falhou. Verifique suas credenciais." });
        }
      } catch (error) {
        setErrors({ general: "Ocorreu um erro. Tente novamente mais tarde." });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label className="text-sm font-jet" htmlFor="email">
          E-mail
        </label>
        <input
          type="text"
          placeholder="Digite seu E-mail"
          className="font-jet rounded-lg py-2 px-2 text-sm placeholder:text-sm placeholder:text-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors?.email && (
          <small className="text-xs text-red-500 mt-1">{errors?.email}</small>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-jet" htmlFor="password">
          Senha
        </label>
        <input
          type="password"
          placeholder="Digite sua senha"
          className="font-jet rounded-lg py-2 px-2 text-sm placeholder:text-sm placeholder:text-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors?.password && (
          <small className="text-xs text-red-500 mt-1">
            {errors?.password}
          </small>
        )}
      </div>
      <button
        type="submit"
        className="bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-sm py-2 px-4 text-white font-jet"
      >
        Login
      </button>
      <div className="flex flex-col text-sm pt-2">
        <p className="text-sm font-jet">Crie sua conta</p>
        <a href="/all/cadastro" className="text-sm underline mb-2">
          Cadastre-se
        </a>
      </div>
      {successMessage && (
        <small
          className={`text-xs text-green-700 mt-1 text-center transition-opacity duration-500 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          {successMessage}
        </small>
      )}
      {errors?.general && (
        <small className="text-xs text-red-500 mt-1 text-center">
          {errors?.general}
        </small>
      )}
    </form>
  );
};

export default Form;
