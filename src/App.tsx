import { Converter } from "./components/Converter";
import "./App.css";

function App() {
  return (
    <div className="bg-zinc-900 h-screen flex flex-col justify-center items-center">
      <Converter.Root>
        <Converter.Header />
        <Converter.Form />
        <Converter.Footer />
      </Converter.Root>
    </div>
  );
}

export default App;
