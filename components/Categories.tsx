import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React from 'react';
import { categories } from '@/assets/data/home';

const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={ false }
      contentContainerStyle={{ padding: 15 }}
    >
      { categories.map( ( category, index ) => (
        <View key={ index } style={ styles.categoryCard }>
          <Image source={ category.img } />
          <Text style={ styles.categoryText }>{ category.text }</Text>
        </View>
      ) ) }
    </ScrollView>
  );
}

export default Categories;

const styles = StyleSheet.create({
  categoryCard: {
    width: 100,
    height: 100,
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
  categoryText: {
    padding: 6,
    fontSize: 14,
    fontWeight: 'bold',
  },
});