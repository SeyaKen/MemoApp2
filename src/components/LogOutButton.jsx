import React from 'react';
import {
  TouchableOpacity, Text, StyleSheet, Alert,
} from 'react-native';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
// navigation.navigateが使えないので、このスクリーンが、app.jsxに登録されてないから。useNavigationを読み込む。

export default function LogOutButton() {
  const navigation = useNavigation();

  function handlePress() {
    firebase.auth().signOut()
    // ログインに関する処理はすべてfirebase.auth(),signOut()はログアウトの関数
      .then(() => {
        // const navigation = useNavigation();※reacihooksはcomponentの上に置かないとエラーになるので上に移動させなければならない
        // navigationにuseNavigationを代入
        navigation.reset({
          // ログアウトした瞬間に履歴をすべて消したいからnavigation.resetを使う
          index: 0,
          routes: [{ name: 'LogIn' }],
        });
      })
      .catch(() => {
        Alert.alert('ログアウトに失敗しました');
      });
  }
  // ログアウトに成功したら、then、失敗したら、catch

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      {/* handlepressという関数にログアウトボタンを押した瞬間の処理を上で指定しとく */}
      <Text style={styles.label}>ログアウト</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
