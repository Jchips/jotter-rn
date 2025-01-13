import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { COLORS } from '../styles';

/**
 * Adds a loading symbol while the video is loading.
 * @returns {Component} - A component with the loading symbol
 */
const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size='large'
        color={COLORS.black}
        style={{ position: 'absolute', top: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.themeWhite,
  },
});

export default Loading;
