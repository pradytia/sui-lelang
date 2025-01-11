import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    profileHeader: {
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 20,
      padding: 20,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      marginHorizontal: 20,
      elevation: 3,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 10,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    userBio: {
      fontSize: 16,
      color: '#777',
    },
    section: {
      marginHorizontal: 20,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    },
    sectionItem: {
      fontSize: 16,
      color: '#555',
      marginBottom: 5,
    },
    button: {
      backgroundColor: "rgba(15, 37, 205, 0.8)",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 25,
      marginHorizontal: 20,
      marginBottom: 20,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default styles;
  