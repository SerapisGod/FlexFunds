import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { GlobalStyles } from '../constants/styles';


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

    try {
      const response = await fetch(
        "https://675e5d6d63b05ed0797a018b.mockapi.io/forexpenses",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: newExpense.description,
            amount: parseFloat(newExpense.amount),
            date: newExpense.date.toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add expense. Try again!");
      }

      const addedExpense = await response.json();
      console.log("Expense added:", addedExpense);

      // Call the addExpense function passed as a prop
      addExpense(addedExpense);

      // Reset form fields
      setNewExpense({ description: "", amount: "", date: new Date() });
      navigation.goBack();
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
    backgroundColor: Gprimary100lobalStyles.colors.,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 5,
  },
});

export default AddExpenseForm;
