import Account from '../components/Account';
import Dashboard from '../components/Dashboard';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Pressable, Text } from 'react-native';

const Drawer = createDrawerNavigator();

function DrawerNav() {
  const headerOptions = {
    headerShadowVisible: false,
    // headerLeft: () => (
    //   <Pressable onPress={() => navigation.goBack()}>
    //     <Text>back</Text>
    //   </Pressable>
    // ),
  };
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name='Home'
        component={Dashboard}
        initialParams={{ folderId: null, folderTitle: 'Home' }}
      />
      <Drawer.Screen name='Account' component={Account} />
    </Drawer.Navigator>
  );
}

export default DrawerNav;
