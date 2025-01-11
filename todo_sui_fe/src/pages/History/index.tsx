import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';
import Styles from '../../styles';
import { fetchHistoryItems } from '../../stores/reducer/history';
import { useQuery } from '@apollo/client';
import { GET_BID } from '../../services/graphql';



const HistoryScreen = () => {
  const dispatch = useDispatch<any>();
  const { loading, error, data, refetch } = useQuery(GET_BID);

  useEffect(() => {
    refetch();
    dispatch(fetchHistoryItems());
  }, [dispatch]);
 
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

 

  const renderItem = (item:any) => (
    <TouchableHighlight underlayColor="rgba(10, 9, 9, 0.21)">
      <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Image style={styles.itemImage} source={{ uri: item.item.imageUrl }} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.item.productName}</Text>
            <Text style={styles.itemText}>
              <Text style={Styles.label}>Starting Price : </Text> Rp. {item.item.price}
            </Text>
            <Text style={styles.itemText}>
              <Text style={Styles.label}>Seller: </Text> {item.item.createdBy}
            </Text>
            <Text style={styles.itemText}>
              <Text style={Styles.label}>Your Bid: </Text> {item.item.priceBid}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data.getBids}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HistoryScreen;
