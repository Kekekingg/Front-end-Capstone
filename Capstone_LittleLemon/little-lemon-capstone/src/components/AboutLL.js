import Restaurant from '../Assets/icons_assets/restaurant.jpg';
import Chef2 from '../Assets/icons_assets/Mario and Adrian b.jpg';

function AboutLL() {
    return (
        <div>
            <div className='about-ll-container'>
                <section className='about-ll-section'>
                    <h2>Little Lemon</h2>
                    <h3>Chicago</h3>
                    <p>Sed aliquet sed enim scelerisque consectetur. Etiam id nisi eget nulla dignissim consectetur. Nulla rutrum, risus at volutpat consequat, elit felis cursus sem, a consectetur mauris<br/><br/>

                    lacus fringilla purus. Nunc rutrum ante mauris, vitae auctor metus maximus a. Sed vel faucibus orci. Nam suscipit ex et neque feugiat vestibulum. </p>
            </section>
            <section className="about-ll-image-section">
                <img src={Restaurant} alt='Little Lemon Restaurant Pic'/>
                <img src={Chef2} alt='Little Lemon Chefs Pic'/>
            </section>
            </div>
        </div>
    )  
}
export default AboutLL;