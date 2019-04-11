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
  disabled, // Only MaterialIcons for now
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.primaryContainer, styleButton]}
      disabled={disabled}
    >
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.primaryGradient}
        colors={disabled ? [colors.GRAY, colors.GRAY] : [startColor, endColor]}
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
  );
};

const SecondaryButton = ({ title, styleButton, styleText, onPress, pictoName, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.secondaryContainer, styleButton]}
      onPress={onPress}
      disabled={disabled}
    >
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
  );
};

const TextButton = ({ title, styleButton, styleText, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.textButtonContainer, styleButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styleText, styles.textButtonText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const secondaryGradientWidth = 8;

const styles = StyleSheet.create({
  primaryContainer: {
    alignSelf: 'flex-start',
  },
  primaryGradient: {
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryText: {
    color: 'white',
    fontFamily: 'montserratSemiBold',
    fontSize: 14,
  },
  secondaryContainer: {
    alignSelf: 'flex-start',
    ...colors.SHADOW,
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
    fontFamily: 'montserratSemiBold',
    fontSize: 12,
  },
  textButtonText: {
    color: 'black',
    fontFamily: 'montserratBold',
    fontSize: 12,
  },
});

export { PrimaryButton, SecondaryButton, TextButton };
