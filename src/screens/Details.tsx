/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackPramList } from '../App';
import Snackbar from 'react-native-snackbar';
import { getDetailUser } from '../api/api';

type DetailsProps = NativeStackScreenProps<RootStackPramList, 'Details'>;

const Details: React.FC<DetailsProps> = ({ route, navigation }: DetailsProps) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

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
        const results = await getDetailUser(userLogin);

        if (results == Error) {
          Snackbar.show({
            text: 'GitHub user not found',
            duration: Snackbar.LENGTH_SHORT,
          });
          return;
        }

        setUserDetails(results);
        navigation.setOptions({
          title: results.login,
        });
      } catch (error) {
        console.log('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [route.params, navigation]);

  return (
    <ScrollView style={styles.container}>
      {userDetails ? (
        <View style={styles.viewContainer}>
          <Image style={styles.image} source={{ uri: userDetails.avatar_url }} />
          <Text style={styles.name}>{userDetails.name}</Text>
          <Text style={styles.bio}>{userDetails.bio}</Text>


          <View style={styles.rowContainer}>
            <Text style={[styles.followers, { marginHorizontal: 20 }]}>{`${userDetails.followers} followers`}</Text>
            <Text style={[styles.following, { marginHorizontal: 20 }] }>{`${userDetails.following} following`}</Text>
          </View>
        <Text style={[styles.name, {fontSize: 50}]}>TabLayout ini</Text>
        </View>
      ) : (
        <Text>Loading user details...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
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
    fontWeight: '700',
    textAlign: 'center',
  },
  bio: {
    marginBottom: 4,
    color: '#A9A9A9',
    fontSize: 20,
    fontWeight: '500',
    flex: 1,
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
    fontWeight: '500',
  },
  following: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Details;

