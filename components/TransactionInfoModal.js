import { StyleSheet, Text, View } from 'react-native';
import formatCurrency from '../utils/formatCurrency';
import ModalBase from './ModalBase';

export default function TransactionInfoModal({ transaction, isVisible, setIsVisible }) {
  return (
    <ModalBase 
      title={transaction?.type === 'EXPENSE' ? 'Despesa' : 'Receita'}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    >
      <Text>Título: {transaction?.name}</Text>
      <Text>Descrição: {transaction?.description}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text>Preço: </Text>
        <Text style={styles[transaction?.type === 'EXPENSE' ? 'expense' : 'income']}>{formatCurrency(transaction?.price)}</Text>
      </View>
    </ModalBase>
  );
}

const styles = StyleSheet.create({
  expense: {
    color: 'red'
  },
  income: {
    color: 'green'
  }
});