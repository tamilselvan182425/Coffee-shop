const Footer = () => {
    return (
        <footer className="bg-coffee-950 text-coffee-300 py-10 mt-20 border-t border-coffee-900">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
                <div>
                    <h3 className="text-coffee-100 text-xl font-bold mb-4">COFFEE HAVEN</h3>
                    <p className="text-sm leading-relaxed">
                        Brewing the finest moments since 2024. Your daily dose of happiness, one cup at a time.
                    </p>
                </div>
                <div>
                    <h4 className="text-coffee-100 font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-coffee-500 transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-coffee-500 transition-colors">Our Menu</a></li>
                        <li><a href="#" className="hover:text-coffee-500 transition-colors">Delivery Info</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-coffee-100 font-semibold mb-4">Contact Us</h4>
                    <p className="text-sm">123 Brew Lane, Caffeine City</p>
                    <p className="text-sm">support@coffeehaven.com</p>
                </div>
            </div>
            <div className="text-center mt-10 pt-5 border-t border-coffee-900 text-xs">
                &copy; {new Date().getFullYear()} Coffee Haven. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
