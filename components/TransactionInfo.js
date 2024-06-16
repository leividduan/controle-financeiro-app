import { Pressable, StyleSheet, Text, View } from 'react-native';
import formatCurrency from '../utils/formatCurrency';

export default function TransactionInfo({ transaction, onPress, index }) {
  const backgroundColor = index % 2 === 0 ? '#ededed' : '#d7d9d7';

  return (
    <Pressable style={[styles.item, { backgroundColor }]} onPress={() => onPress(transaction)}>
      <Text style={styles.title}>{transaction.name}</Text>
      <View style={styles.info}>
        <Text style={styles[transaction.type === 'EXPENSE' ? 'expense' : 'income']}>
          {formatCurrency(transaction.price)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {

    marginBottom: 15,
    borderWidth: 0.5,
    borderColor: '#d6d7df',
    borderRadius: 20,
    padding: 8,
    flexDirection: 'row',
    minHeight: 80,
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
  },
  info: {
    minWidth: 75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expense: {
    color: 'red',
  },
  income: {
    color: 'green',
  },
});
