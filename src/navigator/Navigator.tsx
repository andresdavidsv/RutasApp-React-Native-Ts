import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapScreen from '../screens/MapScreen';
import PermissionsScreen from '../screens/PermissionsScreen';
import {PermissionsContext} from '../context/PermissionsContext';
import LoadingScreens from '../screens/LoadingScreens';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const {permissions} = React.useContext(PermissionsContext);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreens />;
  }

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {permissions.locationStatus === 'granted' ? (
          <Stack.Screen name="MapScreen" component={MapScreen} />
        ) : (
          <Stack.Screen
            name="PermissionsScreen"
            component={PermissionsScreen}
          />
        )}
      </Stack.Navigator>
    </>
  );
};
