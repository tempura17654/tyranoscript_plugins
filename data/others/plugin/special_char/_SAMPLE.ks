;プラグインを読み込み済ならここは無視
[ignore exp="tf.a == 1"]



;プラグインの読み込み（次に読み込むシナリオファイルから有効）
[plugin name="special_char"]
;テキスト文末に常に[l][cm][chara_ptext]を付加せよ。
[special_end                               mean="[l][cm][chara_ptext]"]
;「《」の手前に常に「[font color=yellow]」を挿入せよ。
[special_char char="《"     type="prepend" mean="[font:color=yellow]"]
;「》」の後ろに常に「[resetfont]」を加えよ。
[special_char char="》"     type="append"  mean="[resetfont]"]



;シナリオファイルを読み込み直すためのJavaScript処理(難しい)
[iscript]
tf.a = 1                                //プラグイン読み込んだよ
TYRANO.kag.cache_scenraio = {}          //シナリオのキャッシュを削除
tf.b = TYRANO.kag.stat.current_scenario //現在のシナリオファイルを控える
TYRANO.kag.stat.current_scenario = ""   //現在のシナリオファイルを消去
[endscript]
;このシナリオファイルを解析するとこから読み込みなおし
[jump storage=&tf.b]
[endignore]



[cm]
[clearfix]
[bg storage=room.jpg time=100]
[layopt layer=message0 visible=true]
[position layer=message0 page=fore left=0 top=440 width=960 height=200 visible=true]
[position layer=message0 page=fore margint=45 marginl=50 marginr=70 marginb=60]
[ptext name=chara_name_area layer=message0 color=white size=32 bold=bold x=58 y=446]
[chara_config ptext=chara_name_area]
[chara_config time=200]
[chara_new  name=akane storage=chara/akane/normal.png jname=【あかね】]
[chara_face name=akane face=doki  storage=chara/akane/doki.png]
[chara_face name=akane face=happy storage=chara/akane/happy.png]
[deffont bold=true size=32]
[resetfont]

#
さて。
《ノベルゲーム》が簡単に作れるというから、来てみたものの。
誰もいねぇじゃねぇか。
……。
帰るか。
#【？？？】
「ちょっとまったーーーーー！」
誰だ！？

[chara_show  name="akane" time="300" width="600" left="150" top="30"]

#【？？？】
「こんにちは」
#【？？？】
「私の名前はあかね」
#akane
「もしかして、《ノベルゲーム》の開発に興味があるの？」^

[glink color="black" storage="scene1.ks" size="32" x="120" width="600" y="100" text="はい。興味あります"       target="*selectinterest"]
[glink color="black" storage="scene1.ks" size="32" x="120" width="600" y="200" text="興味あります！"           target="*selectinterest"]
[glink color="black" storage="scene1.ks" size="32" x="120" width="600" y="300" text="どちらかと言うと興味あり" target="*selectinterest"]
[s]

*selectinterest

#akane:happy
「わー。興味あるなんて、嬉しいなー」
………………。
……まぁ、作ってみたい気持ちはあるけど、むずかしいんでしょ？
プログラミングとかやったことないし。

#akane:default
「そんな君に、耳寄りな情報があるんだけど」
#akane
「ききたい？　ききたいよね？」
いや、べつに――^

[er][delay speed="160"]
#akane:happy
「ティラノスクリプトー」
[delay speed="30"]

#
…………。
#akane:default
「ティラノスクリプトを使うと、簡単に《本格的》なノベルゲームが簡単に作れてしまうのよ」
へぇー。それはちょっと興味あるね。
#akane:doki
「ほ、ほんと！？」
#akane:default
「このゲームをプレイするだけで、ティラノスクリプトの機能を確認することができるから」
#akane:happy
「ぜひ、最後までつきあってね！」
[filter layer="base" sepia="100"]
[filter layer="0"    sepia="100"]
――それが彼女の最期の言葉になるなんて、このとき俺は思ってもみなかった。
～完～^
[s]