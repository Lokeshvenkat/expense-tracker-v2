// Import necessary modules and components
import React, { useContext, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import './AddExpensesModal.css';
import { ExpensesContext } from '../../Context/ExpensesContext';
import { ExpenseRatioContext } from '../../Context/ExpenseRatioContext';
import { v4 as uuidv4 } from 'uuid';
import { BalanceContext } from '../../Context/BalanceContext';
import { useSnackbar } from 'notistack';

// Set the app element for the modal
ReactModal.setAppElement('#root');

// Define the AddExpenseModal component
export default function AddExpensesModal({ isOpen, handleCloseModal, totalExpense, setTotalExpense }) {
    // State for managing form data
    const [formData, setFormData] = useState({});

    // Access the expenses, expense ratio, and balance data from their respective contexts
    const { expenses, setExpenses } = useContext(ExpensesContext);
    const { expenseRatio, setExpenseRatio } = useContext(ExpenseRatioContext);
    const { balance, setBalance } = useContext(BalanceContext);

    // Access snackbar functions for notifications
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // Effect to load expenses and expense ratio data from localStorage
    useEffect(() => {
        const expensesData = JSON.parse(localStorage.getItem('expenses')) || [];
        setExpenses(expensesData);

        const expenseRatioData = JSON.parse(localStorage.getItem('expenseRatio')) || {};
        setExpenseRatio(expenseRatioData);
    }, [setExpenses, setExpenseRatio]);

    // Function to handle adding an expense
    const handleAddExpense = () => {
        // Calculate the total expense after adding the new expense
        const totalTrackerExpense = totalExpense + Number(formData.price);

        // Check if the total expense exceeds the balance
        if (totalTrackerExpense > balance) {
            const key = enqueueSnackbar('Expense cannot exceed Wallet Balance', {
                variant: 'warning',
                autoHideDuration: 3000,
                style: { cursor: 'pointer' },
                SnackbarProps: {
                    onClick: () => closeSnackbar(key),
                },
            });
        } else {
            // Update the total expense
            setTotalExpense(totalTrackerExpense);

            // Update local storage with the new expense
            const newExpense = { ...formData, id: uuidv4() };
            const updatedExpenses = [...expenses, newExpense];
            localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
            setExpenses(updatedExpenses);

            // Update the expense ratio
            const price = expenseRatio[formData.category]?.price
                ? expenseRatio[formData.category].price + Number(formData.price)
                : Number(formData.price);
            const newExpenseRatio = { ...expenseRatio, [formData.category]: { price } };

            // Calculate the total price for ratio calculation
            let totalPrice = 0;
            Object.keys(newExpenseRatio).forEach((item) => {
                totalPrice += newExpenseRatio[item].price;
            });

            // Calculate and update the ratios
            Object.keys(newExpenseRatio).forEach((item) => {
                const ratio = Math.floor(newExpenseRatio[item].price / totalPrice * 100);
                newExpenseRatio[item].ratio = ratio;
            });

            // Save the updated expense ratio to localStorage
            localStorage.setItem('expenseRatio', JSON.stringify(newExpenseRatio));
            setExpenseRatio(newExpenseRatio);
        }

        // Close the modal and reset the form data
        handleCloseModal();
        setFormData({});
    };

    // Render the component
    return (
        <ReactModal
  isOpen={isOpen}
  onRequestClose={handleCloseModal}
  shouldCloseOnOverlayClick={true}
  className='AddExpenseModal'
  overlayClassName='AddExpenseModalOverlay'
>
  <div>
    <h1>Add Expense</h1>
    <div className='grid'>
      <input
        type="text"
        name="title"
        placeholder='Title'
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />
      <div className='select-container'>
        <select
          name="category"
          id="category"
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="Select Category" defaultValue>Select Category</option>
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Travel">Travel</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Education">Education</option>
          <option value="Savings">Savings</option>
          <option value="Debt">Debt</option>
          <option value="Personal Care">Personal Care</option>
        </select>
      </div>
      <input
        type="text"
        name="date"
        placeholder='dd/mm/yy'
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />
      <button type="submit" className='AddExpense-button' onClick={handleAddExpense}>
        Add Expense
      </button>
      <div>
        <button type="submit" className='cancel-button' onClick={handleCloseModal}>
          Cancel
        </button>
      </div>
    </div>
  </div>
</ReactModal>

    );
}
