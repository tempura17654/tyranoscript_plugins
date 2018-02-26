(function ($, TYRANO, mp) {

if ($(".chara_part_form").length > 0) {
    $(".chara_part_form").remove();
}

mp.color   = mp.color   || "white";
mp.scale   = mp.scale   || "1";
mp.newline = mp.newline || "true";
mp.color = mp.color === "white" ? 0 : 1;


var j_form;
var highlightRange = {};
var undoStack = [];
var redoStack = [];
var checkedObject = {}; // チェックボックスのpropを格納しておく
var nextOrderPost = 0;  // nextOrderの猶予

//# prependFunc
var prependFunc = function (parentObject, propertyName, newFunction) {
    var oldFunction = parentObject[propertyName];
    parentObject[propertyName] = function () {
        newFunction.apply(parentObject, arguments);
        oldFunction.apply(parentObject, arguments);
    };
};

//# appendFunc
var appendFunc = function (parentObject, propertyName, newFunction) {
    var oldFunction = parentObject[propertyName];
    parentObject[propertyName] = function () {
        oldFunction.apply(parentObject, arguments);
        newFunction.apply(parentObject, arguments);
    };
};

var getTimeStr = function () {
    var now = new Date();
    var s0 = now.getFullYear();
    var s1 = ("00"+(now.getMonth()+1)).slice(-2);
    var s2 = ("00"+now.getDate()).slice(-2);
    var s3 = ("00"+now.getHours()).slice(-2);
    var s4 = ("00"+now.getMinutes()).slice(-2);
    var s5 = ("00"+now.getSeconds()).slice(-2);
    return "-" + s0 + s1 + s2 + "-" + s3 + s4 + s5;
};

prependFunc(TYRANO.kag, "loadScenario", function (file_name, call_back) {
    this.stat.current_scenario = file_name;
    j_form.setScenarioText();
});


prependFunc(TYRANO.kag.ftag, "nextOrder", function () {
    j_form.highlightCurrentLine(1);
});

//# execCopy
// クリップボードにコピー
var execCopy = function (string) {
    if (mp.newline == "true") string += "\n\n";
    var temp = document.createElement("div");
    temp.appendChild(document.createElement("pre")).textContent = string;
    var s = temp.style;
    s.position = "fixed";
    s.left = "-100%";
    document.body.appendChild(temp);
    document.getSelection().selectAllChildren(temp);
    var result = document.execCommand("copy");
    document.body.removeChild(temp);
    return result;
};

//# createForm
// フォームエレメントを作って返す
// この関数は1度だけ呼び出される
var createForm = function () {
    j_form = $('<form class="inserter_form" />');
    j_form.append('<div class="inserter_icon"></div>');
    j_form.append('<div class="inserter_close">×</div>');
    j_form.append('<div class="inserter_wrapper" />');
      var j_wrapper = j_form.find(".inserter_wrapper");
      j_wrapper.append('<div class="inserter_bar">シナリオビューワ</div>');
      j_wrapper.append('<div class="inserter_button" />');
      j_wrapper.append('<div id="scenario_viewer" class="inserter_content" />');
        var j_button = j_form.find(".inserter_button");
        j_button.append('<input type="text" id="insert_text"></input><button type="button" class="inserter_button_copy" style="width: 40px">挿入</button><br>');
        j_button.append('<button type="button" class="inserter_button_copy">再起動</button>');
        j_button.append('<button type="button" class="inserter_button_assave">新規保存</button>');
        j_button.append('<button type="button" class="inserter_button_save">上書保存</button>');
        j_button.append('<button type="button" class="inserter_button_undo">アンドゥ</button>');
        j_button.append('<button type="button" class="inserter_button_redo">リドゥ</button>');
    var j_bar = j_form.find(".inserter_bar");
    var j_icon = j_form.find(".inserter_icon");
    var j_close = j_form.find(".inserter_close");
    var j_viewer = j_form.find("#scenario_viewer");
    var j_input = j_form.find("#insert_text");
    
    j_button.find(".inserter_button_save").on("click", function () {
        if (! $.isNWJS()) {
        }
        else {
            var name = TYRANO.kag.stat.current_scenario;
            var content = j_form.editor.getValue();
            var filename = location.href.split("/").pop();
            var path = location.href.replace(/^file:\/+/, "").replace(filename, "") + "data/scenario/";
            $.confirm(path + "<br><span class='insert_save_confirm'>" + name + "</span>に上書きします。よろしいですか？", function () {
                path += name;
                var fs = require("fs");
                fs.readFile(path, "utf-8", function (err, data) {
                    if (!err && data) {
                        var backup_name = getTimeStr() + ".bak";
                        var backup_path = path.replace(".ks", backup_name);
                        fs.writeFile(backup_path, data, function (err) {
                            if (! err) {
                                fs.writeFile(path, content, function (err) {
                                    if (! err) {
                                        $.inform("上書きに成功しました。")
                                    }
                                    // C:/hoge/fuga/../piyo/fuga.txt -> C:\hoge\piyo\fuga.txt
                                    var parsePath = function (path) {
                                        path = path.replace(/\//g, "\\");
                                        var arr = path.split("\\");
                                        var newarr = [];
                                        for (var i = 0; i < arr.length; i++) {
                                            if (arr[i] !== "..") {
                                                newarr.push(arr[i]);
                                            }
                                            else {
                                                newarr.pop();
                                            }
                                        };
                                        var ret = newarr.join("\\");
                                        return ret;
                                    };
                                    var _path = parsePath(path);
                                    require("nw.gui").Shell.showItemInFolder(_path);
                                });
                            }
                        });
                    }
                });
            });
        }
    });
    
    j_button.find(".inserter_button_assave").on("click", function () {
        var name = TYRANO.kag.stat.current_scenario.split("/").pop();
        var content = j_form.editor.getValue();
        if ($.isNWJS()) {
            var j_dialog = $('<input nwsaveas="' + name + '" type="file" style="position: fixed; left: 100%; top: 100%; display: block;"></input>');
            j_dialog.appendTo("body");
            j_dialog.unbind("change");
            j_dialog.change(function () {
                var path = $(this).val();
                require("fs").writeFileSync(path, content);
                $(this).remove();
            });
            j_dialog.trigger("click");
        }
        else {
            var type = "text/plain";
            var blob = new Blob([content], {type: type});
            if (window.navigator.msSaveBlob) { 
                window.navigator.msSaveBlob(blob, name);
            }
            else {
                var a = document.createElement("a");
                a.download = filename;
                a.href = window.URL.createObjectURL(blob);
                a.click();
            }
        }
    });
    
    //## ボタン:挿入
    j_button.find(".inserter_button_copy").on("click", function () {
        var text = j_input.val();
        if (! text) {
            return;
        }
        else {
            redoStack = [];
            j_input.val("");
            j_form.insertWithButton(text);
        }
        j_form.highlightCurrentLine();
    });
    
    //## ボタン:アンドゥ
    j_form.find(".inserter_button_undo").on("click", function (e) {
        j_form.editor.undo();
        var inserted = undoStack.pop();
        if (inserted) {
            for (var i = inserted.index; i < TYRANO.kag.ftag.array_tag.length; i++) {
                TYRANO.kag.ftag.array_tag[i].line--;
            }
            redoStack.push(inserted);
        }
        j_form.highlightCurrentLine();
    });
    
    //## ボタン:リドゥ
    j_form.find(".inserter_button_redo").on("click", function (e) {
        j_form.editor.redo();
        var inserted = redoStack.pop();
        if (inserted) {
            for (var i = inserted.index; i < TYRANO.kag.ftag.array_tag.length; i++) {
                TYRANO.kag.ftag.array_tag[i].line++;
            }
            undoStack.push(inserted);
        }
        j_form.highlightCurrentLine();
    });
    
    //## ボタン:閉じる
    j_close.on("click", function (e) {
        j_close.hide();
        j_wrapper.hide();
    });
    
    //## ボタン:開く
    j_icon.on("click", function (e) {
        j_close.show();
        j_wrapper.show();
    });
    
    //## j_form.highlightCurrentLine
    j_form.highlightCurrentLine = function (adjust) {
        adjust = adjust || 0;
        var tag = $.cloneObject(TYRANO.kag.ftag.array_tag[TYRANO.kag.ftag.current_order_index + adjust]);
        if (tag) {
            var line = tag.line;
            j_form.editor.getSession().removeMarker(highlightRange.id);
            if (line >= 0) {
                if (line >= 0) {
                    highlightRange = j_form.editor.getSession().highlightLines(line, line, "ace_line_current");
                    j_form.editor.gotoLine(line + 1);
                }
            }
        }
    };

    //## j_form.setStyle
    j_form.setStyle = function () {
        j_form.css("transform", "scale("+mp.scale+")");
        j_form.css("filter", "invert("+mp.color+")");
        j_form.css("-webkit-filter", "invert("+mp.color+")");
        return j_form;
    };
    
    //## j_form.getScenarioPath
    j_form.getScenarioPath = function () {
       var path = TYRANO.kag.stat.current_scenario;
       if (! $.isHTTP(path)) {
          path = "./data/scenario/" + path;
       }
       return path;
    };
    
    //## j_form.setScenarioText
    j_form.setScenarioText = function () {
        var path = j_form.getScenarioPath();
        $.loadText(path, function (scenario) {
            j_form.editor.setValue(scenario);
            j_form.editor.gotoLine(0);
            setTimeout(function () {
                j_form.editor.getSession().getUndoManager().reset();
            },10);
        })
    }
    
    //## j_form.setEditor
    j_form.setEditor = function () {
        j_form.editor = ace.edit("scenario_viewer");
        j_form.j_marker = j_viewer.find(".ace_marker-layer").first();
        j_form.j_gutter = j_viewer.find(".ace_gutter").first();
        j_form.editor.setReadOnly(true);
        j_form.editor.setShowPrintMargin(false);
        //editor.setTheme("ace/theme/monokai");
        //editor.setFontSize(14);
        //editor.setPrintMarginColumn(1000);
        ///editor.getSession().setMode("ace/mode/javascript");
        //editor.getSession().setTabSize(2);
        return j_form;
    };
    
    //## j_form.insertWithButton
    j_form.insertWithButton = function (text) {
        var tag = $.cloneObject(TYRANO.kag.ftag.array_tag[TYRANO.kag.ftag.current_order_index]);
        if (tag) {
            var line = tag.line;
            if (line >= 0) {
                text += "\n";
                var param = {
                    row: line + 1,
                    column: 0,
                    index: TYRANO.kag.ftag.current_order_index,
                    text: text
                };
                j_form.insert(param);
            }
        }
    };
    
    //## j_form.insert
    j_form.insert = function (param) {
        for (var i = param.index; i < TYRANO.kag.ftag.array_tag.length; i++) {
            TYRANO.kag.ftag.array_tag[i].line++;
        }
        j_form.editor.getSession().insert(param, param.text);
        j_form.editor.gotoLine(param.row + 1);
        undoStack.push(param);
    };
    
    //## j_form.setDraggable
    j_form.setDraggable = function () {
        // ドラッグできるようにする
        j_form.draggable({
            distance: 10,
            handle: ".inserter_bar,.inserter_icon"
        });
        $("body").attr("ondragstart", "");
        $("#tyrano_base").css("position", "absolute");
        
        

var thElm;
var startOffsetX = -1;
var startOffsetY = -1;
j_form.each(function () {
    var that = j_form.find("#scenario_viewer").get(0);
    
    var j_grip_horizontal = $("<div class='form_glip form_glip_horizontal'></div>");
    j_grip_horizontal.on("mousedown", function (e) {
        thElm = that;
        startOffsetX = e.pageX;
    });
    j_form.append(j_grip_horizontal);
    
    var j_grip_vertical = $("<div class='form_glip form_glip_vertical'></div>");
    j_grip_vertical.on("mousedown", function (e) {
        thElm = that;
        startOffsetY = e.pageY;
    });
    j_form.append(j_grip_vertical);
});

$(document).on("mousemove", function (e) {
    if (thElm) {
        var css = {};
        if (startOffsetX > -1) {
            css.width  = "+=" + (- startOffsetX + e.pageX);
            startOffsetX = e.pageX;
        }
        if (startOffsetY > -1) {
            css.height = "+=" + (- startOffsetY + e.pageY);
            startOffsetY = e.pageY;
        }
        $(thElm).css(css);
    }
});

$(document).on("mouseup", function (e) {
    thElm = undefined;
    startOffsetX = -1;
    startOffsetY = -1;
    j_form.editor.resize();
});
        
        
        
        
        return j_form;
    };
    
    //## j_form.onscroll
    // このエレメント上でのスクロールをバブリングさせない
    j_form.onscroll(function (e) {
        e.stopPropagation();
    }, function (e) {
        e.stopPropagation();
    }).on("keydown", function (e) {
        e.stopPropagation();
    }).on("mousedown", function (e) {
        e.stopPropagation();
    });
    
    return j_form;
};

//# $.fn.onscroll
// スクロールにハンドラ割り当て
$.fn.onscroll = function (cb_up, cb_down) {
    var $this = $(this);
    var scroll = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    $this.on(scroll, function (e) {
        var delta = e.originalEvent.deltaY     ? - (e.originalEvent.deltaY    ):
                    e.originalEvent.wheelDelta ?   (e.originalEvent.wheelDelta):
                                                 - (e.originalEvent.detail    );
        if (delta < 0) cb_down(e);
        else cb_up(e);
    });
    return $this;
};

//# cssload初期化
TYRANO.kag.stat.cssload = {};

//# create
j_form = createForm();
j_form.appendTo("body");
j_form.setStyle().setEditor().setDraggable();
}(window.jQuery, window.TYRANO, window.TYRANO.kag.stat.mp));