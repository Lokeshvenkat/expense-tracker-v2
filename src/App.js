// Import necessary modules and components
import { useState } from 'react';
import './App.css';
import { ExpensesContext } from './Context/ExpensesContext';
import { ExpenseRatioContext } from './Context/ExpenseRatioContext';
import { BalanceContext } from './Context/BalanceContext';
import { SnackbarProvider } from 'notistack';
import MainPage from './Pages/Main';

// Define the main App component
function App() {
  // State for managing expense ratio data
  const [expenseRatio, setExpenseRatio] = useState([]);

  // State for managing expenses data
  const [expenses, setExpenses] = useState([]);

  // State for managing balance data
  const [balance, setBalance] = useState(null);

  // Log the window dimensions to the console
  console.log(window.innerWidth + 'px', window.innerHeight + 'px');

  // Render the component
  return (
    // SnackbarProvider for displaying notifications
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      maxSnack={1}
      preventDuplicate
    >
      {/* Context providers for managing state across components */}
      <ExpenseRatioContext.Provider value={{ expenseRatio, setExpenseRatio }}>
        <ExpensesContext.Provider value={{ expenses, setExpenses }}>
          <BalanceContext.Provider value={{ balance, setBalance }}>
            {/* Main page component */}
            <MainPage />
          </BalanceContext.Provider>
        </ExpensesContext.Provider>
      </ExpenseRatioContext.Provider>
    </SnackbarProvider>
  );
}

// Export the App component as the default export
export default App;
