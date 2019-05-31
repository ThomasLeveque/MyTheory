import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../assets/colors';

const CommentComponent = ({ commentObject }) => {
  const imageSize = 35;
  const { comment, idTheory, user, dateFormat } = commentObject;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        borderRadius: 5,
        position: 'relative',
        paddingBottom: 20,
        backgroundColor: 'white',
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
        <View
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
            overflow: 'hidden',
            backgroundColor: colors.GRAY_BG,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {user.img ? (
            <Image
              style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              source={{ uri: user.img }}
            />) : (
              <MaterialIcons name="photo" size={imageSize / 2} color={colors.PRIMARY} />
            )
          }

        </View>
        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontFamily: 'montserratRegular',
            }}
          >
            {user.name}
          </Text>
          <Text
            style={{
              color: colors.GRAY_TXT,
              fontSize: 12,
              marginTop: 2,
              fontFamily: 'montserratLight',
            }}
          >
            {dateFormat}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: 'black',
          fontSize: 11,
          marginTop: 10,
          fontFamily: 'montserratRegular',
        }}
      >
        {comment}
      </Text>
      <View
        style={{
          marginTop: 10,
          height: 1,
          width: '70%',
          backgroundColor: colors.GRAY,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

const gradientWidth = 8;

export default CommentComponent;
