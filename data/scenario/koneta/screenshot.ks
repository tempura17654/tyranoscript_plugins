[layopt layer=0 visible=true]
[chara_new name=akane jname=あかね storage=chara/akane/normal.png]
[position width=920 height=211 top=371 left=20]
[position page=fore margint=45 marginl=10 marginr=20 marginb=10 vertical=false opacity=180 color=0x000000]
[ptext name=chara_name_area layer=message0 color=0xFFFFFF size=26 x=30 y=381 bold=bold]
[chara_config ptext=chara_name_area]
[bg storage=room.jpg time=150]
[chara_show name=akane time=150]

#akane
クリックするとスクリーンショットを保存するテスト。[l]

[iscript]
TYRANO.kag.menu.snapSave("", function () {
    var name     = "screenshot";
    var date     = $.getNowDate().replace(/\//g, "");
    var time     = $.getNowTime().replace(/:|：/g, "");
    var filename = name + "_" + date + "_" + time + ".jpg";
  	if ($.isNWJS()) {
        var isopen   = false;
        var savedir  = $.getProcessPath();
        var fullpath = savedir + "/" + filename;
    		var img_code = TYRANO.kag.menu.snap.img_data.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    		require("fs").writeFile(fullpath, img_code, "base64", function () {
            if (isopen) {
                var gui = require("nw.gui");
                gui.Shell.showItemInFolder(savedir);
      	    }
    		});
  	}
  	else {
    		var type = "image/jpeg";
    		var bin = atob(TYRANO.kag.menu.snap.img_data.split(",")[1]);
    		var buffer = new Uint8Array(bin.length);
    		for (var i = 0; i < bin.length; i++) {
    			  buffer[i] = bin.charCodeAt(i);
    		}
    		var blob = new Blob([buffer.buffer], {type: type});
    		if (window.navigator.msSaveBlob) { 
    			  window.navigator.msSaveBlob(blob, filename);
    		}
    		else {
      			var a = document.createElement("a");
      			a.download = filename;
      			a.href = window.URL.createObjectURL(blob);
      			a.click();
    		}
  	}
}, "true");
[endscript]
[s]