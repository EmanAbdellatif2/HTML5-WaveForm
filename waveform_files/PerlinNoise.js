//***************************************************************************************************************
//	Javascript PerlinNoise Utility
//
//
//		Original AS3 by Ron Valstar http://www.sjeiti.com/
//		Original code port from http://mrl.nyu.edu/~perlin/noise/
//		and some help from http://freespace.virgin.net/hugo.elias/models/m_perlin.htm
//		AS3 optimizations by Mario Klingemann http://www.quasimondo.com
//
//
//		Ported from Quasimondo's AS3 version here: http://quasimondo.com/examples/OptimizedPerlin.as
//		into some messy js for now.
//
//		javascript version .0001
//		2009 Thomas Saunders
//		http://modern-carpentry.com
//
//
//
//	contact : tasaunders@gmail.com
//
//		
//	
//***************************************************************************************************************
//	more information on Perlin noise is here : http://en.wikipedia.org/wiki/Perlin_noise
//***************************************************************************************************************

var p  = [	
                151,160,137,91,90,15,131,13,201,95,
                96,53,194,233,7,225,140,36,103,30,69,
                142,8,99,37,240,21,10,23,190,6,148,
                247,120,234,75,0,26,197,62,94,252,
                219,203,117,35,11,32,57,177,33,88,
                237,149,56,87,174,20,125,136,171,
                168,68,175,74,165,71,134,139,48,27,
                166,77,146,158,231,83,111,229,122,
                60,211,133,230,220,105,92,41,55,46,
                245,40,244,102,143,54,65,25,63,161,
                1,216,80,73,209,76,132,187,208,89,
                18,169,200,196,135,130,116,188,159,
                86,164,100,109,198,173,186,3,64,52,
                217,226,250,124,123,5,202,38,147,118,
                126,255,82,85,212,207,206,59,227,47,
                16,58,17,182,189,28,42,223,183,170,
                213,119,248,152,2,44,154,163,70,221,
                153,101,155,167,43,172,9,129,22,39,
                253,19,98,108,110,79,113,224,232,
                178,185,112,104,218,246,97,228,251,
                34,242,193,238,210,144,12,191,179,
                162,241,81,51,145,235,249,14,239,
                107,49,192,214,31,181,199,106,157,
                184,84,204,176,115,121,50,45,127,4,
                150,254,138,236,205,93,222,114,67,29,
                24,72,243,141,128,195,78,66,215,61,
                156,180,151,160,137,91,90,15,131,13,
                201,95,96,53,194,233,7,225,140,36,
                103,30,69,142,8,99,37,240,21,10,23,
                190,6,148,247,120,234,75,0,26,197,
                62,94,252,219,203,117,35,11,32,57,
                177,33,88,237,149,56,87,174,20,125,
                136,171,168,68,175,74,165,71,134,139,
                48,27,166,77,146,158,231,83,111,229,
                122,60,211,133,230,220,105,92,41,55,
                46,245,40,244,102,143,54,65,25,63,
                161,1,216,80,73,209,76,132,187,208,
                89,18,169,200,196,135,130,116,188,
                159,86,164,100,109,198,173,186,3,64,
                52,217,226,250,124,123,5,202,38,147,
                118,126,255,82,85,212,207,206,59,
                227,47,16,58,17,182,189,28,42,223,
                183,170,213,119,248,152,2,44,154,
                163,70,221,153,101,155,167,43,172,9,
                129,22,39,253,19,98,108,110,79,113,
                224,232,178,185,112,104,218,246,97,
                228,251,34,242,193,238,210,144,12,
                191,179,162,241,81,51,145,235,249,
                14,239,107,49,192,214,31,181,199,
                106,157,184,84,204,176,115,121,50,
                45,127,4,150,254,138,236,205,93,
                222,114,67,29,24,72,243,141,128,
                195,78,66,215,61,156,180
    ];
					
var iOctaves = 4;
var fPersistence= .5;
//
var aOctFreq; // frequency per octave
var aOctPers; // persistence per octave
var fPersMax;// 1 / max persistence
//
var iSeed= 123;

var iXoffset;
var iYoffset;
var iZoffset;

var baseFactor = 1 / 64;
        
var initialized = false


function onoise( $x, $y, $z )
{
        if ( !initialized ) init();
        
        var s = 0;
        var fFreq;
        var fPers;
        var x;
        var y;
        var z;
        var xf;
        var yf;
        var zf;
        var u;
        var v;
        var w;
        var x1;
        var y1;
        var z1;
        var X;
        var Y;
        var Z;
        var A;
        var B;
        var AA;
        var AB;
        var BA;
        var BB;
        var hash;
        var g1;
        var g2;
        var g3;
        var g4;
        var g5;
        var g6;
        var g7;
        var g8;
        
        $x += iXoffset;
        $y += iYoffset;
        $z += iZoffset;
        
        for (var i=0;i<iOctaves;i++) 
        {
                fFreq = Number(aOctFreq[i]);
                fPers = Number(aOctPers[i]);
                
                x = $x * fFreq;
                y = $y * fFreq;
                z = $z * fFreq;
                
                xf = Math.floor(x);
                yf = Math.floor(y);
                zf = Math.floor(z);
        
                X = xf & 255;
                Y = yf & 255;
                Z = zf & 255;
        
                x -= xf;
                y -= yf;
                z -= zf;
        
                u = x * x * x * (x * (x*6 - 15) + 10);
                v = y * y * y * (y * (y*6 - 15) + 10);
                w = z * z * z * (z * (z*6 - 15) + 10);
        
                A  = parseInt(p[X]) + Y; 
                AA = parseInt(p[A]) + Z;
                AB = parseInt(p[parseInt(A+1)]) + Z;
                B  = parseInt(p[parseInt(X+1)]) + Y
                BA = parseInt(p[B]) + Z
                BB = parseInt(p[parseInt(B+1)]) + Z;
        
                x1 = x-1;
                y1 = y-1;
                z1 = z-1;
        
                hash = parseInt(p[parseInt(BB+1)]) & 15;
                g1 = ((hash & 1) == 0 ? (hash<8 ? x1 : y1) : (hash<8 ? -x1 : -y1)) + ((hash & 2) == 0 ? hash<4 ? y1 : ( hash==12 ? x1 : z1 ) : hash<4 ? -y1 : ( hash==14 ? -x1 : -z1 ));
        
                hash = parseInt(p[parseInt(AB+1)]) & 15;
                g2 = ((hash & 1) == 0 ? (hash<8 ? x  : y1) : (hash<8 ? -x  : -y1)) + ((hash & 2) == 0 ? hash<4 ? y1 : ( hash==12 ? x  : z1 ) : hash<4 ? -y1 : ( hash==14 ? -x : -z1 ));
        
                hash = parseInt(p[parseInt(BA+1)]) & 15;
                g3 = ((hash & 1) == 0 ? (hash<8 ? x1 : y ) : (hash<8 ? -x1 : -y )) + ((hash & 2) == 0 ? hash<4 ? y  : ( hash==12 ? x1 : z1 ) : hash<4 ? -y  : ( hash==14 ? -x1 : -z1 ));
        
                hash = parseInt(p[parseInt(AA+1)]) & 15;
                g4 = ((hash & 1) == 0 ? (hash<8 ? x  : y ) : (hash<8 ? -x  : -y )) + ((hash & 2) == 0 ? hash<4 ? y  : ( hash==12 ? x  : z1 ) : hash<4 ? -y  : ( hash==14 ? -x  : -z1 ));
        
                hash = parseInt(p[BB]) & 15;
                g5 = ((hash & 1) == 0 ? (hash<8 ? x1 : y1) : (hash<8 ? -x1 : -y1)) + ((hash & 2) == 0 ? hash<4 ? y1 : ( hash==12 ? x1 : z  ) : hash<4 ? -y1 : ( hash==14 ? -x1 : -z  ));
        
                hash = parseInt(p[AB]) & 15;
                g6 = ((hash & 1) == 0 ? (hash<8 ? x  : y1) : (hash<8 ? -x  : -y1)) + ((hash & 2) == 0 ? hash<4 ? y1 : ( hash==12 ? x  : z  ) : hash<4 ? -y1 : ( hash==14 ? -x  : -z  ));
        
                hash = parseInt(p[BA]) & 15;
                g7 = ((hash & 1) == 0 ? (hash<8 ? x1 : y ) : (hash<8 ? -x1 : -y )) + ((hash & 2) == 0 ? hash<4 ? y  : ( hash==12 ? x1 : z  ) : hash<4 ? -y  : ( hash==14 ? -x1 : -z  ));
        
                hash = parseInt(p[AA]) & 15;
                g8 = ((hash & 1) == 0 ? (hash<8 ? x  : y ) : (hash<8 ? -x  : -y )) + ((hash & 2) == 0 ? hash<4 ? y  : ( hash==12 ? x  : z  ) : hash<4 ? -y  : ( hash==14 ? -x  : -z  ));
                
                g2 += u * (g1 - g2);
                g4 += u * (g3 - g4);
                g6 += u * (g5 - g6);
                g8 += u * (g7 - g8);
                
                g4 += v * (g2 - g4);
                g8 += v * (g6 - g8);
        
                s += ( g8 + w * (g4 - g8)) * fPers;
        }
        
        return parseInt( s * fPersMax + 1 ) * 128;
}


function getIndexedPerlinArray(width, height, $x, $y, $z)
{
       if ( !initialized ) init();
        
        var s = 0;
        var fFreq;
        var fPers;
        var x;
        var y;
        var z;
        var xf;
        var yf;
        var zf;
        var u;
        var v;
        var w;
        var x1;
        var y1;
        var z1;
        var baseX;
        var px;
        var py;
        var i;
        var X;
        var Y;
        var Z;
        var A;
        var B;
        var AA;
        var AB;
        var BA;
        var BB;
        var hash;
        var g1;
        var g2;
        var g3;
        var g4;
        var g5;
        var g6;
        var g7;
        var g8;
        var pvalue;
      
	var perlinArray =[];
	
        baseX = $x * baseFactor + iXoffset;
        $y = $y * baseFactor + iYoffset;
        $z = $z * baseFactor + iZoffset;

	
        
        for ( px = 0; px < width; px++ )
        {
                $x = baseX;
                
		perlinArray[px] = [];
		
                for ( py = 0; py < height; py++ )
                {
                        s = 0;
                                                
                        for ( i = 0 ; i < iOctaves;i++) 
                        {
                                fFreq = Number(aOctFreq[i]);
                                fPers = Number(aOctPers[i]);
                                
                                x = $x * fFreq;
                                y = $y * fFreq;
                                z = $z * fFreq;
                                
                                xf = Math.floor(x);
                                yf = Math.floor(y);
                                zf = Math.floor(z);
                        
                                X = xf & 255;
                                Y = yf & 255;
                                Z = zf & 255;
                        
                                x -= xf;
                                y -= yf;
                                z -= zf;
                        
                                u = x * x * x * (x * (x*6 - 15) + 10);
                                v = y * y * y * (y * (y*6 - 15) + 10);
                                w = z * z * z * (z * (z*6 - 15) + 10);
                        
                                A  = parseInt(p[X]) + Y; 
                                AA = parseInt(p[A]) + Z;
                                AB = parseInt(p[parseInt(A+1)]) + Z;
                                B  = parseInt(p[parseInt(X+1)]) + Y
                                BA = parseInt(p[B]) + Z
                                BB = parseInt(p[parseInt(B+1)]) + Z;
                        
                                x1 = x-1;
                                y1 = y-1;
                                z1 = z-1;
                        
                                hash = parseInt(p[parseInt(BB+1)]) & 15;
                                g1 = ((hash & 1) == 0 ? (hash<8 ? x1 : y1) : (hash<8 ? -x1 : -y1)) + ((hash & 2) == 0 ? hash<4 ? y1 : ( hash==12 ? x1 : z1 ) : hash<4 ? -y1 : ( hash==14 ? -x1 : -z1 ));
                        
                                hash = parseInt(p[parseInt(AB+1)]) & 15;
                                g2 = ((hash & 1) == 0 ? (hash<8 ? x  : y1) : (hash<8 ? -x  : -y1)) + ((hash & 2) == 0 ? hash<4 ? y1 : ( hash==12 ? x  : z1 ) : hash<4 ? -y1 : ( hash==14 ? -x : -z1 ));
                        
                                hash = parseInt(p[parseInt(BA+1)]) & 15;
                                g3 = ((hash & 1) == 0 ? (hash<8 ? x1 : y ) : (hash<8 ? -x1 : -y )) + ((hash & 2) == 0 ? hash<4 ? y  : ( hash==12 ? x1 : z1 ) : hash<4 ? -y  : ( hash==14 ? -x1 : -z1 ));
                        
                                hash = parseInt(p[parseInt(AA+1)]) & 15;
                                g4 = ((hash & 1) == 0 ? (hash<8 ? x  : y ) : (hash<8 ? -x  : -y )) + ((hash & 2) == 0 ? hash<4 ? y  : ( hash==12 ? x  : z1 ) : hash<4 ? -y  : ( hash==14 ? -x  : -z1 ));
                        
                                hash = parseInt(p[BB]) & 15;
                                g5 = ((hash & 1) == 0 ? (hash<8 ? x1 : y1) : (hash<8 ? -x1 : -y1)) + ((hash & 2) == 0 ? hash<4 ? y1 : ( hash==12 ? x1 : z  ) : hash<4 ? -y1 : ( hash==14 ? -x1 : -z  ));
                        
                                hash = parseInt(p[AB]) & 15;
                                g6 = ((hash & 1) == 0 ? (hash<8 ? x  : y1) : (hash<8 ? -x  : -y1)) + ((hash & 2) == 0 ? hash<4 ? y1 : ( hash==12 ? x  : z  ) : hash<4 ? -y1 : ( hash==14 ? -x  : -z  ));
                        
                                hash = parseInt(p[BA]) & 15;
                                g7 = ((hash & 1) == 0 ? (hash<8 ? x1 : y ) : (hash<8 ? -x1 : -y )) + ((hash & 2) == 0 ? hash<4 ? y  : ( hash==12 ? x1 : z  ) : hash<4 ? -y  : ( hash==14 ? -x1 : -z  ));
                        
                                hash = parseInt(p[AA]) & 15;
                                g8 = ((hash & 1) == 0 ? (hash<8 ? x  : y ) : (hash<8 ? -x  : -y )) + ((hash & 2) == 0 ? hash<4 ? y  : ( hash==12 ? x  : z  ) : hash<4 ? -y  : ( hash==14 ? -x  : -z  ));
                
                                g2 += u * (g1 - g2);
                                g4 += u * (g3 - g4);
                                g6 += u * (g5 - g6);
                                g8 += u * (g7 - g8);
                                
                                g4 += v * (g2 - g4);
                                g8 += v * (g6 - g8);
                        
                                s += ( g8 + w * (g4 - g8)) * fPers;
                        }
                        
			pvalue = parseInt((s * fPersMax + 1 )*128);
			
			perlinArray[px][py] = pvalue;

                        $x += baseFactor;
                }
                
                $y += baseFactor;
        }
	
	return perlinArray;
}

function perlinfill( canvasdata, $x, $y, $z )
{
        if ( !initialized ) init();
        
        var s = 0;
        var fFreq;
        var fPers;
        var x;
        var y;
        var z;
        var xf;
        var yf;
        var zf;
        var u;
        var v;
        var w;
        var x1;
        var y1;
        var z1;
        var baseX;
        var px;
        var py;
        var i;
        var X;
        var Y;
        var Z;
        var A;
        var B;
        var AA;
        var AB;
        var BA;
        var BB;
        var hash;
        var g1;
        var g2;
        var g3;
        var g4;
        var g5;
        var g6;
        var g7;
        var g8;
        var color;
        
        var idx;
        
        baseX = $x * baseFactor + iXoffset;
        $y = $y * baseFactor + iYoffset;
        $z = $z * baseFactor + iZoffset;
        
        var width = canvasdata.width;
        var height = canvasdata.height;
        
        for ( py = 0; py < height; py++ )
        {
                $x = baseX;
                
                for ( px = 0; px < width; px++ )
                {
                        s = 0;
                        
                        idx = (px+py*width)*4;
                        
                        for ( i = 0 ; i < iOctaves;i++) 
                        {
                                fFreq = Number(aOctFreq[i]);
                                fPers = Number(aOctPers[i]);
                                
                                x = $x * fFreq;
                                y = $y * fFreq;
                                z = $z * fFreq;
                                
                                xf = Math.floor(x);
                                yf = Math.floor(y);
                                zf = Math.floor(z);
                        
                                X = xf & 255;
                                Y = yf & 255;
                                Z = zf & 255;
                        
                                x -= xf;
                                y -= yf;
                                z -= zf;
                        
                                u = x * x * x * (x * (x*6 - 15) + 10);
                                v = y * y * y * (y * (y*6 - 15) + 10);
                                w = z * z * z * (z * (z*6 - 15) + 10);
                        
                                A  = parseInt(p[X]) + Y; 
                                AA = parseInt(p[A]) + Z;
                                AB = parseInt(p[parseInt(A+1)]) + Z;
                                B  = parseInt(p[parseInt(X+1)]) + Y
                                BA = parseInt(p[B]) + Z
                                BB = parseInt(p[parseInt(B+1)]) + Z;
                        
                                x1 = x-1;
                                y1 = y-1;
                                z1 = z-1;
                        
                                hash = parseInt(p[parseInt(BB+1)]) & 15;
                                g1 = ((hash & 1) == 0 ? (hash<8 ? x1 : y1) : (hash<8 ? -x1 : -y1)) + ((hash & 2) == 0 ? hash<4 ? y1 : ( hash==12 ? x1 : z1 ) : hash<4 ? -y1 : ( hash==14 ? -x1 : -z1 ));
                        
                                hash = parseInt(p[parseInt(AB+1)]) & 15;
                                g2 = ((hash & 1) == 0 ? (hash<8 ? x  : y1) : (hash<8 ? -x  : -y1)) + ((hash & 2) == 0 ? hash<4 ? y1 : ( hash==12 ? x  : z1 ) : hash<4 ? -y1 : ( hash==14 ? -x : -z1 ));
                        
                                hash = parseInt(p[parseInt(BA+1)]) & 15;
                                g3 = ((hash & 1) == 0 ? (hash<8 ? x1 : y ) : (hash<8 ? -x1 : -y )) + ((hash & 2) == 0 ? hash<4 ? y  : ( hash==12 ? x1 : z1 ) : hash<4 ? -y  : ( hash==14 ? -x1 : -z1 ));
                        
                                hash = parseInt(p[parseInt(AA+1)]) & 15;
                                g4 = ((hash & 1) == 0 ? (hash<8 ? x  : y ) : (hash<8 ? -x  : -y )) + ((hash & 2) == 0 ? hash<4 ? y  : ( hash==12 ? x  : z1 ) : hash<4 ? -y  : ( hash==14 ? -x  : -z1 ));
                        
                                hash = parseInt(p[BB]) & 15;
                                g5 = ((hash & 1) == 0 ? (hash<8 ? x1 : y1) : (hash<8 ? -x1 : -y1)) + ((hash & 2) == 0 ? hash<4 ? y1 : ( hash==12 ? x1 : z  ) : hash<4 ? -y1 : ( hash==14 ? -x1 : -z  ));
                        
                                hash = parseInt(p[AB]) & 15;
                                g6 = ((hash & 1) == 0 ? (hash<8 ? x  : y1) : (hash<8 ? -x  : -y1)) + ((hash & 2) == 0 ? hash<4 ? y1 : ( hash==12 ? x  : z  ) : hash<4 ? -y1 : ( hash==14 ? -x  : -z  ));
                        
                                hash = parseInt(p[BA]) & 15;
                                g7 = ((hash & 1) == 0 ? (hash<8 ? x1 : y ) : (hash<8 ? -x1 : -y )) + ((hash & 2) == 0 ? hash<4 ? y  : ( hash==12 ? x1 : z  ) : hash<4 ? -y  : ( hash==14 ? -x1 : -z  ));
                        
                                hash = parseInt(p[AA]) & 15;
                                g8 = ((hash & 1) == 0 ? (hash<8 ? x  : y ) : (hash<8 ? -x  : -y )) + ((hash & 2) == 0 ? hash<4 ? y  : ( hash==12 ? x  : z  ) : hash<4 ? -y  : ( hash==14 ? -x  : -z  ));
                
                                g2 += u * (g1 - g2);
                                g4 += u * (g3 - g4);
                                g6 += u * (g5 - g6);
                                g8 += u * (g7 - g8);
                                
                                g4 += v * (g2 - g4);
                                g8 += v * (g6 - g8);
                        
                                s += ( g8 + w * (g4 - g8)) * fPers;
                        }
                        
                        color = parseInt( ( s * fPersMax + 1 ) * 128 )
  //                      bitmap.setPixel32( px, py, 0xff000000 | color << 16 | color << 8 | color );
    
  //                      console.log(color);
    
                        canvasdata.data[idx+0] = color;
                        canvasdata.data[idx+1] = color;
                        canvasdata.data[idx+2] = color;
                        canvasdata.data[idx+3] = 255;
                        $x += baseFactor;
                }
                
                $y += baseFactor;
        }
}





// GETTER / SETTER
//
// get octaves
function getOctaves()
{
        return iOctaves;
}
// set octaves
function setOctaves(_iOctaves)
{
        iOctaves = _iOctaves;
        octFreqPers();
}
//
// get falloff
function getFalloff() 
{
        return fPersistence;
}
// set falloff
function setFalloff(_fPersistence) 
{
        fPersistence = _fPersistence;
        octFreqPers();
}
//
// get seed
function getSeed()
{
        return iSeed;
}
// set seed
function setSeed(_iSeed)
{
        iSeed = _iSeed;
        seedOffset();
}

function init()
{
        seedOffset();
        octFreqPers();
        initialized = true;
}


function octFreqPers()
{
        var fFreq;
        var fPers;
        
        aOctFreq = [];
        aOctPers = [];
        fPersMax = 0;
        
        for (var i=0;i<iOctaves;i++) 
        {
                fFreq = Math.pow(2,i);
                fPers = Math.pow(fPersistence,i);
                fPersMax += fPers;
                aOctFreq.push( fFreq );
                aOctPers.push( fPers );
        }
        
        fPersMax = 1 / fPersMax;
}

function seedOffset() 
{
        iXoffset = iSeed = (iSeed * 16807) % 2147483647;
        iYoffset = iSeed = (iSeed * 16807) % 2147483647;
        iZoffset = iSeed = (iSeed * 16807) % 2147483647;
};
