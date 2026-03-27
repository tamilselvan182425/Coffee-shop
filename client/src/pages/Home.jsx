import { Link } from 'react-router-dom';
import { FiArrowRight, FiCoffee, FiTruck, FiSmile } from 'react-icons/fi';

const Home = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[85vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2070"
                        alt="Coffee Hero"
                        className="w-full h-full object-cover brightness-[0.4]"
                    />
                </div>

                <div className="container mx-auto px-4 z-10 text-white">
                    <div className="max-w-2xl">
                        <span className="inline-block px-4 py-1 rounded-full bg-coffee-600/30 backdrop-blur-sm border border-coffee-500/50 text-coffee-100 text-sm font-semibold mb-6 animate-fade-in">
                            The Best Coffee in Town
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Freshly Brewed <br />
                            <span className="text-coffee-400">Happiness</span> In Every Cup
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
                            Experience the rich aroma and exquisite taste of our carefully sourced,
                            artisan-roasted coffee beans. Your perfect morning companion.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/menu" className="btn-primary flex items-center gap-2 group">
                                Explore Menu
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/register" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all shadow-lg active:scale-95">
                                Join Our Club
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-coffee-50 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-coffee-600 text-white flex items-center justify-center rounded-2xl mb-6 shadow-lg rotate-3">
                                <FiCoffee size={30} />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-coffee-900">Premium Beans</h3>
                            <p className="text-coffee-700 leading-relaxed">
                                We source only the finest single-origin Arabica beans from sustainable farms worldwide.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-coffee-50 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-coffee-800 text-white flex items-center justify-center rounded-2xl mb-6 shadow-lg -rotate-3">
                                <FiTruck size={30} />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-coffee-900">Fast Delivery</h3>
                            <p className="text-coffee-700 leading-relaxed">
                                Get your coffee hot and fresh at your doorstep in less than 30 minutes, guaranteed.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-coffee-50 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-coffee-900 text-white flex items-center justify-center rounded-2xl mb-6 shadow-lg rotate-3">
                                <FiSmile size={30} />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-coffee-900">Expert Baristas</h3>
                            <p className="text-coffee-700 leading-relaxed">
                                Our passionate team is trained to deliver perfection in every single drop of your brew.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
