import { View, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const dummy_expenses = [
    { id: 'e1', category: 'grocery', description: 'Toilet Paper', amount: 94.12, date: new Date(2022, 1, 17) },
    { id: 'e2', category: 'entertainment', description: 'New TV', amount: 799.49, date: new Date(2022, 4, 1) },
    { id: 'e3', category: 'billing', description: 'Car Insurance', amount: 294.67, date: new Date(2022, 10, 15) },
    { id: 'e4', category: 'appliance', description: 'New Desk (Wooden)', amount: 450, date: new Date(2022, 7, 13) },
    { id: 'e5', category: 'grocery', description: 'Groceries', amount: 123.45, date: new Date(2023, 2, 20) },
    { id: 'e6', category: 'entertainment', description: 'Gym Membership', amount: 59.99, date: new Date(2023, 5, 5) },
    { id: 'e7', category: 'entertainment', description: 'Laptop', amount: 1200.89, date: new Date(2023, 8, 25) },
    { id: 'e8', category: 'grocery', description: 'Coffee Machine', amount: 250.75, date: new Date(2023, 11, 10) },
    { id: 'e9', category: 'clothing', description: 'Winter Jacket', amount: 350.00, date: new Date(2024, 0, 15) },
    { id: 'e10', category: 'billing', description: 'Phone Bill', amount: 79.99, date: new Date(2024, 3, 8) },
    { id: 'e11', category: 'entertainment', description: 'Books', amount: 45.30, date: new Date(2024, 6, 21) },
    { id: 'e12', category: 'appliance', description: 'Dining Table', amount: 999.99, date: new Date(2024, 9, 30) },
    { id: 'e13', category: 'grocery', description: 'Garden Supplies', amount: 135.45, date: new Date(2024, 4, 12) },
    { id: 'e14', category: 'entertainment', description: 'Airplane Tickets', amount: 450.60, date: new Date(2024, 2, 18) },
    { id: 'e15', category: 'entertainment', description: 'Streaming Subscription', amount: 15.99, date: new Date(2024, 10, 1) },
];

function ExpensesOutput({ expenses, expensesPeriod }) {
    return (
    <View style={styles.container}>
        <ExpensesSummary expenses={dummy_expenses} periodName={expensesPeriod}/>
        <ExpensesList expenses={dummy_expenses}/>
    </View>
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    }
});