[iscript]
TYRANO.kag.config.autoRecordLabel      = "true";
TYRANO.kag.config.unReadTextSkip       = "false";
TYRANO.kag.config.alreadyReadTextColor = "0x87cefa";
[endscript]
[layopt layer=0 visible=true]
[ptext  layer=0 text=※プラグイン導入前 name=ptext x=0 y=540 width=960 align=center size=40]
[delay speed=2]

*select
[glink text=プラグインを読み込む            x=0 y=0   width=840 target=plugin]
[glink text=セーブデータを削除する          x=0 y=70  width=840 target=reset]
[glink text=ラベル「start」へ               x=0 y=140 width=840 target=start]
[glink text=「_SAMPLE2.ks」へ               x=0 y=210 width=840 storage=../others/plugin/unit_sentence_already_read/_SAMPLE2.ks]
[glink text=ラベル「select2」へ             x=0 y=280 width=840 target=select2]
[s]

*plugin
[freeimage layer=0]
[ptext  layer=0 text=※プラグイン導入後 name=ptext color=yellow x=0 y=540 width=960 align=center size=40]
[plugin name=unit_sentence_already_read]
[jump target=select]

*reset
[iscript]
setTimeout(function(){
localStorage.clear();
location.reload();
},200);
[endscript stop=true]

*start
テストを開始します。[p]

*part1
ラベル「part1」に到達。[p]
part1:メッセージ01。[p]
part1:メッセージ02。[p]
part1:メッセージ03。[p]
part1:メッセージ04。[p]
part1:メッセージ05。[p]

*part2
ラベル「part2」に到達。[p]
part2:メッセージ01。[p]
part2:メッセージ02。[p]
part2:メッセージ03。[p]
part2:メッセージ04。[p]
part2:メッセージ05。[p]

*part3
ラベル「part3」に到達。[p]
part3:メッセージ01。[p]
part3:メッセージ02。[p]
part3:メッセージ03。[p]
part3:メッセージ04。[p]
part3:メッセージ05。[p]

*part4
ラベル「part4」に到達。[p]
part4:メッセージ01。[p]
part4:メッセージ02。[p]
part4:メッセージ03。[p]
part4:メッセージ04。[p]
part4:メッセージ05。[p]

*part5
ラベル「part5」に到達。[p]
part5:メッセージ01。[p]
part5:メッセージ02。[p]
part5:メッセージ03。[p]
part5:メッセージ04。[p]
part5:メッセージ05。[p]
[s]

*select2
このラベルはプラグイン導入後に見てください。[p]
訪れたことのあるglinkは赤で、訪れたことのないglinkは黒で表示します。[p]
;マクロ[myglink]定義
;訪れたことがあるかどうかでglinkの色を変える
[macro name=myglink]
  [iscript]
  var key = createCurrentLabelKey(mp.storage, mp.target);
  tf.is_visited = sf.record[key] >= 0;
  [endscript]
  [if exp=tf.is_visited]
    ;すでに訪れたことのあるstorage/targetへのglinkボタン
    ;マクロパラメータを[glink]に * で全渡ししたあと color=red だけ上書き
    [glink * color=red]
  [else]
    ;まだ訪れたことのないstorage/targetへのglinkボタン
    ;単にパラメータを[glink]に * で全渡しするだけでいい
    [glink *]
  [endif]
[endmacro]
*select3
[myglink text=ラベル「a」へ  x=0 y=0   width=840 target=a]
[myglink text=ラベル「b」へ  x=0 y=70  width=840 target=b]
[myglink text=ラベル「c」へ  x=0 y=140 width=840 target=c]
[s]

*a
ラベル「a」に到達。[p]
a:メッセージ01。[p]
a:メッセージ02。[p]
a:メッセージ03。[p]
[jump target=select3]

*b
ラベル「b」に到達。[p]
b:メッセージ01。[p]
b:メッセージ02。[p]
b:メッセージ03。[p]
[jump target=select3]

*c
ラベル「c」に到達。[p]
c:メッセージ01。[p]
c:メッセージ02。[p]
c:メッセージ03。[p]
[jump target=select3]
