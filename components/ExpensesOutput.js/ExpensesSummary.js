import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";


function ExpensesSummary({ expenses, periodName }) {
    console.log('Expenses:', expenses);
    console.log('Period Name:', periodName);

    const expensesTotal = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>${expensesTotal.toFixed(2)}</Text>
        </View>
    );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 8
    },
    period: {
        fontSize: 15,
        color: GlobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500,
    }
}); 
