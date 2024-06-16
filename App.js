import { useState } from 'react';

import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

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
  const currentBalance = transactions.reduce((total, transaction) => total + (transaction.type === 'EXPENSE' ? transaction.price * -1 : transaction.price), 0);

  function handleSaveTransaction({ name, description, type, price }) {
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

  function getBalanceColor(balance) {
    return balance > 0 ? 'green' : balance < 0 ? 'red' : 'grey';
  }
  

  return (
    <SafeAreaView style={styles.base}>
      <NewTransactionModal isVisible={isNewModalVisible} setIsVisible={setIsNewModalVisible} onPressSave={handleSaveTransaction} />
      <TransactionInfoModal isVisible={isModalVisible} transaction={transactionToShow} setIsVisible={setIsModalVisible} />
      <View style={styles.container}>
        <View style={styles.row}>
          <Image style={styles.logo} source={require('./assets/prosper_icon.png')} />
          <Text style={styles.title}>Movimentações</Text>
          <Text style={{ color: getBalanceColor(currentBalance.toFixed(2)) }}>Saldo: {formatCurrency(currentBalance)}</Text>
        </View>
        <ScrollView style={styles.itens}>
          {transactions.map((transaction, index) => (
            <TransactionInfo key={transaction.id} transaction={transaction} onPress={handlePressTransaction} index={index} />
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
    paddingTop: 20,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
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
    
  },
  bottom: {
    backgroundColor: '#5AC6B9',
    marginTop: 12,
    maxHeight: 80,
    height: 52,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: '#FFF',
    fontSize: 45
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
    display: 'flex'
  },
  transaction: {
    backgroundColor: '#red'
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12
  },
});
