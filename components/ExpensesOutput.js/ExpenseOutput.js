import { View, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";
import PiechartComp from "../charts/piechartComp";

function ExpensesOutput({ expenses, setExpenses, expensesPeriod, onDeleteExpense }) {
    const handleDeleteExpense = (id) => {
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    };

    return (
        <View>
            <ExpensesList
                expenses={expenses}
                setExpenses={setExpenses}
                onDeleteExpense={onDeleteExpense} 
        />
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
    },
});
