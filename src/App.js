import { NavBar } from './components/NavBar';
import { Banner } from './components/MainBanner';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { Contact } from './components/Contact';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css';

import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
