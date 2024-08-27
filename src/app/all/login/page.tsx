import Form from "@/components/FormLogin";

function Page() {
  return (
    <div className="bg-gray-800 min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="font-jet text-[2rem] text-white">Login</h1>
      <div className="w-96 mt-4 bg-slate-300 px-4 py-5 rounded-lg">
        <Form />
      </div>
    </div>
  );
}

export default Page;
