function DirectoryTree(target) {
  // Make sure that the arguments are correct
  if (typeof target == "string") {
    target = document.getElementById(target);
  }

  if (!isElement(target)) {
    throw new InvalidArgumentException("You mast pass a valid HTMLElement.");
  }

  // Private data
  var fileTree = null;
  var renderTarget = target;

  // Methods
  function refresh() {
    if (!fileTree || !isElement(renderTarget)) {
      console.log('Either the file tree or the target element are not valid.');
    }
  }

  // Public setters
  Object.defineProperty(this, "renderTarget", {
    get: function () { return renderTarget },
    set: function (target) {
      if (isElement(target)) {
        renderTarget = target;

        // TODO: Render
      } else if (target = document.getElementById(target)) {
        renderTarget = target;

        // TODO: Render
      }
    }
  });

  Object.defineProperty(this, "fileTree", {
    get: function () { return fileTree },
    set: function (newTree) {
      if (window.DataTransferItemList && newTree instanceof DataTransferItemList) {
        fileTree = newTree;

        // TODO: Render
      }
    }
  });

  Object.defineProperty(this, "refresh", {
    value: refresh,
    writable: false,
    enumerable: true,
    configurable: false
  });
}

//