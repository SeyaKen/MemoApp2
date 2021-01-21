import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';

export default function MemoListScreen(props) {
  const { navigation } = props;
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
      // headerRight:<LogOutButton />ではなく、かんすうをていぎしなければならないので、
      // headerRight: () => { return <LogOutButton /> }
      // さらに今回は省略できるので省略してある
    });
    // ここでheaderの右にボタンを設置している。今回の場合だとcomponentsのファイルからLogOutButtonを読み込んで使う
  }, []);
  // 配列[]を指定することで、処理を一回だけ実行できる

  return (
    <View style={styles.container}>
      <MemoList />
      <CircleButton
        name="plus"
        onPress={() => { navigation.navigate('MemoCreate'); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
});
