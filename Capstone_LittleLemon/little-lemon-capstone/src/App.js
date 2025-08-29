import Nav from './components/Navbar';
import Header from './components/Header';
import Specials from './components/Specials';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Footer from './components/Footer';
import './App.css';
function App() {
 return (
    <div className="App"> 
        <Nav />
        <Header />
        <Specials />
        <Testimonials />
        <About />
        <Footer />
    </div>
 )
}

export default App;
