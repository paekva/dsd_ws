/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/uacss",["./dom-geometry","./_base/lang","./domReady","./sniff","./_base/window"],function(g,h,m,a,d){var e=d.doc.documentElement;d=a("ie");var b=a("opera"),k=Math.floor,l=a("ff"),n=g.boxModel.replace(/-/,""),b={dj_quirks:a("quirks"),dj_opera:b,dj_khtml:a("khtml"),dj_webkit:a("webkit"),dj_safari:a("safari"),dj_chrome:a("chrome"),dj_gecko:a("mozilla"),dj_ios:a("ios"),dj_android:a("android")};d&&(b.dj_ie=!0,b["dj_ie"+k(d)]=!0,b.dj_iequirks=a("quirks"));l&&(b["dj_ff"+k(l)]=!0);b["dj_"+n]=
!0;var c="",f;for(f in b)b[f]&&(c+=f+" ");e.className=h.trim(e.className+" "+c);m(function(){if(!g.isBodyLtr()){var a="dj_rtl dijitRtl "+c.replace(/ /g,"-rtl ");e.className=h.trim(e.className+" "+a+"dj_rtl dijitRtl "+c.replace(/ /g,"-rtl "))}});return a});
//@ sourceMappingURL=uacss.js.map