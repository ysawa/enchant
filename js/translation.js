(function ($) {
  var enchant_translation_methods = {
    enchant_get_selected_text: function () {
      return window.getSelection().toString();
    },
    enchant_previous_text: '',
    enchant_insert: function (translated) {
      var text = this.enchant_get_selected_text();
      var marker_id = "enchant_" + new Date().getTime() + "_" + Math.random().toString().substr(2);
      if (text && this.enchant_previous_text != text) {
        var range = window.getSelection().getRangeAt(0).cloneRange();

        var tag = range.startContainer.tagName;
        if (tag !== undefined) {
          return;
        }

        range.collapse(false);

        marker = document.createElement("div");
        marker.id = marker_id;
        range.insertNode(marker);
        $(marker).addClass('enchant_insertion');
        $(marker).append('<span class="enchant_close">x</span>');
        $(marker).append('<span class="enchant_text">' + translated + '</span>');
        $(marker).append('<textarea class="enchant_textarea">' + translated + '</textarea>');

        $(marker).hover(
          function () {
            $(this).children('span.enchant_close').show();
            $(this).children('textarea.enchant_textarea').show();
            $(this).children('textarea.enchant_textarea').autoResize({
              onResize: function() {
                  $(this).css({ opacity: 0.8 });
              },
              animateCallback: function() {
                  $(this).css({ opacity: 1 });
              },
              animateDuration: 300,
              extraSpace: 20
            });
            $(this).children('span.enchant_text').hide();
          },
          function () {
            $(this).children('span.enchant_close').hide();
            $(this).children('span.enchant_text').show();
            $(this).children('span.enchant_text').html($(this).children('textarea.enchant_textarea').val());
            $(this).children('textarea.enchant_textarea').hide();
          }
        );
        $(marker).children('span.enchant_close').click(function () {
          $(this).parent('div.enchant_insertion').remove();
        });
      }
      this.enchant_previous_text = text;
    }
  }
  $.extend(enchant_translation_methods);
})(jQuery);
