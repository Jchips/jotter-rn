import { StyleSheet, Text, View, Button, Pressable, Image } from 'react-native';
import Account from '../components/Account';
import Dashboard from '../components/Dashboard';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useAuth } from '../contexts/AuthContext';
import COLORS from '../styles/constants/colors';
import { BORDER, FONT, FONTSIZE } from '../styles/constants/styles';

const Drawer = createDrawerNavigator();

function DrawerNav({ navigation }) {
  const { user } = useAuth();
  const DrawerContent = (props) => {
    const { state, descriptors, navigation } = props;
    return (
      <View style={styles.drawerContainer}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/jotter-circle.png')}
            alt='Jotter logo'
            style={styles.jotterLogo}
          />
          <Text style={styles.headerText}>Jotter</Text>
          <Text style={styles.headerEmail}>{user?.email}</Text>
        </View>
        <DrawerContentScrollView {...props}>
          {state.routes.map((route, index) => {
            const isActive = state.index === index;
            return (
              <Pressable
                key={index}
                style={[styles.drawerItem, isActive && styles.activeItem]}
                onPress={() => navigation.navigate(route.name)}
              >
                <Text
                  style={[styles.drawerLabel, isActive && styles.activeLabel]}
                >
                  {descriptors[route.key].options.drawerLabel || route.name}
                </Text>
              </Pressable>
            );
          })}
        </DrawerContentScrollView>
      </View>
    );
  };

  const headerOptions = {
    // headerTintColor: COLORS.themePurpleText,
    headerShadowVisible: false,
    // headerRight: () => {
    //   return <SettingsBtn navigation={navigation} />;
    // },
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: 200,
        },
        cardStyle: {
          backgroundColor: '#fff',
        },
        ...headerOptions,
      }}
    >
      <Drawer.Screen
        name='Home'
        component={Dashboard}
        initialParams={{ folderId: null, folderTitle: 'Home' }}
      />
      <Drawer.Screen name='Account' component={Account} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerContainer: {
    flex: 1,
    paddingTop: 40,
  },
  jotterLogo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  header: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerText: {
    fontSize: FONTSIZE.xlarge,
    fontFamily: FONT.bold,
  },
  headerEmail: {
    fontSize: FONTSIZE.xsmall,
    fontFamily: FONT.regular,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  button: {
    // backgroundColor: ]
    color: '#000',
  },
  drawerItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  drawerLabel: {
    fontSize: 16,
    color: '#000', // Inactive label color
    fontFamily: FONT.semiBold,
  },
  activeItem: {
    backgroundColor: COLORS.themePurpleLight, // Active item background color
    borderRadius: BORDER.radius,
  },
  activeLabel: {
    color: COLORS.themePurpleText, // Active label (text) color
  },
});

export default DrawerNav;
