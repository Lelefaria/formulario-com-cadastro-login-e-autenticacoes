import { User } from "@/types/User";

type Error = {
  [key: string]: string;
};

export const Validate = (data: User) => {
  const errors: Error = {};

  if (!data.name) {
    errors["name"] = "O nome é obrigatório";
  } else if (data.name.length < 3) {
    errors["name"] = "O nome deve ter no mínimo 3 caracteres";
  }

  if (!data.password) {
    errors["password"] = "A senha é obrigatória";
  } else if (data.password.length < 8) {
    errors["password"] = "A senha deve ter no mínimo 8 caracteres";
  }

  if (data.password !== data.confirmPassword) {
    errors["confirmPassword"] = "As senhas não coincidem";
  }

  if (!data.email) {
    errors["email"] = "O e-mail é obrigatório";
  }

  if (!data.agree) {
    errors["agree"] =
      "Por favor, preencha todos os campos obrigatórios e aceite os termos.";
  }

  return errors;
}
