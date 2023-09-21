import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Image, Platform } from 'react-native';
import React, { useRef } from 'react';
import { Link } from 'expo-router';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import BottomSheet from './BottomSheet';

const SearchBar = () => (
  <View style={ styles.searchContainer }>
    <View style={ styles.searchSection }>
      <View style={ styles.searchField }>
        <Ionicons name='ios-search' size={ 20 } color={ Colors.medium } style={ styles.searchIcon } />

        <TextInput style={ styles.input } placeholder='Restaurants, groceries, dishes' />
      </View>

      <Link href={ '/(modal)/filter' } asChild>
        <TouchableOpacity style={ styles.optionButton }>
          <Ionicons name='options-outline' size={ 20 } color={ Colors.primary } />
        </TouchableOpacity>
      </Link>
    </View>
  </View>
);

const CustomHeader = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>( null );

  const openModal = () => {
    bottomSheetModalRef.current?.present();
  };

  return (
    <SafeAreaView style={ styles.safeArea }>
      <BottomSheet ref={ bottomSheetModalRef } />

      <View style={ styles.container }>
        {/* IMAGE */}
        <TouchableOpacity onPress={ openModal }>
          <Image
            source={ require( '@/assets/images/bike.png' ) }
            style={ styles.bike }
          />
        </TouchableOpacity>

        {/* LOCATION */}
        <TouchableOpacity
          style={ styles.titleContainer }
          onPress={ openModal }
        >
          <Text style={ styles.title }>Delivery · Now</Text>

          <View style={ styles.locationName }>
            <Text style={ styles.subtitle }>Selected Location</Text>
            <Ionicons name='chevron-down' size={ 20 } color={ Colors.primary } />
          </View>
        </TouchableOpacity>

        {/* PROFILE BUTTON */}
        <TouchableOpacity style={ styles.profileButton }>
          <Ionicons name='person-outline' size={ 20 } color={ Colors.primary } />
        </TouchableOpacity>
      </View>

      <SearchBar />
    </SafeAreaView>
  );
}

export default CustomHeader;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  bike: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: Colors.medium,
  },
  locationName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 10,
    backgroundColor: Colors.lightGrey,
    borderRadius: 50,
  },
  // SEARCH BAR
  searchContainer: {
    height: 60,
    backgroundColor: '#fff',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
  searchField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
  },
  input: {
    padding: 10,
    color: Colors.mediumDark,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  optionButton: {
    padding: 10,
    borderRadius: 50,
  },
});