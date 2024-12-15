import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData, onDeleteExpense) {
    return (
        <ExpenseItem
            {...itemData.item}
            onDelete={() => onDeleteExpense(itemData.item.id)} // Pass the ID to the delete function
        />
    );
}

function ExpensesList({ expenses, onDeleteExpense }) {
    return (
        <FlatList
            data={expenses}
            renderItem={(itemData) => renderExpenseItem(itemData, onDeleteExpense)} // Pass the delete handler
            keyExtractor={(item) => item.id}
        />
    );
}

export default ExpensesList;
