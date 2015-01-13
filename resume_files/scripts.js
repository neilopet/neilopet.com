/* imgsizer (flexible images for fluid sites) */
var imgSizer={Config:{imgCache:[],spacer:"/path/to/your/spacer.gif"},collate:function(aScope){var isOldIE=(document.all&&!window.opera&&!window.XDomainRequest)?1:0;if(isOldIE&&document.getElementsByTagName){var c=imgSizer;var imgCache=c.Config.imgCache;var images=(aScope&&aScope.length)?aScope:document.getElementsByTagName("img");for(var i=0;i<images.length;i++){images[i].origWidth=images[i].offsetWidth;images[i].origHeight=images[i].offsetHeight;imgCache.push(images[i]);c.ieAlpha(images[i]);images[i].style.width="100%";}
if(imgCache.length){c.resize(function(){for(var i=0;i<imgCache.length;i++){var ratio=(imgCache[i].offsetWidth/imgCache[i].origWidth);imgCache[i].style.height=(imgCache[i].origHeight*ratio)+"px";}});}}},ieAlpha:function(img){var c=imgSizer;if(img.oldSrc){img.src=img.oldSrc;}
var src=img.src;img.style.width=img.offsetWidth+"px";img.style.height=img.offsetHeight+"px";img.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"', sizingMethod='scale')"
img.oldSrc=src;img.src=c.Config.spacer;},resize:function(func){var oldonresize=window.onresize;if(typeof window.onresize!='function'){window.onresize=func;}else{window.onresize=function(){if(oldonresize){oldonresize();}
func();}}}}

// add twitter bootstrap classes and color based on how many times tag is used
function addTwitterBSClass(thisObj) {
  var title = jQuery(thisObj).attr('title');
  if (title) {
    var titles = title.split(' ');
    if (titles[0]) {
      var num = parseInt(titles[0]);
      if (num > 0)
      	jQuery(thisObj).addClass('label label-default');
      if (num == 2)
        jQuery(thisObj).addClass('label label-info');
      if (num > 2 && num < 4)
        jQuery(thisObj).addClass('label label-success');
      if (num >= 5 && num < 10)
        jQuery(thisObj).addClass('label label-warning');
      if (num >=10)
        jQuery(thisObj).addClass('label label-important');
    }
  }
  else
  	jQuery(thisObj).addClass('label');
  return true;
}

var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

function updateCurrentDim( w, h ) {
	jQuery('#current_dim').html('(' + w + ', ' + h + ')');
}

// as the page loads, call these scripts
jQuery(document).ready(function($) {

	/*localStorage.clear();*/

	$('#profile-image').css({'visibility':'hidden', 'height':'202px', 'width':'202px'}).delay(500).queue(function() { $(this).addClass('animated bounceIn').css('visibility', 'visible'); });

	// modify tag cloud links to match up with twitter bootstrap
	$("#tag-cloud a").each(function() {
	    addTwitterBSClass(this);
	    return true;
	});
	
	$("p.tags a").each(function() {
		addTwitterBSClass(this);
		return true;
	});
	
	$("ol.commentlist a.comment-reply-link").each(function() {
		$(this).addClass('btn btn-success btn-mini');
		return true;
	});
	
	$('#cancel-comment-reply-link').each(function() {
		$(this).addClass('btn btn-danger btn-mini');
		return true;
	});
	
	$('article.post').hover(function(){
		$('a.edit-post').show();
	},function(){
		$('a.edit-post').hide();
	});
	
	// Input placeholder text fix for IE
	// $('[placeholder]').focus(function() {
	//   var input = $(this);
	//   if (input.val() == input.attr('placeholder')) {
	// 	input.val('');
	// 	input.removeClass('placeholder');
	//   }
	// }).blur(function() {
	//   var input = $(this);
	//   if (input.val() == '' || input.val() == input.attr('placeholder')) {
	// 	input.addClass('placeholder');
	// 	input.val(input.attr('placeholder'));
	//   }
	// }).blur();
	
	// Prevent submission of empty form
	$('[placeholder]').parents('form').submit(function() {
	  $(this).find('[placeholder]').each(function() {
		var input = $(this);
		if (input.val() == input.attr('placeholder')) {
		  input.val('');
		}
	  })
	});
	
	$('li.contact a').click(function() {
		$('body,html').animate({
			'scrollTop': $('#footer').offset().top
		}, 2000, null, function() {
			$('input[name="name"]').focus();
		});
	});

	// $('#s').focus(function(){
	// 	if( $(window).width() < 940 ){
	// 		$(this).animate({ width: '200px' });
	// 	}
	// });
	
	// $('#s').blur(function(){
	// 	if( $(window).width() < 940 ){
	// 		$(this).animate({ width: '100px' });
	// 	}
	// });
			
	$('.alert-message').alert();
	
	$('.dropdown-toggle').dropdown();

	$('.btn-submit').click(function(e) {
		e.preventDefault();
		if (checkContactForm($)) {
			$.post('/contact.php', $('#contact_form').serialize(), function(data) { 
				$('#thankyou')
					.show(0)
					.delay(2000)
					.fadeOut('slow'); 
				$('#contact_form input[type="text"], #contact_form textarea').val(''); 
			});
		}
		return false;
	});

	var activeSmallSlideShowInterval = '';
	var slideCounter = 0;

	$('.item').mouseover(function() {
		var element = $('.smshow', this);
		if (element.length > 0 && activeSmallSlideShowInterval == '')  {
			slideCounter = 0
			activeSmallSlideShowInterval = setInterval(function() {
				var slide1 = element.attr('data-image-one');
				var slide2 = element.attr('data-image-two');
				var slide3 = element.attr('data-image-three');
				var slide4 = element.attr('data-image-four');
				var slide5 = element.attr('data-image-five');
				var slides = [];

				if (typeof slide1 != 'undefined') {
					slides.push(slide1);
				}
				if (typeof slide2 != 'undefined') {
					slides.push(slide2);
				}
				if (typeof slide3 != 'undefined') {
					slides.push(slide3);
				}
				if (typeof slide4 != 'undefined') {
					slides.push(slide4);
				}
				if (typeof slide5 != 'undefined') {
					slides.push(slide5);
				}

				slideCounter++;
				element.css({'background-image':'url(' + slides[ slideCounter % slides.length ] + ')'});				

			}, 2000);
		}
	})
	.mouseleave(function() {
		clearInterval( activeSmallSlideShowInterval );
		activeSmallSlideShowInterval = '';
	});

	if (typeof console == 'object' 
			&& 'log' in console) {
		console.log('Why, hello there.');
	}

	$('input, textarea').placeholder();

});

function checkContactForm($) {
	var name    = $('input[name="name"]');
	var email   = $('input[name="email"]');
	var message = $('textarea[name="message"]');
	var ret = true;
	if (name.val() == '') {
		name.css('border-color', 'rgb(255, 130, 130)');	
		ret = false;
	}
	else {
		name.css('border-color', '#45576B');
	}

	if (email.val() == '') {
                email.css('border-color', 'rgb(255, 130, 130)');
		ret = false;
        }
        else {
                email.css('border-color', '#45576B');
        }

	if (message.val() == '') {
                message.css('border-color', 'rgb(255, 130, 130)');
		ret = false;
        }
        else {
                message.css('border-color', '#45576B');
        }
	return ret;
}

function destroyLessCache(pathToCss) { // e.g. '/css/' or '/stylesheets/'
 
  if (!window.localStorage || !less || less.env !== 'development') {
    return;
  }
  var host = window.location.host;
  var protocol = window.location.protocol;
  var keyPrefix = protocol + '//' + host + pathToCss;
  
  for (var key in window.localStorage) {
    if (key.indexOf(keyPrefix) === 0) {
      delete window.localStorage[key];
    }
  }
}
