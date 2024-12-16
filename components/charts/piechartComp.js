import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { PieChart } from 'react-native-gifted-charts';
import chroma from 'chroma-js';
import { GlobalStyles } from '../../constants/styles';
import { FlatList } from 'react-native';

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
  const generateColors = ['#40E0D0', '#ff70a6', '#70e000', '#ffa200', '#e9ff70', '#ff9770', '#c77dff', '#228B22', '#76E800', '#FF5F3D', '#FF91A4', '#FFD700', '#98FB98', '#A67B5B', '#A9A9A9', '#4B0082', '#D50032', '#00B0B9'];

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
        radius={190}
        innerCircleColor={GlobalStyles.colors.primary50} 
        centerLabelComponent={() => (
          <Text style={styles.centerLabel}>Expenses</Text>
        )}
      />
      <FlatList
        data={chartData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.legendItem}>
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
        )}
        numColumns={2} // Creates two columns
        contentContainerStyle={styles.legend}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary50,
    flex: 1,
    minHeight: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'column',
  },
  legend: {
    marginTop: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: (width / 2) - 30, // Ensures even spacing for two columns
  },
  normalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary800,
  },
  centerLabel: {
    fontSize: 18,      // Adjust the font size as needed
    fontWeight: 'bold',
    color: 'black',  // Replace with your desired color (e.g., hex, rgb, or named color)
    textAlign: 'center',
  },
});

export default PiechartComp;
