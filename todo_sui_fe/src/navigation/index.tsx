import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Icon from "react-native-vector-icons/FontAwesome5";
import LoginScreen from '../pages/Auth/Login';
import DashboardScreen from '../pages/Dashboard';
import SplashScreen from '../pages/SplashScreen';
import HistoryScreen from '../pages/History';
import DetailBidScreen from '../pages/Dashboard/Detail';
import RegisterScreen from '../pages/Auth/Register';
import SellScreen from '../pages/Sell';
import ProfileScreen from '../pages/Auth/Profile';
import { RootState } from '../stores';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardTabs = () => {
  
  const profile = useSelector((state: RootState) => state.profile);
    return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName:any;

          if (route.name === 'Bid' || route.name === 'Your Product') {
            iconName = 'tag';
          }else if(route.name === 'List Auction' || route.name === 'History'){
            iconName = 'clock';
          }
          else{
            iconName = 'user' ;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue', 
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingBottom: 5 }, 
      })}
      >
      <Tab.Screen
         name={profile.role === 'Seller' ? "Your Product" : "Bid"} 
         component={DashboardScreen} 
         options={{
          headerShown: true,
          headerTitle:`${profile.role === 'Seller' ? "Your Product" : "Bid"}`,
          headerStyle: {
            backgroundColor: 'rgba(4, 17, 118, 0.8)',
            height:50,
            borderBottomWidth: 0,
            elevation: 0,
            borderWidth: 1,
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerBackgroundContainerStyle: {
            backgroundColor: 'rgba(3, 20, 149, 0.8)',
          },
        }}
      />
      <Tab.Screen
         name={profile.role === 'Seller' ? "List Auction" : "History"} 
         component={HistoryScreen} 
         options={{
          headerShown: true,
          headerTitle:`${profile.role === 'Seller' ? "List Auction" : "History"}`,
          headerStyle: {
            backgroundColor: 'rgba(4, 17, 118, 0.8)',
            height:50,
            borderBottomWidth: 0,
            elevation: 0,
            borderWidth: 1,
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerBackgroundContainerStyle: {
            backgroundColor: 'rgba(3, 20, 149, 0.8)',
          },
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitle: 'Profile',
          headerStyle: {
            backgroundColor: 'rgba(4, 17, 118, 0.8)',
            height:50,
            borderBottomWidth: 0,
            elevation: 0,
            borderWidth: 1,
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerBackgroundContainerStyle: {
            backgroundColor: 'rgba(3, 20, 149, 0.8)',
          },
        }} 
      />
    </Tab.Navigator>
    );
};
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{headerShown: false}} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{headerShown: false}} 
        />
         <Stack.Screen 
          name="SplashScreen" 
          component={SplashScreen} 
          options={{headerShown: false}} 
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardTabs} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Sell" 
          component={SellScreen} 
          options={{
            headerShown: true,
            headerTitle: 'Sell',
            headerStyle: {
              backgroundColor: 'rgba(4, 17, 118, 0.8)',
              height:50,
              borderBottomWidth: 0,
              elevation: 0,
              borderWidth: 1,
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerBackgroundContainerStyle: {
              backgroundColor: 'rgba(3, 20, 149, 0.8)',
            },
          }} 
        />
        <Stack.Screen 
          name="Detail" 
          component={DetailBidScreen} 
          options={{
            headerShown: true,
            headerTitle: 'Bid Details',
            headerStyle: {
              backgroundColor: 'rgba(4, 17, 118, 0.8)',
              height:50,
              borderBottomWidth: 0,
              elevation: 0,
              borderWidth: 1,
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerBackgroundContainerStyle: {
              backgroundColor: 'rgba(3, 20, 149, 0.8)',
            },
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
