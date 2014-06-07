

jQuery(function ($) {
	// redirect the old bitches
	if(!Modernizr.canvas) {
		jQuery('#old').html('<h1>this workshop only supports modern browsers like <a href="http://getfirefox.com">FireFox 3.5</a>, <a href="http://apple.com/safari">Safari</a> or <a href="http://google.com/chrome">Chrome</a> </h1>');
	} else {

                jQuery('#old').html('<h1>modern carpentry rides the html5 canvas wave</h1>');
                
                var ctx;
                var canvas = document.getElementById("waves");
		if(canvas.getContext) {
			ctx = canvas.getContext('2d');
		}
		else
		{
			jQuery('#old').html('<h1>canvas not supported</h1> ');
		}
                
		
		jQuery('#waves').attr({width: window.innerWidth});
		jQuery('#waves').attr({height: window.innerHeight-100});
		
		var _cradius = 20;
		var _noise = 0;
		var _mouseattract = 0;
                var _amplitude = 100;
                var _wavelength = 500;
		
		var _color = false;
		var _circle = true;
		
		var _ymethod = '1';
		var _rmethod = '1';
		
                var el = document.getElementById("waves");	
                var _w = window.innerWidth;
		var _h = window.innerHeight;
                var p = Processing(el);

		var noises = getIndexedPerlinArray(_w/4, _h/4, 3, 2, 1);
/*		
		for(var i= 0; i< _w/5; i++)
		{
			noises[i] = [];
			for(var b = 0; b< _h/5; b++)
			{
				noises[i][b] = noise(i, b);		
			}
		}
*/                
                var _twopi = 2*Math.PI;
                var _wspace = 5;
                var _winc = _twopi / (_w/_wspace);
                var _wrads;
                var _wcount = 0;
                var _i;
                
		var _xind;
		var _dist;
		var _tdx;
		var _tdy;
                var _cx;
                var _cy;
		var _mx;
		var _my;
		var _px;
		var _py;
		var _mdx;
		var _mdy;
		var _pcol;
		var rand;
		var _newamp;
		var _newrad;

                p.draw = function() {
                    
                    if(_color)
			p.fill(Math.random()*255, Math.random()*255, Math.random()*255, 128);
		    
		    else
			p.background(0);
		    
		    _winc = (_twopi * (_w/_wavelength)) / (_w/_wspace);
		    
                    for(_i = 0; _i< _w; _i+=_wspace )
                    {
			_xind = _i*5;
			
			
                        _wrads = (_wcount - _i) * _winc;
			
			switch(_ymethod)
			{
				case '1':
		                        _newamp =  _amplitude;
					break;
				
				case '2':
					_newamp = _amplitude * (_xind-_w)/_w;
					break;
				
				case '3':
		                        _newamp =  _amplitude * (_xind)/_w;				
					break;
				
				case '4':
					_newamp =  _amplitude * (1-Math.abs((_xind/_w)-.5)*2);
					break;
			}			

			switch(_rmethod)
			{
				case '1':
		                        _newrad =  _cradius;
					break;
				
				case '2':
					_newrad = Math.abs(_cradius * (_xind -_w ) / _w);
					break;
				
				case '3':
		                        _newrad =  _cradius * _xind/_w;				
					break;
				
				case '4':
					_newrad =  _cradius * (1-Math.abs((_xind/_w)-.5)*2);
					break;
			}
			
			_tdx = 0;
			_tdy = Math.sin(_wrads) * _newamp;
                        
			if(_mouseattract != 0)
			{
				_mdx = _xind - _mx;
				_mdy = _tdy+(_h/2) - _my;
				
				_dist = Math.sqrt(Math.pow(_mdx, 2)+Math.pow(_mdy, 2));
				_tdx+= -(_mdx * _mouseattract) / _dist;
				_tdy+= -(_mdy * _mouseattract) / _dist;
				
			}
			
			if(_noise != 0)
			{
				_px = parseInt((_xind+_tdx)/10);
				_py = parseInt(((_h/2)+_tdy)/10);
				_px = _px < 0 ? 0 : _px > _w/10 ? parseInt(_w/10) : _px;
				_py = _py < 0 ? 0 : _py > _h/10 ? parseInt(_h /10): _py;
				_pcol = (1 - noises[_px][_py]/150);
				_tdx+= _pcol*_noise;
				_tdy+= _pcol*_noise;
			}
			
			if(_circle) p.ellipse(_xind+_tdx, (_h/2)+_tdy, _newrad, _newrad);

			else        p.rect(_xind+_tdx, (_h/2)+_tdy, _newrad, _newrad);
                    }

                    if(_wcount < _w) _wcount+= _wspace;
                    else _wcount = 0;
                    
		    rand = Math.random();
		    if(rand > .9)
		    {			
			noises.shift(noises.unshift(noises[noises.length-1]));
//			console.log(noises.length);
		    }
                }

                
                p.setup = function() {
			p.size(_w, _h);
			p.noStroke();
			p.frameRate( 20 );
			p.fill(255, 255, 255);
		}

                p.mouseMoved = function() {
			_mx = p.mouseX;
			_my = p.mouseY;
                };
                
                p.init();
		
		$("#ccolor").change(function(){
			_color = !_color;
			if(!_color) p.fill(255, 255, 255);
		});
		
		$("#cshape").change(function(){
			_circle = !_circle;
		});

                 $("#ampslider").slider({ max: 300, value:50});

                $('#ampslider').bind('slidechange', function(event, ui) {

                    var sliderval = $('#ampslider').slider('option', 'value');
    
                    _amplitude = sliderval;
    
                    jQuery('#amplitude' ).html( "amplitude :"+sliderval.toString()  );
    
                });

                $("#waveslider").slider({ max: _w, value:_wavelength});

                $('#waveslider').bind('slidechange', function(event, ui) {

                    var sliderval = $('#waveslider').slider('option', 'value');
                    
                    _wavelength = sliderval;
                    
                    jQuery('#wavelength' ).html( "wavelength :"+sliderval.toString()  );
    
                });

                $("#mouseslider").slider({ max: 200, min: -200, value:0});

                $('#mouseslider').bind('slidechange', function(event, ui) {

                    var sliderval = $('#mouseslider').slider('option', 'value');
    
			_mouseattract = sliderval;
    
                    jQuery('#mouseattract' ).html( "mouse attract :"+sliderval.toString()  );
    
                });

                $("#noiseslider").slider({ max: 200, value:0});

                $('#noiseslider').bind('slidechange', function(event, ui) {

                    var sliderval = $('#noiseslider').slider('option', 'value');
    
		    _noise = sliderval;
    
                    jQuery('#noise' ).html( "noise :"+sliderval.toString()  );
    
                });

                $("#cslider").slider({ max: 120, min:2, value:_cradius});

                $('#cslider').bind('slidechange', function(event, ui) {

                    var sliderval = $('#cslider').slider('option', 'value');
    
		    _cradius = sliderval;
    
                    jQuery('#cradius' ).html( "width :"+sliderval.toString()  );
    
                });

		$("#yComboBox").change(function() {
			_ymethod = $("#yComboBox").val();
			console.log("ymethod is "+_ymethod);
			switch(_ymethod)
			{
				case '1':
					jQuery('#ymeth').html( "y method : normal"  );
					break;
				
				case '2':
					jQuery('#ymeth').html( "y method : big on left"  );
					break;
				
				case '3':
					jQuery('#ymeth').html( "y method : big on right"  );
					break;
				
				case '4':
					jQuery('#ymeth').html( "y method : big in middle"  );
					break;
			}			
			
		});
		
		
		$("#rComboBox").change(function() {
			_rmethod = $("#rComboBox").val();
			console.log("rmethod is "+_rmethod);
			switch(_rmethod)
			{
				case '1':
					jQuery('#reqx').html( "fill method : normal"  );
					break;
				
				case '2':
					jQuery('#reqx').html( "fill method : big on left"  );
					break;
				
				case '3':
					jQuery('#reqx').html( "fill method : big on right"  );
					break;
				
				case '4':
					jQuery('#reqx').html( "fill method : big in middle"  );
					break;
			}			
			
		});		
        };
});
                


