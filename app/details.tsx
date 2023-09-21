import { StyleSheet, Text, View, Image, TouchableOpacity, SectionList, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useNavigation, Link } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { restaurant } from '@/assets/data/restaurant';
import Colors from '@/constants/Colors';
import useBasketStore from '@/store/basketStore';

const Details = () => {
  const navigation = useNavigation();
  const { items, total } = useBasketStore();
  const scrollRef = useRef<ScrollView>( null );
  const itemsRef = useRef<TouchableOpacity[]>( [] );
  // const { items, total } = useBasketStore();
  const opacity = useSharedValue( 0 );
  const animatedStyles = useAnimatedStyle( () => ({
    opacity: opacity.value
  }) );

  const [ activeIndex, setActiveIndex ] = useState( 0 );

  const DATA = restaurant.food.map( ( item, index ) => ({
    title: item.category,
    data: item.meals,
    index,
  }) );

  useLayoutEffect( () => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: '',
      headerTintColor: Colors.primary,
      headerLeft: () => (
        <TouchableOpacity
          onPress={ () => navigation.goBack() }
          style={ styles.roundButton }
        >
          <Ionicons name='arrow-back' size={ 24 } color={ Colors.primary } />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={ styles.bar }>
          <TouchableOpacity style={ styles.roundButton }>
            <Ionicons name='share-outline' size={ 24 } color={ Colors.primary } />
          </TouchableOpacity>

          <TouchableOpacity style={ styles.roundButton }>
            <Ionicons name='search-outline' size={ 24 } color={ Colors.primary } />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [] );

  const renderItem: ListRenderItem<any> = ({ item }) => (
    <Link href={{ pathname: '/(modal)/dish', params: { id: item.id } }} asChild>
      <TouchableOpacity style={ styles.item }>
        <View style={{ flex: 1 }}>
          <Text style={ styles.dish }>{ item.name }</Text>
          <Text style={ styles.dishText }>{ item.info }</Text>
          <Text style={ styles.dishText }>￡{ item.price }</Text>
        </View>

        <Image source={ item.img } style={ styles.dishImage } />
      </TouchableOpacity>
    </Link>
  );

  const selectCategory = ( index: number ) => {
    const selected = itemsRef.current[index];
    setActiveIndex( index );

    selected.measure( x => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    } );
  };

  const onScroll = ( event: any ) => {
    const y = event.nativeEvent.contentOffset.y;
    opacity.value = withTiming( y > 350 ? 1 : 0 )
  };

  return (
    <>
      <ParallaxScrollView
        style={{ flex: 1 }}
        backgroundColor='#fff'
        parallaxHeaderHeight={ 250 }
        stickyHeaderHeight={ 80 }
        scrollEvent={ onScroll }
        renderBackground={ () => (
          <Image source={ restaurant.img } style={{ width: '100%', height: 300 }} />
        ) }
        renderStickyHeader={ () => (
          <View key='sticky-header' style={ styles.stickySection }>
            <Text style={ styles.stickySectionText }>{ restaurant.name }</Text>
          </View>
        ) }
      >
        <View style={ styles.detailsContainer }>
          {/* INFO */}
          <Text style={ styles.restaurantName }>{ restaurant.name }</Text>
          <Text style={ styles.restaurantDescription }>
            { restaurant.delivery } · { restaurant.tags.map( ( tag, index ) => `${ tag }${ index < restaurant.tags.length - 1 ? ' · ' : '' }` ) }
          </Text>
          <Text style={ styles.restaurantDescription }>{ restaurant.about }</Text>
        
          {/* LIST */}
          <SectionList
            contentContainerStyle={{ paddingBottom: 50 }}
            keyExtractor={ ( item, index ) => `${ item.id + index }` }
            scrollEnabled={ false }
            sections={ DATA }
            renderItem={ renderItem }
            ItemSeparatorComponent={ () => (
              <View style={{ height: 1, marginHorizontal: 16, backgroundColor: Colors.grey }} />
            ) }
            SectionSeparatorComponent={ () => (
              <View style={{ height: 1, backgroundColor: Colors.grey }} />
            ) }
            renderSectionHeader={ ({ section: { title } }) => (
              <Text style={ styles.sectionHeader }>{ title }</Text>
            ) }
          />
        </View>
      </ParallaxScrollView>

      {/* STICKY SEGMENTS */}
      <Animated.View style={[ styles.stickySegments, animatedStyles ]}>
        <View style={ styles.segmentShadow }>
          <ScrollView
            ref={ scrollRef }
            horizontal
            showsHorizontalScrollIndicator={ false }
            contentContainerStyle={ styles.segmentScrollview }
          >
            { restaurant.food.map( ( item, index ) => (
              <TouchableOpacity
                key={ index }
                ref={ ref => ( itemsRef.current[index] = ref! ) }
                style={ activeIndex === index ? styles.segmentButtonActive : styles.segmentButton }
                onPress={ () => selectCategory( index ) }
              >
                <Text style={ activeIndex === index ? styles.segmentTextActive : styles.segmentText }>
                  { item.category }
                </Text>
              </TouchableOpacity>
            ) ) }
          </ScrollView>
        </View>
      </Animated.View>

      {/* FOOTER BASKET */}
      { items > 0 && (
        <View style={ styles.footer }>
          <SafeAreaView
            edges={[ 'bottom' ]}
            style={{ backgroundColor: '#fff' }}
          >
            <Link href='/basket' asChild>
              <TouchableOpacity style={ styles.fullButton }>
                <Text style={ styles.basket }>{ items }</Text>
                <Text style={ styles.footerText }>View Basket</Text>
                <Text style={ styles.basketTotal }>${ total }</Text>
              </TouchableOpacity>
            </Link>
          </SafeAreaView>
        </View>
      ) }
    </>
  );
}

export default Details;

const styles = StyleSheet.create({
  // parallax scrollview
  detailsContainer: {
    backgroundColor: Colors.lightGrey,
  },
  stickySection: {
    justifyContent: 'flex-end',
    height: 80,
    marginLeft: 70,
    backgroundColor: '#fff',
  },
  stickySectionText: {
    margin: 10,
    fontSize: 20,
  },
  restaurantName: {
    margin: 16,
    fontSize: 30,
  },
  restaurantDescription: {
    margin: 16,
    color: Colors.medium,
    fontSize: 16,
    lineHeight: 22,
  },
  // header
  roundButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  // section list
  sectionHeader: {
    margin: 16,
    marginTop: 40,
    fontSize: 22,
    fontWeight: 'bold',
  },
  // renderItem
  item: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
  },
  dish: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dishText: {
    paddingVertical: 4,
    color: Colors.mediumDark,
    fontSize: 14,
  },
  dishImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  // sticky segments
  stickySegments: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    height: 50,
    paddingBottom: 4,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  segmentShadow: {
    justifyContent: 'center',
    elevation: 5,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  segmentButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segmentButtonActive: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: Colors.primary,
    borderRadius: 50,
  },
  segmentText: {
    color: Colors.primary,
    fontSize: 16,
  },
  segmentTextActive: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  segmentScrollview: {
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  // footer basket
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    elevation: 10,
    width: '100%',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  basket: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#19AA86',
    borderRadius: 4,
  },
  basketTotal: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});