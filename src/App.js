import "./App.css";
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/Notes/NoteState";
import Alert from "./components/Alert";

function App() {
  return (
    <>
    <NoteState>
      
      <Router>
        <Navbar />
        <Alert message="hi"/>
        <Routes>
        <Route path="/" element={<Home/>} />
          
        <Route exact path="/about" element={<About/>} />
      
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
