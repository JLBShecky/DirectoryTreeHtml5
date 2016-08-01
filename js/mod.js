function Mod(files) {
  var modName = "";
  var modDescription = "";
  var targetVersion = "";
  var webSite = "";
  var modAuthors = "";

  // The Public properties
  Object.defineProperty(this, "modName", {
    get: function () { return modName },
    set: function (name) {
      if (typeof name == "String" && name != "") {
        modName = name;
      }
    }
  });

  Object.defineProperty(this, "modDescription", {
    get: function () { return modDescription },
    set: function (name) {
      if (typeof name == "String" && name != "") {
        modDescription = name;
      }
    }
  });

  Object.defineProperty(this, "targetVersion", {
    get: function () { return targetVersion },
    set: function (name) {
      if (typeof name == "String" && name != "") {
        targetVersion = name;
      }
    }
  });

  Object.defineProperty(this, "webSite", {
    get: function () { return webSite },
    set: function (name) {
      if (typeof name == "String") {
        webSite = name;
      }
    }
  });

  Object.defineProperty(this, "modAuthors", {
    get: function () { return modAuthors },
    set: function (name) {
      if (typeof name == "String" && name != "") {
        modAuthors = name;
      }
    }
  });
}