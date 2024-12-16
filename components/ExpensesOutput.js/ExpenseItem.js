import { Pressable, Text, View, StyleSheet, Button } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../other/date";

function ExpenseItem({ description, date, amount, onDelete }) {
    console.log(amount); // Debugging amount value
  
    return (
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>${amount.toFixed(2)}</Text>
          </View>
          <Button
            title="Delete"
            color={GlobalStyles.colors.primary700}
            onPress={onDelete}
          />
        </View>
      </View>
    );
  }

export default ExpenseItem;

const styles = StyleSheet.create({
    expenseItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 13,
        marginVertical: 10,
        backgroundColor: GlobalStyles.colors.primary600,
        borderRadius: 8,
        elevation: 5,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
    },
    textBase: {
        color: GlobalStyles.colors.primary800,
    },
    description: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: 'black',
    },
    amountContainer: {
        paddingHorizontal: 11,
        paddingVertical: 5,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
        minWidth: 85,
    },
    amount: {
        fontWeight: "bold",
        color: GlobalStyles.colors.primary700,
    },
    rightContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});
