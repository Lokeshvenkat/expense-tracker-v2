// Import necessary modules and components
import { useContext, useState } from "react";
import { ExpensesContext } from "../../Context/ExpensesContext";
import { ExpenseRatioContext } from "../../Context/ExpenseRatioContext";
import { TiDeleteOutline } from "react-icons/ti";
import { GoPencil } from "react-icons/go";
import EditExpensesModal from "../Modals/EditExpensesModal";
import {
    FaUtensils, FaTools, FaPlane, FaHeartbeat, FaFilm,
    FaShoppingBag, FaGraduationCap, FaPiggyBank, FaCreditCard, FaSpa
} from 'react-icons/fa';

// Define category data with corresponding icons
const categoryData = {
    'Food': { img: <FaUtensils /> },
    'Utilities': { img: <FaTools /> },
    'Travel': { img: <FaPlane /> },
    'Healthcare': { img: <FaHeartbeat /> },
    'Entertainment': { img: <FaFilm /> },
    'Shopping': { img: <FaShoppingBag /> },
    'Education': { img: <FaGraduationCap /> },
    'Savings': { img: <FaPiggyBank /> },
    'Debt': { img: <FaCreditCard /> },
    'Personal Care': { img: <FaSpa /> }
};

// Define the TransactionList component
export default function TransactionList({ item }) {
    // Access the expenses and expense ratio data from their respective contexts
    const { expenses, setExpenses } = useContext(ExpensesContext);
    const { expenseRatio, setExpenseRatio } = useContext(ExpenseRatioContext);

    // State for managing the modal open/close status
    const [isOpen, setIsOpen] = useState(false);

    // Options for formatting the date
    var options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    };

    // Format the date from the item or use the current date
    let unformattedDate = item.date ? item.date : new Date().toString();
    let [day, month, year] = unformattedDate.split('/');
    const date = new Date(`${year}-${month}-${day}`).toLocaleDateString('en-US', options);

    // Function to handle the deletion of an expense
    const handleDelete = (e) => {
        let id = e.currentTarget.getAttribute('id');
        let newExpenses = expenses.filter(item => item.id !== id);
        setExpenses(newExpenses);
        localStorage.setItem('expenses', JSON.stringify(newExpenses));

        let expenseRatioCopy = { ...expenseRatio };
        let expense = expenses.filter(item => item.id === id)[0];
        let category = expense.category;
        let currPrice = expense.price;
        let price = expenseRatioCopy[category].price - currPrice;

        if (price === 0) {
            delete expenseRatioCopy[category];
        } else {
            expenseRatioCopy = { ...expenseRatioCopy, [category]: { price } };
        }

        let totalPrice = 0;
        Object.keys(expenseRatioCopy).forEach((item) => {
            totalPrice = totalPrice + expenseRatioCopy[item].price;
        });

        Object.keys(expenseRatioCopy).forEach((item) => {
            let ratio = Math.floor(expenseRatioCopy[item].price / totalPrice * 100);
            expenseRatioCopy[item].ratio = ratio;
        });

        localStorage.setItem('expenseRatio', JSON.stringify(expenseRatioCopy));
        setExpenseRatio(expenseRatioCopy);
    };

    // Function to close the modal
    const handleCloseModal = () => setIsOpen(false);

    // Function to open the modal
    const handleOpenModal = () => setIsOpen(true);

// Render the component
return (
    <div className='TransactionList'>
        {/* Container for the category icon */}
        <div className='img-container'>
            {categoryData[item.category]?.img}
        </div>

        {/* Inner container for transaction details */}
        <div className='TransactionList-inner'>
            <div>
                {/* Display the title of the transaction */}
                <p className='title' name="title">{item.title}</p>

                {/* Display the formatted date of the transaction */}
                <p className='date' >{date}</p>
            </div>

            {/* Display the price of the transaction */}
            <span className='price' name="price">₹{item.price}</span>
        </div>

        {/* Container for action buttons */}
        <div className='buttons'>
            {/* Button to delete the transaction */}
            <button type="submit" className='delete' id={item.id} onClick={e => handleDelete(e)}>
                <TiDeleteOutline className='icon-button' />
            </button>

            {/* Button to edit the transaction */}
            <button type="submit" className='edit' id={item.id} onClick={e => handleOpenModal(e)}>
                <GoPencil className='icon-button' />
            </button>
        </div>

        {/* Modal for editing the expense, controlled by the isOpen state */}
        <EditExpensesModal isOpen={isOpen} handleCloseModal={handleCloseModal} id={item.id}></EditExpensesModal>
    </div>
);

}
