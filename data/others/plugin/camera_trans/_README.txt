========== ========== ========== ==========
  カメラ滑らかトランスプラグイン
========== ========== ========== ==========

【最終更新日】2018/03/05 09:10
【  名  称  】カメラ滑らかトランスプラグイン
【  種  別  】ティラノスクリプト用の外部プラグイン
【 製 作 者 】荻原（おぎはら）
【 開発環境 】64bit版Windows10, ティラノスクリプトv470_rc5, ティラノライダーv211 
【 動作環境 】上記開発環境にて確認
【 連 絡 先 】Twitterまでどうぞ（@tempura17654）
【 配 布 元 】http://tempura9357.blog.fc2.com
【ライセンス】MIT

---------- ----------



◇ 概要 ◇

通常、wait=falseで使用した[camera]の演出が終了しないまま
次の[camera]が始まると、カメラの接続が滑らかになりません。
それを滑らかにしようぜというプラグインです。

改変したライブラリを読み込む、という処理を行うのですが、
もとのライブラリからの変更は数行なので、
知識さえあれば直接エンジンを書き換えるほうがベターかなと思います。
変更箇所はこちらからご覧になれます。
https://github.com/tempura17654/tyranoscript_plugins/commit/d54c8d291510c18a386dac0070a3914f978d8588


◇ ファイル構成 ◇

camera_trans
 ├ jquery.a3d.js
 ├ kag.tag_camera.js
 ├ init.ks
 ├ _SAMPLE.ks
 └ _README.txt



◇ 導入方法 ◇

解凍して出てきた「camera_trans」フォルダを、
「data/others/plugin/」下にコピーしてください。
その後、first.ksに以下のタグを記述してください。

    [plugin name=camera_trans]



◇ pluginタグに指定できるパラメータ ◇

-



◇ FAQ・既知のバグ等 ◇

-



◇ 履歴 ◇

2018/03/05 09:10 配布開始。