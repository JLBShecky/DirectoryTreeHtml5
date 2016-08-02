$(function f() {
  //Allow dropping
  var target = document.getElementById("box_Tree");
  target.addEventListener("dragover", function (evt) {
    evt.dataTransfer.dropEffect = "copy";
    evt.preventDefault();
  });

  target.addEventListener("dragenter", function (evt) {
    evt.dataTransfer.dropEffect = "copy";
    evt.preventDefault();
  });

  target.addEventListener("drop", function (evt) {
    evt.preventDefault();
    
    $(this).empty().append($("<ul>"));
    var matches = [];
    var modDirs = [];
    var modDetector = /\/about\/about\.xml$/i;
    var modDirFiles = {};
    var mods = {};
    var toLoadCnt = 0;

    function modLoadedCallback(modPath) {
      if (!--toLoadCnt) {
        var container = $('#box_Tree>ul');

        for (var id in mods) {
          container.append(mods[id].getTree());
        }
      }
    }

    function callback(data) {
      matches = matches.concat(data);
      if (!--cnt) {
        // Sort the results
        matches.sort(function (a, b) {
          if (a.path < b.path) {
            return -1;
          } else if (a.path > b.path) {
            return 1;
          }

          return 0;
        });

        // Find the mod about files to detect loaded mods
        matches.forEach(function (elm) {
          if (modDetector.test(elm.path)) {
            var dir = elm.path.replace(modDetector, "");
            //$('#box_Tree').append("<div>Mod At: " + dir + "</div>\n");
            modDirs.push({
              "reg": new RegExp("^" + dir),
              "path": dir
            });

            // Create the handler
            modDirFiles[dir] = [];

            // Keep track of how many mods need loaded
            toLoadCnt++;
          }
        });

        // Group the files
        matches.forEach(function (elm) {
          for (var id = 0; id < modDirs.length; id++) {
            if (modDirs[id].reg.test(elm.path)) {
              elm.path = elm.path.replace(modDirs[id].path + "/", "");
              modDirFiles[modDirs[id].path].push(elm);
              break;
            }
          }
        });

        for (var i in modDirFiles) {
          mods[i] = new Mod(modDirFiles[i], i, modLoadedCallback);
        }

        console.log('Hit', mods);
        globalMods = mods;
        globalModFiles = modDirFiles;
      }
    }

    var items = evt.dataTransfer.items;
    var cnt = items.length;
    for (var i = 0; i < items.length; i++) {
      // webkitGetAsEntry is where the magic happens
      var item = items[i].webkitGetAsEntry();
      if (item) {
        readDirectory(item, callback);
      }
    }
  });
});

var x2js = new X2JS();

var globalModFiles;
var globalMods;