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
    if (!newExpense.description || !newExpense.amount || !newExpense.date) {
      console.warn("All fields are required!");
      return;
    }

    try {
      const response = await fetch(
        "https://675e5d6d63b05ed0797a018b.mockapi.io/forexpenses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: newExpense.description,
            amount: parseFloat(newExpense.amount),
            date: newExpense.date.toISOString(), // Convert date to ISO format
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add expense. Try again!");
      }

      const addedExpense = await response.json();
      console.log("Expense added:", addedExpense);

      // Update local state via passed function
      addExpenseFunc(addedExpense);

      // Reset form inputs
      setNewExpense({ description: "", amount: "", date: new Date() });
    } catch (error) {
      console.error("Error adding expense:", error.message);
    }
  };

  return (
    <View style={styles.outerContainer}>
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        placeholder="Item description"
        value={newExpense.description}
        onChangeText={(input) =>
          setNewExpense({ ...newExpense, description: input })
        }
      />
      <TextInput
        style={styles.inputBox}
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
  </View>
  );
};

export default AddExpenseForm;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    maxWidth: 400,
    justifyContent: "center",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    margin: 10,
    backgroundColor: GlobalStyles.colors.primary50,
  },
  inputBox: {
    width: "95%",
    maxWidth: 400,
    height: 50,
    padding: 10,
    marginVertical: 8,
    margin: 5,
    fontSize: 16,
    borderRadius: 7,
    color: 'black',
    backgroundColor: GlobalStyles.colors.primary400,
  },
  button: {
    marginTop: 10,
    backgroundColor: GlobalStyles.colors.primary800,
    borderRadius: 7,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: GlobalStyles.colors.primary50,
    fontWeight: "bold",
    textAlign: "center",
  },

  outerContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary50,
    padding: 16,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center',
  },
});
