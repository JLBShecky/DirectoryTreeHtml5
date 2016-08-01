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

function readDirectory(startItem, callback) {
  var files = [];
  var activeDirectories = 0;
  
  var tmp = document.createElement('div');

  // Handle the start of a directory
  tmp.addEventListener('StartDirectory', function StartDirectory(evt) {
     activeDirectories++;
  });

  // Handle when we finish a directory
  tmp.addEventListener('CompleteDirectory', function CompleteDirectory(evt) {
     if(!--activeDirectories) {
       callback(files);
     }
  });
  
  /*
   * Source: http://stackoverflow.com/questions/3590058/does-html5-allow-drag-drop-upload-of-folders-or-a-folder-tree
   */
  function traverseFileTree(item, path) {
    path = path || "";
    if (item.isFile) {
      // Get file
      item.file(function (file) {
        if (/\.xml|preview\.png$/i.test(file.name)) {
          files.push({ "path": path + file.name, "handel": file })
        }
      });
    } else if (item.isDirectory) {
      tmp.dispatchEvent(new Event('StartDirectory'));
      
      // Get folder contents
      var dirReader = item.createReader();
      dirReader.readEntries(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          traverseFileTree(entries[i], path + item.name + "/");
        }
        
        tmp.dispatchEvent(new Event('CompleteDirectory'));
      }, function (err) {
        console.log(err);
      });
    }
  }
  
  // Initialize
  traverseFileTree(startItem);
}

//
var evt_StartDirectory = new Event('StartDirectory');
var evt_CompleteDirectory = new Event('CompleteDirectory');