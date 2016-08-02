function Mod(files, path, callback) {
  var modName = "";
  var modDescription = "";
  var targetVersion = "";
  var webSite = "";
  var modAuthors = "";

  var filesCnt = 0;

  var previewImage = new Image();
  previewImage.onload = function () {
    evtHandler.dispatchEvent(new Event('ResourceLoaded'));
  }
  previewImage.className = "modPreviewImage";

  var evtHandler = document.createElement("div");
  evtHandler.addEventListener('ResourceLoaded', function StartDirectory(evt) {
    if (!(--filesCnt)) {
      // let the system know that we are done loding this mod
      if (typeof callback == "function") callback(path);
      
      // the li
      var li = $("<li>");
      li.append($("<input>").prop("type", "checkbox").prop("id", "mod_" + modName.replace(/\s/g, "")));
      li.append($("<label>").prop("for", "mod_" + modName.replace(/\s/g, "")).text(modName));
      li.append("<ul>");
      if (previewImage.src) {
        li.append(previewImage);
      }

      //$('#html5tree>ul').append(li);
      console.log("Loaded Mod:", modName);
    }
  });

  function ModException(msg) {
    this.message = msg;
    this.name = "ModException";
  }

  // Load the mod's info from about.xml
  if (about_xml = files.find(function (test) { return /about\/about\.xml$/i.test(test.path); })) {
    filesCnt++;
    var aboutReader = new FileReader();
    aboutReader.onload = function (evt) {
      if ((tmp = x2js.xml_str2json(evt.target.result)) && tmp.ModMetaData && tmp.ModMetaData.name) {
        modName = tmp.ModMetaData.name;
        modDescription = tmp.ModMetaData.description;
        targetVersion = tmp.ModMetaData.targetVersion;
        webSite = tmp.ModMetaData.url;
        modAuthors = tmp.ModMetaData.author;
      } else {
        throw new ModException("Umm... it seems we have a bad about.xml file. (" + path + ")");
      }

      evtHandler.dispatchEvent(new Event('ResourceLoaded'));

      console.log("Loaded Mod Info:", modName);
    }
    aboutReader.readAsText(about_xml.handel);
    // help
  } else {
    throw new ModException("Umm... I thought there was a mod here? (" + path + ")");
  }

  // Load the mod's Preview, if there is one.
  if (preview = files.find(function (test) { return /about\/preview\.png$/i.test(test.path); })) {
    filesCnt++;

    var previewReader = new FileReader();
    previewReader.onload = function (evt) {
      previewImage.src = evt.target.result;
    }
    previewReader.readAsDataURL(preview.handel);
    // help
  }


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

  // Public functions
  Object.defineProperty(this, "getTree", {
    value: function () {
      var li = $("<li>");
      li.append($("<input>").prop("type", "checkbox").prop("id", "mod_" + modName.replace(/\s/g, "")));
      li.append($("<label>").prop("for", "mod_" + modName.replace(/\s/g, "")).text(modName));
      li.append("<ul>");
      if (previewImage.src) {
        li.append(previewImage);
      }

      return li;
    },
    writable: false
  });
}