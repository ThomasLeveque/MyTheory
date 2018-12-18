import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';

import fonts from '../assets/fonts';
import colors from '../assets/colors';

const PrimaryButton = ({
  title,
  styleButton,
  styleText,
  onPress,
  loading,
  startColor,
  endColor,
  pictoName,
}) => {
  return (
    <View style={[styleButton, styles.primaryContainer]}>
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={styles.primaryGradient}
          colors={[startColor, endColor]}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
          ) : (
            pictoName && (
              <MaterialIcons name={pictoName} size={20} color="white" style={{ marginRight: 10 }} />
            )
          )}
          <Text style={[styleText, styles.primaryText]}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const SecondaryButton = ({ title, styleButton, styleText, onPress, pictoName }) => {
  return (
    <View style={[styleButton, styles.secondaryContainer]}>
      <TouchableOpacity style={{ ...colors.SHADOW }} onPress={onPress}>
        <View style={styles.secondaryView}>
          <LinearGradient
            style={styles.secondaryGradient}
            colors={[colors.GRADIENT_START, colors.GRADIENT_END]}
          />
          {pictoName && (
            <MaterialIcons name={pictoName} size={16} color="black" style={{ marginRight: 10 }} />
          )}
          <Text style={[styleText, styles.secondaryText]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const secondaryGradientWidth = 8;

const styles = StyleSheet.create({
  primaryContainer: {
    alignItems: 'center',
  },
  primaryGradient: {
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryText: {
    color: 'white',
    fontFamily: 'montserratBold',
    fontSize: 14,
  },
  secondaryContainer: {
    alignItems: 'center',
  },
  secondaryView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingRight: 15,
    paddingLeft: 15 + secondaryGradientWidth,
    borderRadius: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  secondaryGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: secondaryGradientWidth,
  },
  secondaryText: {
    color: 'black',
    fontFamily: 'montserratBold',
    fontSize: 12,
  },
});

export { PrimaryButton, SecondaryButton };
