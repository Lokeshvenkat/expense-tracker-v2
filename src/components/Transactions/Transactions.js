// Import necessary modules and components
import React, { useContext, useState } from 'react';
import './Transactions.css';
import { ExpensesContext } from '../../Context/ExpensesContext';
import TransactionsList from './TransactionsList';
import Pagination from './Pagination';

// Define the Transaction component
function Transactions() {
    // Access the expenses data from the ExpenseContext
    const { expenses } = useContext(ExpensesContext);

    // State for managing the current page index
    const [pageIndex, setPageIndex] = useState(0);

    // Calculate the start and end indices for slicing the expenses array
    let startIndex = pageIndex * 3;
    let endIndex = startIndex + 3;

    // Render the component
    return (
        <div className='Transaction'>
            {/* Title for the transaction section */}
            <h2>Recent Transactions</h2>

            {/* Inner container for transaction list and pagination */}
            <div className='Transaction-inner'>
                {/* Container for the list of transactions */}
                <div style={{ flex: 1 }}>
                    {/* Display a message if there are no transactions */}
                    {expenses.length === 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <p style={{ color: 'gray' }}>No Transactions</p>
                        </div>
                    )}

                    {/* Map through the sliced expenses array and render TransactionList components */}
                    {expenses.slice(startIndex, endIndex).map((item, index) => (
                        <TransactionsList item={item} key={index} />
                    ))}
                </div>

                {/* Pagination component for navigating through pages of transactions */}
                <Pagination pageIndex={pageIndex} setPageIndex={setPageIndex} />
            </div>
        </div>
    );
}

// Export the Transaction component as the default export
export default Transactions;
