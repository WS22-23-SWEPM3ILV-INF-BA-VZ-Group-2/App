import * as React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../../Constants'
import places from '../../places/places'

const { width } = Dimensions.get('screen')
const HomeScreen = ({ navigation }) => {
  const categoryIcons = []
  categoryIcons.push(<Icon name="flight" size={25} color={COLORS.primary} />)
  categoryIcons.push(
    <Icon name="beach-access" size={25} color={COLORS.primary} />
  )
  categoryIcons.push(<Icon name="near-me" size={25} color={COLORS.primary} />)
  categoryIcons.push(<Icon name="place" size={25} color={COLORS.primary} />)

  const ListCategories = () => {
    return (
      <View style={style.categoryContainer}>
        {categoryIcons.map((icon, index) => {
          return (
            <View key={index} style={style.iconContainer}>
              {icon}
            </View>
          )
        })}
      </View>
    )
  }

  const Card = ({ place }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('MyPlacesScreen', place)}
      >
        <ImageBackground style={style.cardImage} source={place.image}>
          <Text style={style.cardText}>{place.name}</Text>
          <View style={style.cardView}>
            <View style={style.view}>
              <Icon name="place" size={20} color={COLORS.white} />
              <Text style={style.text}>{place.location}</Text>
            </View>
            <View style={style.view}>
              <Icon name="star" size={20} color={COLORS.white} />
              <Text style={style.text}>5.0</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }

  const RecommendedCard = ({ place }) => {
    return (
      <ImageBackground style={style.rmCardImage} source={place.image}>
        <Text style={style.cardText}>{place.name}</Text>
        <View style={style.cardView}>
          <View style={style.view2}>
            <View style={style.view}>
              <Icon name="place" size={22} color={COLORS.white} />
              <Text style={style.text}>{place.location}</Text>
            </View>
            <View style={style.view}>
              <Icon name="star" size={22} color={COLORS.white} />
              <Text style={style.text}>5.0</Text>
            </View>
          </View>
          <Text style={style.detailsText}>{place.details}</Text>
        </View>
      </ImageBackground>
    )
  }
  return (
    <SafeAreaView style={style.safeArea}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={style.header}>
        <Icon name="sort" size={28} color={COLORS.white} />
        <Icon name="notifications-none" size={28} color={COLORS.white} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.view3}>
          <View style={style.view4}>
            <Text style={style.headerTitle}>Explore</Text>
            <Text style={style.headerTitle}>beautiful places</Text>
            <View style={style.inputContainer}>
              <Icon name="search" size={28} />
              <TextInput placeholder="Search place" style={style.textInput} />
            </View>
          </View>
        </View>
        <ListCategories />
        <Text style={style.sectionTitle}>Places</Text>
        <View>
          <FlatList
            contentContainerStyle={style.contentContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={places}
            renderItem={({ item }) => <Card place={item} />}
          />
          <Text style={style.sectionTitle}>Recommended</Text>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={style.contentContainer2}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={places}
            renderItem={({ item }) => <RecommendedCard place={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 23,
  },
  inputContainer: {
    height: 60,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    top: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  cardText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardView: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  text: {
    marginLeft: 5,
    color: COLORS.white,
  },
  view: {
    flexDirection: 'row',
  },
  view2: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
  },
  view3: {
    backgroundColor: COLORS.primary,
    height: 120,
    paddingHorizontal: 20,
  },
  view4: {
    flex: 1,
  },
  detailsText: {
    color: COLORS.white,
    fontSize: 13,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  textInput: {
    color: COLORS.grey,
  },
  contentContainer: {
    paddingLeft: 20,
  },
  contentContainer2: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
})
export default HomeScreen
