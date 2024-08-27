"use client";

import { User } from "@/types/User";
import { useState, FormEvent } from "react";
import { Validate } from "@/utils/validateCadastro";

const Form = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    setName("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setAgree(false);
    setErrors({});

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
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name, password }),
        });

        if (response.ok) {
          setSuccessMessage("Cadastro realizado com sucesso!");
        } else {
          const errorData = await response.json();
          setErrors({ email: errorData.message });
        }
      } catch (error) {
        setErrors({
          email: "Erro ao tentar registrar o usuário. Tente novamente.",
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label className="text-sm font-jet" htmlFor="name">
          Nome
        </label>
        <input
          type="text"
          placeholder="Digite seu nome"
          className="font-jet rounded-lg py-2 px-2 text-sm placeholder:text-sm placeholder:text-gray-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors?.name && (
          <small className="text-xs text-red-500 mt-1">{errors?.name}</small>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-jet" htmlFor="email">
          E-mail
        </label>
        <input
          type="text"
          placeholder="Digite seu melhor E-mail"
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
          placeholder="Digite sua melhor senha"
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
      <div className="flex flex-col">
        <label className="text-sm font-jet" htmlFor="confirmPassword">
          Confirme sua Senha
        </label>
        <input
          type="password"
          placeholder="Confirme sua Senha"
          className="font-jet rounded-lg py-2 px-2 text-sm placeholder:text-sm placeholder:text-gray-400"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors?.confirmPassword && (
          <small className="text-xs text-red-500 mt-1">
            {errors?.confirmPassword}
          </small>
        )}
      </div>
      <div className="flex flex-col">
        <a href="/home/termos" className="text-xs underline mb-2">
          Leia os termos
        </a>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <label className="text-sm font-jet" htmlFor="agree">
            Concordo com os termos.
          </label>
        </div>
        {errors?.agree && (
          <small className="text-xs text-red-500 mt-1">{errors?.agree}</small>
        )}
      </div>
      <button
        type="submit"
        className="bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-sm py-2 px-4 text-white font-jet"
      >
        Cadastrar
      </button>
      <div className="flex flex-col text-sm pt-2">
        <p className="text-sm font-jet">Ja possui uma conta?</p>
        <a href="/all/login" className="text-sm underline mb-2">
          Login
        </a>
      </div>
      {successMessage && (
        <small
          className={`text-xs text-green-700 mt-1 text-center transition-opacity duration-1000 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          {successMessage}
        </small>
      )}
    </form>
  );
};

export default Form;
