import { BORDER, FONT } from './styles';

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
    fontFamily: FONT.bold,
    marginVertical: 5,
  },
  heading3: {
    flexDirection: 'row',
    fontSize: 22,
    fontFamily: FONT.semiBold,
    marginVertical: 5,
  },
  heading4: {
    flexDirection: 'row',
    fontSize: 18,
    fontFamily: FONT.semiBold,
    marginVertical: 5,
  },
  heading5: {
    flexDirection: 'row',
    fontSize: 15,
    fontFamily: FONT.semiBold,
    marginVertical: 5,
  },
  heading6: {
    flexDirection: 'row',
    fontSize: 13,
    fontFamily: FONT.semiBold,
    marginVertical: 5,
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
    paddingRight: 20,
  },
  ordered_list: {
    fontFamily: FONT.regular,
    lineHeight: 20,
    paddingRight: 20,
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
    fontFamily: FONT.regular,
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
    marginVertical: 20,
    marginTop: 25,
    backgroundColor: '#84848424',
  }
}

export default MARKDOWN;