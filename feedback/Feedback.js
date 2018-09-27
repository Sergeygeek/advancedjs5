class Feedback {
  constructor(source, container = '#feedback'){
    this.source = source;
    this.container = container;
    this._init(this.source);
  }
  _renderUI(author, text){
    let $messageWrapDiv = $('<div/>', {
      class: 'row margin-5'
    });
    let $authorDiv = $('<div/>', {
      class: 'author one column',
      text: `${author}`
    });
    let $messageDiv = $('<div/>', {
      class: 'message six columns',
      text: `${text}`
    });
    let $delLink = $('<a/>', {
      class: 'delete one columns',
      text: `X`,
      href: '#'
    });
  
    $messageWrapDiv.appendTo($(this.container));
    $authorDiv.appendTo($messageWrapDiv);
    $messageDiv.appendTo($messageWrapDiv);
    $delLink.appendTo($messageWrapDiv);
    
    $('#name').val('');
    $('#message').val('');
  }
  _init(source){
    fetch(source)
      .then(result => result.json())
      .then(data => {
        for (let msg of data){
            this._renderUI(msg.author, msg.text);
        }  
    });
  }
  _addFeedback(){
    let author = $('#name').val();
    let message = $('#message').val();
    this._renderUI(author, message);
    this._showalert('Комментарий добавлен!', 'success');
  }
  _deleteFeedback(target){
    if (target.classList.contains('delete')) {
      target.parentElement.remove();
      this._showalert('Комментарий удален!', 'success');
    }
  }
  _showalert(message, className) {
    let $div = $('<div/>', {
      class: `alert ${className}`,
      text: message
    });

    $(this.container).prepend($div);

    setTimeout(function(){
      $('.alert').remove();
    }, 3000);
  }
}