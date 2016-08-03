'use strict';

var md5 = require('md5');


var Utils = function () {
};

Utils.convertEncode = function (data, sCode, tCode) {
  return new Buffer(data, sCode).toString(tCode);
};

Utils.copy = function (data) {
  if ( data ) {
    return JSON.parse(JSON.stringify(data));
  }
};

Utils.format = function () {
  if ( arguments.length === 0 )
    return null;

  var str = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
    str = str.replace(re, arguments[i]);
  }
  return str;
};

Utils.md5 = function (secret, params) {
  var val = '';
  for (var i = 0, len = params.length; i < len; i++) {
    val = val + params[i].key + '=' + params[i].value + '&';
  }
  val = val.slice(0, -1) + secret;
  return md5(val);
};

Utils.isNullOrUndefined = function (obj) {
  return obj === null || obj === undefined;
};

Utils.trim = function (str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
};

Utils.setFirstLetterLower = function (obj, replaces) {

  if ( this.isNullOrUndefined(obj) )
    return obj;

  if ( obj !== Object(obj) )
    throw new TypeError('Object.keys called on non-object');

  var ret = {}, p;
  for (p in obj) {
    if ( replaces && replaces[p] != undefined ) {
      if ( replaces[p].key != undefined )
        ret[replaces[p].key] = replaces[p].value;
      else
        ret[p.toLowerCase()] = obj[p];
      continue;
    }
    if ( Object.prototype.hasOwnProperty.call(obj, p) ) {
      if ( require('util').isArray(obj[p]) ) {
        for (var i = 0, len = obj[p].length; i < len; i++) {
          var tmp = this.setFirstLetterLower(obj[p][i], { 'ID': {} });
          obj[p][i] = tmp;
        }
      }

      ret[p.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toLowerCase() + word.substring(1);
      })] = this.isNullOrUndefined(obj[p]) ? null : obj[p];
    }
  }
  return ret;
}


/**
 * @param date
 * @param style  'yyyy-MM-dd mm:hh' OR 'yyyy/MM/dd mm/hh')
 * @returns {string|XML}
 */
Utils.formatDate = function (date, style) {
  var y = date.getFullYear();
  var M = "0" + (date.getMonth() + 1);
  M = M.substring(M.length - 2);
  var d = "0" + date.getDate();
  d = d.substring(d.length - 2);
  var h = "0" + date.getHours();
  h = h.substring(h.length - 2);
  var m = "0" + date.getMinutes();
  m = m.substring(m.length - 2);
  var s = "0" + date.getSeconds();
  s = s.substring(s.length - 2);
  return style.replace('yyyy', y).replace('MM', M).replace('dd', d).replace('HH', h).replace('mm', m).replace('ss', s);
}

function fetchSubscribedSubtask(subscribedSubtasks, subtask) {
  var result = null;
  for (var s = 0; s < subscribedSubtasks.length; s++) {
    if ( subscribedSubtasks[s].subtask.id.toString() === subtask.id.toString() ) {
      result = subscribedSubtasks[s];
      break;
    }
  }

  return result;
}
module.exports = Utils;
