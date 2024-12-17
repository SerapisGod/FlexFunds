import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import React, { useState } from "react";
import { GlobalStyles } from "../../constants/styles";

const AddExpenseForm = ({ addExpenseFunc }) => {
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
            date: new Date().toISOString(), // Ensure valid date
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to add expense. Try again!");
      }
  
      const addedExpense = await response.json();
      console.log("Expense added:", addedExpense);
  
      // Reset form inputs
      setNewExpense({ description: "", amount: "", date: new Date() });
  
      // Trigger parent fetchExpenses to reload from API
      addExpenseFunc(); 
    } catch (error) {
      console.error("Error adding expense:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.inputBox, {color: 'black'}]}
        placeholder="Item description"
        value={newExpense.description}
        onChangeText={(input) =>
          setNewExpense({ ...newExpense, description: input })
        }
      />
      <TextInput
        style={[styles.inputBox, {color: 'black'}]}
        placeholder="Amount"
        keyboardType="numeric"
        value={newExpense.amount}
        onChangeText={(input) =>
          setNewExpense({ ...newExpense, amount: input })
        }
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddExpenseForm;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    color: GlobalStyles.colors.primary50,
  },
  inputBox: {
    width: "80%",
    height: 40,
    padding: 10,
    margin: 5,
    fontSize: 15,
    borderRadius: 7,
    color: GlobalStyles.colors.primary50,
    backgroundColor: GlobalStyles.colors.primary400,
  },
  button: {
    marginTop: 10,
    backgroundColor: GlobalStyles.colors.primary800,
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: GlobalStyles.colors.primary50,
    fontWeight: "bold",
    textAlign: "center",
  },
});
