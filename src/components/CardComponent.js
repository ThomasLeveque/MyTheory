import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../assets/colors';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/main/HomeScreen';

const CardComponent = ({ theory, navigation, cardStyle }) => {
  const { img, name, category, user, description, likes, comments, peoples } = theory;
  const imageSize = 20;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('theory', { theory })}
      style={[{
        marginBottom: 10,
        ...colors.SHADOW,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      }, cardStyle]}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderRadius: 5,
          paddingVertical: 0,
          paddingLeft: 0 + gradientWidth,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
      >
        <LinearGradient
          colors={[colors.GRADIENT_START, colors.GRADIENT_END]}
          style={{
            width: gradientWidth,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
          }}
        />
        <View style={{ flex: 1, borderTopRightRadius: 5, overflow: 'hidden', marginBottom: 0 }}>
          {img && (
            <Image
              style={{
                width: '100%',
                height: 150,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
              source={{
                uri: img,
              }}
            />
          )}
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'montserratBold',
              marginTop: 15,
              marginLeft: 10,
              color: 'black',
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              color: colors.GRAY,
              marginLeft: 10,
              fontSize: 14,
              fontFamily: 'montserratLight',
              marginTop: 2,
            }}
          >
            {category}
          </Text>
          <Text
            style={{
              color: 'black',
              marginLeft: 10,
              fontSize: 15,
              fontFamily: 'montserratLight',
              marginTop: 8,
            }}
          >
            {description}
          </Text>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 8, marginLeft: 10 }}>
            <View style={{ flex: 0.3, flexDirection: 'row' }}>
              <MaterialIcons name={'thumb-up'} size={20} color="black" />
              <Text style={{ marginLeft: 5, color: 'grey', fontSize: 12, fontWeight: '100' }}>
                {likes}
              </Text>
            </View>
            <View style={{ flex: 0.3, flexDirection: 'row' }}>
              <MaterialIcons name={'comment'} size={20} color="black" />>
              <Text style={{ marginLeft: 5, color: 'grey', fontSize: 12, fontWeight: '100' }}>
                {comments}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginBottom: 10,
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: imageSize,
                height: imageSize,
                borderRadius: imageSize / 2,
                overflow: 'hidden',
                backgroundColor: colors.GRAY_BG,
              }}
            >
              <Image
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                source={{ uri: user.img }}
              />
            </View>
            <Text
              style={{
                color: colors.GRAY,
                fontSize: 14,
                marginLeft: 5,
                fontFamily: 'montserratLight',
              }}
            >
              {user.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity >
  );
};

const gradientWidth = 8;

export default CardComponent;
