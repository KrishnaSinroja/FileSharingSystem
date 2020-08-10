
(function( $ ) {
   
    $.fn.uploader = function( options ) {
      var settings = $.extend({
        MessageAreaText: "No files selected.",
        MessageAreaTextWithFiles: "File List:",
        DefaultErrorMessage: "Unable to open this file.",
        BadTypeErrorMessage: "We cannot accept this file type at this time.",
        acceptedFileTypes: ['pdf', 'jpg', 'gif', 'jpeg', 'bmp', 'tif', 'tiff', 'png', 'xps', 'doc', 'docx',
          'txt', 'cs','zip']
      }, options );
   
      var uploadId = 1;
    
       $('.file-uploader__message-area p').text(options.MessageAreaText || settings.MessageAreaText);
      
    \
      var fileList = $('<ul class="file-list"></ul>');
      var hiddenInputs = $('<div class="hidden-inputs hidden"></div>');
      $('.file-uploader__message-area').after(fileList);
      $('.file-list').after(hiddenInputs);
\
      $('.file-chooser__input').on('change', function(){
         var file = $('.file-chooser__input').val();
         var fileName = (file.match(/([^\\\/]+)$/)[0]);
 
       
        $('.file-chooser').removeClass('error');
        $('.error-message').remove();
 
        var check = checkFile(fileName);
        if(check === "valid") {
          
         
          $('.hidden-inputs').append($('.file-chooser__input')); 
        
         
          $('.file-chooser').append($('.file-chooser__input').clone({ withDataAndEvents: true})); 
        
         
          $('.file-list').append('<li style="display: none;"><span class="file-list__name">' + fileName + '</span><button class="removal-button" data-uploadid="'+ uploadId +'"></button></li>');
          $('.file-list').find("li:last").show(800);
         
        
          $('.removal-button').on('click', function(e){
            e.preventDefault();
          
           
            $('.hidden-inputs input[data-uploadid="'+ $(this).data('uploadid') +'"]').remove(); 
          
           
            $(this).parent().hide("puff").delay(10).queue(function(){$(this).remove();});
            
          
            if($('.file-list li').length === 0) {
              $('.file-uploader__message-area').text(options.MessageAreaText || settings.MessageAreaText);
            }
          });
          $('.hidden-inputs .file-chooser__input').removeClass('file-chooser__input').attr('data-uploadId', uploadId); 
          $('.file-uploader__message-area').text(options.MessageAreaTextWithFiles || settings.MessageAreaTextWithFiles);
          uploadId++;
          
        } else {
         
          $('.file-chooser').addClass("error");
          var errorText = options.DefaultErrorMessage || settings.DefaultErrorMessage;
          
          if(check === "badFileName") {
            errorText = options.BadTypeErrorMessage || settings.BadTypeErrorMessage;
          }
          
          $('.file-chooser__input').after('<p class="error-message">'+ errorText +'</p>');
        }
      });
      
      var checkFile = function(fileName) {
        var accepted          = "invalid",
            acceptedFileTypes = this.acceptedFileTypes || settings.acceptedFileTypes,
            regex;
 
        for ( var i = 0; i < acceptedFileTypes.length; i++ ) {
          regex = new RegExp("\\." + acceptedFileTypes[i] + "$", "i");
 
          if ( regex.test(fileName) ) {
            accepted = "valid";
            break;
          } else {
            accepted = "badFileName";
          }
        }
 
        return accepted;
     };
   }; 
 }( jQuery ));
 
 $(document).ready(function(){
   $('.fileUploader').uploader({
     MessageAreaText: "No files selected. Please select a file."
   });
 });
 