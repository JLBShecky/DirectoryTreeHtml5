$(function f() {
  //Allow dropping
  var target = document.getElementById("html5tree");
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

    var items = evt.dataTransfer.items;
    for (var i = 0; i < items.length; i++) {
      // webkitGetAsEntry is where the magic happens
      var item = items[i].webkitGetAsEntry();
      if (item) {
        traverseFileTree(item);
      }
    }
  });
});