import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  useDrawerProgress,
} from '@react-navigation/drawer';
import {MainLayout} from '../screens';
import {COLORS, SIZES, images, FONTS, icons} from '../constants';
import Animated from 'react-native-reanimated';

const Drawer = createDrawerNavigator();
  
const DrawerScreenContainer = ({children}) => {
  const progress = useDrawerProgress();
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 25],
  });

  return (
    <Animated.View
      style={{
        flex: 1,
        overflow: 'hidden',
        transform: [{scale}],
        borderRadius: borderRadius,
      }}>
      {children}
    </Animated.View>
  );
};

const CustomDrawer = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.transparentBlack7,
      }}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          overlayColor: 'transparent',
          drawerStyle: {
            flex: 1,
            width: '65%',
            paddingLeft: 20,
            backgroundColor: 'transparent',
          },
          sceneContainerStyle: {
            backgroundColor: 'transparent',
          },
        }}
        initialRouteName="MainLayout"
       >
        <Drawer.Screen name="MainLayout">
          {props => (
            <DrawerScreenContainer>
              <MainLayout {...props}   />
            </DrawerScreenContainer>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

export default CustomDrawer;
