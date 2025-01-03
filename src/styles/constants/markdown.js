import { BORDER, FONT, FONTSIZE } from './styles';

const MARKDOWN = {
  heading1: {
    flexDirection: 'row',
    fontSize: 32,
    fontFamily: FONT.bold,
    borderBottomWidth: 1,
    borderColor: '#84848424',
    paddingBottom: 10,
    marginBottom: 10
  },
  heading2: {
    flexDirection: 'row',
    fontSize: 24,
    fontFamily: FONT.bold
  },
  heading3: {
    flexDirection: 'row',
    fontSize: 18,
    fontFamily: FONT.semiBold
  },
  heading4: {
    flexDirection: 'row',
    fontSize: 16,
    fontFamily: FONT.semiBold
  },
  heading5: {
    flexDirection: 'row',
    fontSize: 13,
    fontFamily: FONT.semiBold
  },
  heading6: {
    flexDirection: 'row',
    fontSize: 11,
    fontFamily: FONT.semiBold
  },
  strong: {
    fontWeight: 0,
    fontFamily: FONT.bold,
  },
  em: {
    fontStyle: 'normal',
    fontFamily: FONT.italic,
  },
  bullet_list: {
    fontFamily: FONT.regular,
    lineHeight: 20,
  },
  ordered_list: {
    fontFamily: FONT.regular,
    lineHeight: 20,
  },

  // list_item: {
  //   lineHeight: FONTSIZE.regular,
  //   padding: 5
  // },
  table: {
    borderWidth: 1,
    borderColor: BORDER.color,
    marginVertical: 20,
    maxWidth: '100%',
    overflow: 'auto'
    // borderRadius: 3,
  },
  thead: {
    fontFamily: FONT.bold
  },
  tr: {
    borderBottomWidth: 1,
    borderColor: BORDER.color,
    flexDirection: 'row',
  },
  td: {
    flex: 1,
    padding: 5,
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
    lineHeight: 20,
  },
  hr: {
    marginBottom: 20,
    backgroundColor: '#84848424',
  }
}

export default MARKDOWN;