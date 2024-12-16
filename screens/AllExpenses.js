import React from 'react';
import ExpensesOutput from '../components/ExpensesOutput.js/ExpenseOutput';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { GlobalStyles } from '../constants/styles';

function AllExpenses({ expenses, deleteExpense, navigation }) {
  return (
    <View style={styles.container}>
      {/* Big, Bold Plus Button */}
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
        expensesPeriod="Total"
      />
    </View>
  );
}

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary50,
    padding: 16,
  },
  plusButton: {
    width: 60,                // Size of the button
    height: 60,
    borderRadius: 30,         // Makes it circular
    backgroundColor: GlobalStyles.colors.primary500, // Button color
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',      // Center horizontally in the container
    marginBottom: 16,         // Adds space below the button
    elevation: 5,             // Shadow on Android
    shadowColor: '#000',      // Shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  plusText: {
    fontSize: 32,             // Large plus sign
    fontWeight: 'bold',
    color: '#primary50',            // White color for the text
  },
});
