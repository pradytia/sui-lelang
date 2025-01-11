import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { RootState } from '../../../stores';
import { clearToken } from '../../../utills/token';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  const profile = useSelector((state: RootState) => state.profile);

  const logout = async() => {
    clearToken();
    navigation.navigate('Login');
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Icon name="user" size={120} color= "rgba(15, 37, 205, 0.8)" /> 
        <Text style={styles.userName}>{profile.userName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <Text style={styles.sectionItem}>ID: {profile.id}</Text>
        <Text style={styles.sectionItem}>Email: {profile.email}</Text>
        <Text style={styles.sectionItem}>Username: {profile.userName}</Text>
        <Text style={styles.sectionItem}>Role:   {profile.role}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => logout()} 
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
