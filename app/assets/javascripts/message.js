$(function(){

  function buildHTML(message){
    var addImage = (message.image !== null) ? 
      `<p class="message__content--image">
        <img src="${message.image}">
      </p>` : ''
    var html = 
      `<div class="message__info">
                    <p class="message__info--user">
                      ${message.user.name}
                    </p>
                    <p class="message__info--date">
                      ${message.time}
                    </p>
                  </div>
                  <p class="message__content">
                    ${message.content}
                  </p>
                  <p class="message__content--image">
                    ${addImage}
                  </p>`
      return html;
  };

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
      $('#bottom__form')[0].reset();
      $('.form--btn').prop('disabled', false);
      $('.contents__main').animate({ scrollTop : $('.contents__main')[0].scrollHeight });
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  })
})