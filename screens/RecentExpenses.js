import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput.js/ExpenseOutput';
import { GlobalStyles } from '../constants/styles';

function RecentExpenses({ expenses, deleteExpense, navigation }) {
  // Filter expenses from the last 7 days
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    return expense.date >= sevenDaysAgo && expense.date <= today;
  })
  .sort((a, b) => b.date - a.date);

  return (
    <View style={styles.container}>
      {/* Big, Bold Circular Add Expense Button */}
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => navigation.navigate("AddExpense")}
      >
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>

      {/* Expenses Output */}
      <ExpensesOutput
        expenses={recentExpenses} // Pass filtered recent expenses
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
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 16,
  },
  plusButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: GlobalStyles.colors.primary500,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  plusText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#primary50', //'#fff'
  },
});
