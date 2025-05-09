// Import necessary modules and components
import { useContext, useEffect } from "react";
import { ExpensesContext } from "../../Context/ExpensesContext";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

// Define the Pagination component
export default function Pagination({ pageIndex, setPageIndex }) {
    // Access the expenses data from the ExpenseContext
    const { expenses } = useContext(ExpensesContext);

    // Calculate the number of pages needed based on the number of expenses
    let numberOfPages = Math.ceil(expenses.length / 3);

    // Render the component
    return (
        <div>
            {/* Only render pagination if there are pages to display */}
            {numberOfPages > 0 && (
                <div className='Pagination'>
                    {/* Button to navigate to the previous page */}
                    <button type="submit"
                        className='Pagination-navigation-button'
                        onClick={() => pageIndex > 0 && setPageIndex(pageIndex - 1)}
                    >
                        <IoIosArrowRoundBack style={{ width: '24px', height: '24px' }} />
                    </button>

                    {/* Container for page number buttons */}
                    <div className='Pagination-inner'>
                        {/* Generate buttons for each page */}
                        {Array.from({ length: numberOfPages }, (_, i) => (
                            <button type="submit"
                                key={i}
                                id={i}
                                className='Pagination-page-button'
                                onClick={() => setPageIndex(i)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    {/* Button to navigate to the next page */}
                    <button type="submit"
                        className='Pagination-navigation-button'
                        onClick={() => pageIndex < numberOfPages - 1 && setPageIndex(pageIndex + 1)}
                    >
                        <IoIosArrowRoundForward style={{ width: '24px', height: '24px' }} />
                    </button>
                </div>
            )}
        </div>
    );
}
