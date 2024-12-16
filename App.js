import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';


import ExpenseManager from "./screens/ExpenseManager";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import PiechartComp from "./components/charts/piechartComp";
import { GlobalStyles } from "./constants/styles";
import AddExpenseForm from "./components/ExpensesOutput.js/AddExpense";
import { ActivityIndicator, View } from "react-native";

// API Endpoint
const API_URL = "https://675e5d6d63b05ed0797a018b.mockapi.io/forexpenses";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpenseChartScreen({ expenses }) {
  return <PiechartComp expenses={expenses} />;
}

// Tabs for Recent, All Expenses, and Expense Chart
function ExpensesTabs({ expenses, deleteExpense, navigation }) {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: { color: GlobalStyles.colors.primary800, fontSize: 80},
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: { backgroundColor: GlobalStyles.colors.primary800 }, 
        tabBarInactiveTintColor: { backgroundColor: GlobalStyles.colors.primary700 },
      }}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        children={() => (
          <RecentExpenses
            expenses={expenses}
            deleteExpense={deleteExpense}
            navigation={navigation} 
          />
        )}
        options={{
          title: "Recent Expenses",
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon name="clock" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        children={() => (
          <AllExpenses
            expenses={expenses}
            deleteExpense={deleteExpense}
            navigation={navigation} 
          />
        )}
        options={{
          title: "All Expenses",
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon name="money-bill" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ExpenseChart"
        children={() => <ExpenseChartScreen expenses={expenses} />}
        options={{
          title: "Expense Chart",
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon name="chart-pie" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}


export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch expenses");
      const data = await response.json();
  
      const formattedData = data.map((expense) => ({
        ...expense,
        date: new Date(expense.date),
      }));
  
      setExpenses(formattedData);
    } catch (error) {
      console.error("Fetch error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addExpense = async (newExpense) => {
    try {
      const expenseDate =
        newExpense.date instanceof Date ? newExpense.date : new Date(); // Ensure valid date
  
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newExpense,
          date: expenseDate.toISOString(), // Safe to call now
        }),
      });
  
      if (!response.ok) throw new Error("Failed to add expense");
  
      const addedExpense = await response.json();
  
      // Add the expense to the local state
      setExpenses((current) => [
        ...current,
        { ...addedExpense, date: new Date(addedExpense.date) },
      ]);
    } catch (error) {
      console.error("Add error:", error.message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete expense");
      setExpenses((current) => current.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={GlobalStyles.colors.primary500} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="ExpensesTabs"
          screenOptions={{
            headerBackTitleVisible: false, // Remove back button text globally
          }}
        >
          <Stack.Screen
            name="ExpensesTabs"
            children={({ navigation }) => (
              <ExpensesTabs
                expenses={expenses}
                deleteExpense={deleteExpense}
                navigation={navigation}
              />
            )}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddExpense"
            children={({ navigation }) => (
              <AddExpenseForm
                addExpenseFunc={addExpense}
                navigation={navigation}
              />
            )}
            options={{ 
              title: "Add Expense",
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "black",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
