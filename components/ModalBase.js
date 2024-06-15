import { Button, StyleSheet, Text, View } from 'react-native';
import Modal from "react-native-modal";

export default function ModalBase({ title, isVisible, setIsVisible, children }) {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.base}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Button title={'X'} onPress={() => setIsVisible(false)}/>
        </View>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  base: { 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    padding: 12 
  },
  title: {
    fontSize: 18,
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  }
});