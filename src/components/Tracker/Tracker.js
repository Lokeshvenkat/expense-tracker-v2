// Import necessary modules and components
import React, { useContext, useEffect, useState } from 'react';
import './Tracker.css';
import TrackerChart from './TrackerChart';
import { ExpensesContext } from '../../Context/ExpensesContext';
import { BalanceContext } from '../../Context/BalanceContext';
import AddExpensesModal from '../Modals/AddExpensesModal';
import AddBalanceModal from '../Modals/AddBalanceModal';

// Define the Tracker component
function Tracker() {
    // Access the expenses data from the ExpensesContext
    const { expenses } = useContext(ExpensesContext);

    // Access and set the balance data from the BalanceContext
    const { balance, setBalance } = useContext(BalanceContext);

    // State for managing the total expense
    const [totalExpense, setTotalExpense] = useState(0);

    // State for managing the modal open/close status for adding an expense
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

    // State for managing the modal open/close status for adding balance
    const [isAddBalanceOpen, setIsAddBalanceOpen] = useState(false);

    // Effect to update the balance and total expense when expenses change
    useEffect(() => {
        // Retrieve balance from localStorage or set a default value
        if (localStorage.getItem('balance')) {
            setBalance(Number(localStorage.getItem('balance')));
        } else {
            setBalance(5000);
        }

        // Calculate the total expense
        let sum = 0;
        expenses.forEach(item => sum = sum + Number(item.price));
        setTotalExpense(sum);
    }, [expenses, setBalance]);

    // Function to open the add expense modal
    const handleAddExpense = () => {
        setIsAddExpenseOpen(true);
    };

    // Function to close the add expense modal
    const handleCloseAddExpensesModal = () => {
        setIsAddExpenseOpen(false);
    };

    // Function to open the add balance modal
    const handleAddBalance = () => {
        setIsAddBalanceOpen(true);
    };

    // Function to close the add balance modal
    const handleCloseAddBalanceModal = () => {
        setIsAddBalanceOpen(false);
    };

    // Render the component
    return (
        <div className='Tracker'>
            <h1>Expense Tracker</h1>
            <div className='Tracker-inner'>
                <div className='Tracker-inner-2'>
                    <div className='balance'>
                        <p>Wallet Balance: <span>₹{balance - totalExpense}</span></p>
                        <button onClick={() => handleAddBalance()}>+ Add Income</button>
                    </div>
                    <div className='expenses'>
                        <p>Expenses: <span>₹{totalExpense}</span></p>
                        <button onClick={() => handleAddExpense()}>+ Add Expense</button>
                    </div>
                </div>
                <TrackerChart />
            </div>
            <AddExpensesModal
                isOpen={isAddExpenseOpen}
                handleCloseModal={handleCloseAddExpensesModal}
                totalExpense={totalExpense}
                setTotalExpense={setTotalExpense}
            />
            <AddBalanceModal
                isOpen={isAddBalanceOpen}
                handleCloseModal={handleCloseAddBalanceModal}
                totalExpense={totalExpense}
                setTotalExpense={setTotalExpense}
            />
        </div>
    );
}

// Export the Tracker component as the default export
export default Tracker;
