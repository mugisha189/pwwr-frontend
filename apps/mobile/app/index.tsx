import Constants from 'expo-constants';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, BackHandler, Platform, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Index() {
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef<WebView | null>(null);

  const onAndroidBackPress = useCallback(() => {
    if (canGoBack) {
      webViewRef.current?.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  }, [canGoBack]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      // return () => {
      //    BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
      // };
    }
  }, []);

  const prodUri = 'https://tvetmanagement.rtb.gov.rw';
  const devUri = prodUri ?? 'https://tvetmanagement.rtb.gov.rw/'; // TODO: Change to local
  const uri = __DEV__ ? devUri : prodUri;
  return (
    <>
      {loading && <ActivityIndicator />}
      <WebView
        style={styles.container}
        source={{ uri }}
        ref={webViewRef}
        onLoadProgress={(event) => {
          setCanGoBack(event.nativeEvent.canGoBack);
        }}
        onLoadEnd={(event) => {
          setLoading(false);
        }}
        allowsBackForwardNavigationGestures
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  headerImage: {
    width: '100%',
    resizeMode: 'contain',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
