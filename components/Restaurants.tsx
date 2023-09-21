import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { restaurants } from '@/assets/data/home';

const Restaurants = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={ false }
      contentContainerStyle={{ padding: 15 }}
    >
      { restaurants.map( ( restaurant, index ) => (
        <Link key={ index } href={ '/details' } asChild>
          <TouchableOpacity>
            <View style={ styles.categoryCard }>
              <Image source={ restaurant.img } style={ styles.image } />

              <View style={ styles.categoryBox }>
                <Text style={ styles.categoryText }>{ restaurant.name }</Text>
                <Text style={{ color: Colors.green }}>
                  { restaurant.rating } { restaurant.ratings }
                </Text>
                <Text style={{ color: Colors.medium }}>{ restaurant.distance }</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ) ) }
    </ScrollView>
  );
}

export default Restaurants;

const styles = StyleSheet.create({
  categoryCard: {
    width: 300,
    height: 250,
    marginEnd: 10,
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  categoryBox: {
    flex: 2,
    padding: 10,
  },
  categoryText: {
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  image: {
    flex: 5,
    width: undefined,
    height: undefined,
  },
});