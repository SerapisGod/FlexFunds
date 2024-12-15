import React from 'react';
import ExpensesOutput from '../components/ExpensesOutput.js/ExpenseOutput';
import { Button, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';

function AllExpenses({ expenses, deleteExpense, navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Add Expense"
        onPress={() => navigation.navigate("AddExpense")}
      />
      <ExpensesOutput
        expenses={expenses}
        onDeleteExpense={deleteExpense}
        expensesPeriod="Total"
      />
    </View>
  );
}

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: GlobalStyles.colors.primary200, 
    padding: 16,
  },
});