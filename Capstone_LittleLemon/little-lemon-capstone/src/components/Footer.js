import logo from "../Assets/icons_assets/Logo .svg";

function Footer() {
    return (
        <footer>
            <section>
                <div>
                    <img src={logo} alt="Little Lemon Logo" className="logo_LiLemon"/>
                </div>
                <div>
                    <h3 className="footer-title">Doormat navigation</h3>
                    <ul className="footer-nav">
                        <li><a href="/">Home</a></li>
                        <li><a href="/">About</a></li>
                        <li><a href="/">Menu</a></li>
                        <li><a href="/">Reservation</a></li>
                        <li><a href="/">Order Online</a></li>
                        <li><a href="/">Login</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="footer-title">Contact</h3>
                    <ul>
                        <li>Address: Chicago, IL 60601 1234 Lemon St.</li> <br/>
                        <li>Phone:  (555) 019-2025</li><br/>
                        <li>Email:  contacto@littlelemondemo.com</li>
                    </ul>
                </div>
                <div>
                    <h3 className="footer-title">Social Media Links</h3>
                    <ul className="footer-nav">
                        <li><a href="/">Facebook</a></li>
                        <li><a href="/">Instagram</a></li>
                        <li><a href="/">Twitter</a></li>
                    </ul>
                </div>
            </section>
            <p>© 2025 Little Lemon</p>
        </footer>
    )
}

export default Footer;
