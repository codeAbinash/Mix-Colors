$(document).ready(function(){
    var cyanSlider =   $("#body #cyanSlider");
    var mazentaSlider =   $("#body #mazentaSlider");
    var yellowSlider =   $("#body #yellowSlider");
    var blackSlider = $("#body #blackSlider");
    var redSlider = $("#body #redSlider");
    var greenSlider = $("#body #greenSlider");
    var blueSlider = $("#body #blueSlider");
    var alphaSlider = $("#body #alphaSlider");
    var CMYK = ["50","50","50","50"];
    var RGB = ["0","0","0","1"];
    var HEX = ["0","0","0"];
    
    
  cyanSlider.on("input", function(){
      $("#body #cyan").text("Cyan " + cyanSlider.val() + "%");
      CMYKto();
  });
  mazentaSlider.on("input", function(){
      $("#body #mazenta").text("Mazenta " + mazentaSlider.val() + "%");
      CMYKto();
  });
  yellowSlider.on("input", function(){
      $("#body #yellow").text("Yellow " + yellowSlider.val() + "%");
      CMYKto();
  });
  blackSlider.on("input", function(){
      $("#body #black").text("Black " + blackSlider.val() + "%");
      CMYKto();
  });
  
  ////////RGB
  redSlider.on("input", function(){
      $("#body #red").text("Red: " + redSlider.val());
      RGBto();
  });
  greenSlider.on("input", function(){
      $("#body #green").text("Green: " + greenSlider.val());
      RGBto();
  });
  blueSlider.on("input", function(){
      $("#body #blue").text("Blue: " + blueSlider.val());
      RGBto();
  });
  alphaSlider.on("input", function(){
      $("#body #alpha").text("Alpha " + alphaSlider.val() + "%");
      RGBto();
  });
  
    
  function checkZero(i){
     if(String(i).length == 1)
       return "0" + i;
     else
       return String(i);
  }
  
  
  
  
  
  //////INPUT IN THE TEXT/////
  $("#body #HEXdiv input").on("input", function(){
     var code = $(this).val();
     code = code.toLowerCase();
     var codeChar = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
     if(code[0] !== "#"){
        $(this).val("#");
     }
     var LC = code.charAt(code.length - 1);
     var checkCode = "nom"
     for(i=0;i<16;i++){
        if(LC !== codeChar[i]){
           checkCode = "nom";
        }else{
           checkCode = "yem";
           break;
        }
     }
     if(checkCode == "nom"){
       $("#body #HEXdiv input").val($("#body #HEXdiv input").val().substring(0,code.length-1));
     }
     if($("#body #HEXdiv input").val().length > 7){
               $("#body #HEXdiv input").val($("#body #HEXdiv input").val().substring(0,7));
     }
     
     HEXto($("#body #HEXdiv input").val());
  
  });
  //////////////////////////
  
  function HEXto(i){
       document.getElementById("colorBox").style.backgroundColor=i;
       r = parseInt((i[1] + "" + i[2]),16);
       g = parseInt((i[3] + "" + i[4]),16);
       b = parseInt((i[5] + "" + i[6]),16);
       $("#body #redSlider").val(r);
       $("#body #greenSlider").val(g);
       $("#body #blueSlider").val(b);
       var c = RgbToCmyk(r,g,b);
       $("#body #cyanSlider").val(Math.round(c[0]*100));
       $("#body #mazentaSlider").val(Math.round(c[1]*100));
       $("#body #yellowSlider").val(Math.round(c[2]*100));
       $("#body #blackSlider").val(Math.round(c[3]*100));
       $("#body #coloraCode").text($("#body #HEXdiv input").val());
       $("#body #cyan").text("Cyan " + Math.round(c[0]*100) + "%");
       $("#body #mazenta").text("Mazenta " + Math.round(c[1]*100) + "%");
       $("#body #yellow").text("Yellow " + Math.round(c[2]*100) + "%");
       $("#body #black").text("Black " + Math.round(c[3]*100) + "%");
       $("#body #red").text("Red " + r);
       $("#body #green").text("Green " + g);
       $("#body #blue").text("Blue " + b);
  }
  function RGBto() {
     RGB[0] = redSlider.val();
     RGB[1] = greenSlider.val();
     RGB[2] = blueSlider.val();
     document.getElementById("colorBox").style.backgroundColor="rgb("+RGB[0]+","+RGB[1]+","+RGB[2]+","+RGB[3]+")";
     r = checkZero(Number(RGB[0]).toString(16));
     g = checkZero(Number(RGB[1]).toString(16));
     b = checkZero(Number(RGB[2]).toString(16));
     $("#body #coloraCode").text("Color Code : #"+ r + g + b);
     $("#body #HEXdiv input").val("#" + r + g + b)
     var c = RgbToCmyk(RGB[0], RGB[1],RGB[2]);
     $("#body #cyanSlider").val(Math.round(c[0]*100));
     $("#body #mazentaSlider").val(Math.round(c[1]*100));
     $("#body #yellowSlider").val(Math.round(c[2]*100));
     $("#body #blackSlider").val(Math.round(c[3]*100));
     $("#body #cyan").text("Cyan " + Math.round(c[0]*100) + "%");
     $("#body #mazenta").text("Mazenta " + Math.round(c[1]*100) + "%");
     $("#body #yellow").text("Yellow " + Math.round(c[2]*100) + "%");
     $("#body #black").text("Black " + Math.round(c[3]*100) + "%");
  }
  
  
  
  
  function RgbToCmyk(R,G,B)
  {
      if ((R == 0) && (G == 0) && (B == 0)) {
          return [0, 0, 0, 1];
      } else {
          var calcR = 1 - (R / 255),
              calcG = 1 - (G / 255),
              calcB = 1 - (B / 255);
          var K = Math.min(calcR, Math.min(calcG, calcB)),
              C = (calcR - K) / (1 - K),
              M = (calcG - K) / (1 - K),
              Y = (calcB - K) / (1 - K);
          return [C, M, Y, K];
      }
  }
  
  
  function CMYKto(){
     CMYK[0] = cyanSlider.val();
     CMYK[1] = mazentaSlider.val();
     CMYK[2] = yellowSlider.val();
     CMYK[3] = blackSlider.val();
     for(i=0;i<3;i++){
        RGB[i] = Math.round(255*(1-(CMYK[i]/100))*(1-(CMYK[3]/100)));
        HEX[i] = checkZero(RGB[i].toString(16));
     }
    $("#body #redSlider").val(RGB[0]);   $("#body #greenSlider").val(RGB[1]);    $("#body #blueSlider").val(RGB[2]);
    document.getElementById("colorBox").style.backgroundColor="rgb(" + RGB + ")";
    var d = HEX[0]+""+HEX[1]+""+HEX[2];
    $("#body #coloraCode").text("Color Code : #"+d);
    $("#body #HEXdiv input").val("#" + d);
    $("#body #red").text("Red " + RGB[0]);
    $("#body #green").text("Green " + RGB[1]);
    $("#body #blue").text("Blue " + RGB[2]);
  }
  
  
  
  
  
  
  
  //Change Input Type
  $("#body #optionDiv p").click(function(){
     clearOptioSelection($(this));
  });
  
  
  function clearOptioSelection(i){
     $("#body #optionDiv p").css({
         "color":"white",
         "background":"transparent"
      });
      i.css({
         "color":"black",
         "background":"#ffd117"
      });
      
      var animSpeed = 400;
      switch(i.text()){
        case "CMYK": $("#body #RGBdiv").hide(animSpeed);
                     $("#body #HEXdiv").hide(animSpeed);
                     $("#body #CMYKdiv").show(animSpeed);
                     ;break;
        case "RGB": $("#body #RGBdiv").show(animSpeed);
                     $("#body #HEXdiv").hide(animSpeed);
                     $("#body #CMYKdiv").hide(animSpeed);
                     ;break;
        case "HEX": $("#body #RGBdiv").hide(animSpeed);
                     $("#body #HEXdiv").show(animSpeed);
                     $("#body #CMYKdiv").hide(animSpeed);
                     ;break;
      }
  
  }
  });
  
  