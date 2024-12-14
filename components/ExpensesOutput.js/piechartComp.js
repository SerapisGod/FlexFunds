import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PieChart } from 'react-native-gifted-charts';
import chroma from 'chroma-js';
import { GlobalStyles } from '../../constants/styles';

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
  
  console.log(uniqueCategories);
  return (
    <View style={styles.container}>
      <PieChart 
        data={chartData}
        doughnut={false}
        isAnimated={true}
        style={styles.pieChart}
        borderWidth={2}
        showValuesAsLabels={true}
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

const styles = StyleSheet.create({
  container: {
    // backgroundColor: GlobalStyles.colors.primary500,
    backgroundColor: GlobalStyles.colors.primary500,
    flex: 0,
    minHeight: 250,
    minWidth: 400,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    flexDirection: 'row',
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
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary50,
  },
});

export default PiechartComp;

