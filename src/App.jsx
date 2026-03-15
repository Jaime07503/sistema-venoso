import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Estudiar from "./pages/Estudiar";
import Juego from "./pages/Juego";
import Quiz from "./pages/Quiz";
import Clinica from "./pages/Clinica";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estudiar" element={<Estudiar />} />
        <Route path="/juego" element={<Juego />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/clinica" element={<Clinica />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;