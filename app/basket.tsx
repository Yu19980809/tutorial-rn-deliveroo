import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import ConfettiCannon from 'react-native-confetti-cannon';
import Colors from '@/constants/Colors';
import useBasketStore from '@/store/basketStore';
import SwipeableRow from '@/components/SwipeableRow';

const basket = () => {
  const { products, total, clearCart, reduceProduct } = useBasketStore();
  const FEES = { service: 2.99, delivery: 5.99 };

  const [ order, setOrder ] = useState( false );

  const startCheckout = () => {
    setOrder( true );
    clearCart();
  };

  return (
    <>
      {/* Animation for ordering done */}
      { order && <ConfettiCannon count={ 200 } origin={{ x: -10, y: 0 }} fallSpeed={ 2500 } fadeOut={ true } autoStart={ true } /> }

      {/* Already ordred */}
      { order && (
        <View style={{ alignItems: 'center', marginTop: '50%', padding: 20 }}>
          <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
            Tnank you for your order!
          </Text>
          
          <Link href={ '/' } asChild>
            <TouchableOpacity style={ styles.orderBtn }>
              <Text style={ styles.footerText }>New order</Text>
            </TouchableOpacity>
          </Link>
        </View>
      ) }

      {/* Going to order */}
      { !order && (
        <>
          <FlatList
            data={ products }
            ListHeaderComponent={ <Text style={ styles.section }>Items</Text> }
            ItemSeparatorComponent={ () => <View style={{ height: 1, backgroundColor: Colors.grey }} /> }
            renderItem={ ({ item }) => (
              <SwipeableRow onDelete={ () => reduceProduct( item ) }>
                <View style={ styles.row }>
                  <Text style={{ color: Colors.primary, fontSize: 18 }}>{ item.quantity }</Text>
                  <Text style={{ flex: 1, fontSize: 18 }}>{ item.name }</Text>
                  <Text style={{ fontSize: 18 }}>￡{ item.price * item.quantity }</Text>
                </View>
              </SwipeableRow>
            ) }
            ListFooterComponent={
              <View>
                <View style={{ height: 1, backgroundColor: Colors.grey }} />

                <View style={ styles.totalRow }>
                  <Text style={ styles.total }>Subtotal</Text>
                  <Text style={{ fontSize: 18 }}>￡{ total }</Text>
                </View>

                <View style={ styles.totalRow }>
                  <Text style={ styles.total }>Service fee</Text>
                  <Text style={{ fontSize: 18 }}>￡{ FEES.service }</Text>
                </View>

                <View style={ styles.totalRow }>
                  <Text style={ styles.total }>Delivery fee</Text>
                  <Text style={{ fontSize: 18 }}>￡{ FEES.delivery }</Text>
                </View>

                <View style={ styles.totalRow }>
                  <Text style={ styles.total }>Order total</Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    ￡{ ( total + FEES.service + FEES.delivery ).toFixed( 2 ) }
                  </Text>
                </View>
              </View>
            }
          />

          <View style={ styles.footer }>
            <SafeAreaView
              edges={[ 'bottom' ]}
              style={{ backgroundColor: '#fff' }}
            >
              <TouchableOpacity
                style={ styles.fullButton }
                onPress={ startCheckout }
              >
                <Text style={ styles.footerText }>Order Now</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </>
      ) }
    </>
  );
}

export default basket;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    padding: 10,
    backgroundColor: '#fff',
  },
  section: {
    margin: 16,
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
  total: {
    color: Colors.medium,
    fontSize: 18,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 50,
    marginTop: 20,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
});
