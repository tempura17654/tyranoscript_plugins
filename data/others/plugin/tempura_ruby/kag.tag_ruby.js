(function ($, TYRANO, mp) {

var newtag = {};


newtag.rubydic = {
    vital: ["str", "text"],
    pm: {
        str: "",
        text: ""
    },
    start: function (pm) {
        this.kag.stat.ruby_dic[pm.str] = {
            ruby: pm.text,
            count: 0
        }
        this.kag.ftag.nextOrder();
    }
}

newtag.rubyconfig = {
    start: function (pm) {
        var val;
        this.kag.ruby.updateConfig(pm);
        this.kag.ftag.nextOrder();
    }
}

for (var key in newtag) {
    newtag[key].kag = TYRANO.kag;
    TYRANO.kag.ftag.master_tag[key] = newtag[key];
}

}(window.jQuery, window.TYRANO, window.TYRANO.kag.stat.mp));