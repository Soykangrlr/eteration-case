import Basket from "./components/basket";
import Header from "./components/header";
import Index from "./pages";



function App() {
  return (
    <div >
      <Header/>
      <div className="flex md:container mt-10 mx-auto md:gap-x-5">      
        <Index/>
        <div className="md:basis-2/12 basis-0 hidden md:block">
          <Basket/>
        </div>
      </div>

    </div>
  );
}

export default App;
