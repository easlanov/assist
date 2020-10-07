$(function() {

    var onFieldFocus = function(){
        var input = $(this);
		$('#ErrorBlock').css({'display':'none'});
    };
	
	$("#CardNumber").mask("9?999 9999 9999 9999 999");

	$('#Cardholder').keydown( function(e){
        return keybord_ru2en.isChar(e) ? function(){
            window.setTimeout(function(){
                $('#Cardholder').trigger("update");
            }, 50);
        } : false;
    });
	
    $('#Cardholder').bind('update keyup', function(e) {
        var value = $(this).val();
        value = value.replace(/[^a-zA-Zа-яА-ЯёЁ\-'\. ]/g, '')
        .replace(/^[\-\.' ]+/g, "")
        .replace(/-{2,}/g, '-')
        .replace(/'{2,}/g, "'")
        .replace(/\.{2,}/g, ".")
        .replace(/^[\-\.' ]+$/g, "");
        if(/[а-яА-ЯёЁ]/.test(value))
        {
            var rg;
            for( var i=0; i<keybord_ru2en.ru.length; i++) {
                rg = new RegExp(keybord_ru2en.ru[i], 'g');
                value = value.replace(rg, keybord_ru2en.en[i]);
            }
        }
        value = value.toUpperCase();
        value = value.substring(0, 64);
        if(value != $(this).val()) $(this).val(value);
    });
    
    
	
    $('#CardNumber').bind('update keyup', function(e){
    	var value = $.trim($(this).val()), isNext=$(this).attr('is-next');
    	if(value.length == 23) {
            
			//changeCardBin();
    		
			if(!isNext) {
				$(this).attr('is-next', 1);
				$('#ExpireMonth').focus();
    		}
    	}
    });
	
	
	
    $('#ExpireMonth').on("change", function(e){
    	var value = $(this).val(), isNext=$(this).attr('is-next');
    	if(value.length) {
    		if(!isNext) {
				$(this).attr('is-next', 1);
				$('#ExpireYear').focus();
				}
		
    	}

		
    });
    
	$('#ExpireYear').on("change",  function(e){
    	var value = $(this).val(), isNext=$(this).attr('is-next');
    	if(value.length) {
    		if(!isNext) {
				$(this).attr('is-next', 1);
				$('#Cardholder').focus();
    		}
			
    	}
    });
    
	$('#Cardholder').bind('update keyup', function(e){
    	var value = $(this).val(), isNext=$(this).attr('is-next');
    	if(value.length > 0) {
    		if(!isNext) {
				$(this).attr('is-next', 1);
				
    		}
    	}
    });
	
	$('#CVC2').focus(function(e){
    	var value = $(this).val(), isNext=$(this).attr('is-next');
    	if(value.length == 0) {
    		if(!isNext) {
				$(this).attr('is-next', 1);
				
    		}
    	}
    });


});

var keybord_ru2en = {
    ru: 'йцукенгшщзфывапролдячсмитьЙЦУКЕНГШЩЗФЫВАПРОЛДЯЧСМИТЬ',
    en: 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
    isChar: function(e)
    {
        var specialkeys = [
        8, // backspace
        9, // tab
        16, // shift
        17, // ctrl
        35, // end
        36, // home
        37, // arrow left
        38, // arrow up
        39, // arrow right
        40, // arrow down
        45, // insert
        46 // delete
        ];
		
        var key = e.which;
		
        // numpad
        if((key >= 96) && (key <= 105)) key = key - 48;
		
        var char;
        if(key == 222) char = "'";
        else if(((key == 189) || (key == 109)) && !e.shiftKey) char = "-";
        else if((key == 190) || (key == 110)) char = ".";
        else char = String.fromCharCode(key);
		
        if( $.inArray(key, specialkeys) > -1 ) return true;
        else if( (key == 86) && (e.ctrlKey || e.metaKey) ) return true;
        else if( (!e.shiftKey || key < 48 || key > 57) || char ) return true;
        return false; 
    }	
}

function E(id) {
    return document.getElementById(id);
}

function clearLoader()
{
    var l=E('loader');
    if(l!=null) {
        l.style.display='none';
        var toid = l.getAttribute('toid');
        if(toid) E(toid).disabled = false;
    }
}


/*

function setCardTypeView(type) {
 $('#CardType').html(type);
}

function changeCardBin() {
    var val = $('#CardNumber').val();
    var cn = val;
    var type = val.length > 0 ? getCardType(cn) : null;
    if(type != null) {
		setCardTypeView(type.type);
    } else {
        setCardTypeView("unknown");
}


}
function getCardType(num) {
    if(num) {
        for(var i=0; i < card_types.length; i++) {
            var ct = card_types[i];
            if(num.match(ct.pattern)) {
                var max = ct.valid_length[0];
                for(var j=1;j<ct.valid_length.length;j++) {
                    if(max < ct.valid_length[j]) {
                        max = ct.valid_length[j];
                    }
                }
                return {type:ct.name, maxLength:max	};
            }
        }
    }
	return null;
}

card_types = [
    {
        name: 'kompanija Dari Podarki',
        pattern: /^4891 6400 1/,
        valid_length:  [16]
    },
	{
        name: 'kompanija Darit Legko',
        pattern: /^4891 6400 2/,
        valid_length:  [16]
    }
];

*/
