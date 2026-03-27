const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getMyOrders,
    getOrders,
    updateOrderStatus
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/user').get(protect, getMyOrders);
router.route('/:id').put(protect, admin, updateOrderStatus);

module.exports = router;
