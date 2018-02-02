$.extend(TYRANO.kag.parser, {
    //v457以前用
    deep_if: 0,
    
    //特殊置換関連==============================================================
    escapeSpecialChar: "^",//特殊文字のエスケープ文字
    specialCharEnd: "",    //行末に追加する文字
    specialChars: [],      //特殊文字置換リスト
    //==========================================================================
    
    //シナリオをオブジェクト化する
    parseScenario:function(text_str){
        
        var array_s = [];
        
        var map_label = {}; //ラベル一覧
        
        var array_row = text_str.split("\n");
        
        var flag_comment = false; //コメント中なら
        
        for(var i=0;i<array_row.length;i++){
            
            var line_str = $.trim(array_row[i]);
            var first_char = line_str.substr(0,1);
            
            if(line_str.indexOf("endscript") !=-1){
                this.flag_script = false;
            }
            
            //コメントの場合は無視する
            if(flag_comment === true && line_str ==="*/"){
                flag_comment = false;
            }else if(line_str==="/*"){
                flag_comment = true;
            }else if(flag_comment == true||first_char ===";"){
                
            }else if(first_char ==="#"){
                
                var tmp_line = $.trim(line_str.replace("#",""));
                var chara_name = "";
                var chara_face = "";
                if(tmp_line.split(":").length > 1){
                    var array_line = tmp_line.split(":");
                    chara_name = array_line[0];
                    chara_face = array_line[1];
                }else{
                    chara_name = tmp_line;
                }
                //キャラクターボックスへの名前表示
               var text_obj = {
                                line:i,
                                name:"chara_ptext",
                                pm:{"name":chara_name,"face":chara_face},
                                val:text
              };
                            
              array_s.push(text_obj);
                            
                
            }else if(first_char ==="*"){
                //ラベル
                
                var label_tmp = line_str.substr(1,line_str.length).split("|");
                
                var label_key = "";
                var label_val = "";
                
                label_key = $.trim(label_tmp[0]);
                
                if(label_tmp.length >1){
                    label_val = $.trim(label_tmp[1]);
                }
                
                 var label_obj = {
                    name:"label",
                    pm:{
                        "line":i,
                        "index":array_s.length,
                        "label_name":label_key,
                        "val":label_val
                    },
                    val:label_val
                 };
                 
                 //ラベル
                 array_s.push(label_obj);
                 
                 if(map_label[label_obj.pm.label_name]){
                    //this.kag.warning("警告:"+i+"行目:"+"ラベル名「"+label_obj.pm.label_name+"」は同一シナリオファイル内に重複しています");    
                    this.kag.warning("Warning line:"+i+" "+ $.lang("label") +"'"+ label_obj.pm.label_name+"'"+ $.lang("label_double"));
                    
                 }else{
                    map_label[label_obj.pm.label_name] = label_obj.pm;
                 }     
            
            }else if(first_char ==="@"){
                //コマンド行確定なので、その残りの部分を、ごそっと回す
                var tag_str =line_str.substr(1,line_str.length); // "image split=2 samba = 5" 
                var tmpobj = this.makeTag(tag_str,i);
                array_s.push(tmpobj);
            }else{
                
                //半角アンダーバーで始まっている場合は空白ではじめる
                if(first_char === "_") {
                    line_str = line_str.substring(1,line_str.length);
                }
                
                var array_char = line_str.split("");
                
                var text = "";//命令じゃない部分はここに配置していく
                
                var tag_str ="";
                
                //１文字づつ解析していく
                var flag_tag = false; //タグ解析中
                
                var num_kakko = 0; //embタグの中の配列[]扱うために
                
                //特殊置換関連=======================================================
                var flag_escape_special  = false; //エスケープ中ならばtrue
                var index_ignore_special =    -1; //indexがこれ以下ならば特殊置換無視
                var flag_replaced_end    = false; //その行において行末置換済ならばtrue
                //===================================================================
                
                for(var j=0;j<array_char.length;j++){
                    var c = array_char[j];
                    
                    if(flag_tag ===true){
                        
                        if(c==="]" && this.flag_script ==false){
                            
                            num_kakko--;
                            
                            if(num_kakko == 0){
                                
                                flag_tag = false;
                                array_s.push(this.makeTag(tag_str,i));
                                //tag_str をビルドして、命令配列に格納
                                tag_str ="";
                                
                            }else{
                                tag_str +=c;
                            }
                        }else if(c ==="[" && this.flag_script == false ){
                            
                            num_kakko++;
                            tag_str +=c;
                            
                        } else{
                            tag_str +=c;
                        }
                        
                    }
                    else if(flag_tag === false && c==="[" && this.flag_script == false){
                        
                        num_kakko++;
                        
                        //テキストファイルを命令に格納
                        if(text!=""){
                            
                            var text_obj = {
                                line:i,
                                name:"text",
                                pm:{"val":text},
                                val:text
                            };
                            
                            array_s.push(text_obj);
                            
                            text ="";
                        }
                        
                        flag_tag = true;
                    
                    }
                    //特殊置換チェック==========================================
                    else if (this.flag_script == false){
                        
                        //エスケープフラグが立っていれば
                        if (flag_escape_special == true) {
                            flag_escape_special = false;
                        }
                        //エスケープ文字にマッチしたら
                        else if (c === this.escapeSpecialChar) {
                            flag_escape_special = true;
                            c = "";
                        }
                        else if (j > index_ignore_special) {
                            for (var k = 0; k < this.specialChars.length; k++) {
                                var special_c = this.specialChars[k];
                                //特殊置換対象文字にマッチしたら
                                if (c === special_c.from) {
                                    var to = special_c.to.split("");
                                    array_char = 
                                        array_char.slice(0, j + 1).concat(
                                        to,
                                        array_char.slice(j + 1, array_char.length));
                                    index_ignore_special = j + to.length;
                                    c = "";
                                    break;
                                };
                            };
                        };
                        // テキスト行末尾の特殊置換チェック
                        if (j + 1 == array_char.length && flag_replaced_end == false && flag_escape_special == false) {
                            flag_replaced_end = true;
                            var to = (c + this.specialCharEnd).split("");
                            array_char = array_char.concat(to);
                            index_ignore_special = j + to.length;
                            c = "";
                        };
                        text += c;
                    //==========================================================
                    }else{
                        text += c;
                    }
                    
                }
                
                if(text !=""){
                    var text_obj = {
                        line:i,
                        name:"text",
                        pm:{"val":text},
                        val:text
                    };
                    
                    array_s.push(text_obj);
                }
                
                //console.log(array_char);
                
            }
            //１行づつ解析解析していく
            
        }
        
        var result_obj = {
            
            array_s:array_s,
            map_label:map_label
            
        };
        
        if (this.deep_if != 0) {
            alert("@ifと@endifの数が一致しません。シナリオを見直してみませんか？");
            this.deep_if = 0;
        }
        
        return result_obj;
        
        
    }
});