import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { GlobalStyles } from "../../constants/styles";

const AddExpenseForm = ({addExpenseFunc}) => {
  const [newExpense, setNewExpense] = useState({description:"", amount: "", date:new Date()});

  const handleSubmit = async () => {
    try {
      if(newExpense.description && newExpense.amount, newExpense.date) {
        let createNewExpense = {
          // id: not determined how to make it yet.
          description: newExpense.description,
          amount: newExpense.amount,
          date: newExpense.date,
        }
        addExpenseFunc(createNewExpense);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput 
      style={styles.inputBox}
      placeholder="Item description"
      value={newExpense.description}
      onChangeText={(input) => setNewExpense({...newExpense, description:input})}
      />
      <TextInput 
      style={styles.inputBox}
      placeholder="Amount"
      keyboardType="numeric"
      value={newExpense.amount}
      onChangeText={(input) => setNewExpense({...newExpense, amount:input})}
      />

      {/* This Input is for date. By defauly, use current date, but if we want a selected date
      and time, we need to download a module.*/}
      {/* <TextInput 
      style={}
      placeholder="Date"
      value={newExpense.date}
      onChangeText={(input) => setNewExpense({...newExpense, date:input})}
      /> */}

      <TouchableOpacity
      style={styles.button}
      onPress={handleSubmit}
      >Add</TouchableOpacity>
    </View>
  );
};

export default AddExpenseForm;

const styles = StyleSheet.create({
  container: {
    height: '30%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems:'center',
    fontWeight: 'bold',
    margin: 2, 
    color: GlobalStyles.colors.primary50,
  },
  inputBox: {
    width: '60%',
    height: 40,
    padding: 10,
    margin: 5,
    fontWeight: 'bold',
    fontSize: 15,
    borderRadius: 7,
    color: GlobalStyles.colors.primary50,
    backgroundColor: GlobalStyles.colors.primary400,
  },
  button: {
    width: '25%',
    height: 40,
    margin: 5,
    padding: 10,
    borderRadius: 7,
    textAlign: 'center',
    backgroundColor: GlobalStyles.colors.primary800,
  },
});