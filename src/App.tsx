import Article from "./components/layout/Article";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

function App() {
  return (
    <section className="flex flex-col items-center w-screen h-screen bg-gradient-to-tr from-slate-950/90 via-sky-950 to-cyan-950 from-60% text-slate-50/60">
      {/* 헤더 */}
      <Header />
      <section className="container grid grid-cols-12 grid-rows-12 w-full h-[95vh]">
        {/* 사이드바 */}
        <Sidebar />
        {/* 컨텐츠 */}
        <Article />
      </section>
    </section>
  );
}

export default App;
