TYRANO.kag.ftag.master_tag.camera.start = function (pm) {
        var that = this;
        
        /*
        if(this.kag.config.useCamera == "false"){
            $.alert("[camera]タグエラー。カメラの使用を許可して下さい。Config.tjsのuseCameraをtrueにする必要があります");
            return false;
        }
        */
        
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
        
        var flag_current = true;
        
        if(pm.from_x != "0" || pm.from_y!="0" || pm.from_zoom!="1" || pm.from_rotate!="0" ){
            
            flag_current = false;
            
            this.kag.stat.current_camera[pm.layer] = {
                x : parseInt(pm.from_x)*-1 +"px",
                y : parseInt(pm.from_y)*1+"px",
                scale : pm.from_zoom,
                rotate:pm.from_rotate+"deg"
            };
            
        }
        
        var flag_complete = false;
        that.kag.stat.is_move_camera = true;
        
        var a3d_define = {
            frames : {

                "0%" : {
                    flag_current: flag_current,
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
TYRANO.kag.ftag.master_tag.reset_camera.start = function(pm) {
        var that = this;
        //duration を確認する
        
        if(parseInt(pm.time)<10){
            pm.time=10;
        }
        
        var duration = pm.time + "ms";
        
        var to_scale   = 1;
        
        var to_camera = {
            x:"0px",
            y:"0px",
            scale:"1",
            rotate:"0deg"
        }
        
        var flag_complete = false;
        
        that.kag.stat.is_move_camera = true;
        
        var a3d_define = {
            frames : {

                "0%" : {
                    flag_current: true,
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
                    that.kag.ftag.nextOrder();
                }else{
                    
                    //カメラを待ってる状態なら
                    if(that.kag.stat.is_wait_camera == true){
                        that.kag.stat.is_wait_camera = false;
                        that.kag.ftag.nextOrder();
                    }
                    
                }
                
                //リセットした時は、本当に消す
                $("."+pm.layer).css({
                    "-animation-name":"",
                    "-animation-duration":"",
                    "-animation-play-state":"",
                    "-animation-delay":"",
                    "-animation-iteration-count":"",
                    "-animation-direction": "",
                    "-animation-fill-mode": "",
                    "-animation-timing-function":"",
                    "transform":""
                });
                
                
                that.kag.stat.is_move_camera = false;
                
            }
        };
        
        if(pm.layer!="layer_camera"){
            delete this.kag.stat.current_camera[pm.layer] ;
        }else{
            //全クリア
            this.kag.stat.current_camera = {};
        }
        
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
            this.kag.stat.current_camera_layer = "";
        }
};