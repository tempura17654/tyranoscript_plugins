[jump storage="koneta/characapture.ks"]
[jump storage="../others/plugin/chara_part_manager        /_SAMPLE.ks"]
[jump storage="../others/plugin/tempura_camera2           /_SAMPLE.ks"]
[jump storage="../others/plugin/camera_trans              /_SAMPLE.ks"]
[jump storage="../others/plugin/tempura_camera            /_SAMPLE.ks"]
[jump storage="koneta/loadmask.ks"]
[jump storage="../others/plugin/jquery_a3d_update         /_SAMPLE.ks"]
[jump storage=scene1.ks]

[jump storage="../others/plugin/jquery_a3d_update         /_SAMPLE.ks"]
[jump storage="../others/plugin/html2canvas_update        /_SAMPLE.ks"]
[plugin name=scenario_viewer]
[jump target=start]

[jump storage="../others/plugin/scenario_viewer           /_SAMPLE.ks"]
[jump storage="../others/plugin/chara_part_inserter       /_SAMPLE.ks"]
[jump storage="../others/plugin/chara_part_manager        /_SAMPLE.ks"]
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


