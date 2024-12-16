import { StyleSheet, Text, View, Dimensions } from 'react-native';
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

const PiechartComp = ({ expenses }) => {
  if (expenses.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.normalText}>No data available</Text>
      </View>
    );
  }

  // Generate a set of colors based on the number of items
  const generateColors = ['#70d6ff', '#ff70a6', '#70e000', '#ffa200', '#e9ff70', '#ff9770', '#c77dff'];

  const chartData = expenses.map((expense, index) => {
    return {
      value: expense.amount,
      label: expense.description,
      color: generateColors[index % generateColors.length],
    };
  });

  return (
    <View style={styles.container}>
      <PieChart
        data={chartData}
        doughnut={false}
        isAnimated={true}
        borderWidth={2}
        showValuesAsLabels={true}
      />
      <View style={styles.legend}>
        {chartData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={{
                width: 20,
                height: 20,
                marginRight: 5,
                backgroundColor: item.color,
              }}
            />
            <Text style={styles.normalText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
    minHeight: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'column',
  },
  legend: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: 20,
    marginLeft: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 20,
  },
  normalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary50,
  },
});

export default PiechartComp;
