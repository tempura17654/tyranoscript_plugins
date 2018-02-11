[plugin name=ruby type=justify]
[iscript]
var addRuby = function (a,b) {
  TYRANO.kag.stat.ruby_dic = TYRANO.kag.stat.ruby_dic || {};
  TYRANO.kag.stat.ruby_dic[a] = {
    ruby: b,
    count: 0
  };
}
setTimeout(function () {
  addRuby("伸縮自在の愛", "バンジーガム");
  addRuby("こんにちは", "こんにちは");
  addRuby("こ", "こ");
  addRuby("スクリプト", "すくりぷと");
  addRuby("荻原", "おぎはら");
  addRuby("F5", "えふご");
  addRuby("再実行", "さいじっこう");
}, 100);
[endscript]
[wait time=100]
[iscript]
tf.face = "ＭＳ ゴシック";
[endscript]
[font face=&tf.face]
[delay speed=30]
あいつの伸縮自在の愛はよーくできてる…。[l][r]
こんにちは。[l][r]
ああああああああああああああああああああああああああああああああああああこんにちは。[l][r]
ここにスクリプトを書いてから、[r]
右下にある「再実行」をクリックするか、[r]
もしくはキーボードの「F5」キーを押すと、[r]
そのスクリプトでゲームがスタートします。[l][r]
バージョンはティラノスクリプトV461です。[l][r]
荻原制作のプラグインのほぼすべてがここで読み込めます。
[s]
[jump storage="koneta/ronpa.ks"]
[jump storage="koneta/screenshot.ks"]
[jump storage="koneta/indent.ks"]
[jump storage="scene1.ks"]
[jump storage="koneta/fadetext.ks"]
[jump storage="../others/plugin/special_char              /_SAMPLE.ks"]
[jump storage="../others/plugin/temprunking               /_SAMPLE.ks"]
[jump storage="../others/plugin/tempura_autosave          /_SAMPLE.ks"]
[jump storage="../others/plugin/unit_sentence_already_read/_SAMPLE.ks"]
[jump storage="../others/plugin/slider                    /_SAMPLE.ks"]
[jump storage="../others/plugin/role_button_auto_hide     /_SAMPLE.ks"]
[jump storage="../others/plugin/monitor_stat              /_SAMPLE.ks"]
[jump storage="../others/plugin/anim_filter               /_SAMPLE.ks"]
[jump storage="../others/plugin/trim                      /_SAMPLE.ks"]
[jump storage="../others/plugin/quake_ex                  /_SAMPLE.ks"]
[jump storage="../others/plugin/bg_wipe                   /_SAMPLE.ks"]
[jump storage="../others/plugin/bg_tile                   /_SAMPLE.ks"]
[jump storage="../others/plugin/manpu                     /_SAMPLE.ks"]
[jump storage="../others/plugin/celanim                   /_SAMPLE.ks"]
[jump storage="../others/plugin/switch                    /_SAMPLE.ks"]
[jump storage="../others/plugin/jquery_with_tyrano        /_SAMPLE.ks"]
[jump storage="../others/plugin/for                       /_SAMPLE.ks"]
