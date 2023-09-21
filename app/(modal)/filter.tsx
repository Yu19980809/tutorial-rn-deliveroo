import { StyleSheet, Text, View, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from 'expo-router';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import categories from '@/assets/data/filter.json';

interface Category {
  name: string,
  count: number,
  checked?: boolean,
}

// HEADER ITEM
const ItemBox = () => (
  <>
    <View style={ styles.itemContainer }>
      {/* SORT */}
      <TouchableOpacity style={ styles.item }>
        <Ionicons name='arrow-down-outline' size={ 20 } color={ Colors.medium } />
        <Text style={{ flex: 1 }}>Sort</Text>
        <Ionicons name='chevron-forward' size={ 22 } color={ Colors.primary } />
      </TouchableOpacity>

      {/* RATING */}
      <TouchableOpacity style={ styles.item }>
        <Ionicons name='fast-food-outline' size={ 20 } color={ Colors.medium } />
        <Text style={{ flex: 1 }}>Hygine rating</Text>
        <Ionicons name='chevron-forward' size={ 22 } color={ Colors.primary } />
      </TouchableOpacity>

      {/* OFFERS */}
      <TouchableOpacity style={ styles.item }>
        <Ionicons name='pricetag-outline' size={ 20 } color={ Colors.medium } />
        <Text style={{ flex: 1 }}>Offers</Text>
        <Ionicons name='chevron-forward' size={ 22 } color={ Colors.primary } />
      </TouchableOpacity>

      {/* DIETARY */}
      <TouchableOpacity style={ styles.item }>
        <Ionicons name='nutrition-outline' size={ 20 } color={ Colors.medium } />
        <Text style={{ flex: 1 }}>Dietary</Text>
        <Ionicons name='chevron-forward' size={ 22 } color={ Colors.primary } />
      </TouchableOpacity>
    </View>

    <Text style={ styles.header }>Categories</Text>
  </>
)

const Filter = () => {
  const navigation = useNavigation();
  const flexWidth = useSharedValue( 0 );
  const scale = useSharedValue( 0 );

  const [ items, setItems ] = useState<Category[]>( categories );
  const [ selectedCategories, setSelectedCategories ] = useState<Category[]>( [] );

  // anmation for clear button
  useEffect( () => {
    const hasSelectedCategories = selectedCategories.length > 0;
    const selectedItems = items.filter( item => item.checked );
    const newSelectedCategories = selectedItems.length > 0;

    if ( hasSelectedCategories !== newSelectedCategories ) {
      flexWidth.value = withTiming( newSelectedCategories ? 150 : 0 );
      scale.value = withTiming( newSelectedCategories ? 1 : 0 );
    }

    setSelectedCategories( selectedItems );
  }, [ items ] );

  const animatedStyles = useAnimatedStyle( () => {
    return {
      width: flexWidth.value,
      opacity: flexWidth.value > 0 ? 1 : 0
    }
  } );

  const animatedText = useAnimatedStyle( () => {
    return {
      transform: [{ scale: scale.value }]
    }
  } );

  // 取消勾选所有
  const handleClearAll = () => {
    const updatedItems = items.map( item => {
      item.checked = false;
      return item;
    } );

    setItems( updatedItems );
  }

  // category item
  const renderItem: ListRenderItem<Category> = ({ item, index }) => (
    <View style={ styles.row }>
      <Text style={ styles.itemText }>
        { item.name } ({ item.count })
      </Text>

      <BouncyCheckbox
        isChecked={ items[index].checked }
        fillColor={ Colors.primary }
        unfillColor='#fff'
        disableBuiltInState
        iconStyle={{ borderColor: Colors.primary, borderWidth: 2, borderRadius: 4 }}
        innerIconStyle={{ borderColor: Colors.primary, borderRadius: 4 }}
        onPress={ () => {
          const isChecked = items[index].checked;
          const updatedItems = items.map( item => {
            if ( item.name === items[index].name ) {
              item.checked = !isChecked;
            }

            return item;
          } );

          setItems( updatedItems );
        } }
      />
    </View>
  );

  return (
    <View style={ styles.container }>
      {/* CATEGORIES LIST */}
      <FlatList
        data={ categories }
        renderItem={ renderItem }
        ListHeaderComponent={ <ItemBox /> }
      />

      {/* DIVIDE BLOCK */}
      <View style={{ height: 76 }} />

      {/* FOOTER BUTTONS */}
      <View style={ styles.footer }>
        <View style={ styles.btnContainer }>
          <Animated.View style={[ animatedStyles, styles.outlineButton ]}>
            <TouchableOpacity onPress={ handleClearAll }>
              <Animated.Text style={[ animatedText, styles.outlineButtonText ]}>
                Clear All
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={ styles.fullButton }
            onPress={ () => navigation.goBack() }
          >
            <Text style={ styles.footerText }>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightGrey,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shoadowOpacity: 0.1,
    shodowRadius: 10,
    shodowOffset: {
      width: 0,
      height: -10
    },
  },
  fullButton: {
    flex: 1,
    alignItems: 'center',
    height: 56,
    padding: 16,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // item box
  itemContainer: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  header: {
    marginBottom: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: Colors.grey,
  },
  itemText: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  outlineButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderWidth: 0.5,
    borderColor: Colors.primary,
    borderRadius: 8,
  },
  outlineButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});