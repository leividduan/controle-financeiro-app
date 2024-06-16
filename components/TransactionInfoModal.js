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
      <Text style={styles.title}>Título: {transaction?.name}</Text>
      <Text style={styles.desc}>Descrição: {transaction?.description}</Text>
      <View style={styles.price}>
        <Text style={[styles[transaction?.type === 'EXPENSE' ? 'expense' : 'income'], { fontSize: 30 }, { fontWeight: 'bold' }]}>
          {formatCurrency(transaction?.price)}
        </Text>
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
  },
  title: {
    fontSize: 16,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  desc: {
    marginBottom: 30
  },
  price: {
    backgroundColor: '#d7d9d7',
    flexDirection: 'row',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 20,
  }
});