import Article from "./components/layout/Article";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

function App() {
  return (
    <section className="grid grid-row justify-center w-screen h-screen bg-gradient-to-tr from-slate-950/90 via-sky-950 to-cyan-950 from-60% text-slate-50/60">
      <section className="container grid grid-cols-12 grid-rows-12">
        {/* 헤더 */}
        <Header />
        {/* 사이드바 */}
        <Sidebar />
        {/* 컨텐츠 */}
        <Article />
      </section>
    </section>
  );
}

export default App;
