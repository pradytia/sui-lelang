import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo'; 
import Styles from '../../styles';
import Colors from '../../styles/colors';
import realm from '../../database';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../stores';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../services/graphql';

const SellScreen = () => {
  const navigation = useNavigation<any>();
  const [formValues, setFormValues] = useState({
    productName: '',
    price: '',
    imageUrl: '',
    description: '',
  });
  const [disabled, setDisabled] = useState(false);
  const [addProduct] = useMutation(ADD_PRODUCT);

  const profile = useSelector((state: RootState) => state.profile);

  const handleChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formValues.productName || !formValues.price || !formValues.imageUrl || !formValues.description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setDisabled(true);

    const connection = await NetInfo.fetch();
    if (connection.isConnected) {
      // Jika online, hit ke BE
      try {
        const { data } = await addProduct({
          variables: {
            productName: formValues.productName,
            price: formValues.price,
            imageUrl: formValues.imageUrl,
            description: formValues.description,
            createdBy: profile.userName,
            sellerId: profile.id
          },
        });
  
        if (data.addProduct) {
          Alert.alert('Success', 'Product listed successfully');
          navigation.navigate("Dashboard");
        } else {
          Alert.alert('Error', 'Failed to list product');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    } else {
      // Jika offline, simpan ke Realm
      try {
        realm.write(() => {
          realm.create('Product', {
            id: Date.now(),
            productName: formValues.productName,
            price: formValues.price,
            imageUrl: formValues.imageUrl,
            description: formValues.description,
            createdBy: profile.userName
          });
        });
        Alert.alert('Offline', 'Product saved locally');
        navigation.navigate("Dashboard")
      } catch (error) {
        console.log('error ', error);
        Alert.alert('Error', 'Failed to save product locally');
      }
    }

    setDisabled(false);
  };

  return (
    <View style={Styles.container}>
      <ScrollView>
        <View style={Styles.body}>
          <View style={Styles.form}>
            <FormRow
              icon="user"
              placeholder="Product name..."
              renderInput={() => (
                <TextInput
                  style={Styles.formInputText}
                  placeholder="Product name..."
                  value={formValues.productName}
                  onChangeText={(value) => handleChange('productName', value)}
                />
              )}
            />
            <FormRow
              icon="tag"
              placeholder="Minimal price..."
              keyboardType="numeric"
              renderInput={() => (
                <TextInput
                  style={Styles.formInputText}
                  placeholder="Minimal price..."
                  keyboardType="numeric"
                  value={formValues.price}
                  onChangeText={(value) => handleChange('price', value)}
                />
              )}
            />
            <FormRow
              icon="photo"
              placeholder="Image Link..."
              multiline
              numberOfLines={8}
              renderInput={() => (
                <TextInput
                  style={Styles.formInputTextArea}
                  placeholder="Image Link..."
                  multiline
                  value={formValues.imageUrl}
                  onChangeText={(value) => handleChange('imageUrl', value)}
                />
              )}
            />
            <FormRow
              icon="pencil"
              placeholder="Description..."
              multiline
              numberOfLines={8}
              renderInput={() => (
                <TextInput
                  style={Styles.formInputTextArea}
                  placeholder="Description..."
                  multiline
                  value={formValues.description}
                  onChangeText={(value) => handleChange('description', value)}
                />
              )}
            />
            <View style={Styles.formRowButtons}>
              {disabled === false && (
                <TouchableHighlight
                  style={Styles.buttonTouch}
                  underlayColor={Colors.accent}
                  onPress={handleSubmit}
                >
                  <View style={Styles.button}>
                    <Text style={Styles.buttonText}>Sell product</Text>
                  </View>
                </TouchableHighlight>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

interface FormRowProps {
  icon: string;
  placeholder?: string;
  keyboardType?: any;
  multiline?: boolean;
  numberOfLines?: number;
  renderInput?: () => JSX.Element;
}

const FormRow: React.FC<FormRowProps> = ({
  icon,
  placeholder,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  renderInput,
}) => (
  <View style={Styles.formRow}>
    <View style={Styles.formLabel}>
      <Text style={Styles.labelText}>
        <Icon name={icon} size={20} />
      </Text>
    </View>
    <View style={Styles.formInputControl}>{renderInput && renderInput()}</View>
  </View>
);

export default SellScreen;
