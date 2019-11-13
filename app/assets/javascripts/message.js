$(function(){

  function buildHTML(message){
    addImage = message.image.url ? 
      `<img class= "message__content--image" src="${message.image.url}">
      ` : "";

    var html = 
      `
      <div class="message" data-message-id="${message.id}">
        <div class="message__info">
          <p class="message__info--user">
            ${message.user_name}
          </p>
          <p class="message__info--date">
            ${message.time}
          </p>
        </div>
        <p class="message__content">
          ${message.content}
        </p>
        ${addImage}
      </div>
      `
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

  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message:last').data('message-id');
      var group_id = $(".group").data("group-id");
      var url = 'api/messages#index {:format=>"json"}' 
      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages){
        var insertHTML = '';
        messages.forEach(function (message){
          insertHTML = buildHTML(message);
          $('.contents__main').append(insertHTML);
        })
        $('.contents__main').animate({ scrollTop: $('.contents__main')[0].scrollHeight });
      })
      .fail(function(){
        alert('自動更新に失敗しました');
      });
    } else
    ;
  };
  setInterval(reloadMessages, 5000);
});