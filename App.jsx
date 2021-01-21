import React from 'react';
// https://reactnavigation.org/docs/hello-react-navigation/からコピペしてくる
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
// CardStyleInterpolatorsをここで読み込む
import firebase from 'firebase';
// firebaseをここで読み込む
import MemoListScreen from './src/screens/MemoListScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import MemoCreateScreen from './src/screens/MemoCreateScreen';
import LogInScreen from './src/screens/LogInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

import { firebaseConfig } from './env';

const Stack = createStackNavigator();

if (firebase.apps.length === 0) {
  // firebaseの中のあぷりの数が一個もなかったら、という意味
  firebase.initializeApp(firebaseConfig);
// firebase初期化する
}

export default function App() {
  return (
    // ここから下の処理で画面をreact navigatorに登録
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{
          headerStyle: { backgroundColor: '#467fd3' },
          // headerStyleを使って、ヘッダーのスタイルを指定する
          headerTitleStyle: { color: '#fff' },
          // headerTitleStyleでヘッダーの文字のスタイルを指定
          headerTitle: 'Memo App',
          // headerTitleを指定することで、headerの文字を変えられる
          headerTintColor: '#fff',
          // headerTintColorを指定することでヘッダーのバックボタンの色を指定できる
          headerBackTitle: 'Back',
          // headerBackTitleを指定することで、文字をデフォルトのものから、自分の指定したい文字に変えられる
          cardStyleInterpolator: CardStyleInterpolators.forHorixontalIOS,
          // cardStyleInterpolatorは画面遷移の時のアニメーションの動きを指定できる
          // forHorizontalIOSだと、画面遷移時横にスライドするアニメーションになる。
          gestureEnable: true,
          // androidでも横にスワイプできるようにする
          gestureDirection: 'horizontal',
          // スワイプする向きをここで決める。
        }}
        // screenOptionsの中にcssを指定していく
      >
        {/* initialRouteNameに一番最初に表示したい画面を指定しておく */}
        {/* componetn={}の中にどんどん画面を入力していく */}
        <Stack.Screen name="MemoList" component={MemoListScreen} />
        <Stack.Screen name="MemoDetail" component={MemoDetailScreen} />
        <Stack.Screen name="MemoEdit" component={MemoEditScreen} />
        <Stack.Screen name="MemoCreate" component={MemoCreateScreen} />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
          // 画面ごとに画面遷移アニメーションを指定している、
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// (引数) ＝＞ {ここに処理の内容を書く}
