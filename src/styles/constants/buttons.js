import { StyleSheet } from 'react-native';
import COLORS from './colors';
import { BORDER, FONT, FONTSIZE } from './styles';

const button = {
  alignItems: 'center',
  backgroundColor: COLORS.themePurple, // change based on theme
  borderRadius: BORDER.radius,
  height: 48,
  justifyContent: 'center',
  margin: 10,
  paddingHorizontal: 20
}

const buttonText = {
  color: COLORS.themeWhite,
  fontSize: FONTSIZE.regular,
  fontFamily: FONT.semiBold,
  lineHeight: 20,
}

const buttons = StyleSheet.create({
  btn1: {
    ...button,
  },
  btn2: {
    ...button,
    backgroundColor: COLORS.black
  },
  outlineBtn1: {
    ...button,
    backgroundColor: COLORS.themeWhite,
    borderWidth: 1,
    borderColor: BORDER.color,
  },
  btnText1: {
    ...buttonText
  },
  btnText2: {
    ...buttonText,
    color: COLORS.themePurpleText
  }
})

export default buttons;
