========== ========== ========== ==========
     背景ワイプ切り替えプラグイン
========== ========== ========== ==========

【最終更新日】2018/01/30 09:55
【  名  称  】背景ワイプ切り替えプラグイン
【  種  別  】ティラノスクリプト用の外部プラグイン
【 製 作 者 】荻原（おぎはら）
【 開発環境 】64bit版Windows10, ティラノスクリプトv460, ティラノライダーv200 
【 動作環境 】上記開発環境にて確認
【 連 絡 先 】Twitterまでどうぞ（@tempura17654）
【 配 布 元 】http://tempura9357.blog.fc2.com
【ライセンス】MIT

---------- ----------



◇ 概要 ◇

このプラグインは、ティラノスクリプトに『ワイプ』機能を実装するものです。
このプラグインを導入すると、
[bg_wipe storage="rouka.jpg"]
とか、
[bg_wipe color="white" time="1500" method="shape"]
とか記述することで、ワイプを行うことができるようになります。

プラグインを導入することで使えるようになるタグは、
・[bg_wipe]
・[def_bg_wipe]
・[skipon_bg_wipe]
・[skipoff_bg_wipe]
の4つです。


◇ ファイル構成 ◇

bg_wipe
 ├ simage
 ｜  ├ circle.png
 ｜  ├ diamond.png
 ｜  ├ hexagon.png
 ｜  ├ pentagon.png
 ｜  ├ square.png
 ｜  ├ star.png
 ｜  └ triangle.png
 ├ timage
 ｜  ├ column.png
 ｜  ├ hexagon.png
 ｜  ├ mosaic.png
 ｜  ├ noise.png
 ｜  ├ noise2.png
 ｜  ├ noise3.png
 ｜  ├ row.png
 ｜  ├ smoke.png
 ｜  └ spiral.png
 ├ bg_wipe.js
 ├ init.ks
 ├ _README.txt
 └ _SAMPLE.ks



◇ 導入方法 ◇

解凍して出てきた「bg_wipe」フォルダを、
「data/others/plugin/」下にコピーしてください。
その後、first.ksに以下のタグを記述してください。

    [plugin name=bg_wipe]



◇ pluginタグに指定できるパラメータ ◇

-



◇ タグリファレンス ◇

◆ [bg_wipe] 背景のワイプ切り替え
    
    || 概要
    
    背景をワイプで切り替えます。
    このタグは、たとえば次のように使います。
    
    [bg_wipe storage=rouka.jpg time=2000]
    
    使用例では、廊下背景へのトランジションを2000ミリ秒かけて行います。
    その他の設定はデフォルト、ということになります。
    
    || 指定できるパラメータ
    
    color     : 切り替え後の背景色をHTML5の形式で指定する。
    storage   : 切り替え後の背景画像を指定する。
    time      : 切り替え時間（ミリ秒）。デフォルトは「1000」。
    method    : 切り替える方法を次の4つのキーワードのいずれかで指定します。
                wipe/image/shape/custom
    direction : どの方向からワイプし始めるかを次の１４コのキーワードのいずれかで指定します。
                top/bottom/left/leftTop/leftBottom/right/rightTop/rightBottom/
                center/centerHorizon/centerVertical/out/outHorizon/outVertical
    i_name    : methodがimageのとき（画像トランジションを行うとき）に、どの画像を使うか。
                timageフォルダに入っている透過png画像のファイル名を指定します。
    s_name    : methodがshapeのとき（図形パターントランジションを行うとき）に、
                どの図形画像を使うか。simageに入っている透過png画像のファイル名を指定します。
    c_name    : methodがcustomのとき、どのカスタム関数を使うか。
    num_shape : methodがshapeのとき（図形パターントランジションを行うとき）に、
                画面の高さを何分割するかを整数で指定します。
    grad_width: methodがwipeのとき（ワイプトランジションを行うとき）に、
                どれくらいの幅でワイプするかを0～1の数で指定します。
    wait      : ワイプの完了を待つか。true/false
    preload   : 画像のプリロードを待つか。true/false
    default   : これをtrueにしておくと、ワイプを行うついでにいまの設定をデフォルトにできます。
                デフォルトはfalse。



◆ [def_bg_wipe] デフォルト値の設定
    
    || 概要
    
    デフォルト設定を書き換えるタグです。
    毎回同じ設定を[bg_wipe]タグに描いていると、見た目が長くなるばかりか、変更も大変になります。
    その対策にお使いください。
    
    || 指定できるパラメータ
    
    [bg_wipe]で指定できるすべてのパラメータ    : それをデフォルト値にします。



◆ [skipon_bg_wipe] 背景切り替え中のスキップを有効化
    
    || 概要
    
    背景切り替え中のクリックスキップを有効化します。
    （デフォルトで有効です。）
    
    || 指定できるパラメータ
    
    ありません。



◆ [skipoff_bg_wipe] 背景切り替え中のスキップを無効化
    
    || 概要
    
    背景切り替え中のクリックスキップを無効化します。
    
    || 指定できるパラメータ
    
    ありません。



◇ FAQ・既知のバグ等 ◇

-



◇ 履歴 ◇

2018/01/30 09:55 アップデート。
2017/05/08 20:32 myWipeを微修正しました。
2017/05/04 17:08 配布開始。