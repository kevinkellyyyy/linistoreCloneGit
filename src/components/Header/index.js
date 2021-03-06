import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Button} from 'react-native';
import colors from '../../assets/theme/colors';
import Icon from '../../common/Icon';
import Input from '../../common/Input';
import styles from './styles';
import AppModal from '../../common/AppModal';
import {useNavigation} from '@react-navigation/core';
import {
  AUTH_NAVIGATOR,
  CART_LIST_STACK,
  LOGIN,
  REGISTER,
} from '../../constants/routeNames';
import {GlobalContext} from '../../context/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser} from '../../helpers/apiHelpers/userHelpers';

const Header = () => {
  // untuk cek isloggedin
  const {
    authDispatch,
    authState: {isLoggedIn, data},
  } = useContext(GlobalContext);
  const {navigate} = useNavigation();

  const test = async () => {
    try {
      const user = await AsyncStorage.getItem('linistore');
      if (user) {
        getUser()(authDispatch);
      }
      console.log(user);
    } catch (error) {}
  };

  useEffect(() => {
    console.log('efek header jalan');
    test();
  }, []);

  const test2 = () => {
    console.log('data authstate', data);
  };

  return (
    <View>
      {/* Header */}
      <View
        style={{
          // borderBottomWidth: 1,
          height: 110,
          elevation: 4,
          shadowColor: 'grey',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 5,
          shadowRadius: 2,
        }}>
        {/* <Button title="test" onPress={() => test2()}></Button> */}
        {isLoggedIn ? (
          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 5,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View>
              <Image
                style={styles.image}
                source={require('../../assets/images/linistore-logo.png')}
              />
            </View>
            <Text>{data.name}</Text>
            <View>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  navigate(CART_LIST_STACK);
                }}>
                <Icon
                  style={{color: colors.grey, paddingLeft: 0}}
                  size={21}
                  name="shopping-cart"
                />
                <Text style={{color: colors.grey, fontWeight: '500'}}>: 1</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 5,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View>
              <Image
                style={styles.image}
                source={require('../../assets/images/linistore-logo.png')}
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.btnLogin}
                onPress={() => {
                  // setModalVisible(true);
                  navigate(AUTH_NAVIGATOR, {screen: LOGIN});
                }}>
                <Text style={{color: colors.white}}>Masuk</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.btnRegis}
                onPress={() => {
                  // setModalVisible(true);
                  navigate(AUTH_NAVIGATOR, {screen: REGISTER});
                }}>
                <Text style={{color: colors.blue, fontWeight: '500'}}>
                  Daftar
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.icon}>
              <Icon
                style={{color: colors.grey, paddingLeft: 0}}
                size={21}
                name="shopping-cart"
              />
              <Text style={{color: colors.grey, fontWeight: '500'}}>: 1</Text>
            </View>
          </View>
        )}

        {/* SearchBar */}
        <View style={{flexDirection: 'row'}}>
          <View style={styles.wrapperInput}>
            <Input placeholder="Search...." style={styles.inputSearch} />
            <Icon style={styles.iconSearch} name="search" size={21} />
          </View>
        </View>
      </View>
      {/* <AppModal
        modalBody={
          <View>
            <Text>Hello</Text>
          </View>
        }
        modalFooter={<></>}
        title={'My Profile'}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      /> */}
    </View>
  );
};

export default Header;
