import recipes from "./Recipes";
import Profile from '../Assets/icons_assets/profile_pic.png';

function Testimonials() {
    return (
        <div className="testimonials-container">
            <h2>Testimonials</h2>
            <section className="testimonials-section">
                <article>
                    <div className="testimonials-card">
                        {
                            recipes.map(recipes => <div key={recipes.id} className="testimonial-items">
                                <img src={recipes.image} alt='' />
                                <div className="testimonial-content">
                                    <img src={Profile} alt="Profile" className="profile-pic" />
                                    <p>{recipes.title}</p>
                                </div>
                                <div className="rating">
                                    {Array.from({ length: 5}).map((_,i) => (
                                        <span key={i} style={{color: i < recipes.rating ? "#FFD700" : "#ccc"}}>★</span>
                                    ))}
                                </div>
                                <div>
                                </div>
                            </div>)
                        }
                    </div>
                </article>
            </section>
        </div>
    )
}
export default Testimonials;