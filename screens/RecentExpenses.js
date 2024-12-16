import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput.js/ExpenseOutput';
import { GlobalStyles } from '../constants/styles';

function RecentExpenses({ expenses, deleteExpense, navigation }) {
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
  plusButton: {
    width: 60,                // Size of the button
    height: 60,
    borderRadius: 30,         // Circular shape
    backgroundColor: GlobalStyles.colors.primary500, // Button color
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',      // Center horizontally
    marginBottom: 16,         // Space below the button
    elevation: 5,             // Shadow on Android
    shadowColor: '#000',      // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  plusText: {
    fontSize: 32,             // Large plus sign
    fontWeight: 'bold',
    color: '#fff',            // White text color
  },
});
