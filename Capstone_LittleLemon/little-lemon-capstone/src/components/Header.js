import Foodhd from '../Assets/icons_assets/restauranfood.jpg'
import { useNavigate } from 'react-router-dom';

function Header () {
    const navigate = useNavigate();
    
    return (
        <header className="header">
            <section className="hero-container">
                 {/* banner texts */}
                <div className="hero-text">
                    <h1>Little Lemon</h1>
                    <h2>Chicago</h2>
                    <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                    <button 
                    aria-label='On Click' 
                    className="btn btn-reserve"
                    onClick={() => navigate('/booking')}
                    >
                    Reserve a Table
                    </button>
                </div>
                {/* banner image */}
                <div className="hero-image">
                    <img 
                    src={Foodhd}
                    className='food-header' 
                    alt="Hero Image: Delicious food on a table" />
                </div>
            </section>
        </header>
    )
}

export default Header;