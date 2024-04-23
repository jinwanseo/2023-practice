function Logo() {
  return (
    <div className="flex flex-row items-center gap-2 cursor-pointer">
      <img
        src={require("../../../app/common/imgs/logo_icon_.png")}
        alt="logo"
        className="h-8"
      />
      <h1 className=" text-slate-50 text-lg font-semibold uppercase ">
        together lab
      </h1>
      <button className="bg-slate-700 text-slate-50/60 rounded-full p-2 py-1 text-sm">
        v1.0.0
      </button>
    </div>
  );
}

export default Logo;
