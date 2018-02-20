========== ========== ========== ==========
     てんぷらテーマ「ダーク」
========== ========== ========== ==========

【最終更新日】2018/02/17 11:11
【  名  称  】てんぷらテーマ「ダーク」
【  種  別  】ティラノスクリプト用の外部プラグイン
【 製 作 者 】荻原（おぎはら）
【 開発環境 】64bit版Windows10, ティラノスクリプトv461, ティラノライダーv211 
【 動作環境 】上記開発環境にて確認
【 連 絡 先 】Twitterまでどうぞ（@tempura17654）
【 配 布 元 】http://tempura9357.blog.fc2.com
【ライセンス】MIT

---------- ----------



◇ 概要 ◇

ティラノスクリプトのシステムをまるっと改造するプラグインです。
改造内容は完全に製作者の好みであり、
なにかパラメータを指定することで変えられるようなカスタマイズ性はゼロです。
このプラグインの一部の技術のみを適用したい、などの場合には個別にご連絡ください。

またこのプラグインは、ティラノスクリプトの動作をそこそこ重くします。
スマートフォンでの動作は確認していませんが、たぶん厳しいのではないかと思われます。

このプラグインを導入すると、
・[makewindow]  ロールボタンを含めたメッセージウィンドウを定義する
・[showwindow]  メッセージウィンドウを表示する
・[hidewindow]  メッセージウィンドウを隠す
・[pushglink]   glinkデータを追加する（text, target, storage属性のみ。合計2～4個に対応、それ以外は非対応）
・[showglink]   [pushglink]で追加したglinkデータを表示する
・[glink_after] [showglink]で表示したglinkをクリックしてジャンプした後に必ず設置する
の6個のマクロが定義されます。
(他にも定義されるマクロがありますが、おそらくシナリオでは使うことのないものです。)

さらに、このプラグインはルビ拡張プラグイン(http://tempura9357.blog.fc2.com/blog-entry-58.html)を内包しているため、
[ruby]タグにstrパラメータを指定できるようになる他、
次の2個のタグも使うことができるようになります。
・[rubydic]
・[rubyconfig]
これらの詳細は当該プラグインの説明をご参照ください。



◇ ファイル構成 ◇

tempura_theme_dark
 ├ css
 ｜  ├ src
 ｜  ｜  ├ bg.png
 ｜  ｜  ├ frame.png
 ｜  ｜  ├ NotoSansJP-Medium.otf
 ｜  ｜  ├ NotoSansJP-Medium.woff
 ｜  ｜  ├ NotoSerifJP-Medium.otf
 ｜  ｜  └ NotoSerifJP-Medium.woff
 ｜  ├ others.css
 ｜  └ system.css
 ├ html
 ｜  ├ backlog.html
 ｜  ├ config.html
 ｜  └ save.html
 ├ img
 ｜  ├ btn
 ｜  ｜  ├ auto.png
 ｜  ｜  ├ auto2.png
 ｜  ｜  ├ load.png
 ｜  ｜  ├ load2.png
 ｜  ｜  ├ log.png
 ｜  ｜  ├ log2.png
 ｜  ｜  ├ qload.png
 ｜  ｜  ├ qload2.png
 ｜  ｜  ├ qsave.png
 ｜  ｜  ├ qsave2.png
 ｜  ｜  ├ save.png
 ｜  ｜  ├ save2.png
 ｜  ｜  ├ skip.png
 ｜  ｜  └ skip2.png
 ｜  ├ frame.png
 ｜  ├ frame2.png
 ｜  ├ gradient.png
 ｜  ├ nextpage.gif
 ｜  └ nodata.png
 ├ js
 ｜  ├ config.js
 ｜  ├ libs.js
 ｜  ├ main.js
 ｜  ├ save.js
 ｜  └ text.js
 ├ libs
 ｜  ├ kag.ruby.js
 ｜  ├ rangeslider.css
 ｜  ├ rangeslider.js
 ｜  ├ test_message.css
 ｜  ├ test_message.js
 ｜  └ test_message.ks
 ├ sound
 ｜  ├ sound.m4a
 ｜  └ sound.ogg
 ├ init.ks
 ├ _README.txt
 └ _SAMPLE.ks



◇ 導入方法 ◇

解凍して出てきた「tempura_theme_dark」フォルダを、
「data/others/plugin/」下にコピーしてください。
その後、first.ksに以下のタグを記述してください。

    [plugin name=tempura_theme_dark]

なお、サンプルシナリオでは次の4つのプラグインを併せて読み込んでいます。
ご注意ください。

    [plugin name=quake_ex]
    [plugin name=monitor_stat]
    [plugin name=bg_wipe]
    [plugin name=unit_sentence_already_read]

【重要】また、このプラグインを導入するには、Config.tjsの内容を変える必要があります。
data/system/Config.tjsを開き、最下部に次の記述を加えてください。
(Config.tjsに同じ項目を複数書いた場合、最も下に書いてあるもので上書きされます。)

    ;scWidth=1280
    ;scHeight=720
    ;configSaveSlotNum=25;
    ;autoRecordLabel=true;



◇ pluginタグに指定できるパラメータ ◇

-



◇ FAQ・既知のバグ等 ◇

-



◇ ライブラリ ◇

このプラグインは以下のライブラリを使用しています。
いずれもMITライセンスです。
・rangeslider.js（http://rangeslider.js.org/）
・ルビ拡張プラグイン（http://libretto.mond.jp/mamecho/plugin/ruby）



◇ 履歴 ◇

2018/02/20 19:31 セーブスロット1にセーブした際、最後にセーブしたスロットが1であることを
                 正確に記録できていなかった問題を修正。
2018/02/17 11:11 バグ修正と使用していないファイルの削除。
2018/02/17 01:16 配布開始。
