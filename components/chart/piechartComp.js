import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PieChart } from 'react-native-gifted-charts';
import chroma from 'chroma-js';
import { GlobalStyles } from '../../constants/styles';

// Use this as dummy list to check if it works
// const dummy_expenses = [
//     { id: 'e1', description: 'Toilet Paper', amount: 94.12, date: new Date(2022, 1, 17) },
//     { id: 'e2', description: 'New TV', amount: 799.49, date: new Date(2022, 4, 1) },
//     { id: 'e3', description: 'Car Insurance', amount: 294.67, date: new Date(2022, 10, 15) },
//     { id: 'e4', description: 'New Desk (Wooden)', amount: 450, date: new Date(2022, 7, 13) },
//     { id: 'e5', description: 'Groceries', amount: 123.45, date: new Date(2023, 2, 20) },
//     { id: 'e6', description: 'Gym Membership', amount: 59.99, date: new Date(2023, 5, 5) },
//     { id: 'e7', description: 'Laptop', amount: 1200.89, date: new Date(2023, 8, 25) },
//     { id: 'e8', description: 'Coffee Machine', amount: 250.75, date: new Date(2023, 11, 10) },
//     { id: 'e9', description: 'Winter Jacket', amount: 350.00, date: new Date(2024, 0, 15) },
//     { id: 'e10', description: 'Phone Bill', amount: 79.99, date: new Date(2024, 3, 8) },
//     { id: 'e11', description: 'Books', amount: 45.30, date: new Date(2024, 6, 21) },
//     { id: 'e12', description: 'Dining Table', amount: 999.99, date: new Date(2024, 9, 30) },
//     { id: 'e13', description: 'Garden Supplies', amount: 135.45, date: new Date(2024, 4, 12) },
//     { id: 'e14', description: 'Airplane Tickets', amount: 450.60, date: new Date(2024, 2, 18) },
//     { id: 'e15', description: 'Streaming Subscription', amount: 15.99, date: new Date(2024, 10, 1) },
// ];

// This component will take expenses, categorize them,
// then create a pie chart with different colors.

// Make sure to install dependencies:
// npm install react-native-gifted-charts
// npm install expo-linear-gradient
// npm install react-native-linear-gradient
// npm install chroma-js

function getUniqueCategory(expenseItems) {
  // Get unique categories
  const uniqueCategory = new Set(expenseItems.map((item) => item.category));
  return Array.from(uniqueCategory);
}

const PiechartComp = ({ expenses }) => {
  const uniqueCategories = getUniqueCategory(expenses);
  // Unique Colors for each expense category
  const generateColors = chroma.scale('Set3').colors(uniqueCategories.length);

  let chartData = [];
  
  // This takes a category, adds the amount, then adds it to chartData
  uniqueCategories.map((categ, index) => {
    let chartDataObj = {
      value: 0,
      label: '',
      color: '',
    };
    const filteredCategory = expenses.filter((item) => item.category === categ);
    chartDataObj.value = filteredCategory.reduce((accumulator, item) => accumulator + item.amount, 0);
    chartDataObj.label = categ;
    chartDataObj.color = generateColors[index];
    chartData.push(chartDataObj);
  });
  
  return (
    <View style={styles.container}>
      <PieChart 
        data={chartData}
        doughnut={false}
        isAnimated={true}
      />
      <View style={styles.legend}>
        {chartData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={{
              width: 20,
              height: 20,
              marginRight: 5,
              backgroundColor: item.color,
            }} />
            <Text style={styles.normalText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default PiechartComp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary500,
    flex: 1, 
    minHeight: 100,
    maxHeight: 300,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    flexDirection: 'row',
    color: 'black',
  },
  legend: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
  normalText: {
    fontSize: 14,
    color: GlobalStyles.colors.primary50
  },
});
