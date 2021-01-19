import React from 'react';
import {
  StyleSheet, ScrollView, View, Text,
} from 'react-native';
import CircleButton from '../components/CircleButton';

export default function MemoDetailScreen(props) {
  const { navigation } = props;
  // App.jsxに登録した画面には自動的にnavigationというpropsが渡される
  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle}>買い物リスト</Text>
        <Text style={styles.memoDate}>2020/12/24 10:00</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        {/* <ScrollView>にすることで、<View>では下にスクロールできないのができるようになる */}
        <Text style={styles.memoText}>
          テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが
        </Text>
      </ScrollView>
      <CircleButton
        name="plus"
        style={{ top: 60, bottom: 'auto' }}
        onPress={() => {
          navigation.navigate('MemoEdit');
          // navigation.navigate('MemoEdit');の意味はapp.jsxで指定した名前を('')の中に指定することで、
          // そこにonPressしたら移動しますよという意味
        }}
      />
      {/* onPress={() => {ここに指定したい動きのかんすうを指定する}} */}
      {/* ここでnameをedit-2にすることでCircleButtonでplusというedit-2が読み込まれて、このページでは「🖊」が表示される */}
      {/* ただし今回はhttps://icons.expo.fyiの中のfeatherの中のiconしか使えないので注意 */}
      {/* ここでのpropsをCircleButton.jsxに渡してスタイリングを上書きする */}
      {/* サークルボタンに直接styleを指定することができないので、CircleButton.jsxでpropsを受け取れるようにする必要がある */}
      {/* <Hello style={{ fontSize: 16 }}>Small World</Hello>
      {{}}の中にcssのスタイルを書く */}
      {/* ここではbang={true}だがbangだけでbang={true｝の意味になる   */}
    </View>
  );
}

// MemoDetailScreen.propTypes = {
//   navigation: shape({
//     navigate: func,
//   }).isRequired,
// };を指定する必要があるが、

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  memoHeader: {
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
    backgroundColor: '#467fd3',
  },
  memoTitle: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  memoDate: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
