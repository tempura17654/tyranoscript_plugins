[iscript]
tf.face1 = 'MeiryoKe_Gothic, "Ricty Diminished", "Osaka－等幅", "Osaka-等幅", Osaka-mono, "ＭＳ ゴシック", "MS Gothic", "Courier New", Courier, Monaco, Menlo, Consolas, "Lucida Console", monospace';
tf.face2 = 'Georgia, "游明朝体", "YuMincho", "游明朝", "Yu Mincho", "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN W3", HiraMinProN-W3, "ヒラギノ明朝 ProN", "Hiragino Mincho ProN", "ヒラギノ明朝 Pro", "Hiragino Mincho Pro", "HGS明朝E", "ＭＳ Ｐ明朝", "MS PMincho", serif';
tf.face3 = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", HelveticaNeue, "Segoe UI", "游ゴシック体", YuGothic, "Yu Gothic M", "游ゴシック Medium", "Yu Gothic Medium", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN W3", HiraKakuProN-W3, "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, Osaka, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif';
tf.size1 = "40"
tf.size2 = "28"
TYRANO.kag.config.defaultLineSpacing = 20;
[endscript]
[font face=&tf.face2 size=&tf.size2"]



; プラグイン読み込み
[plugin name=tempura_ruby time=180]



; 辞書登録
[rubydic str=吾輩 text=わがはい  ]
[rubydic str=猫   text=ねこ      ]
[rubydic str=書生 text=しょせい  ]
[rubydic str=薄暗 text=うすぐら  ]
[rubydic str=人間 text=ヒューマン]
[rubydic str=書生 text=しょせい  ]
[rubydic str=獰悪 text=どうあく  ]

; サンプル文章
吾輩は猫である。[p]
名前はまだ無い。[p]
どこで生れたかとんと見当がつかぬ。[p]
何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。[p]
吾輩はここで始めて人間というものを見た。[p]
しかもあとで聞くとそれは書生という人間の中で一番獰悪な種族であったそうだ。[p]



; いろんな文字サイズやフォントでテスト

[font face=&tf.face1 size=&tf.size1"]
ルビテスト[ruby str=漢字 text=るび]ルビテスト。[r]
[font face=&tf.face1 size=&tf.size2]
ルビテスト[ruby str=漢字 text=るびるび]ルビテスト。[r]

[r]
[font face=&tf.face2 size=&tf.size1]
ルビテスト[ruby str=漢字 text=るび]ルビテスト。[r]
[font face=&tf.face2 size=&tf.size2]
ルビテスト[ruby str=漢字 text=るびるび]ルビテスト。[r]

[r]
[font face=&tf.face3 size=&tf.size1]
ルビテスト[ruby str=漢字 text=るび]ルビテスト。[r]
[font face=&tf.face3 size=&tf.size2]
ルビテスト[ruby str=漢字 text=るびるび]ルビテスト。[r]

[p]
[font face=&tf.face2 size=&tf.size2"]



; いろんな文字数でテスト

ルビテスト[ruby str=漢 text=るび]ルビテスト。[r]
ルビテスト[ruby str=漢 text=るびるび]ルビテスト。[r]
ルビテスト[ruby str=漢 text=るびるびるびるび]ルビテスト。[r]

ルビテスト[ruby str=漢字漢字 text=る]ルビテスト。[r]
ルビテスト[ruby str=漢字漢字 text=るび]ルビテスト。[r]
ルビテスト[ruby str=漢字漢字 text=るびるび]ルビテスト。[r]
ルビテスト[ruby str=漢字漢字 text=るびるびるびるび]ルビテスト。[r]
ルビテスト[ruby str=漢字漢字 text=るびるびるびるびるびるび]ルビテスト。[r]

[s]