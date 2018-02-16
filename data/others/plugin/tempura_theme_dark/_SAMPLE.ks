;scWidth=1280
;scHeight=720
;configSaveSlotNum=25;
;autoRecordLabel=true;
[iscript]
if (! sf.tempura_theme_dark) localStorage.clear();
var W = "1280";
var H = "720";
TYRANO.kag.config.scWidth = W;
TYRANO.kag.config.scHeight = H;
$(".tyrano_base").add(".layer").css({
  width: W,
  height: H
});
TYRANO.base.fitBaseSize(W, H);
TYRANO.kag.config.configSaveSlotNum = 25;
TYRANO.kag.config.autoRecordLabel = "true";
[endscript]

[hidemenubutton]

; キャラクター
[chara_new  name="akane"            storage="chara/akane/b_akane.png"]
[chara_face name="akane" face=black storage="chara/akane/b_akane_black.png"]

; プラグイン
[plugin name=quake_ex]
[plugin name=monitor_stat]
[plugin name=bg_wipe]
[plugin name=unit_sentence_already_read]
[plugin name=tempura_theme_dark]

[playbgm storage=b_music.ogg]
[bg_wipe method=image i_name=spiral storage=b_room.png time=800]
[makewindow]
[showwindow]
#
俺の名前は鈴木太郎。[p]
なんとかって奴が新しいプラグインを作ったというから、来てみたものの――[p]
……。[p]
…………。[p]
誰もいないじゃないか。[p]
#【鈴木】
「……帰るか」[p]

[playse storage=sound.ogg]

#
喰らった肩透かしに若干苛立ちを覚えながら、俺は帰り支度を整える。[p]

[fadeoutbgm time=200]

――そのときだった。[p]

[chara_show name=akane time=0 face=black]
[quake_ex hmax=100 time=1300 wait=false]

#【？？？】
「ちょっと待ったー！！」[p]
#【鈴木】
「っ――！！！」[p]
「誰だっ！！」[p]
#

[chara_mod name=akane face=default time=1000]

#【女】
「こんにちは」[p]
「もしかしてプラグイン【tempura_theme_dark】に興味があるの？」[l]

[pushglink text=…………   target=select1]
[pushglink text=そうだ     target=select2]
[pushglink text=お前は誰だ target=select3]
[showglink]
[s]

*select1
[glink_after]
#【鈴木】
「…………」[p]
#
俺は名乗りもしないこの女と口を利くべきかどうかを[ruby text=しゅんじゅん str=逡巡]した。[p]
[jump target=after]

*select2
[glink_after]
#【鈴木】
「そうだ」[p]
[jump target=after2]

*select3
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

[t-playbgm storage=b_music2.ogg]

#【あかね】
「このプラグインは、ティラノスクリプトのセーブ画面・ロード画面・コンフィグ画面・バックログ画面の四画面について、機能とデザインを変更し――」[p]
「その[ruby text=ほか]他のいくつかの項目についても、プラグイン作者の好みでデザインの調整を行うものです」[p]
「ただし、プラグインを読み込むときに特定のパラメータを指定するだけで何かをデザインできるようなカスタマイズ性はゼロです。そこはご容赦ください」[p]
#
このプラグインは単一のテーマとして機能するということだ。[p]
それを思うと黒豆さんの【カスタマイズ補助プラグイン】は本当によく作られているな。[p]
#【あかね】
「……こほん」[p]
「見ての通りデザインは全体的に黒を基調としていて、飾り気は少なめです」[p]
「明度も彩度もともに低い、暗い雰囲気の絵と調和するかと思います」[p]
「ちなみにいま使っているフォントはGoogleとAdobeが共同開発している【Noto】フォントファミリーで、」[p]
「2018年現在【OFLライセンス1.1】で公開されており、製品に好きに組み込んで使うことができるということなので、Webフォントとしてプラグインに組み込んでみました」[p]
[s]