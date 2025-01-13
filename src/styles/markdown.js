import { moderateScale } from '../util/scaling';
import { BORDER, FONT, FONTSIZE } from './constants';

const MARKDOWN = {
  heading1: {
    flexDirection: 'row',
    fontSize: moderateScale(31),
    fontFamily: FONT.bold,
    borderBottomWidth: 1,
    borderColor: '#84848424',
    paddingBottom: 10,
    marginBottom: 10
  },
  heading2: {
    flexDirection: 'row',
    fontSize: moderateScale(23),
    fontFamily: FONT.bold,
    marginVertical: 5,
  },
  heading3: {
    flexDirection: 'row',
    fontSize: moderateScale(21),
    fontFamily: FONT.semiBold,
    marginVertical: 5,
  },
  heading4: {
    flexDirection: 'row',
    fontSize: moderateScale(17),
    fontFamily: FONT.semiBold,
    marginVertical: 5,
  },
  heading5: {
    flexDirection: 'row',
    fontSize: moderateScale(15),
    fontFamily: FONT.semiBold,
    marginVertical: 5,
  },
  heading6: {
    flexDirection: 'row',
    fontSize: moderateScale(13),
    fontFamily: FONT.semiBold,
    marginVertical: 5,
  },
  strong: {
    fontWeight: 0,
    fontFamily: FONT.bold,
    fontSize: moderateScale(FONTSIZE.regular),
  },
  em: {
    fontStyle: 'normal',
    fontFamily: FONT.italic,
    fontSize: moderateScale(FONTSIZE.regular,),
  },
  bullet_list: {
    fontFamily: FONT.regular,
    lineHeight: moderateScale(20),
    fontSize: moderateScale(FONTSIZE.regular),
  },
  ordered_list: {
    fontFamily: FONT.regular,
    lineHeight: moderateScale(20),
    fontSize: moderateScale(FONTSIZE.regular),
  },

  list_item: {
    paddingRight: 20,
    fontSize: moderateScale(FONTSIZE.regular),
  },
  table: {
    borderWidth: 1,
    borderColor: BORDER.color,
    marginVertical: 20,
    maxWidth: '100%',
    overflow: 'auto'
    // borderRadius: 3,
  },
  thead: {
    fontFamily: FONT.bold,
    fontSize: moderateScale(FONTSIZE.mid),
  },
  tr: {
    borderBottomWidth: 1,
    borderColor: BORDER.color,
    flexDirection: 'row',
  },
  td: {
    flex: 1,
    padding: 5,
    fontFamily: FONT.regular,
    fontSize: moderateScale(FONTSIZE.mid),
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    fontFamily: FONT.regular,
    lineHeight: moderateScale(20),
    fontSize: moderateScale(FONTSIZE.regular, 0.5),
  },
  hr: {
    marginVertical: 20,
    marginTop: 25,
    backgroundColor: '#84848424',
  }
}

export default MARKDOWN;