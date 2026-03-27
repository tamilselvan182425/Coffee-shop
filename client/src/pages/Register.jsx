import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiChevronRight } from 'react-icons/fi';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            toast.success('Registration successful!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="container mx-auto px-4 py-20 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden">
                <div className="px-10 pt-12 text-center">
                    <h2 className="text-4xl font-black text-coffee-950 mb-3">Welcome!</h2>
                    <p className="text-coffee-600 mb-10">Create an account to start ordering</p>
                </div>

                <form onSubmit={handleSubmit} className="px-10 pb-12">
                    <div className="space-y-6">
                        <div className="relative">
                            <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-coffee-400" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full bg-coffee-50 border-2 border-transparent focus:border-coffee-500 focus:bg-white outline-none rounded-2xl pl-14 pr-6 py-4 transition-all"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative">
                            <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-coffee-400" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-coffee-50 border-2 border-transparent focus:border-coffee-500 focus:bg-white outline-none rounded-2xl pl-14 pr-6 py-4 transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative">
                            <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-coffee-400" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-coffee-50 border-2 border-transparent focus:border-coffee-500 focus:bg-white outline-none rounded-2xl pl-14 pr-6 py-4 transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-primary w-full py-5 flex items-center justify-center gap-2 group text-lg">
                            Get Started
                            <FiChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </button>
                    </div>

                    <div className="mt-10 text-center">
                        <p className="text-coffee-500 text-sm">
                            Already have an account? {' '}
                            <Link to="/login" className="text-coffee-700 font-bold hover:underline">Sign In</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
