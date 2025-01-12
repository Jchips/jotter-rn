import { StyleSheet, Platform } from 'react-native';
import { BORDER, FONT, FONTSIZE } from './constants/styles';
import { scale, moderateScale, verticalScale } from '../util/scaling';
import COLORS from './constants/colors';

const app = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.themeWhite,
  },
  itemCard: {
    flex: 1,
    padding: 15,
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
  smallText: {
    fontSize: FONTSIZE.xsmall,
    marginVertical: 1,
    fontFamily: FONT.regular,
    lineHeight: 20
  },
  boldText: {
    fontFamily: FONT.bold,
  },
  header: {
    fontSize: FONTSIZE.large,
    margin: 10,
    fontFamily: FONT.bold
  },
  icon: {
    height: 25,
    width: 25,
  },
  errorAlert: {
    backgroundColor: 'rgb(248, 215, 218)',
    padding: 16,
    borderRadius: 8,
    margin: 10,
    width: '100%'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    margin: 20,
    width: '90%',
    backgroundColor: COLORS.themeWhite,
    borderRadius: BORDER.radius,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  controllerContainer: {
    margin: 10,
  },
  errorText: {
    color: '#dc3545',
  },
});

export default app;