import { StyleSheet, View, Text, Image } from 'react-native';

const JotterText = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>J</Text>
      <Image
        style={styles.img}
        source={require('../../assets/imgs/jotter-circle.png')}
        alt='Jotter logo'
      />
      <Text style={styles.header}>tter</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
  img: {
    width: 27,
    height: 27,
    marginLeft: 3,
    marginRight: 4,
    marginTop: 4,
  },
});

export default JotterText;
