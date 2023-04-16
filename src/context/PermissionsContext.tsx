import React, {createContext, useEffect, useState} from 'react';
import {AppState, Platform} from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';

export interface PermissionState {
  locationStatus: PermissionStatus;
}

type PermissionContextProps = {
  permissions: PermissionState;
  askLocationPermission: () => void;
  checklocationPermission: () => void;
};

export const permissionInitState: PermissionState = {
  locationStatus: 'unavailable',
};

export const PermissionsContext = createContext({} as PermissionContextProps);

export const PermissionsProvider = ({children}: any) => {
  const [permissions, setPermissions] = useState(permissionInitState);
  useEffect(() => {
    checklocationPermission();
    AppState.addEventListener('change', state => {
      if (state !== 'active') {
        return;
      }
      checklocationPermission();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }
    if (permissionStatus === 'blocked') {
      openSettings();
    }
    setPermissions({
      ...permissions,
      locationStatus: permissionStatus,
    });
  };
  const checklocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    setPermissions({
      ...permissions,
      locationStatus: permissionStatus,
    });
  };

  return (
    <PermissionsContext.Provider
      value={{permissions, askLocationPermission, checklocationPermission}}>
      {children}
    </PermissionsContext.Provider>
  );
};
