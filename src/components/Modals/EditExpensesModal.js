// Import necessary modules and components
import React, { useContext, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import './AddExpensesModal.css';
import { ExpensesContext } from '../../Context/ExpensesContext';
import { ExpenseRatioContext } from '../../Context/ExpenseRatioContext';

// Set the app element for the modal
ReactModal.setAppElement('#root');

// Define the EditExpenseModal component
export default function EditExpenseModal({ isOpen, handleCloseModal, id }) {
    // State for managing form data
    const [formData, setFormData] = useState({});

    // Access the expenses and expense ratio data from their respective contexts
    const { expenses, setExpenses } = useContext(ExpensesContext);
    const { expenseRatio, setExpenseRatio } = useContext(ExpenseRatioContext);

    // State for managing the index of the expense being edited
    const [index, setIndex] = useState(null);

    // Effect to load expenses and expense ratio data from localStorage
    useEffect(() => {
        const expensesData = JSON.parse(localStorage.getItem('expenses')) || [];
        setExpenses(expensesData);

        const expenseRatioData = JSON.parse(localStorage.getItem('expenseRatio')) || {};
        setExpenseRatio(expenseRatioData);
    }, [setExpenses, setExpenseRatio, id]);

    // Effect to set form data when the modal is opened
    useEffect(() => {
        if (isOpen) {
            let i = expenses.findIndex(item => item.id === id);
            setFormData(expenses[i]);
            setIndex(i);
        }
    }, [expenses, id, isOpen]);

    // Function to handle editing an expense
    const handleEditExpense = () => {
        // Create a copy of the expense ratio
        let expenseRatioCopy = { ...expenseRatio };

        // Get the expense being edited
        let expense = expenses.filter(item => item.id === id)[0];
        let oldCategory = expense.category;
        let oldPrice = expense.price;
        let newCategory = formData.category;
        let newPrice = formData.price;

        // Delete or reduce the old price from the expense ratio in the old category
        let price = expenseRatioCopy[oldCategory].price - oldPrice;
        if (price === 0) {
            delete expenseRatioCopy[oldCategory];
        } else {
            expenseRatioCopy = { ...expenseRatioCopy, [oldCategory]: { price } };
        }

        // Add or increase the new price in the new category
        price = expenseRatioCopy[newCategory] ? expenseRatioCopy[newCategory].price + Number(newPrice) : Number(newPrice);
        expenseRatioCopy = { ...expenseRatioCopy, [newCategory]: { price } };

        // Calculate ratios for the new categories
        let totalPrice = 0;
        Object.keys(expenseRatioCopy).forEach((item) => {
            totalPrice = totalPrice + expenseRatioCopy[item].price;
        });

        Object.keys(expenseRatioCopy).forEach((item) => {
            let ratio = Math.floor(expenseRatioCopy[item].price / totalPrice * 100);
            expenseRatioCopy[item].ratio = ratio;
        });

        // Save the updated expense ratio to localStorage
        localStorage.setItem('expenseRatio', JSON.stringify(expenseRatioCopy));
        setExpenseRatio(expenseRatioCopy);

        // Replace the expense in the expenses array
        let expensesCopy = [...expenses];
        let index = expensesCopy.findIndex(item => item.id === id);
        expensesCopy.splice(index, 1, { ...formData, id });

        // Save the updated expenses to localStorage
        localStorage.setItem('expenses', JSON.stringify(expensesCopy));
        setExpenses(expensesCopy);

        // Close the modal
        handleCloseModal();
    };

    // Render the component
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={handleCloseModal}
            shouldCloseOnOverlayClick={true}
            className='EditExpenseModal'
            overlayClassName='EditExpenseModalOverlay'
        >
            <div>
                <h1>Edit Expense</h1>
                {index !== null && (
                    <div className='grid'>
                        <input
                            type="text"
                            placeholder='Title'
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder='Price'
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                        <div className='select-container'>
                            <select
                                name="category"
                                id="category"
                                value={formData.category || "Select Category"}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Select Category">Select Category</option>
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
                            placeholder='dd/mm/yy'
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                        <button type="submit" className='EditExpense-button' onClick={handleEditExpense}>
                            Save Changes
                        </button>
                        <div>
                            <button type="submit" className='cancel-button' onClick={handleCloseModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </ReactModal>
    );
}
