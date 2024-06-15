import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { Dropdown } from 'react-native-element-dropdown';
import ModalBase from './ModalBase';

export default function NewTransactionModal({ isVisible, setIsVisible, onPressSave }) {
  const options = [
    { label: 'Receita', value: 'INCOME' },
    { label: 'Despesa', value: 'EXPENSE' }
  ];

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState(null);

  useEffect(() => {
    if (isVisible) {
      setName('');
      setDescription('');
      setPrice('');
      setType('');
    }
  }, [isVisible]);

  return (
    <ModalBase 
      title={'Nova movimentação'}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    >
      <View style={styles.container}>
        <Dropdown
          style={styles.input}
          data={options}
          labelField="label"
          valueField="value"
          placeholder="Tipo"
          onChange={item => {
            setType(item.value);
          }}
          value={type}
        />
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input} 
          placeholder="Nome" 
          />
        <TextInput 
          value={description}
          onChangeText={setDescription}
          style={styles.input} 
          multiline 
          placeholder="Descrição" 
          />
        <CurrencyInput
          style={styles.input}
          value={price}
          placeholder='Preço'
          onChangeValue={setPrice}
          prefix="R$"
          delimiter="."
          separator=","
          precision={2}
        />
        <Pressable style={styles.bottom} onPress={() => onPressSave({name, description, price, type})}>
          <Text style={styles.button}>
            Salvar
          </Text>
        </Pressable>
      </View>
    </ModalBase>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12
  },
  bottom: {
    backgroundColor: '#58c184',
    marginTop: 12,
    maxHeight: 52,
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: '#2e825d',
    fontSize: 16
  }
});