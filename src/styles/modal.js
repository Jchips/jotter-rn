import { moderateScale } from '../util/scaling';
import { BORDER } from './constants';
import COLORS from './colors';
import app from './appDefault';

const MODAL = {
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
    padding: moderateScale(10),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  controllerContainer: {
    ...app.controllerContainer,
    width: '90%',
  },
  buttons: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
}

export default MODAL;