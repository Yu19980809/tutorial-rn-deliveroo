import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import React, { forwardRef, useMemo, useCallback } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>( ( props, ref ) => {
  const snapPoints = useMemo( () => [ '50%' ], [] );
  const { dismiss } = useBottomSheetModal();
  const renderBackdrop = useCallback( ( props: any ) => {
    <BottomSheetBackdrop appearsOnIndex={ 0 } disappearsOnIndex={ -1 } { ...props } />
  }, [] );

  return (
    <BottomSheetModal
      ref={ ref }
      snapPoints={ snapPoints }
      backdropComponent={ renderBackdrop }
      handleIndicatorStyle={{ display: 'none' }}
      backgroundStyle={{ backgroundColor: Colors.lightGrey }}
    >
      <View style={ styles.contentContainer }>
        {/* TOGGLE BUTTONS */}
        <View style={ styles.toggle }>
          <TouchableOpacity style={ styles.toggleActive }>
            <Text style={ styles.activeText }>Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={ styles.toggleInactive }>
            <Text style={ styles.inactiveText }>Pickup</Text>
          </TouchableOpacity>
        </View>

        {/* LOCATION */}
        <Text style={ styles.subheader }>Your Location</Text>
        <Link href={ '/(modal)/location-search' } asChild>
          <TouchableOpacity>
            <View style={ styles.item }>
              <Ionicons name='location-outline' size={ 20 } color={ Colors.medium } />
              <Text style={{ flex: 1 }}>Current location</Text>
              <Ionicons name='chevron-forward' size={ 20 } color={ Colors.primary } />
            </View>
          </TouchableOpacity>
        </Link>

        {/* ARRIVAL TIME */}
        <Text style={ styles.subheader }>Arrival time</Text>
        <TouchableOpacity>
          <View style={ styles.item }>
            <Ionicons name='stopwatch-outline' size={ 20 } color={ Colors.medium } />
            <Text style={{ flex: 1 }}>Now</Text>
            <Ionicons name='chevron-forward' size={ 20 } color={ Colors.primary } />
          </View>
        </TouchableOpacity>

        {/* CONFIRM BUTTON */}
        <TouchableOpacity
          style={ styles.button }
          onPress={ () => dismiss() }
        >
          <Text style={ styles.buttonText }>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
} );

export default BottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  // toggle buttons
  toggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 32,
  },
  toggleActive: {
    padding: 8,
    paddingHorizontal: 30,
    backgroundColor: Colors.primary,
    borderRadius: 32,
  },
  activeText: {
    color: '#fff',
    fontWeight: '700',
  },
  toggleInactive: {
    padding: 8,
    paddingHorizontal: 30,
    borderRadius: 32
  },
  inactiveText: {
    color: Colors.primary
  },
  // location
  subheader: {
    margin: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  // confirm button
  button: {
    alignItems: 'center',
    margin: 16,
    padding: 16,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});