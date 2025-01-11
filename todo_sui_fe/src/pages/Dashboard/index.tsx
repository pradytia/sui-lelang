import React, { useEffect } from 'react';
import { 
  View, 
  Text,
  Image, 
  TouchableHighlight, 
  TouchableOpacity, 
  FlatList 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import realm from '../../database';
import Styles from '../../styles';
import styles from './styles';
import { RootState } from '../../stores';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../services/graphql';
import { setProducts } from '../../stores/reducer/product';

interface AuctionItem {
  id: number;
  productName: string;
  description: string;
  price: string;
  imageUrl: string;
  createdBy: string;
  sellerId: string;
}


const DashboardScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const product = useSelector((state: any) => state.products.products);
  const profile = useSelector((state: RootState) => state.profile);
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);

  const saveToRealm = async (products: any) => {
    realm.write(() => {
      products.forEach((product:any) => {
        realm.create('Product', product, Realm.UpdateMode.Modified);
      });
    });
  };

  const loadFromRealm = async () => {
    const storedProducts = realm.objects('Product');
    const productsArray = Array.from(storedProducts);

    return productsArray;
  };
 
  useEffect(() => {
    const fetchData = async () => {
      refetch();
      if (data) {
        const products = data.getProducts;
        dispatch(setProducts(products));
        await saveToRealm(products);
      }
    };
    fetchData();
  }, [data, dispatch]);

  useEffect(() => {
    const loadOfflineData = async () => {
      const offlineProducts:any = await loadFromRealm();
      if (offlineProducts.length > 0) {
        dispatch(setProducts(offlineProducts));
      }
    };
    loadOfflineData();
  }, [dispatch]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const emptyData = () => {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.centeredText}>Semua Data Telah Tampil</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: AuctionItem }) => (
    <TouchableHighlight underlayColor="rgba(10, 9, 9, 0.21)">
      <View style={styles.itemContainer}>
        <View style={styles.itemDetails}>
          <Image style={styles.itemImage} source={{ uri: item.imageUrl }} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.productName}</Text>
            <Text style={styles.itemText}>
              <Text style={Styles.label}>Started Price: </Text>
              {item.price}
            </Text>
            <Text style={styles.itemText}>
              <Text style={Styles.label}>Seller: </Text> {item.createdBy}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Detail', { item })}
          style={styles.itemIconContainer}
        >
          <Icon name="arrow-forward" size={24} color="rgba(29, 53, 239, 0.8)" />
        </TouchableOpacity>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      {
        product.length > 0 ? 
          <FlatList
          data={product}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
        :
          emptyData()
      }
      {profile.role === 'Seller' && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Sell')}
        >
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};


export default DashboardScreen;
