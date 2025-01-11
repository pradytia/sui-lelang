import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      marginTop: 53,
      flex: 1,
    },
    body: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    registerForm: {
      marginBottom: 30,
    },
    formRow: {
      flexDirection: 'row',
      marginHorizontal: 30,
      marginTop: 30,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'rgba(29, 53, 239, 0.8)',
      padding: 1,
      borderRadius: 4,
    },
    formLabel: {
      backgroundColor: '#fff',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    labelText: {
      color: 'rgba(29, 53, 239, 0.8)',
    },
    formInputControl: {
      flex: 10,
    },
    formRowButtons: {
      marginHorizontal: 30,
      marginTop: 30,
      justifyContent: 'center',
    },
    button: {
      backgroundColor: 'rgba(29, 53, 239, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 35,
      borderRadius: 4,
    },
    buttonText: {
      color: '#ffffff',
    },
    buttonTouch: {
      borderRadius: 4,
    },
  });

export default styles;