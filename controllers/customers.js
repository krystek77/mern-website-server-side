import Customer from '../models/customers.js';
import mongoose from 'mongoose';

export const getCustomerBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const customer = await Customer.findOne({ slug: slug }, '-__v');
    return res.status(200).json(customer);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({}, '-__v');
    return res.status(200).json(customers);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getCustomerByID = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ message: 'No customer with that ID' });
    }
    const customer = await Customer.findById(_id, '-__v');
    return res.status(200).json(customer);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const addCustomer = async (req, res) => {};
export const updateCustomer = async (req, res) => {};
