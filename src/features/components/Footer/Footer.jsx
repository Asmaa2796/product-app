import style from './footer.module.css';
const Footer = () => {
    return (
        <footer className={`${style.footer} py-3 text-center`}>
            <div className="container">
                <small className="text-white-50">
                        © {new Date().getFullYear()} Asmaa Saad | All rights reserved
                </small>
            </div>
        </footer>
    );
}

export default Footer;