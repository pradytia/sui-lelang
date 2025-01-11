import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    itemContainer: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(36, 63, 241, 0.3)',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    itemImage: {
      width: 80,
      height: 80,
      borderRadius: 50,
    },
    itemDetails: {
      paddingLeft: 10,
      flexShrink: 1,
    },
    itemName: {
      fontWeight: 'bold',
      color: 'rgba(1, 2, 16, 0.84)',
    },
    itemText: {
      paddingTop: 5,
      color: 'rgba(1, 2, 16, 0.84)',
    },
    addButton: {
      position: 'absolute',
      bottom: 50,
      right: 20,
      backgroundColor: '#007AFF',
      borderRadius: 50,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
    },
  });

export default styles;