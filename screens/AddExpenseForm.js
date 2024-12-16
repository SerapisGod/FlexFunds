import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const AddExpenseForm = ({ addExpense }) => { // Use addExpense here
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    date: new Date(),
  });

  const handleSubmit = async () => {
    if (!newExpense.description || !newExpense.amount) {
      console.warn("All fields are required!");
      return;
    }
  
    // Ensure the date is always valid
    const expenseDate = newExpense.date instanceof Date 
      ? newExpense.date 
      : new Date(); // Fallback to current date
  
    const expenseData = {
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      date: expenseDate.toISOString(), // Safe to use
    };
  
    try {
      await addExpense(expenseData); // Pass to parent function
      setNewExpense({ description: "", amount: "", date: new Date() }); // Reset form
    } catch (error) {
      console.error("Error adding expense:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={newExpense.description}
        onChangeText={(value) =>
          setNewExpense({ ...newExpense, description: value })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={newExpense.amount}
        onChangeText={(value) =>
          setNewExpense({ ...newExpense, amount: value })
        }
      />
      <Button title="Add Expense" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 5,
  },
});

export default AddExpenseForm;
