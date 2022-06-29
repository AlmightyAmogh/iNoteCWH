import "./App.css";
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/Notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
    <NoteState>
      
      <Router>
        <Navbar />
        <Alert message="hi changing for git try"/>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
          
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<Signup/>} />
      
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
