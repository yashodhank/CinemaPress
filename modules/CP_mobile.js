'use strict';

/**
 * Configuration dependencies.
 */

var config = require('../config/production/config');
Object.keys(config).length === 0 &&
  (config = require('../config/production/config.backup'));
var modules = require('../config/production/modules');
Object.keys(modules).length === 0 &&
  (modules = require('../config/production/modules.backup'));

/**
 * Node dependencies.
 */

var path = require('path');
var fs = require('fs');

/**
 * Adding to the pages of the website information on the mobile site.
 *
 * @param {String} url
 * @return {Object}
 */

function mobileVersion(url) {
  var data = '';

  if (/:\/\/m\.|\/mobile-version/i.test(url)) {
    var css = fs.readFileSync(
      path.join(
        path.dirname(__dirname),
        'themes',
        'default',
        'public',
        'mobile',
        modules.mobile.data.theme,
        'css',
        'style.css'
      )
    );
    data += '<style>' + css + '</style>';

    if (modules.mobile.data.theme === 'custom') {
      data = data
        .replace(/custom_a/gi, modules.mobile.data.custom.a)
        .replace(/custom_hover/gi, modules.mobile.data.custom.hover)
        .replace(/custom_body_color/gi, modules.mobile.data.custom.body_color)
        .replace(/custom_body_bg/gi, modules.mobile.data.custom.body_bg)
        .replace(/custom_title_color/gi, modules.mobile.data.custom.title_color)
        .replace(/custom_title_bg/gi, modules.mobile.data.custom.title_bg)
        .replace(
          /custom_description_color/gi,
          modules.mobile.data.custom.description_color
        )
        .replace(
          /custom_description_bg/gi,
          modules.mobile.data.custom.description_bg
        )
        .replace(/custom_block/gi, modules.mobile.data.custom.block)
        .replace(/custom_form/gi, modules.mobile.data.custom.form)
        .replace(/custom_btn_color/gi, modules.mobile.data.custom.btn_color)
        .replace(/custom_btn_bg/gi, modules.mobile.data.custom.btn_bg);
    }
  } else if (modules.mobile.status) {
    data +=
      '<link rel="alternate" media="only screen and (max-width: 768px)" href="' +
      (modules.mobile.data.subdomain
        ? url.replace('://' + config.subdomain, '://m.')
        : url.replace(config.domain, config.domain + '/mobile-version')
      )
        .replace('://tv.', '://')
        .replace('/tv-version', '') +
      '">';
  }

  return data;
}

module.exports = {
  mobile: mobileVersion
};
