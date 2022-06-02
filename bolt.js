'use strict';

//bolt...Slack のボットを開発するための Node.js のライブラリ
const bolt = require('@slack/bolt');

//dotenv...envファイルから環境変数を設定し、それを読み込むためのライブラリ
const dotenv = require('dotenv');
dotenv.config();


console.log(`SLACK_APP_TOKEN: ${process.env.SLACK_APP_TOKEN}`);
console.log(`SLACK_BOT_TOKEN: ${process.env.SLACK_BOT_TOKEN}`);


/* 
    Bolt を使用して Slack アプリのトークンをプログラムにつなぎこみ、
    Bolt によって生成されたボットアプリケーションのオブジェクトを app という変数に代入

    書式はBoltライブラリの仕様に準じる
*/
const app = new bolt.App({

    //process.env で.envファイルで設定した環境変数にアクセス
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,

    //Slack アプリのモードである Socket Mode の設定
    socketMode: true,

    //コンソールに表示するログのレベル
    logLevel: 'debug'
})

/* 
    上記で作成したapp（ボットアプリケーションのオブジェクト） の中の、
    message というメソッド（関数）を呼び出す

    app.message部分
    第一引数は正規表現で指定
    Slack 上に投稿されたメッセージが、第一引数で指定した正規表現とマッチングしたら、
    第二引数で与えた関数を返す

    無名関数部分
    第一引数...投稿されたメッセージの情報を持つオブジェクト
    第二引数...ボットがメッセージを投稿するための関数
*/
app.message(/hello/i, ({message, say}) => {
    say(`こんにちは！ <@${message.user}>さん`);
});

//設定したボットアプリケーションの起動
app.start();