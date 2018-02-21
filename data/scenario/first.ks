[layopt layer=message0 visible=false]

;キャラクターの作成
[chara_new name="yuko" storage="chara/yuko/hair_back/ロング.png" jname="ゆうこ" ] 

;体パーツ
[chara_layer name="yuko" part="body_back" id="breza" storage="chara/yuko/body_back/ブレザー1.png" zindex=9 ]

[chara_layer name="yuko" part="body_front" id="breza" storage="chara/yuko/body_front/ブレザー1.png" zindex=10 ]

;目のパーツ
[chara_layer name="yuko" part="eye" id="1" storage="chara/yuko/eye/普通な目(黒め)1.png" zindex=20 ]
[chara_layer name="yuko" part="eye" id="2" storage="chara/yuko/eye/デフォルメ目1.png" ]

;髪型のパーツ
[chara_layer name="yuko" part="hair_front" id="ナチュラル" storage="chara/yuko/hair_front/ナチュラル.png" zindex=40 ]
[chara_layer name="yuko" part="hair_front" id="くせ毛" storage="chara/yuko/hair_front/くせ毛.png" ]

;顔のパーツ
[chara_layer name="yuko" part="head" id="1" storage="chara/yuko/head/普通な顔1.png" zindex=11]
[chara_layer name="yuko" part="head" id="2" storage="chara/yuko/head/青ざめた顔1.png" ]

;表情のパーツ
[chara_layer name="yuko" part="face" id="1" storage="chara/yuko/face_front/素.png" zindex=20 ]
[chara_layer name="yuko" part="face" id="2" storage="chara/yuko/face_front/驚き.png"]

;アクセサリのパーツ
[chara_layer name="yuko" part="megane" id="0" storage="none" zindex=30 ]
[chara_layer name="yuko" part="megane" id="1" storage="chara/yuko/accessory_front/メガネ.png"]


;キャラクターを表示
[chara_show name="yuko"] 
[s]

[jump target=start]
[jump storage="../others/plugin/popopo                    /_SAMPLE.ks"]
[jump storage="../others/plugin/tempura_theme_dark        /_SAMPLE.ks"]
[jump storage="../others/plugin/tempura_ruby              /_SAMPLE.ks"]
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

;一番最初に呼び出されるファイル

*start

[title name="ティラノスクリプト解説"]

[stop_keyconfig]


;ティラノスクリプトが標準で用意している便利なライブラリ群
;コンフィグ、CG、回想モードを使う場合は必須
@call storage="tyrano.ks"

;ゲームで必ず必要な初期化処理はこのファイルに記述するのがオススメ

;メッセージボックスは非表示
@layopt layer="message" visible=false

;最初は右下のメニューボタンを非表示にする
[hidemenubutton]

;タイトル画面へ移動
@jump storage="title.ks"

[s]


