import { useState } from 'react';

import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import NewTransactionModal from './components/NewTransactionModal';
import TransactionInfo from './components/TransactionInfo';
import TransactionInfoModal from './components/TransactionInfoModal';
import { transactions } from './data/transactions';
import formatCurrency from './utils/formatCurrency';
import generateUUID from './utils/generateUUID';

export default function App() {
  const [transactionToShow, setTransactionToShow] = useState(null);
  const [isNewModalVisible, setIsNewModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentBalance = transactions.reduce((total, transaction) => total + ( transaction.type === 'EXPENSE' ? transaction.price * -1 : transaction.price), 0);

  function handleSaveTransaction({name, description, type, price}) {
    if (!name || !type || !price) {
      Alert.alert('Preencha os campos obrigatórios!');
      return;
    }
    const transaction = {
      id: generateUUID(), 
      name, 
      description, 
      type, 
      price
    };
    transactions.push(transaction);
    setIsNewModalVisible(false);
  }

  function handlePressTransaction(transaction) {
    setTransactionToShow(transaction);
    setIsModalVisible(true);
  }

  return (
    <SafeAreaView style={styles.base}>
      <NewTransactionModal isVisible={isNewModalVisible} setIsVisible={setIsNewModalVisible} onPressSave={handleSaveTransaction}/>
      <TransactionInfoModal isVisible={isModalVisible} transaction={transactionToShow} setIsVisible={setIsModalVisible} />
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Movimentações</Text>
          <Text>Saldo: {formatCurrency(currentBalance)}</Text>
        </View>
        <ScrollView>
          {transactions.map(transaction => (
            <TransactionInfo key={transaction.id} transaction={transaction} onPress={handlePressTransaction} />
          ))}
        </ScrollView>
      </View>
      <Pressable style={styles.bottom} onPress={() => setIsNewModalVisible(true)}>
        <Text style={styles.button}>
          +
        </Text>
      </Pressable>
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
    color: '#2e825d',
    fontSize: 36
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});
