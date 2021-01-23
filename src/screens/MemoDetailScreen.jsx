import React, { useEffect, useState } from 'react';
// useEffectは副作用を実行するフック
// 一時的にデータを保存する方法はuseState
import { shape, string } from 'prop-types';
// オブジェクトの中身を定義するのがshape
import {
  StyleSheet, ScrollView, View, Text,
} from 'react-native';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import { dateToString } from '../utils';

export default function MemoDetailScreen(props) {
  const { navigation, route } = props;
  const { id } = route.params;
  console.log(id);
  // routeの中のparamsからidを取得するという意味
  // navigationもrouteもreactnativeによってもともと設定されているprops。routeというオブジェクトの中にparamsというオブジェクトのなかにidが入っている
  // 下のpropTypesで定義するからそこを見ればいい
  // App.jsxに登録した画面には自動的にnavigationというpropsが渡される

  const [memo, setMemo] = useState(null);
  // memosの初期値nullをsetMemosを使って更新する。
  // useEffectは「MemoListScreen」でも同じことやってるからそれ見ろ
  useEffect(() => {
    const { currentUser } = firebase.auth();
    // currentUserをfirebaseから取得
    let unsubscribe = () => {};
    if (currentUser) {
      // もしcurrentUserがいたら、
      const db = firebase.firestore();
      // dbにfirebase.firestoreからの情報を代入
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      unsubscribe = ref.onSnapshot((doc) => {
        console.log(doc.id, doc.data());
        const data = doc.data();
        // dataにdocの中のdataを代入
        setMemo({
          id: doc.id,
          bodyText: data.bodyText,
          updatedAt: data.updatedAt.toDate(),
        });
        // setMemoを使いそのかっこの中に、id,bodyText,updatedAtがどのような内容なのかを指定していく
      });
      // MemoListScreenにも同じようなのあるから参照しろonsnapshotは監視することができる
      // 参照を作る。意味はdbの中のcollectionの中の（usersの中の（currentUserの中のuidのなかの）中のmemosの中の）中のdocの中のidをrefに代入
    }
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text
          style={styles.memoTitle}
          numberOfLines={1}
          // 今回の場合、見出しが一行になる処理
        >
          {memo && memo.bodyText}
          {/* memoがfalseやnullでなかったときに限り処理が実行される */}
        </Text>
        <Text style={styles.memoDate}>
          {memo && dateToString(memo.updatedAt)}
          {/* dateToStringはutilsが読み込んだ自分で作った関数 */}
          {/* memoがfalseやnullでなかったときに限り処理が実行される */}
        </Text>
      </View>
      <ScrollView style={styles.memoBody}>
        {/* <ScrollView>にすることで、<View>では下にスクロールできないのができるようになる */}
        <Text style={styles.memoText}>
          {memo && memo.bodyText}
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

MemoDetailScreen.propTypes = {
  route: shape({
    params: shape({ id: string }),
  }).isRequired,
};
// routeというオブジェクトの中のparamsというオブジェクトの中のidはstringという文字列ですよという意味

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
