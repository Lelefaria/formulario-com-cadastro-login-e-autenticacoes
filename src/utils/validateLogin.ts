import { User } from "@/types/User";

type Error = {
  [key: string]: string;
};

export const Validate = (data: User): Error => {
  const errors: Error = {};
  
  if (!data.password) {
    errors["password"] = "A senha é obrigatória";
  } else if (data.password.length < 8) {
    errors["password"] = "A senha deve ter no mínimo 8 caracteres";
  }

  if (!data.email) {
    errors["email"] = "O e-mail é obrigatório";
  }

  return errors;
};
