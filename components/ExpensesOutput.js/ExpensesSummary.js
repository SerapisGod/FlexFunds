import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpensesSummary({ expenses, periodName }) {
    // Calculate total expense amount
    const expensesTotal = expenses?.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0) || 0;

    // Format total amount as currency
    const formattedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(expensesTotal);

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>{formattedTotal}</Text>
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
        borderRadius: 8,
    },
    period: {
        fontSize: 15,
        color: GlobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500,
    },
});
