import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput.js/ExpenseOutput';
import { GlobalStyles } from '../constants/styles';

function RecentExpenses({ expenses, deleteExpense, navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Add Expense"
        onPress={() => navigation.navigate("AddExpense")}
      />
      <ExpensesOutput
        expenses={expenses}
        onDeleteExpense={deleteExpense}
        expensesPeriod="Last 7 Days"
      />
    </View>
  );
}

export default RecentExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: GlobalStyles.colors.primary200,
    padding: 16,
  },
});
