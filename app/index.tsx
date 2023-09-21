import { StyleSheet, Text, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Categories from '@/components/Categories';
import Restaurants from '@/components/Restaurants';

const Index = () => {
  return (
    <SafeAreaView style={ styles.container }>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Categories />
        <Text style={ styles.header }>Top picks in your neighbourhood</Text>
        <Restaurants />
        <Text style={ styles.header }>Offers near you</Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    top: 100, // searchContainer height(60) + paddingTop(40)
    backgroundColor: Colors.lightGrey,
  },
  header: {
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
