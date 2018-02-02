ace.define("ace/theme/kag-dark",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-kag-dark";
var cssTextData = ".ace-kag-dark .ace_gutter {\
background: #25282c;\
color: #C5C8C6\
}\
.ace-kag-dark .ace_print-margin {\
width: 1px;\
background: #25282c\
}\
.ace-kag-dark {\
background-color: #1D1F21;\
color: #C5C8C6\
}\
.ace-kag-dark .ace_cursor {\
color: #AEAFAD\
}\
.ace-kag-dark .ace_marker-layer .ace_selection {\
background: #373B41\
}\
.ace-kag-dark.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #1D1F21;\
}\
.ace-kag-dark .ace_marker-layer .ace_step {\
background: rgb(102, 82, 0)\
}\
.ace-kag-dark .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #4B4E55\
}\
.ace-kag-dark .ace_marker-layer .ace_active-line {\
background: #282A2E\
}\
.ace-kag-dark .ace_gutter-active-line {\
background-color: #282A2E\
}\
.ace-kag-dark .ace_marker-layer .ace_selected-word {\
border: 1px solid #373B41\
}\
.ace-kag-dark .ace_invisible {\
color: #4B4E55\
}\
.ace-kag-dark .ace_keyword,\
.ace-kag-dark .ace_meta,\
.ace-kag-dark .ace_storage,\
.ace-kag-dark .ace_storage.ace_type,\
.ace-kag-dark .ace_support.ace_type {\
color: #B294BB\
}\
.ace-kag-dark .ace_keyword.ace_operator {\
color: #8ABEB7\
}\
.ace-kag-dark .ace_constant.ace_character,\
.ace-kag-dark .ace_constant.ace_language,\
.ace-kag-dark .ace_constant.ace_numeric,\
.ace-kag-dark .ace_keyword.ace_other.ace_unit,\
.ace-kag-dark .ace_support.ace_constant,\
.ace-kag-dark .ace_variable.ace_parameter {\
color: #DE935F\
}\
.ace-kag-dark .ace_constant.ace_other {\
color: #CED1CF\
}\
.ace-kag-dark .ace_invalid {\
color: #CED2CF;\
background-color: #DF5F5F\
}\
.ace-kag-dark .ace_invalid.ace_deprecated {\
color: #CED2CF;\
background-color: #B798BF\
}\
.ace-kag-dark .ace_fold {\
background-color: #81A2BE;\
border-color: #C5C8C6\
}\
.ace-kag-dark .ace_entity.ace_name.ace_function,\
.ace-kag-dark .ace_support.ace_function,\
.ace-kag-dark .ace_variable {\
color: #81A2BE\
}\
.ace-kag-dark .ace_support.ace_class,\
.ace-kag-dark .ace_support.ace_type {\
color: #F0C674\
}\
.ace-kag-dark .ace_heading,\
.ace-kag-dark .ace_markup.ace_heading,\
.ace-kag-dark .ace_string {\
color: #B5BD68\
}\
.ace-kag-dark .ace_entity.ace_name.ace_tag,\
.ace-kag-dark .ace_entity.ace_other.ace_attribute-name,\
.ace-kag-dark .ace_meta.ace_tag,\
.ace-kag-dark .ace_string.ace_regexp,\
.ace-kag-dark .ace_variable {\
color: #CC6666\
}\
.ace-kag-dark .ace_comment {\
color: #969896\
}\
.ace-kag-dark .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYHB3d/8PAAOIAdULw8qMAAAAAElFTkSuQmCC) right repeat-y\
}";

// KAG用のシンタックス
cssTextData += "\
.ace-kag-dark .ace_kag {\
color: #C5C8C6\
}\
.ace-kag-dark .ace_kag.ace_comment {\
color: #969896\
}\
.ace-kag-dark .ace_kag.ace_tag.ace_name {\
color: #81A2BE\
}\
.ace-kag-dark .ace_kag.ace_tag.ace_parameter {\
font-style:italic;\
color: #DE935F\
}\
.ace-kag-dark .ace_kag.ace_tag.ace_value {\
color: #B5BD68\
}\
.ace-kag-dark .ace_kag.ace_label.ace_key {\
font-style:italic;\
color: #00a320;\
}\
.ace-kag-dark .ace_kag.ace_label.ace_value {\
color: #00BC93;\
}\
";

exports.cssText = cssTextData;

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
