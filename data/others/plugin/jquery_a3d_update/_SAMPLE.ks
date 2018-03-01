;===============================================================================
; このへんはあまり気にしないでいただけるとたすかります(;´･ω･`)
[iscript]
var W = "400";
var H = "400";
TYRANO.kag.config.scWidth = W;
TYRANO.kag.config.scHeight = H;
TYRANO.kag.config.useCamera = "false";
TYRANO.kag.config.ScreenCentering = "true";
$(".tyrano_base").css("position", "absolute").add(".layer").css({
  width: W,
  height: H
});
$("body").append("<div id=\"border\" style=\"pointer-events: none; border: 3px solid red;position: absolute; width: 400px; height: 400px;\"><span style=\"background: black; color: white;\">赤枠がゲーム画面の原寸サイズ。この枠をはみ出しているオブジェクトに[kanim]を適用したとき、重なりの順番が異常になる場合がある。正常ならば、ロールボタンである「HIDE MESSAGE」ボタンが上（前面）に表示されるはずなのだが、どうでしょう？</span></div>");
$(window).on("resize", function (e) {
    setTimeout(function () {
        $("#border").css({
            left: $("#tyrano_base").css("left"),
            top: $("#tyrano_base").css("top")
        });
    }, 110);
}).trigger("resize");
[endscript]
;===============================================================================




[bg storage=room.jpg time=0]
[button role=window graphic=../../tyrano/images/system/menu_message_close.png x=100 y=150 width=200]
[button role=window graphic=../../tyrano/images/system/menu_message_close.png x=100 y=350 width=200]
[button role=sleepgame graphic=../../tyrano/images/system/button_menu.png x=340 y=350 target=config]
[layopt layer=0 visible=true]
[position width=360 height=120 top=270 left=20 opacity=170]
[delay speed=1]




*reset
[freeimage layer=0]
[image name=obj layer=0 x=0 y=50 storage=../../tyrano/images/system/bg_base.png x=150 y=130 width=100]
[image name=obj layer=0 x=0 y=50 storage=../../tyrano/images/system/bg_base.png x=150 y=330 width=100]




*part1
プラグイン読み込み前
[iscript]
delete window.jQuery.fn.a3d;
[endscript]
[loadjs storage=../../tyrano/libs/jquery.a3d.js]


[keyframe name=ka]
[frame p=0% x=0]
[frame p=50% x=-50]
[frame p=100% x=0]
[endkeyframe]
[kanim name=obj keyframe=ka time=300]
[p]




*part2
プラグイン読み込み後
[plugin name=jquery_a3d_update]


[keyframe name=ka]
[frame p=0% x=0]
[frame p=50% x=-50]
[frame p=100% x=0]
[endkeyframe]
[kanim name=obj keyframe=ka time=300]
[p]





[jump target=reset]





*config
[layopt layer=message0 visible=false]
[clearfix]
[iscript]
$(".layer_camera").empty();
[endscript]
[hidemenubutton]
[bg storage="../../tyrano/images/system/bg_config.jpg" time=300]
[button graphic=../../tyrano/images/system/menu_button_close.png fix=true target=*backtitle x=300 y=30]
[s]
*backtitle
[awakegame]