[hidemenubutton]

;===========================================================
;ゲーム起動後に各種コンフィグを強引に上書きするための処理
;※動作チェッカーのために入れています。あまりお気になさらず
[iscript]
if (! sf.tempura_theme_dark) localStorage.clear();
var W = "1280";
var H = "720";
TYRANO.kag.config.scWidth = W;
TYRANO.kag.config.scHeight = H;
TYRANO.kag.config.configSaveSlotNum = "25";
TYRANO.kag.config.autoRecordLabel = "true";
$(".tyrano_base").add(".layer").css({
  width: W,
  height: H
});
TYRANO.base.fitBaseSize(W, H);
[endscript]
;===========================================================

; プラグイン
[plugin name=quake_ex]
[plugin name=monitor_stat]
[plugin name=bg_wipe]
[plugin name=unit_sentence_already_read]
[plugin name=tempura_theme_dark]



*title
[layopt layer=message0 visible=false]
[bg_wipe method=image i_name=spiral storage=b_rouka.png time=800]
[pushglink text=はじめから target=start]
[pushglink text=つづきから target=continue]
[showglink]
[s]



*continue
[glink_after]
[showload]
[jump target=title]



*start
[glink_after]
[makewindow]
[playbgm storage=http://tempura.html.xdomain.jp/tyranoscript/data/bgm/b_music.ogg]
[bg_wipe method=custom c_name=myWipe storage=b_room.png time=800]
[showwindow]
#
俺の名前は鈴木太郎。[p]
なんとかって奴が新しいプラグインを作ったというから、来てみたものの――[p]
……。[p]
…………。[p]
誰もいないじゃないか。[p]
#【鈴木】
「……帰るか」[p]

[playse storage=http://tempura.html.xdomain.jp/tyranoscript/data/sound/sound.ogg]

#
喰らった肩透かしに若干苛立ちを覚えながら、俺は帰り支度を整える。[p]

[fadeoutbgm time=200]

――そのときだった。[p]

[layopt layer=0 visible=true]
[image  layer=0 name=akane x=460 y=30 storage=http://tempura.html.xdomain.jp/tyranoscript/data/fgimage/chara/akane/b_akane_black.png]
[quake_ex hmax=100 time=1300 wait=false]

#【？？？】
「ちょっと待ったー！！」[p]
#【鈴木】
「っ――！！！」[p]
「誰だっ！！」[p]
#

[image  layer=0 name=akane x=460 y=30 time=700 storage=http://tempura.html.xdomain.jp/tyranoscript/data/fgimage/chara/akane/b_akane.png]

#【女】
「こんにちは」[p]
「もしかしてプラグイン【tempura_theme_dark】に興味があるの？」[l]

[pushglink text=…………   target=select1]
[pushglink text=そうだ     target=select2]
[pushglink text=お前は誰だ target=select3]
[showglink]
[s]

*select1
#
[glink_after]
#【鈴木】
「…………」[p]
#
俺は名乗りもしないこの女と口を利くべきかどうかを[ruby text=しゅんじゅん str=逡巡]した。[p]
[jump target=after]

*select2
#
[glink_after]
#【鈴木】
「そうだ」[p]
[jump target=after2]

*select3
#
[glink_after]
#【鈴木】
「お前は誰だ」[p]
[jump target=after]


#【鈴木】
「お前は誰だ」[p]

*after

#【女】
「あ、私はね？　あかねっていうんだ」[p]
#【女】
「プラグインに興味のある人がここにいるって聞いて来たんだけど……」[p]
#【鈴木】
「それは俺のことだな」[p]
#
女は「あっ」という顔をして、[p]

*after2

#【女】
「あなたがそうなんだ！」[p]
「じゃあ、私があなたに、プラグインについて説明してあげるよ」[p]
#
……。[p]
このあかねという女がプラグインについて説明してくれるらしい。[p]
警戒して損してしまった。[p]
#【鈴木】
「頼む」[p]
#
あかねはこくりと[ruby text=うなず]頷くと、説明を始めた。[p]

[playbgm storage=http://tempura.html.xdomain.jp/tyranoscript/data/bgm/b_music2.ogg]

#【あかね】
「このプラグインは、ティラノスクリプトのセーブ画面・ロード画面・コンフィグ画面・バックログ画面の四画面について、機能とデザインを変更し――」[p]
「その[ruby text=ほか]他のいくつかの項目についても、プラグイン作者の好みでデザインの調整を行うものです」[p]
「ただし！　プラグインを読み込むときに特定のパラメータを指定するだけで何かをデザインできるようなカスタマイズ性はゼロです」[p]
「プラグイン作者がむかしの自分のJavaScriptの習作を発掘し、捨てるのも忍びないので整備して公開した――という経緯の手前、ご容赦いただければと思います」[p]
#
いま表示されている画面をそのまま自分のゲームに導入する機能しかないということだ。[p]
それを思うと黒豆さんの【カスタマイズ補助プラグイン】は本当によく作られているな。[p]
#【あかね】
「……こほん」[p]
「まあ、『ほへー、ティラノスクリプトって頑張ればこんなこともできるんやなあ』という感じで見ていただければ嬉しいです」[p]
「デザインについては、見ての通り全体的に黒を基調としていて、飾り気は少なめです」[p]
「明度も彩度もともに低い、暗い雰囲気の絵と調和するかと思います」[p]
「ちなみにWebフォントについてですが、WebフォントにはGoogleとAdobeが共同開発している【Noto】フォントファミリーというのがあって、」[p]
「これは2018年現在【OFLライセンス1.1】で公開されており、製品に好きに組み込んで使うことができるということなので、Webフォントとしてプラグインに組み込んでみました」[p]
「……」[p]
「……組み込んでみたんですが、なんかフォントをサーバーにアップロードするのがうまくいかなかったので、動作チェッカー上では表示されません」[p]
「プラグインをzipでダウンロードしてティラノライダーで起動した場合はご確認いただけるかと思います」[p]
「説明は、こんなところです」[p]
#【鈴木】
「そうか」[p]
#
ありがとよ、と言って俺は教室を出た。[p]
[freeimage layer=0 time=800]
[hidewindow]
[bg_wipe direction=left grad_width=1 storage=b_rouka.png time=800]
[showwindow]
サンプルシナリオはここまでです。[s]