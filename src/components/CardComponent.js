import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo';
import colors from '../assets/colors';

const CardComponent = ({ image, title, category, user, description, likes, comments, peoples }) => {
  const imgTest =
    'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
  return (
    <TouchableOpacity style={{ marginBottom: 10, ...colors.SHADOW }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderRadius: 5,
          paddingVertical: 0,
          paddingLeft: 0 + gradientWidth,
          paddingRight: 10,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
      >
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={{
            width: gradientWidth,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
          }}
        />
        <View style={{ flex: 1, borderTopRightRadius: 5, overflow: 'hidden' }}>
          {true && (
            <Image
              style={{
                width: '100%',
                height: 150,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
              source={{
                uri: imgTest,
              }}
            />
          )}
          <Text
            style={{
              color: 'black',
              marginLeft: 10,
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 10,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: 'grey',
              marginLeft: 10,
              fontSize: 12,
              fontWeight: '100',
              marginTop: 2,
            }}
          >
            {category}
          </Text>
          <View style={{ flex: 0.8, flexDirection: 'row', marginTop: 8, marginLeft: 10 }}>
            <Text style={{ flex: 0.3 }}>Likes</Text>
            <Text style={{ flex: 0.3 }}>Comments</Text>
            <Text style={{ flex: 0.3 }}>Shares</Text>
          </View>
          <Text
            style={{
              color: 'black',
              marginLeft: 10,
              fontSize: 15,
              fontWeight: '100',
              marginTop: 8,
            }}
          >
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// ject {
//   "category": "Political",
//   "date": 1552409104690,
//   "description": "Fezgretrgfdsfg",
//   "id": "-L_mml1EbSlRoq2uwYDj",
//   "img": "",
//   "name": "Dqfesr",
//   "user": Object {
//     "email": "Tradelab@gma.com",
//     "id": "tAXXXIYoBihDktYb38qIfuXQZqs2",
//     "name": "Tradelab",
//   },
//   "userId": "tAXXXIYoBihDktYb38qIfuXQZqs2",
// },

const gradientWidth = 8;
//const styles
export default CardComponent;
