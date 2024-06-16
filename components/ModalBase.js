import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";

export default function ModalBase({ title, isVisible, setIsVisible, children }) {

  const getTitleColor = (title) => {
    const lowerCaseTitle = title.toLowerCase();
  
    return lowerCaseTitle === 'despesa' ? 'red' :
           lowerCaseTitle === 'receita' ? 'green' :
           'black';
  };
  
  const titleColor = getTitleColor(title);

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.base}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setIsVisible(false)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  base: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 12,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  closeButton: {
    backgroundColor: '#5AC6B9',
    padding: 8,
    borderRadius: 40,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  }
});
