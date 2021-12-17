import express from 'express';
import {
  getCustomerBySlug,
  getCustomerByID,
  getCustomers,
  addCustomer,
  updateCustomer,
} from '../controllers/customers.js';

const router = express.Router();

router.get('/details/:id', getCustomerByID);
router.get('/:slug', getCustomerBySlug);
router.get('/', getCustomers);
router.post('/', addCustomer);
router.patch('/:id', updateCustomer);

export default router;
