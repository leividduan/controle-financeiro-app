import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import TransactionInfo from './components/TransactionInfo';
import { transactions } from './data/transactions';
import formatCurrency from './utils/formatCurrency';

export default function App() {
  const currentBalance = transactions.reduce((total, transaction) => total + ( transaction.type === 'EXPENSE' ? transaction.price * -1 : transaction.price), 0);
  return (
    <SafeAreaView style={styles.base}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Movimentações</Text>
          <Text>Saldo: {formatCurrency(currentBalance)}</Text>
        </View>
        <ScrollView>
          {transactions.map(transaction => (
            <TransactionInfo key={transaction.id} transaction={transaction} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <Button style={styles.button} title='+' />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  container: {
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    flex: 1
  },
  fill: {
    flex: 1
  },
  title: {
    flex: 1,
    fontSize: 24,
    marginBottom: 12
  },
  bottom: {
    backgroundColor: '#58c184',
    marginTop: 12,
    maxHeight: 52,
    height: 52,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2e825d',
    fontSize: 48
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});
