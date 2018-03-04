var _ = require('lodash'),
    hbs     = require('express-hbs'),
    _       = require('lodash'),
    registerHelper,
    cheerio = require('cheerio'),
    register = require('../../../../core/server/helpers/register');
    registerThemeHelper = register.registerThemeHelper,


module.exports = function anthem_toc() {
   
    registerThemeHelper('anthem_toc', function() {
  
        var options = options || {};
            options.hash = options.hash || {};

        var toc = [];
        var $ = cheerio.load(this.html);
        var startLevel = options.hash.start || 1;
        var maxDepth = options.hash.end || 4;

        var getHeadlines = function(start, end, current, elem) {
          if(parseInt(current) > parseInt(end)) { return; }
          if(_.isUndefined(current)) {
            $('h' + start).each(function(i, elem) {
              toc.push('<li><a href="#' + $(elem).attr('id') + '">' + $(elem).text() + '</a></li>');
              getHeadlines(start, end, parseInt(start) + 1, elem);
            });
          } else {
            var $subHeaders = $(elem).nextUntil('h' + (parseInt(current) - 1), 'h' + current);
            if($subHeaders.length !== 0) {
              toc.push('<ul>');
              $subHeaders.each(function(i, elem) {
                toc.push('<li><a href="#' + $(elem).attr('id') + '">' + $(elem).text() + '</a></li>');
                getHeadlines(start, end, parseInt(current) + 1, elem);
              });
              toc.push('</ul>');
            }
          }
        };

        // Ignore the cases where no header with startLevel exists
        while(startLevel <= maxDepth && $('h' + startLevel).length === 0){
          startLevel++;
        }

        if (startLevel <= maxDepth) {
          getHeadlines(startLevel, maxDepth);
        }
        return new hbs.handlebars.SafeString(toc.join(' '));
    });


};

