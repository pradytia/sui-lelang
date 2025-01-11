import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableHighlight, 
  TextInput, 
  Alert, 
  ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../../../styles';
import Colors from '../../../styles/colors';
import { RootState } from '../../../stores';
import { useMutation } from '@apollo/client';
import { SUBMIT_BID } from '../../../services/graphql';

const styles = Styles;
const colors = Colors;

const DetailBidScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const item:any = route.params;
  const profile = useSelector((state: RootState) => state.profile);
  const [submitBidMutation, { loading }] = useMutation(SUBMIT_BID);

  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');


  const submitBid = async(bidPrice:any) => {
    const bidValue = parseInt(bidPrice, 10);

    if (isNaN(bidValue)) {
      setError('Please enter a valid numeric bid amount.');
      return;
    }

    if (bidValue <= item.currentBid) {
      setError(`Your bid must be higher than the current bid of ${item.currentBid}.`);
      return;
    }

    setError('');
    Alert.alert('Bid Submitted', `You have successfully placed a bid of ${bidValue} for ${item.name}.`);

    let dataSubmit = {
      "createdBy": item.item.createdBy,
      "description": item.item.description,
      "productId": item.item.id,
      "sellerId": item.item.sellerId,
      "buyerId": profile.id,
      "imageUrl": item.item.imageUrl,
      "price": item.item.price,
      "priceBid": bidPrice,
      "productName": item.item.productName,
    };

    console.log('data submit', dataSubmit)

    try {
      const response = await submitBidMutation({
        variables: dataSubmit,
      });

      console.log('respon ', response);
      if (response.data.submitBid) {
        Alert.alert('Bid Submitted Success');
        setBidAmount('');
        navigation.navigate('Dashboard'); 
      } else {
        Alert.alert('Submission Failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error(error);
    }
  };


 return(
  <View style={[styles.container]}>
  <ScrollView>
    <View style={[styles.body, styles.padDetails]}>
        <View>
          <View style={styles.padView}>
            <Text style={styles.title}>
              {item.item.productName}
            </Text>
          </View>
          <View style={[styles.padView, { alignItems: 'center' }]}>
              <View style={styles.center}>
                <Image
                  style={styles.image}
                  source={{ uri: item.item.imageUrl}}
                />
              </View>
          </View>
          <View>
            <Text>
              <Text style={styles.label}>
                {'\n'}
                Initial price
              </Text>{' '}
              {item.item.price}
            </Text>
            <Text>{'\n' + item.item.description}</Text>
          </View>
          {
            profile.role === 'Buyer' && (
              <View>
                <View style={styles.center}>
                  <Text style={styles.title}>Bid this product</Text>
                </View>
                <View style={[styles.formRow]}>
                  <View style={styles.formLabel}>
                    <Text style={styles.labelText}>
                      <Icon name="arrow-up" size={20} />
                    </Text>
                  </View>
                  <View style={styles.formInputControl}>
                  <TextInput
                    style={styles.formInputText}
                    placeholder="Enter your price..."
                    autoCorrect={false}
                    onChangeText={(price) => setBidAmount(price)}
                    value={bidAmount}
                  />
                  </View>
                </View>
                <View style={styles.formRowButtons}>
                    <TouchableHighlight
                      onPress={() => {
                        submitBid(bidAmount)
                      }}
                      style={styles.buttonTouchForm}
                      underlayColor={colors.accent}
                    >
                      <View style={styles.button}>
                        <Text style={styles.buttonText}>
                          Bid this product
                        </Text>
                      </View>
                    </TouchableHighlight>
                </View>
              </View>
            )
          }
        </View>
    </View>
  </ScrollView>
</View>
 )
};


export default DetailBidScreen;
