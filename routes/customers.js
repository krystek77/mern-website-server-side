import express from 'express';
import {
  getCustomerByID,
  getCustomers,
  addCustomer,
  updateCustomer,
} from '../controllers/customers.js';

const router = express.Router();

router.get('/:id', getCustomerByID);
router.get('/', getCustomers);
router.post('/', addCustomer);
router.patch('/:id', updateCustomer);

export default router;
