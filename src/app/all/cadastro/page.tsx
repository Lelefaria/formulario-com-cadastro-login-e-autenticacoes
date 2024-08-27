import Form from "@/components/FormCadastro";

function Page() {
  return (
    <div className="bg-gray-800 min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="font-jet text-[2rem] text-white">Cadastro</h1>
      <p className="text-white font-jet">
      Inscreva-se para se manter informado.
      </p>
      <div className="w-96 mt-4 bg-slate-300 px-4 py-5 rounded-lg">
        <Form />
      </div>
      <p className="text-gray-100 text-xs w-96 mt-2 text-center font-jet">
      Ao se inscrever, você passará a receber os nossos e-mails com as melhores notícias.
      </p>
    </div>
  );
}

export default Page;
