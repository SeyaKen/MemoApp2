import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Alert, FlatList,
  // FlatListを使って画面に映ってる部分だけをレンダリングする機能をつけていく
} from 'react-native';
import { Feather } from '@expo/vector-icons';
// いちいちどのページでも読み込まないと使えないので注意
import { useNavigation } from '@react-navigation/native';
// useNavigationはreacthooksの一種
import firebase from 'firebase';
import {
  shape, string, instanceOf, arrayOf,
} from 'prop-types';
// memosのpropTypesを定義するためにshapeを読み込み、その中のbodyTextは文字列だから、stringも読み込む、
// さらにupdatedAtはデータ型だから、instanceOfを読み込む
// arrayOfは配列であるということを示すprop-typesの関数
import { dateToString } from '../utils';

export default function MemoList(props) {
  const { memos } = props;
  // MemoListScreenから渡ってきたpropsからmemosを取得
  const navigation = useNavigation();
  // この設定をすることで、useNavigationをnavigationとして使える

  function deleteMemo(id) {
    const { currentUser } = firebase.auth();
    // https://firebase.google.com/docs/auth/web/manage-users?hl=jaをみろ。要するにcurrentUserをfirebaseの中の、authの中から取り出している
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      Alert.alert('メモを削除します。', 'よろしいですか？', [
        {
          text: 'キャンセル',
          onPress: () => {},
          // 何もしないからの空の関数
        },
        {
          text: '削除する',
          style: 'destructive',
          // 文字が赤くなる
          onPress: () => {
            ref.delete().catch(() => {
              Alert.alert('削除に失敗しました。');
            });
          },
        },
      ]);
    }
  }

  function renderItem({ item }) {
  // 下で使うrenderItemという関数をここで定義
    return (
      <TouchableOpacity
        // key={item.id}
        // 下でkeyを指定しているのでここでしてしなくてもいい
        // keyを指定しないといけないルールがreactにはある
        style={styles.memoListItem}
        onPress={() => { navigation.navigate('MemoDetail', { id: item.id }); }}
        // idを取得
        // nvigation.navigateを使いたいが、navigationを使えるのはApp.jsxに登録されてる画面だけ。
        // そのため、useNavigation使う
      >
        <View>
          <Text
            style={styles.memoListItemTitle}
            numberOfLines={1}
            // memoListの表示を1行にする処理。
          >
            {item.bodyText}
          </Text>
          {/* mapでforeachっぽくしたmemoの中のbodyText */}
          <Text style={styles.memoListItemDate}>{dateToString(item.updatedAt)}</Text>
          {/* 左側 */}
        </View>
        <TouchableOpacity
          style={styles.memoDelete}
          onPress={() => { deleteMemo(item.id); }}
        >
          <Feather name="x" size={16} color="#b0b0b0" />
          {/* 直接cssを書ける */}
          {/* 上でFeatherを読み込んだから使える */}
          {/* 削除ボタン */}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <FlatList
        data={memos}
        // dataはMemoListScreenで指定した、memosだよという意味
        renderItem={renderItem}
        // renderingするのは{renderItem}という関数という意味上で指定する必要がある
        keyExtracter={(item) => item.id}
      />
      {/* 下のkey={memo.id}と同じ意味 */}
      {/* {memos.map((memo) => ( */}
      {/* memosはforEachみたいなもん */}
    </View>
  );
}

MemoList.propTypes = {
  memos: arrayOf(shape({
    id: string,
    bodyText: string,
    updatedAt: instanceOf(Date),
  })).isRequired,
  // shapeだとobjectが一つだけという意味になるから、arrayOfを使いそれが配列で何個もあるということを定義する
  // memosはobjectの配列のためここではshapeを使用,
  // shapeでオブジェクトの中身がどのような内容になっているのかを指定
  // memosがないとmemoListが表示されないから、isReaquired
};

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    // フレックスボックスの向きがreactnativeだと普通と逆だから、flexDirection: 'row'と書くと普通になる
    justifyContent: 'space-between',
    paddingVertical: 16,
    // 垂直方向のpadding,verticalは「垂直の」という意味
    paddingHorizontal: 19,
    // 横方向のpadding,horizontalは「水平の」という意味
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
  memoDelete: {
    padding: 8,
  },
});
