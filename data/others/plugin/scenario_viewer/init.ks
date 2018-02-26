@loadcss file=./data/others/plugin/scenario_viewer/scenario_viewer.css
[bg storage=rouka.jpg time=0]
@loadjs storage=plugin/scenario_viewer/scenario_viewer.js
[bg storage=room.jpg time=0]
*wait
@wait time=100
@jump target=wait cond="! TYRANO.Viewer.loaded"
@return