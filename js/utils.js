/*
 * A bunch of utility functions most of which I did not create, and did my best to document their sources
 */


/* 
 * Source: http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
 */
// Returns true if it is a DOM node
function isNode(o) {
  return (typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string");
}

/* 
 * Source: http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
 */
// Returns true if it is a DOM element    
function isElement(o) {
  return (typeof HTMLElement === "object" ? o instanceof HTMLElement : o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string");
}

// Template Exception for if an object was attempted to be constructed and it received invalid paramaters
function InvalidArgumentException(message) {
  this.message = message;
  this.name = "InvalidArgumentException";
}


/*
 * Source: http://stackoverflow.com/questions/3590058/does-html5-allow-drag-drop-upload-of-folders-or-a-folder-tree
 */
function traverseFileTree(item, path) {
  path = path || "";
  if (item.isFile) {
    // Get file
    item.file(function (file) {
      console.log("File:", path + file.name);
    });
  } else if (item.isDirectory) {
    // Get folder contents
    var dirReader = item.createReader();
    dirReader.readEntries(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        traverseFileTree(entries[i], path + item.name + "/");
      }
    }, function (err) {
      console.log(err);
    });
  }
}