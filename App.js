import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import ExpenseManager from './screens/ExpenseManager';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GloalsStyles } from './constants/styles';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  console.log('Rendering: ExpensesOverview');
  return <BottomTabs.Navigator screenOptions={{
    headerStyle: {backgroundColor: GloalsStyles.colors.primary},
    headerTintColor: 'black',
    tabBarStyle: {backgroundColor: GloalsStyles.colors.primary},
  }}>
    <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} options={{
      title: 'Recent Expenses',
      tabBarLabel: 'Recent',
      tabBarIcon: ({ color, size }) => (
        <Text style={{ fontSize: size, color }}>⏳</Text>
      ),
    }}/>
    <BottomTabs.Screen 
      name="AllExpenses" 
      component={AllExpenses}
      options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({ color, size }) => (
          <Text style={{ fontSize: size, color }}>🧾</Text>
          )
        }}
      />
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator  initialRouteName="ExpensesOverview">
          <Stack.Screen 
          name="ManageExpense" 
          component={ExpenseManager} 
          />
          <Stack.Screen 
          name="ExpensesOverview" 
          component={ExpensesOverview}
          options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
