import { StyleSheet, Platform } from 'react-native';
import COLORS from './colors';
import { moderateScale } from '../util/scaling';
import { BORDER, FONT, FONTSIZE } from './constants';

const app = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.themeWhite,
  },
  itemCard: {
    flex: 1,
    padding: moderateScale(15),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: BORDER.color, // change based on theme
    borderRadius: BORDER.radius,
    marginVertical: 5,
    marginHorizontal: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  input: {
    width: '100%',
    height: moderateScale(38),
    padding: 5,
  },
  icon: {
    height: moderateScale(22),
    width: moderateScale(22),
  },
  icon2: {
    height: moderateScale(23),
    width: moderateScale(23),
  },
  smallText: {
    fontSize: moderateScale(FONTSIZE.xsmall),
    marginVertical: 1,
    fontFamily: FONT.regular,
    lineHeight: 20
  },
  boldText: {
    fontFamily: FONT.bold,
  },
  header: {
    fontSize: moderateScale(FONTSIZE.large),
    margin: 10,
    fontFamily: FONT.bold
  },
  errorAlert: {
    backgroundColor: 'rgb(248, 215, 218)',
    padding: 16,
    borderRadius: 8,
    margin: 10,
    width: '100%'
  },
  errorText: {
    color: '#dc3545',
  },
  controllerContainer: {
    // width: '90%',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: BORDER.color,
    borderRadius: BORDER.radius,
    padding: 5,
  },
});

export default app;