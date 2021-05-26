import { createStore, combineReducers } from 'redux';
import {v4 as uuid4} from 'uuid';

// ADD_EXPENSE
const addExpense = (
    { 
        description = '', 
        note = '', 
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid4(),
        description, 
        note, 
        amount, 
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id, 
    updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});


// Expenses Reducer 
const expenesReducerDefaultState = []
const expenseReducer = (state = expenesReducerDefaultState, action) => {
    switch(action.type) {
        case('ADD_EXPENSE'):
            return [...state, action.expense]
        case('REMOVE_EXPENSE'):
            return state.filter(expense => expense.id !== action.id)
        case('EDIT_EXPENSE'):
            return state.map(expense => {
                if(expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            });
        default: 
            return state;
    }
}

// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined, 
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state, 
                endDate: action.endDate
            }
        default: 
            return state;
    }
}

// timestamps
// January 1st 1970 (unix epoch)
// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch =  expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    });
}

const store = createStore(
    combineReducers({
        expenses: expenseReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    console.log(state);
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
});

store.dispatch(addExpense({ description: 'toothpaste', amount: 1000, createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Beer', amount: 1000, createdAt: 10000 }));
store.dispatch(addExpense({ description: 'Ginger', amount: 1000, createdAt: 10000 }));

store.dispatch(setTextFilter('er'))


// const expenseTwo = store.dispatch(addExpense({ description: 'Beer', amount: 5000, createdAt: -1000 }));
// //store.dispatch(removeExpense({ id: expenseOne.expense.id }))

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 15000, note: 'Ginger Beer' }));


// store.dispatch(setTextFilter('hullabulla'))

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());


// 
// store.dispatch(setEndDate(1250));