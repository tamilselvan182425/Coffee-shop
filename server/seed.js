const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
    {
        name: 'Classic Espresso',
        description: 'Rich and bold double shot of our premium signature blend.',
        price: 3.50,
        image: 'https://images.unsplash.com/photo-1510707577719-af7c183f1200?auto=format&fit=crop&q=80&w=1000',
        category: 'Hot',
        stock: 50
    },
    {
        name: 'Caramel Macchiato',
        description: 'Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle.',
        price: 4.75,
        image: 'https://images.unsplash.com/photo-1485808191679-5f6333bcbc73?auto=format&fit=crop&q=80&w=1000',
        category: 'Hot',
        stock: 35
    },
    {
        name: 'Iced Vanilla Latte',
        description: 'Smooth espresso with vanilla syrup, milk and ice.',
        price: 4.50,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=1000',
        category: 'Cold',
        stock: 40
    },
    {
        name: 'Cold Brew Signature',
        description: 'Slow-steeped for 20 hours for a super smooth finish.',
        price: 4.25,
        image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=1000',
        category: 'Cold',
        stock: 60
    },
    {
        name: 'Tiramisu Cake',
        description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.',
        price: 6.50,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=1000',
        category: 'Dessert',
        stock: 20
    },
    {
        name: 'Chocolate Lava Muffin',
        description: 'Warm chocolate muffin with a molten center.',
        price: 3.95,
        image: 'https://images.unsplash.com/photo-1582294203372-a7d18868c2d1?auto=format&fit=crop&q=80&w=1000',
        category: 'Dessert',
        stock: 25
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for seeding...');

        await Product.deleteMany();
        console.log('Products deleted...');

        await Product.insertMany(products);
        console.log('Products seeded!');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedDB();
