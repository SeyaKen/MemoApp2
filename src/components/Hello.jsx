import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { bool, shape, string } from 'prop-types';

export default function Hello(props) {
  const { children, bang, style } = props;
  // boolはtrueかfalseしかとらないという意味
  return (
    <View>
      <Text style={[styles.text, style]}>
        {/* 配列にすることで、styles.textがなかったら、styleそれもなかったら、次の奴のstyleを充てるという指示ができる */}
        {`Hello ${children}${bang ? '!' : ''}`}
        {/*
        ${bang ? '!' : ''}はもしbangがtrueだったら、！をつけるそうでなければ、！をつけない、※ifと同じ
        */}
        {/* なぜ{`Hello ${children}`}にするかというと */}
        {/* 「Hello {children}」だとEslintの性質上改行しなければな */}
        {/* らず、そうするとスペースを作ることができないから。 */}
      </Text>
    </View>
    //  <Hello style={{ fontSize: 16 }}>Small World</Hello>
    //  {{}}の中にcssのスタイルを書く */}
    //  ここではbang={true}だがbangだけでbang={true｝の意味になる */}
  );
}

Hello.propTypes = {
  children: string.isRequired,
  // isReauiredはHelloというこcomoponentを使うときは必ずchildrenを渡さなければならいということ定義している。
  // 逆に常にわたってこないときは下にdefaultPropsを定義して使う、（例、bang）
  bang: bool,
  // boolは常にtrueかfalseしかとらない、stringは文字しかとらない
  style: shape(),
  // shape()はそのオブジェクトの型を定義する
};

Hello.defaultProps = {
  bang: false,
  // bangがもしわたってこなかったら、defaultがfalse
  style: null,
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    backgroundColor: 'blue',
    fontSize: 50,
  },
});
