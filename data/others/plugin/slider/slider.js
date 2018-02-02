(function(){

var TYRANO = window.TYRANO;
var $      = window.$;

//;[slider_set]
var slider_set = {
  kag: TYRANO.kag,
  pm: {
    name: "",
    value: ""
  },
  start: function (pm) {
    var j_range = $("." + pm.name);
    j_range.asRange("val", pm.value);
    j_range.trigger("asRange::moveEnd");
  }
};

//;[slider]
var slider = {
  kag: TYRANO.kag,
  pm: {
    x       : "",
    y       : "",
    left    : "",
    top     : "",
    width   : "360",
    height  : "8",
    radius  : "32",
    color   : "",
    min     : "0",
    max     : "100",
    init    : "",
    step    : "1",
    col1    : "0xd3d3d3",
    col2    : "0x02a8e6",
    col3    : "",
    tip     : "false",
    img1    : "",
    img2    : "",
    img3    : "",
    img3_x  : "0",
    img3_y  : "0",
    exp     : "",
    variable: "tf.slider_value",
    storage : "",
    target  : "",
    folder  : "image",
    name    : ""
  },
  start: function (pm) {
    
    var that = this;
    
          var target_layer = this.kag.layer.getFreeLayer();
          target_layer.css("z-index", 999999);
    target_layer.show();
    
    // left->x, top->y
    if (pm.left !== "") pm.x = pm.left;
    if (pm.top !== "") pm.y = pm.top;
    
    // parse
    pm.x = parseFloat(pm.x);
    pm.y = parseFloat(pm.y);
    pm.step = parseFloat(pm.step);
    pm.width = parseFloat(pm.width);
    pm.height = parseFloat(pm.height);
    pm.radius = parseFloat(pm.radius);
    pm.img3_x = parseFloat(pm.img3_x);
    pm.img3_y = parseFloat(pm.img3_y);
    pm.min = parseFloat(pm.min);
    pm.max = parseFloat(pm.max);
    
    // convert
    pm.col1 = $.convertColor(pm.col1);
    pm.col2 = $.convertColor(pm.col2);
    if (pm.col3 !== "") pm.col3 = $.convertColor(pm.col3);
          
    // calculate init value
    if (pm.init === "") pm.init = Math.floor(pm.min + (pm.max - pm.min) * 0.5);
    
    // create jquery object
    var j_range = $("<div>");
    
    // set class name
    $.setName(j_range, pm.name);
    
    // make <asRange>
    j_range.asRange({
      max: pm.max,
      min: pm.min,
      value: pm.init,
      step: pm.step,
      limit: true,
      tip: (pm.tip === "true") ? true : false
    });
    
    // set event
    j_range.on("asRange::moveEnd", function (e) {
      
      // get value
      var value = $(this).asRange("val");
      
      // set value in variable
      var variable = pm.variable;
      var str = variable + " = " + value;
      that.kag.evalScript(str);
      
      // execute exp (if any)
      if (pm.exp !== "") that.kag.embScript(pm.exp);
              
      // execute jump
      if (pm.storage !== "" || pm.target !== "") that.kag.ftag.startTag("jump", pm);
      else that.kag.ftag.nextOrder();
    });
    
    // set css of .asRange
    j_range.css({
      "left": pm.x + "px",
      "top": pm.y + "px",
      "width": pm.width + "px",
      "height": pm.height + "px",
      "border-radius": pm.height + "px",
      "background-color": pm.col1
    });
    
    // set css of .asRange-selected
    j_range.find(".asRange-selected").css({
      "height": pm.height + "px",
      "border-radius": pm.height + "px 4px 4px " + pm.height + "px",
      "background-color": pm.col2
    });
    
    // set css of .asRange-pointer
    j_range.find(".asRange-pointer").css({
      "background-color": (pm.col3 !== "") ? pm.col3 : pm.col2,
      "border-radius": pm.radius + "px",
      "width": pm.radius + "px",
      "height": pm.radius + "px",
      "margin-left": pm.img3_x - pm.radius / 2 + "px",
      "margin-top": pm.img3_y - pm.radius / 2 + pm.height / 2 + "px"
    });
    
    // set image in .asRange (if any)
    if (pm.img1 !== "") {
              var storage_url1 = "";
              if ($.isHTTP(pm.img1)) storage_url1 = pm.img1;
              else storage_url1 = "./data/" + pm.folder + "/" + pm.img1;
      j_range.css({
        "background-color": "initial",
        "border-radius"   : "initial",
        "background-size" : pm.width + "px " + pm.height + "px",
        "background-image": "url(" + storage_url1 + ")"
      });
    }
    
    // set image in .asRange-selected (if any)
    if (pm.img2 !== "") {
              var storage_url2 = "";
              if ($.isHTTP(pm.img2)) storage_url2 = pm.img2;
              else storage_url2 = "./data/" + pm.folder + "/" + pm.img2;
      j_range.find(".asRange-selected").css({
        "background-color": "initial",
        "border-radius"   : "initial",
        "background-size" : pm.width + "px " + pm.height + "px",
        "background-image": "url(" + storage_url2 + ")"
      });
    }
    
    // set image in .asRange-pointer (if any)
    if (pm.img3 !== "") {
              var storage_url3 = "";
              if ($.isHTTP(pm.img3)) storage_url3 = pm.img3;
              else storage_url3 = "./data/" + pm.folder + "/" + pm.img3;
      j_range.find(".asRange-pointer").css({
        "background-color": "initial",
        "border-radius"   : "initial",
        "background-image": "url(" + storage_url3 + ")"
      });
    }
    
    // set css of .asRange-tip
    j_range.find(".asRange-tip").css({
      "margin-left": -19 + pm.radius / 2 + "px",
      "margin-top": -10 + pm.radius / 2 + "px"
    });
    
    // append to free layer
    target_layer.append(j_range);
    
    // end
    this.kag.ftag.nextOrder();
  }
};

// set new tag in master tag
TYRANO.kag.ftag.master_tag.slider     = slider;
TYRANO.kag.ftag.master_tag.slider_set = slider_set;

}());