[jump storage="../others/plugin/jquery_a3d_update         /_SAMPLE.ks"]
;[plugin name=jquery_a3d_update2]
[iscript]
window.a = document.styleSheets[8].cssRules;

TYRANO.kag.tag.camera.start = function(pm) {
        var that = this;
        
        if(this.kag.config.useCamera == "false"){
            $.alert("[camera]タグエラー。カメラの使用を許可して下さい。Config.tjsのuseCameraをtrueにする必要があります");
            return false;
        }
        
        //duration を確認する
        var duration = pm.time + "ms";
        
        if(typeof this.kag.stat.current_camera[pm.layer] == "undefined"){
            this.kag.stat.current_camera[pm.layer] = {
                x : "0",
                y : "0",
                scale : "1",
                rotate:"0"
            };
        }
        
        var to_camera = $.extend(true, {}, this.kag.stat.current_camera[pm.layer]);
        
        //指定されて項目があるなら、上書きする
        if(pm.x!="") to_camera.x = parseInt(pm.x)*-1 +"px";
        if(pm.y!="") to_camera.y = parseInt(pm.y)*1 +"px";
        if(pm.zoom!="") to_camera.scale = pm.zoom;
        if(pm.rotate!="") to_camera.rotate = pm.rotate+"deg";
        
        
        if(pm.from_x != "0" || pm.from_y!="0" || pm.from_zoom!="1" || pm.from_rotate!="0" ){
            
            this.kag.stat.current_camera[pm.layer] = {
                x : parseInt(pm.from_x)*-1 +"px",
                y : parseInt(pm.from_y)*1+"px",
                scale : pm.from_zoom,
                rotate:pm.from_rotate+"deg"
            };
            
        }
        
        console.log(to_camera);
        
        var flag_complete = false;
        that.kag.stat.is_move_camera = true;
        
        var a3d_define = {
            frames : {

                "0%" : {
                    trans : this.kag.stat.current_camera[pm.layer]
                },
                "100%" : {
                    trans : to_camera
                }
            },
            
            config : {
                duration : duration,
                state : "running",
                easing : pm.ease_type
            },
            
            complete:function(){
                //アニメーションが完了しないと次へはいかない
                if(pm.wait =="true" && flag_complete ==false){
                    flag_complete=true; //最初の一回だけwait有効
                    
                    setTimeout(function(){
                        that.kag.ftag.nextOrder();
                    },300);
                    
                }else{
                    
                    //カメラを待ってる状態なら
                    if(that.kag.stat.is_wait_camera == true){
                        that.kag.stat.is_wait_camera = false;
                        that.kag.ftag.nextOrder();
                    }
                    
                }
                
                that.kag.stat.is_move_camera = false;
            }
        };
        
        this.kag.stat.current_camera[pm.layer] = to_camera;
        
        if(pm.wait =="false"){
            that.kag.ftag.nextOrder();
        }

        //アニメーションの実行
        if(pm.layer=="layer_camera"){
            $(".layer_camera").css("-webkit-transform-origin", "center center");
            $(".layer_camera").a3d(a3d_define);
            this.kag.stat.current_camera_layer = "";
        }else{
            $("."+pm.layer +"_fore").css("-webkit-transform-origin", "center center");
            $("."+pm.layer +"_fore").a3d(a3d_define);
            this.kag.stat.current_camera_layer = pm.layer;
        }
};
TYRANO.kag.config.ScreenCentering = "true";
TYRANO.kag.config.useCamera = "true";
$(".tyrano_base").css("position", "absolute");
$(window).trigger("resize");
setTimeout(function () {
    /*
    $(".tyrano_base").css({
        "top": "-500px",
        "transform": "scale(2)"
    });
    */
}, 150);
[endscript]
[wait time=300]
[jump storage="koneta/ronpa.ks"]
[jump storage=scene1.ks]

[jump storage="../others/plugin/jquery_a3d_update         /_SAMPLE.ks"]
[jump storage="../others/plugin/html2canvas_update        /_SAMPLE.ks"]
[plugin name=scenario_viewer]
;[jump storage=scene1.ks]
[jump target=start]

[jump storage="../others/plugin/scenario_viewer           /_SAMPLE.ks"]
[jump storage="../others/plugin/chara_part_inserter       /_SAMPLE.ks"]
[jump storage="../others/plugin/chara_part_manager        /_SAMPLE.ks"]
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


