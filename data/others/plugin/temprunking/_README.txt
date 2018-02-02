========== ========== ========== ==========
     ランキングプラグイン
========== ========== ========== ==========

【最終更新日】2018/02/02 11:06
【  名  称  】ランキングプラグイン
【  種  別  】ティラノスクリプト用の外部プラグイン
【 製 作 者 】荻原（おぎはら）
【 開発環境 】64bit版Windows10, ティラノスクリプトv460, ティラノライダーv200 
【 動作環境 】上記開発環境にて確認
【 連 絡 先 】Twitterまでどうぞ（@tempura17654）
【 配 布 元 】http://tempura9357.blog.fc2.com
【ライセンス】MIT

---------- ----------



◇ 概要 ◇

このパッケージには、
「ティラノスクリプトでランキングを扱いたいなー」
という方を対象にしたプラグインが入っています。

プラグインを導入することで使えるようになるタグは、
・[download_runking]
・[upload_runking]
・[check_runking]
・[copy_runking]
・[push_runking]
の5つです。



◇ ファイル構成 ◇

temprunking
┝ init.ks
┝ tempruking.js
┝ _README.txt
┝ _SAMPLE.ks
└ php
  ┝ runking.json
  ┝ get.php 
  ┝ put.php 
  └ getip.php



◇ 導入方法 ◇
  
  ちょっと複雑ですので、ゆっくり、繰り返し読んでみてください。
  
  1) プラグインパッケージに「php」フォルダがあることを確認してください。
     まずこのフォルダを、PHP(5以降)が利用可能なサーバーにアップロードします。
     (PHPが利用可能な無料レンタルサーバーには、たとえば「Xdomain」があります。)
  
  2) アップロードした「php」フォルダのアドレスを控えてください。
     たとえば「Xdomain」にティラノスクリプトのプロジェクトを丸ごとアップロードした場合、
     次のようなアドレスになるでしょうか。
     http://tempura.php.xdomain.jp/tyrano_sample/data/others/plugin/temprunking/php
  
  3) 通常通り、プラグインを導入します。
    「temprunking」フォルダをプロジェクト内の「data/others/plugin」フォルダに配置し、
     シナリオファイル「first.ks」を開き、プラグインを読み込むための [plugin] タグを記述します。
     nameパラメータには"temprunking"、urlパラメータには 2) で控えたアドレスを入力してください、
     [plugin name="temprunking" url="http://tempura.php.xdomain.jp/tyrano_sample/data/others/plugin/temprunking/php"]
  
  4) これでランキングを扱うための事前準備ができました。
     あとは、このプラグインを導入することで使えるようになる5つのタグを使って、
     シナリオを組んでみてください。



◇ pluginタグに指定できるパラメータ ◇

   url    :【必須】サーバーにアップロードしたphpフォルダのアドレス。たとえば、
            http://tempura.php.xdomain.jp/tyrano_sample/data/others/plugin/temprunking/php



◇ タグリファレンス ◇

◆ [download_runking] サーバーからランキングをダウンロードする
    
    || 概要
    
    サーバーからランキングデータをダウンロードします。
    通信に成功したときはそのまま次のタグに進みますが、
    通信に失敗したとき、たとえば
    ･インターネットに接続していない
    ･URLが間違っている
    ･サーバーが落ちている
   ようなときは、storage + target で指定した場所に飛びます。
    
    || 指定できるパラメータ
    
    storage     : 通信が失敗したときに飛ぶシナリオファイル
    target      : 通信が失敗したときに飛ぶラベル
    
    || サンプルコード
    
    [download_runking target="*Error"]



◆ [upload_runking] サーバーにランキングをアップロードする
    
    || 概要
    
    サーバーにランキングデータをアップロードします。
    通信に成功したときはそのまま次のタグに進みますが、
    通信に失敗したとき、たとえば
    ･インターネットに接続していない
    ･URLが間違っている
    ･サーバーが落ちている
    ようなときは、storage + target で指定した場所に飛ばすことができます。
    あらかじめ [download_runking] しておく必要があります。
    
    || 指定できるパラメータ
    
    storage     : 通信が失敗したときに飛ぶシナリオファイル
    target      : 通信が失敗したときに飛ぶラベル
    
    || サンプルコード
    
    [download_runking target="*Error"]
    [upload_runking target="*Error"]



◆ [check_runking] 特定の数値がランキングにおいて何位にあたるかを調べる
    
    || 概要
    
    scoreがランキング中何位のデータかを確認し、
    その結果を変数variable(初期値はtf.runk)にコピーします。
    あらかじめ[download_runking]しておく必要があります。
    
    || 指定できるパラメータ
    
    score      : 順位をチェックするスコア
    variable   : チェックした順位を格納する変数名
    
    || サンプルコード
    
    [download_runking target="*Error"]
    [check_runking variable="f.runk" score="& f.score"]
    あなたの順位は[emb exp="f.runk"]位ですよ。



◆ [push_runking] ランキングにデータを登録する
    
    || 概要

    nameおよびscoreをひとつのデータとしてまとめて、
    ランキングにぶち込みます。
    あらかじめ[download_runking]しておく必要があります。
    
    || 指定できるパラメータ

    name       : 名前
    score      : スコア

    || サンプルコード
    
    [download_runking target="*Error"]
    [push_runking name="& f.name" score="& f.score"]



◆ [copy_runking] ランキングデータを指定した変数にコピーする
    
    || 概要
    
    ランキングデータを変数variable(初期値はtf.runking)にコピーします。
    ランキングデータを[ptext]などに使いたいとき、事前にこのタグを使っておきます。
    あらかじめ[download_runking]しておく必要があります。
    
    || 指定できるパラメータ
    
    variable    : ランキングデータをコピーする変数名
    
    || サンプルコード
    
    ◇ 使用例 ◇
    [download_runking]
    [copy_runking]
  	[ptext x="150" y=" 70" size="28" edge="0x000000" layer="0" text="1位"]
  	[ptext x="250" y=" 70" size="28" edge="0x000000" layer="0" text="& tf.runking[0].name"]
  	[ptext x="600" y=" 70" size="28" edge="0x000000" layer="0" text="& tf.runking[0].score + 'pt'"]



◇ FAQ・既知のバグ等 ◇

-



◇ 履歴 ◇

2018/02/02 11:06 クロスドメイン対策。
2017/12/03 21:43 サーバーの設定によってはランキングデータを正常に取得できていなかった問題を修正。
2017/12/01 20:05 配布開始。