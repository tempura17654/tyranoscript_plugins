
[iscript]
f.indent_rate = 1;
[endscript]

[iscript]
var text = TYRANO.kag.ftag.master_tag.text;
text.setIndent = function (bool) {
    if (bool) {
        var indent = f.indent_rate * parseInt(this.kag.stat.font.size);
        $(".current_span").parent().css({
            "text-indent" : (- indent) + "px",
            "padding-left": (  indent) + "px"
        });
    }
};
text.showMessage_old = text.showMessage;
text.showMessage = function (message_str, pm) {
    text.showMessage_old(message_str, pm);
    text.setIndent($(".chara_name_area").html() !== "");
};
[endscript]




[layopt layer=0 visible=true]
[chara_new name=akane jname=あかね storage=chara/akane/normal.png]
[position width=920 height=211 top=371 left=20]
[position page=fore margint=45 marginl=10 marginr=20 marginb=10 vertical=false opacity=180 color=0x000000]
[ptext name=chara_name_area layer=message0 color=0xFFFFFF size=26 x=30 y=381 bold=bold]
[chara_config ptext=chara_name_area]
[bg storage=room.jpg time=150]
[chara_show name=akane time=150]

#akane

[font size=24]
「2行以降に自動インデント[r]
テストです。[p]

[font size=12]
「2行以降に自動インデント[r]
テストです。[p]

[font size=48]
「2行以降に自動インデント[r]
テストです。[s]
