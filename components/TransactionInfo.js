import { Pressable, StyleSheet, Text, View } from 'react-native';
import formatCurrency from '../utils/formatCurrency';

export default function TransactionInfo({ transaction, onPress }) {
  return (
    <Pressable style={styles.item} onPress={() => onPress(transaction)}>
      <Text style={styles.title}>{transaction.name}</Text>
      <View style={styles.info}>
        <Text style={styles[transaction.type === 'EXPENSE' ? 'expense' : 'income']}>{formatCurrency(transaction.price)}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
  },
  title: {
    fontStyle: 'bold',
    flex: 1
  },
  info: {
    minWidth: 75
  },
  expense: {
    color: 'red'
  },
  income: {
    color: 'green'
  }
});