(function ($) {
  var enchant_translation_methods = {
    enchant_get_selected_text: function () {
      return window.getSelection().toString();
    },
    enchant_previous_text: '',
    enchant_insert: function (translated) {
      var text = this.enchant_get_selected_text();
      var marker_id = "sel_" + new Date().getTime() + "_" + Math.random().toString().substr(2);
      if (text && this.enchant_previous_text != text) {
        var range = window.getSelection().getRangeAt(0).cloneRange();

        var tag = range.startContainer.tagName;
        if (tag !== undefined) {
          return;
        }

        range.collapse(false);

        marker = document.createElement("span");
        marker.id = marker_id;
        marker.innerText = translated;
        range.insertNode(marker);
        $(marker).addClass('enchant_translation');
        $(marker).prepend('<span class="enchant_close">x</span>');

        $(marker).hover(
          function () {
            $(this).children('span.enchant_close').show();
          },
          function () {
            $(this).children('span.enchant_close').hide();
          }
        );
        $(marker).click(function () {
          $(this).remove();
        });
      }
      this.enchant_previous_text = text;
    }
  }
  $.extend(enchant_translation_methods);
})(jQuery);
