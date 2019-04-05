import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../assets/colors';
import { createStackNavigator } from 'react-navigation';
import TheoryScreen from '../screens/main/TheoryScreen';
import HomeScreen from '../screens/main/HomeScreen';

const CardComponent = ({ theory, navigation }) => {
  const { img, title, category, user, description, likes, comments, peoples } = theory;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('theory', { theory })}
      style={{
        marginBottom: 10,
        ...colors.SHADOW,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      }}
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
        <View style={{ flex: 1, borderTopRightRadius: 5, overflow: 'hidden', marginBottom: 10 }}>
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
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 8, marginLeft: 10 }}>
            <View style={{ flex: 0.3, flexDirection: 'row' }}>
              <MaterialIcons name={'thumb-up'} size={20} color="black" />>
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
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              color: 'grey',
              fontSize: 12,
              fontWeight: '100',
            }}
          >
            by {user.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const gradientWidth = 8;
//const styles
export default CardComponent;
