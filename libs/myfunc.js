window.URL1 = "http://tempura.html.xdomain.jp/tyranoscript/";
window.URL2 = "http://tempura.php.xdomain.jp/tyrano_editor/";

// encodeLimit() -> String hash
window.encodeLimit = function () {
  var upper_arr = {
    "1": "",
    "2": "",
    "4": "",
    "7": "",
    "8": "",
    "9": "",
    "13": "",
    "18": "",
    "19": "",
    "21": ""
  };
  var hash = "";
  var limit = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
  var limit_str = "" + limit;
  limit_str = limit_str.slice(2);
  for (var i = limit_str.length - 1; i >= 0; i--) {
    var c = limit_str.charAt(i);
    var idx = 97 + parseInt(c) + i;
    var e = String.fromCharCode(idx);
    if (upper_arr[i] === "") {
       e = e.toUpperCase();
    }
    hash += e;
  }
  return hash;
};

// decodeLimit (String hash) -> Number limit
window.decodeLimit = function (hash) {
  var upper_arr = {
    "1": "",
    "2": "",
    "4": "",
    "7": "",
    "8": "",
    "9": "",
    "13": "",
    "18": "",
    "19": "",
    "21": ""
  };
  var limit;
  var limit_str = "";
  for (var i = 0; i < hash.length; i++) {
    var i2 = hash.length - i - 1;
    var e = hash.charAt(i);
    if (upper_arr[i2] === "") {
       e = e.toLowerCase();
    }
    var idx = e.charCodeAt() - i2 - 97;
    limit_str = idx + limit_str;
  };
  limit = parseInt(limit_str);
  return limit;
}

// checkLimit (Number limit) -> Boolean intime
window.checkLimit = function (limit) {
  var now = new Date().getTime();
  var now_str = "" + now;
  now = parseInt(now_str.slice(2));
  var intime = now < limit;
  return intime;
};

// getFile (opt)
// opt.fileName
//    .success
//    .error
window.getFile = function (opt) {
  var that = this;
  $.ajax({
    "url": URL2 + "_get.php",
    "data": {
        "fileName": opt.fileName
    }
  }).done(function (data, textStatus, jqXHR) {
    if (typeof data === "string") data = unescape(data);
    if (opt.success) opt.success(data);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    if (opt.error) opt.error();
  });
};

// putFile (opt)
// opt.fileName
//    .contents
//    .success
//    .error
window.putFile = function (opt) {
  var that = this;
  $.ajax({
    "url": URL2 + "_put.php",
    "data": {
        "fileName": opt.fileName,
        "contents": escape(JSON.stringify(opt.contents))
    },
    beforeSend : function (xhr) {
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    }
  }).done(function (echo, textStatus, jqXHR) {
      if (opt.success) opt.success();
  }).fail(function (jqXHR, textStatus, errorThrown) {
      if (opt.error) opt.error();
  });
};

// execCopy (String string) -> Boolean copied
window.execCopy = function (string) {
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
}

window.reset = function(){
    child.location.reload();
};

window.quickReset = function(){
    child.TYRANO.kag.stat.is_strong_stop = false;
    child.TYRANO.kag.menu.loadGameData($.extend(true, {}, parent.startSnap), {"bgm_over": "false", "auto_next": "yes"});
};

window.share = function(){
  alertify.confirm("このスクリプトをシェアしますか？", function(){
    var value = editor.getValue();
    if (value.length < 10000) {
      var hash = encodeLimit();
      putFile({
        "fileName": hash,
        "contents": value,
        "success": function () {
          setTimeout(function(){
            var url = URL1 + "editor.html?share=";
            url += hash;
            url_html = "<span id=\"share_url\">" + url + "</span>";
            var str = "共有用のURLは以下の通りです。期限は1週間です。<br>";
            str += url_html;
            alertify.alert(str, function(){
              if (execCopy(url)) {
                setTimeout(function(){
                  alertify.alert("クリップボードに共有URLをコピーしました。", function(){return true;});
                }, 200);
              }
            });
            var count = 0;
            var timer;
            var select = function () {
              timer = setTimeout(select, 100);
              var selection = getSelection();
              var is_selected = selection && selection.focusNode && selection.focusNode.id == "share_url";
              if (is_selected || count > 20) {
                clearTimeout(timer);
              }
              var element = document.getElementById("share_url");
              if (element) {
                var element = document.getElementById("share_url");
                var range = document.createRange();
                range.selectNodeContents(element);
                var selection = getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              count++;
            };
            select();
          }, 200);
        },
        "error": function () {
          var str = "なんか失敗しました(´･ω･`)ごめんなさい。。。";
          alertify.alert(str);
        }
      });
    }
    else {
      alertify.alert("10000文字を超える文章はシェアできないのです(´･ω･`)すみません。。。");
    }
    return;
  }, function(){return true;});
};


window.setStorage = function (key, val) {
    val = JSON.stringify(val);
    localStorage.setItem(key, escape(val));
};

window.getStorage = function (key) {
    try {
        var gv = "null";
        if (localStorage.getItem(key)) {
            gv = unescape(localStorage.getItem(key));
        }
        if (gv == "null") {
            return null;
        }
    } catch (e) {
        alert("この環境はセーブ機能を利用できません。ローカルで実行している場合などに発生します");
        $.confirmSaveClear();
    }
    return gv;
};

window.afterLoadingTyrano = function () {
  var timer;
  var thElm;
  var startOffset;
  $("#preview_area_header").each(function () {
    var that = this;
    var j_this = $(this);
    j_this.css("position", "relative");
    var j_grip = $("<div> </div>")
    j_grip.css({
      "top": 0,
      "right": 0,
      "bottom": 0,
      "width": 5,
      "position": "absolute",
      "cursor": "col-resize",
      "border-left": "1px solid #595959",
      "border-right": "1px solid #595959",
      "z-index": 99999999
    });
    j_grip.on("mousedown", function (e) {
      thElm = that;
      startOffset = that.offsetWidth - e.pageX;
    });
    j_this.append(j_grip);
  });
  
  var $window1 = $(window);
  var $window2 = $("#preview_frame").contents();
  
  $window1.on("mousemove", function (e) {
    if (thElm) {
      $(thElm).css("width", startOffset + e.pageX);
      clearTimeout(timer);
      timer = setTimeout(function() {
        onResize();
      }, 50);
    }
  });
  
  $window1.add($window2).on("mouseup", function (e) {
    thElm = undefined;
  });
  
  $window1.add($window2).on("keydown", function (e) {
  	if (e.keyCode == 116) {
  		quickReset();
  		e.keyCode = null;
  		return false;
  	}
  });
};

// After loading
$(function(){
  
  window.parent = window;
  window.child = document.getElementById("preview_frame").contentWindow;
  window.aspectRate = 2 / 3;
  
  // create editor
  window.editor = ace.edit("editor");
  
  // option
  editor.setTheme("ace/theme/monokai");
  editor.setFontSize(14);
  editor.getSession().setMode("ace/mode/html");
  editor.getSession().setUseWrapMode(false);
  editor.getSession().setTabSize(4);
  editor.container.style.lineHeight = 1.6;
  editor.renderer.updateFontSize();
  
  // syntax highlight
  var KAGMode = ace.require("ace/mode/kag").Mode;
  editor.getSession().setMode(new KAGMode());
  editor.setTheme("ace/theme/kag-dark");
  
  // query
  var storage_url;
  var vars = {}, max = 0, hash = "", array = "";
  var url = window.location.search;
  hash  = url.slice(1).split("&");
  max = hash.length;
  for (var i = 0; i < max; i++) {
    array = hash[i].split("=");
    vars[array[0]] = array[1];
  }
  
  // editor.html?width=...
  if (vars.width && vars.height) {
    aspectRate = parseInt(vars.height) / parseInt(vars.width);
  }
  
  // editor.html?share=...
  if (vars.share) {
    var hash = vars.share;
    var limit = decodeLimit(hash);
    if (true||checkLimit(limit)) {
      getFile({
        "fileName": hash,
        "success": function (text) {
          editor.setValue(eval(text));
          for (var i = 0; i < 999; i++) {
            editor.gotoLine(0);
          }
          setTimeout(function() {
            reset();
          }, 100);
        },
        "error": function () {
          var str = "共有に失敗しました(´･ω･`)無効なリンクです。。。";
          alertify.alert(str);
        }
      });
    }
    else {
      var str = "共有に失敗しました(´･ω･`)期限切れのリンクです。。。";
      alertify.alert(str);
    }
  }
  
  // editor.html?plugin=...
  else if (vars.plugin) {
    storage_url = "./data/others/plugin/" + vars.plugin + "/_SAMPLE.ks";
  }
  
  // editor.html?koneta=...
  else if (vars.koneta) {
    storage_url = "./data/scenario/koneta/" + vars.koneta + ".ks";
  }
  
  // editor.html?storage=...
  else if (vars.storage) {
    storage_url = vars.storage;
    storage_url = decodeURIComponent(storage_url);
  }
  
  // editor.html
  else {
    storage_url = "./libs/first.ks";
  }
  
  // Get storage
  if (storage_url) {
    $.get(storage_url + "?" + Math.floor(Math.random()*1E7), function (text) {
      editor.setValue(text);
      for (var i = 0; i < 999; i++) {
        editor.gotoLine(0);
      }
      setTimeout(function() {
        reset();
      }, 100);
    });
  }
  
  $("#preview_area_header").css({
      "width": 800
  });
  
  var j_preview_area = $("#preview_area");
  var j_preview_frame = $("#preview_frame");
  window.onResize = function (e) {
    var w = j_preview_area.width();
    var h = j_preview_area.height();
    var _h = w * aspectRate;
    if (_h < h) {
        _w = "100%";
        _h += "px";
    }
    else {
        _h = "100%";
        _w = h / aspectRate + "px";
    }
    j_preview_frame.css({
        "height": _h,
        "width": _w
    });
  };
  onResize();
});