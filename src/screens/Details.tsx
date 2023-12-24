/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { FAB } from 'react-native-elements';
import { IconButtonProps } from 'react-native-vector-icons/Icon';
import { ScrollView, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackPramList } from '../App';
import Snackbar from 'react-native-snackbar';
import Separator from '../components/Separator';
import { Tab } from '@rneui/themed';
import * as apiService from '../api/api';
import ProductItem from '../components/ProductItemDetail';
import { color } from 'react-native-elements/dist/helpers';
import { colors } from 'react-native-elements';
import { fonts } from 'react-native-elements/dist/config';


type DetailsProps = NativeStackScreenProps<RootStackPramList, 'Details'>;

const Details: React.FC<DetailsProps> = ({ route, navigation }: DetailsProps) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [followers, setDetailFollowers] = useState<UserDetailFollows[] | null>([]);
  const [following, setDetailFollowing] = useState<UserDetailFollows[] | null>([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!route.params) {
          Snackbar.show({
            text: 'User not found',
            duration: Snackbar.LENGTH_SHORT,
          });
          return;
        }

        const userLogin = route.params.user;
        const results = await apiService.getDetailUser(userLogin);
        if (results === Error) {
          Snackbar.show({
            text: 'GitHub user not found',
            duration: Snackbar.LENGTH_SHORT,
          });
          return;
        }
        setUserDetails(results);

        const getDetailFollowers = await apiService.getFollowersData(userLogin); // Replace with your actual API call
        setDetailFollowers(getDetailFollowers);

        const getDetailFollowing = await apiService.getFollowingData(userLogin); // Replace with your actual API call
        setDetailFollowing(getDetailFollowing);

        navigation.setOptions({
          title: results.login,
        });
      } catch (error) {
        console.log('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [route.params, navigation]);

  const handleTabChange = (newTab: number) => {
    setActiveTab(newTab);
  };

  const onPressFavorite = () => {
    console.log("You add", userDetails?.name, "to your favourite")
    const message = `${userDetails?.name} added to favorite!`
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#5cb85c'
    });

  }



  return (
    <View style={styles.container}>
      
      {userDetails ? (
        <View style={styles.viewContainer}>
          <Image style={styles.image} source={{ uri: userDetails.avatar_url }} />
          <Text style={styles.name}>{userDetails.name}</Text>
          <Text style={styles.bio}>{userDetails.bio}</Text>

          <View style={styles.rowContainer}>
            <Text style={[styles.followers, { marginHorizontal: 20 }]}>{`${userDetails.followers} followers`}</Text>
            <Text style={[styles.following, { marginHorizontal: 20 }]}>{`${userDetails.following} following`}</Text>
          </View>


          <View style={styles.tabContainer}>
            <Tab
              value={activeTab}
              onChange={handleTabChange}
              containerStyle={[styles.tabContainerStyle]}
              indicatorStyle={{
                backgroundColor: 'black',
                height: 2,
              }}
            >
              <Tab.Item
                title="Followers"
                titleStyle={(active) => (active ? styles.tabtitleStyle : styles.tabtitleStyleNotActive)}
              />
              <Tab.Item
                title="Following"
                titleStyle={(active) => (active ? styles.tabtitleStyle : styles.tabtitleStyleNotActive)}
              />
            </Tab>
          </View>

          {activeTab === 0 && userDetails ? (
            <FlatList
              data={followers}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={Separator}

              renderItem={({ item }) => <ProductItem user={item} />}
            />
          ) : activeTab === 1 && userDetails ? (
            <FlatList
              data={following}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={Separator}

              renderItem={({ item }) => <ProductItem user={item} />}
            />
          ) : null}

        </View>
      ) : (
        <Text>Loading user details...</Text>
      )}
      <FAB
      // style={{ width: "100%" }}
      placement="right"
      size="large"
      visible
      color="#d9534f"
      onPress={() => onPressFavorite()}
      icon={{ name: "favorite", color: "#fff" }}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Nunito-Regular',
  },
  viewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    overflow: 'hidden',
  },
  name: {
    marginTop: 10,
    color: '#000000',
    fontSize: 20,
    // fontWeight: '700',
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
  },
  bio: {
    marginBottom: 4,
    color: '#A9A9A9',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Nunito-Regular',

    // flex: 1,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  followers: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Nunito-Regular',
    fontWeight: '500',
  },
  following: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Nunito-Regular',
    fontWeight: '500',
  },
  tabContainer: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  tabContainerStyle: {
    backgroundColor: '#FFFFFF',
  },
  tabtitleStyle: {
    color: 'black',
    fontFamily: 'Nunito-Bold',
  },
  tabtitleStyleNotActive: {
    color: '#A9A9A9',
    fontFamily: 'Nunito-Regular',
  },
});

export default Details;
