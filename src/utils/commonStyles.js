// GLOBAL VARIABLES
const commonStyle = {
  horizontalGlobalPadding: 20,
  topGlobalPadding: 20,
  bottomGlobalPadding: 20,
  titleStyle: { fontSize: 35, fontFamily: 'montserratBold', marginBottom: 25 },
  mediumTitleStyle: { fontSize: 22, fontFamily: 'montserratBold', marginBottom: 15 },
};

const userStyle = {
  userContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: commonStyle.horizontalGlobalPadding,
    backgroundColor: 'white',
  },
  userTitle: {
    fontFamily: 'montserratBold',
    textAlign: 'center',
    fontSize: 34,
    marginBottom: 30,
  },
};

export { commonStyle, userStyle };
