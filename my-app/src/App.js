import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
// import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
    <NavigationBar />
    <Routes>
      <Route path="/home" element={<Content />} />
      <Route path="/read" element={<h1 className="text-center text-primary">Read Component</h1>} />
      <Route path="/create" element={<h1 className="text-center text-primary">Create Component</h1>} />
    </Routes>
    <Footer />
  </Router>
  );
}

export default App;
