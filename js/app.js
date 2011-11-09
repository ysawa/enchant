$(function () {
  $(window).keydown(function(e) {
    if (e.keyCode == 32) {
      var original = $.enchant_get_selected_text();
      if (original) {
        var translated;
        $.ajax(
          {
            data: {
              appId: 'CE5D62CDA299624CF04B6B1E00E9276527F901F3',
              text: original,
              to: 'ja'
            },
            dataType: 'text',
            url: 'http://api.microsofttranslator.com/V2/Http.svc/Translate',
            success: function (data) {
              translated = data.replace('</string>', '');
              translated = translated.replace(/^<string .+?>/, '');
              if (translated) {
                $.enchant_insert(translated);
              }
            }
          }
        )
        return false;
      }
    }
  });
});
