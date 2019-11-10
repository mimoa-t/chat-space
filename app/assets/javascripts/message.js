$(function(){

  function buildHTML(message){
    if (message.content) {
      var html = `<div class="message__info">
                    <p class="message__info--user">
                      ${message.user.name}
                    </p>
                    <p class="message__info--date">
                      ${message.time}
                    </p>
                  </div>
                  <p class="message__content">
                    ${message.content}
                  </p>`
      return html;
    };
    if (message.image) {
      var html = `<div class="message__info">
                    <p class="message__info--user">
                      ${message.user.name}
                    </p>
                    <p class="message__info--date">
                      ${message.time}
                    </p>
                  </div>
                  <p class="message__content--image">
                    <img src="${message.image}">
                  </p>`
      return html;
    };
  }

  $('#bottom__form').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.contents__main').append(html);
      $('.form--textarea').val('');
      $('.form--btn').prop('disabled', false);
      $('.contents__main').animate({ scrollTop : $('.contents__main')[0].scrollHeight });
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  })
})