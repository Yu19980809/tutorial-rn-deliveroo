import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInUp } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { getDishById } from '@/assets/data/restaurant';
import useBasketStore from '@/store/basketStore';

const Dish = () => {
  const router = useRouter();
  const { addProduct } = useBasketStore();
  const { id } = useLocalSearchParams();
  // id here is a string, use +id can turn it into a number
  const item = getDishById( +id )!;

  const addToCart = () => {
    Haptics.notificationAsync( Haptics.NotificationFeedbackType.Success );
    router.back();
    addProduct( item );
  };

  return (
    <SafeAreaView
      edges={[ 'bottom' ]}
      style={{ flex: 1, backgroundColor: '#fff' }}
    >
      <View style={ styles.container }>
        {/* IMAGE */}
        <Animated.Image
          source={ item?.img }
          entering={ FadeIn.duration( 500 ).delay( 400 ) }
          style={ styles.image }
        />

        {/* INFO */}
        <View style={{ padding: 20 }}>
          <Animated.Text
            entering={ FadeInLeft.duration( 400 ).delay( 200 ) }
            style={ styles.dishName }
          >
            { item?.name }
          </Animated.Text>

          <Animated.Text
            entering={ FadeInLeft.duration( 400 ).delay( 200 ) }
            style={ styles.dishInfo }
          >
            { item?.info }
          </Animated.Text>
        </View>

        {/* FOOTER BUTTON */}
        <View style={ styles.footer }>
          <TouchableOpacity
            onPress={ addToCart }
            style={ styles.fullButton }
          >
            <Text style={ styles.footerText }>Add for ￡{ item?.price }</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Dish;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  dishName: {
    marginBottom: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  dishInfo: {
    color: Colors.mediumDark,
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    elevation: 10,
    padding: 10,
    paddingTop: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -10 },
  },
  fullButton: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
