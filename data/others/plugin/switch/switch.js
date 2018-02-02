tyrano.plugin.kag.stat.stack["switch"] = [];
tyrano.plugin.kag.tag["switch"] = {
    
    vital: [
      "exp"
    ],
    
    pm: {
        exp: "",
        deep: "0"
    },
    
    start: function (pm) {
        var stk = {
            exp: pm.exp,
            deep: pm.deep,
            is_passed: false
        };
        this.kag.pushStack("switch", stk);
        this.kag.ftag.nextOrder();
    }

};

tyrano.plugin.kag.tag["case"] = {
    
    pm: {
        is: ""
    },
    
    start: function (pm) {
        
        var stk = this.kag.getStack("switch");
        var i, tag, the_deep;
      	if (stk.is_passed) {
            for (i = 0; i < 2000; i++) {
                this.kag.ftag.current_order_index++;
                tag = this.kag.ftag.array_tag[this.kag.ftag.current_order_index];
                if (tag.name == "endswitch") {
                    the_deep = tag.pm.deep || "0";
                    if (the_deep == stk.deep) {
                        this.kag.ftag.current_order_index--;
                        break;
                    }
                    if (i > 1900) {
                        alert("[endswitch]が見つかりませんでした。");
                        break;
                    }
                }
            }
            this.kag.ftag.nextOrder();
            return;
        }
        var exp = this.kag.embScript(stk.exp);
        var a, b, is_pass = false;
        char_pos = pm.is.indexOf("~");
        if (pm.is === "") {
            is_pass = true;
        }
        else if (char_pos < 0) {
            is_pass = exp == pm.is;
        }
        else if (char_pos === 0) {
            b = pm.is.slice(1);
            is_pass = exp <= b;
        }
        else if (char_pos + 1 == pm.is.length) {
            a = pm.is.slice(0, char_pos);
            is_pass = a <= exp;
        }
        else {
            a = pm.is.slice(0, char_pos);
            b = pm.is.slice(char_pos + 1);
            is_pass = a <= exp && exp <= b;
        }
  	    console.log([exp, a, b]);
        if (is_pass) {
            stk.is_passed = true;
            this.kag.setStack("switch", stk);
            this.kag.ftag.nextOrder();
        }
        else {
            for (i = 0; i < 2000; i++) {
                this.kag.ftag.current_order_index++;
                tag = this.kag.ftag.array_tag[this.kag.ftag.current_order_index];
                if (tag.name == "case" || tag.name == "endswitch") {
                    the_deep = tag.pm.deep || "0";
                    if (the_deep == stk.deep) {
                        this.kag.ftag.current_order_index--;
                        break;
                    }
                    if (i > 1900) {
                        alert("[case]または[endswitch]が見つかりませんでした。");
                        break;
                    }
                }
            }
            this.kag.ftag.nextOrder();
        }
        
    }

};

tyrano.plugin.kag.tag.endswitch = {
    
    pm: {
        deep: "0"
    },
    
    start: function (pm) {
        this.kag.popStack("switch");
        this.kag.ftag.nextOrder();
    }

};

(function(tag_names){
    for (var tag_name, i = 0; i < tag_names.length; i++) {
        tag_name = tag_names[i];
        tyrano.plugin.kag.ftag.master_tag[tag_name] = object(tyrano.plugin.kag.tag[tag_name]);
        tyrano.plugin.kag.ftag.master_tag[tag_name].kag = TYRANO.kag;
    }
}(["switch", "case", "endswitch"]));

TYRANO.kag.ftag.master_tag.clearstack.start = function (pm) {
    if (pm.stack == "") {
        for (var key in this.kag.stat.stack) {
            this.kag.stat.stack[key] = [];
        }
    } else {
        this.kag.stat.stack[pm.stack] = [];
    }
    this.kag.ftag.nextOrder();
};