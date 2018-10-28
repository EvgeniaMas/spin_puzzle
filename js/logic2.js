var sets = 12;
// Shaffle funtion
function shuffle(array) {	
  var currentIndex = array.length, temporaryValue, randomIndex ;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
// creating pieces with numbers;
var theta = [];
var setup = function () {
    var top_line = document.getElementById('top_line');
    
    var bottom_line = document.getElementById('bottom_line');
    var left_line = document.getElementById('left_side');
    var right_line = document.getElementById('right_side');
    var mainHeight = parseInt(window.getComputedStyle(left_line).height.slice(0, -2));
    var mainWidth = parseInt(window.getComputedStyle(top_line).width.slice(0, -2));
    var pieces_in_row = sets/4;
    var horizontal_row= mainWidth/pieces_in_row;    
    var vertical_row = mainHeight/pieces_in_row;

    // console.log(vertical_row);

    // console.log(vertical_row);
    var circletopArray = [];
    var circlebottomArray = [];
    var circleleftArray = [];
    var circlerightArray = [];

    var colors = ['#91ebf8','#90c881', '#f88701'];
    for (var i = 0; i < pieces_in_row; i++) {
        var circle = document.createElement('div');

        circle.className = 'circle number';
        circletopArray.push(circle);              
        circle.style.width = horizontal_row +'px'; 
        circletopArray[i].style.color = colors[0]; 

        top_line.appendChild(circletopArray[i]);
        // $(top_line[0]).text("a");
        var bottom = document.createElement('div');
        bottom.className = 'circle number';
        circlebottomArray.push(bottom);        
        bottom.style.width = horizontal_row +'px';
        circlebottomArray[i].style.color = colors[1];              
        bottom_line.appendChild(circlebottomArray[i]);        
    }

    for (var i = 0; i < pieces_in_row; i++) {
        var lefts = document.createElement('div');
        lefts.className = 'circle number';

        circleleftArray.push(lefts);              
        lefts.style.width = vertical_row +'px'; 
        circleleftArray[i].style.color = colors[2];       
        left_line.appendChild(circleleftArray[i]);
        var rights = document.createElement('div');
        rights.className = 'circle number';
        circlerightArray.push(rights);        
        rights.style.width = vertical_row +'px';
        circlerightArray[i].style.color = colors[0];              
        right_line.appendChild(circlerightArray[i]);        
    }

    $(circletopArray[0]).text("#");
    $(circlebottomArray[0]).text("#"); 
    $(circleleftArray[0]).text("#");
    $(circlerightArray[0]).text("#");

     $(circletopArray[1]).text("1");
    $(circlebottomArray[1]).text("1"); 
    $(circleleftArray[1]).text("1");
    $(circlerightArray[1]).text("1");

    $(circletopArray[2]).text("2"); 
    $(circlebottomArray[2]).text("2"); //диванчик
    $(circleleftArray[2]).text("2");
    $(circlerightArray[2]).text("3");
 
 
// бета/0x33 
// перечеркнутый диванчик /0x32 

}

setup();

// var generate = function(n, rx, ry, id) {
//     var frags = 360 / n;
//     for (var i = 0; i <= n; i++) {
//         theta.push((frags / 180) * i * Math.PI);
//     }
//     setup(n, rx, ry, id)
// }
// generate(sets, 260, 250, 'numbers_field');



//creating pieces with numbers;
// var theta = [];
// var setup = function (n, rx, ry, id) {
//     var main = document.getElementById(id);
//     var mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
//     console.log(mainHeight);
//     var circleArray = [];
//     var colors = ['#91ebf8','#90c881', '#f88701'];
//     for (var i = 0; i < n; i++) {
//         var circle = document.createElement('div');
//         // $(circle[i]).addClass('.number_element');
//         circle.className = 'circle number';
//         circleArray.push(circle);
//         circleArray[i].posx = Math.round(rx * (Math.cos(theta[i]))) + 'px';
//         circleArray[i].posy = Math.round(ry * (Math.sin(theta[i]))) + 'px';
//         circleArray[i].style.position = "absolute";

//         circleArray[i].style.color = colors[2];
//         circleArray[i].style.top = ((mainHeight / 2) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px';
//         circleArray[i].style.left = ((mainHeight/ 2 ) + parseInt(circleArray[i].posx.slice(0, -2))) + 'px';
//         main.appendChild(circleArray[i]);
//     }
// };

// var generate = function(n, rx, ry, id) {
//     var frags = 360 / n;
//     for (var i = 0; i <= n; i++) {
//         theta.push((frags / 180) * i * Math.PI);
//     }
//     setup(n, rx, ry, id)
// }
// generate(sets, 260, 250, 'main');


// Amount of sets and creating an array of numbers
var elements = [];
var current_game_elements =[];
while (sets >= 1) {
elements.push(sets--);
}
//Mixing the numbers for new play
function reset(){
for (var i = 0; i < current_game_elements.length; i++){  
$(elements_blocks[i]).text(current_game_elements[i]); 
}
}

// Считывание из конфигурационного файла 
// function getXmlHttp() {
//     var xmlhttp;
//     try {
//         xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");

//     } catch (e) {
//         try {

//             xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//         } catch (E) {
//             xmlhttp = false;
//         }

//     }
//     if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
//         xmlhttp = new XMLHttpRequest();
//     }
//     return xmlhttp;
// }

// (function () {
//     var xmlhttp = getXmlHttp();
//     xmlhttp.open('GET', 'config.txt', false);
//     xmlhttp.send(null);
//     if (xmlhttp.status == 200) {
//         var response = xmlhttp.responseText;
//                 alert(response);

//     }
// })(); 



function mix(){
shuffle(elements);
current_game_elements = elements;
// for (i=0; i<elements.length; i++){   
//    $('div.circle').style.transform = 'rotate('+180+'deg)';
// }
display();
}
//Displaying the mixed numbers for new play
function display(){

for (var i = 0; i < elements.length; i++){
  
$('div.circle').css({fontFamily: "Code-Bold"});    
$(elements_blocks[i]).text(elements[i]); 
// var a = $(elements_blocks[i]).text(elements[i]); 
}
}

// rotation elements

document.getElementById("pointer").addEventListener("touchmove", function(event) {
  // alert("here");
var pointer = document.getElementById("pointer"),
        rotate_line = document.getElementById("top_line");

        var pointerBox = pointer.getBoundingClientRect(),
        centerPoint = window.getComputedStyle(pointer).transformOrigin,
        centers = centerPoint.split(" ");
        var rotate_lines_element =$('#top_line').find('div.circle');

       

    function rotatePointer(e) {
    var pointerEvent = e;
       if (e.targetTouches && e.targetTouches[0]) {
          e.preventDefault(); 
          pointerEvent = e.targetTouches[0];
          // console.log(pointerEvent);
          mouseX = pointerEvent.pageX;
          mouseY = pointerEvent.pageY;

    } else {
          mouseX = e.clientX,
          mouseY = e.clientY;
    }

        var centerY = pointerBox.top + parseInt(centers[1]) - window.pageYOffset,
        centerX = pointerBox.left + parseInt(centers[0]) - window.pageXOffset,
             radians = Math.atan2(mouseX - centerX, mouseY - centerY),
            degrees = (radians * (180 / Math.PI) * -1) + 180; 
            pointer.style.transform = 'rotate('+degrees+'deg)';
            rotate_line.style.transform = 'rotate('+degrees+'deg)';

            rotate_lines_element.map(function() {
             this.style.transform = 'rotate('+degrees+'deg)';
         });


            
}

// $(pointer).on('touchmove', function(e){
   
//     rotatePointer();
// });
// $(pointer).on('touchstart', function(e){
    
//     rotatePointer();
// });

// window.addEventListener('mousemove', rotatePointer);
pointer.addEventListener('touchmove', rotatePointer);
pointer.addEventListener('touchstart', rotatePointer);
top_line.addEventListener('touchstart', rotatePointer);
top_line.addEventListener('touchmove', rotatePointer);


});

// document.addEventListener("DOMContentLoaded", function() {
//         var pointer = document.getElementById("pointer"),
//         rotate_line = document.getElementById("top_line"),

//         pointerBox = pointer.getBoundingClientRect(),
//         centerPoint = window.getComputedStyle(pointer).transformOrigin,
//         centers = centerPoint.split(" ");
//         var rotate_lines_element =$('#top_line').find('div.circle');



//     function rotatePointer(e) {
//     var pointerEvent = e;
//        if (e.targetTouches && e.targetTouches[0]) {
//           e.preventDefault(); 
//           pointerEvent = e.targetTouches[0];
//           console.log(pointerEvent);
//           mouseX = pointerEvent.pageX;
//           mouseY = pointerEvent.pageY;
//     } else {
//           mouseX = e.clientX,
//           mouseY = e.clientY;
//     }

//         var centerY = pointerBox.top + parseInt(centers[1]) - window.pageYOffset,
//         centerX = pointerBox.left + parseInt(centers[0]) - window.pageXOffset,
//             radians = Math.atan2(mouseX - centerX, mouseY - centerY),
//             degrees = (radians * (180 / Math.PI) * -1) + 180; 
//             pointer.style.transform = 'rotate('+degrees+'deg)';
//             rotate_line.style.transform = 'rotate('+degrees+'deg)';

//             rotate_lines_element.map(function() {
//              this.style.transform = 'rotate('+degrees+'deg)';
//          });


            
// }

// $(pointer).on('touchmove', function(e){
   
//     rotatePointer();
// });
// $(pointer).on('touchstart', function(e){
    
//     rotatePointer();
// });

// window.addEventListener('mousemove', rotatePointer);
// window.addEventListener('touchmove', rotatePointer);
// window.addEventListener('touchstart', rotatePointer);
// });



// creating pieces with numbers;
// var theta = [];
// var setup = function (n, rx, ry, id) {
//     var main = document.getElementById(id);
//     var mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
//     console.log(mainHeight);
//     var circleArray = [];
//     var colors = ['#91ebf8','#90c881', '#f88701'];
//     for (var i = 0; i < n; i++) {
//         var circle = document.createElement('div');
//         console.log(circle);
//         circle.className = 'circle number';
//         circleArray.push(circle);
//         circleArray[i].posx = Math.round(rx * (Math.cos(theta[i]))) + 'px';
//         circleArray[i].posy = Math.round(ry * (Math.sin(theta[i]))) + 'px';
//         circleArray[i].style.position = "absolute";

//         circleArray[i].style.color = colors[2];
//         circleArray[i].style.top = ((mainHeight / 2) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px';
//         circleArray[i].style.left = ((mainHeight/ 2 ) + parseInt(circleArray[i].posx.slice(0, -2))) + 'px';
//         main.appendChild(circleArray[i]);
//     }
// };

// var generate = function(n, rx, ry, id) {
//     var frags = 360 / n;
//     for (var i = 0; i <= n; i++) {
//         theta.push((frags / 180) * i * Math.PI);
//     }
//     setup(n, rx, ry, id)
// }
// generate(sets, 260, 250, 'numbers_field');





//Direction of touch event
// var ts;
// $(document).bind('touchstart', function(e) {
//     ts = e.originalEvent.touches[0].clientY;
// });

// $(document).bind('touchmove', function(e) {
//     var te = e.originalEvent.changedTouches[0].clientY;
//     if (ts > te) {
//        document.getElementById("main").style.transform = "rotate(50deg)";
//     } else {
//         console.log('down');
//     }
// });


// document.getElementById("pointer").addEventListener("touchmove", function(event) {
	
//     var rotation = event.rotation;
//     console.log(rotation);
//     if (!rotation) {
//          rotation = Math.arctan(event.touches[0].pageY - event.touches[1].pageY,
//                event.touches[0].pageX - event.touches[1].pageX) * 180 / Math.PI;
//     }

//     // Take into account vendor prefixes, which I haven't done.
//     this.style.transform = "rotate(" + rotation + "deg)";
// });



// $(document).ready(function(){
// i = $(".parent div").length();
// w = 100/i;
// $(".parent div").css({"width":w+"%"});
// })

// var total_elements =12;
// var wrap_height= 400;
// var wrap_width= 600;

// $(document).ready(function() {
//   for (i=0;i<total_elements/4; i++){

//     var left = wrap_width/3 * i + 'px';   
//     var top =20 + 'px';
//     $('#wrap div').eq(i).css({'top':top,'left':left}); // Устанавливаем значения каждой картинке
//   }

//   for (i=total_elements/4+1;i<total_elements/4+total_elements/4+1; i++){
   
//     var right = wrap_height/3 +20+ 'px'; 
//     console.log(right);  
//     var top =  20 + 'px';
//     $('#wrap div').eq(i).css({'top':top,'right':right}); // Устанавливаем значения каждой картинке
//   }

  //   for (i=5;i<total_elements; i++){

  //   var left = wrap_width/3 +20+ 'px';   
  //   var bottom =20 + 'px';
  //   $('#wrap div').eq(i).css({'bottom':bottom,'left':left}); // Устанавливаем значения каждой картинке
  // }

  // for (i=5;i<total_elements; i++){

  //   var left = wrap_height/3 +20+ 'px';   
  //   var bottom =20 + 'px';
  //   $('#wrap div').eq(i).css({'bottom':bottom,'left':left}); // Устанавливаем значения каждой картинке
  // }
// });




// var num = 12; // Число картинок
// var wrap = 300; // Размер "холста" для расположения картинок
// var radius = 150; // Радиус нашего круга


// функция распределения элементов по кругу
// $(document).ready(function() {
//   for (i=0;i<num; i++){
//     var f = 2 / num * i * Math.PI;  // Рассчитываем угол каждой картинки в радианах
//     var left = wrap + radius * Math.sin(f) + 'px';
//     console.log(left);
//     var top = wrap + radius * Math.cos(f) + 'px';
//     $('#wrap div').eq(i).css({'top':top,'left':left}); // Устанавливаем значения каждой картинке
//   }
// });





// var imagedir="images/topspin/";
// function preload(){
//     this.length=preload.arguments.length;
//     for (var i=0;i<this.length;i++){
//         this[i]=new Image();
//         this[i].src=imagedir+preload.arguments[i];
//     }
// }

// var pics=new preload("ts01.gif","ts02.gif","ts03.gif","ts04.gif","ts05.gif","ts06.gif","ts07.gif",
//                     "ts08.gif","ts09.gif","ts10.gif","ts11.gif","ts12.gif","ts13.gif","ts14.gif",
//                     "ts15.gif","ts16.gif","ts17.gif","ts18.gif","ts19.gif","ts20.gif",
//                     "tsblank.gif",
//                     "tstu1.gif","tstd2.gif",
//                     "tstu2.gif","tstd1.gif",
//                     "../buttons/edit.gif","../buttons/edit2.gif",
//                     "../buttons/solve.gif","../buttons/solve2.gif",
//                     "../buttons/play.gif","../buttons/pause.gif");

var posit = new Array ();
var trn;
var elements_blocks= $('.circle');
// console.log(elements_blocks);
// console.log(elements);    


// function initbrd(){
//     // posit = new Array (0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19);
//      posit = new Array (0,1,2,3,4,5,6);
//      trn=0;
// }
// initbrd();
// var mode = 0;   //0=normal  1=solving scrambled  2=edit  3=solving
// var seq = new Array();
// var edt;


// function left(){
//     if(mode!=4){
//         if(mode>=3) mode=1;
//         if(mode!=2){
//             doleft();
//             display();
//         }
//     }
// }

function left(){
// alert("Lest");
var ary = [8,1,2,3,4,5,6,7];
ary.push(ary.shift());  // results in [1, 2, 3, 4, 5, 6, 7, 8] 
console.log(ary);
}

function right(){
alert("Right");
var ary = [8,1,2,3,4,5,6,7];
ary.push(ary.shift());  // results in [1, 2, 3, 4, 5, 6, 7, 8] 
console.log(ary);
}









// arr.push(i);


// function display(){
//     for (var i=0;i<20;i++)
//         document.images["pc"+i].src=pics[posit[i]].src;

//     if(trn){
//         document.images["top"].src=pics[23].src;
//         document.images["bottom"].src=pics[24].src;
//     }else{
//         document.images["top"].src=pics[21].src;
//         // alert("here!");
//         document.images["bottom"].src=pics[22].src;
//     }
// }



    // displaybut();

    // if(mode==1 && solved()){
    //     alert("You solved it!\nYou don't get a prize for this though!");
    //     mode=0;
    // }


// function displaybut(){
//     if(mode==2) document.images["edit"].src=pics[26].src;
//     else document.images["edit"].src=pics[25].src;
//     if(mode>=3) document.images["solve"].src=pics[28].src;
//     else document.images["solve"].src=pics[27].src;
//     if(mode==4) document.images["play"].src=pics[30].src;
//     else document.images["play"].src=pics[29].src;
// }



// function solved(){
//     c=posit[0];
//     for (var i=1;i<20;i++){
//         c = (c==19)?0:c+1;
//         if(posit[i]!=c) return(false);
//     }
//     return(true);
// }


// function left(){
//     if(mode!=4){
//         if(mode>=3) mode=1;
//         if(mode!=2){
//             doleft();
//             display();
//         }
//     }
// }
// function doleft(){
//     var d=posit[0];
//     for(var i=0;i<19;i++) posit[i]=posit[i+1];
//     posit[19]=d;
// }
// function right(){
//     if(mode!=4){
//         if(mode>=3) mode=1;
//         if(mode!=2){
//             doright();
//             display();
//         }
//     }
// }
// function doright(){
//     var d=posit[19];
//     for(var i=19;i>0;i--) posit[i]=posit[i-1];
//     posit[0]=d;
// }


// function turn(){
//     focus();
//     if(mode!=4){
//         if(mode>=3) mode=1;
//         if(mode!=2){
//             doturn();
//             display();
//         }
//     }
// }
// function doturn(){
//     var d=posit[1]; posit[1]=posit[4]; posit[4]=d;
//     var d=posit[2]; posit[2]=posit[3]; posit[3]=d;
//     trn^=1;
// }



// function reset(){
//     initbrd();
//     mode=0;
//     display();
// }

// function clearbrd(){
    //clear pieces
//     for(i=0;i<20;i++) posit[i]=20;
// }

// function edit(){
//     var i;
//     if(mode!=2) mode=2;
//     clearbrd();
//     edt=0;   //first piece to be placed
//     display();
// }

// function click(x){
//     focus();
//     if(mode==2){  //editing
//         if(posit[x]==20){
//             posit[x]=edt;
//             edt++;
//             if(edt==19){ //filled all but one
//                 mode=1;
//                 //find blank square
//                 for(var i=0;i<20;i++)
//                     if(posit[i]==20){ posit[i]=19; break; }
//             }
//             display();
//         }
//     }else if(x>=1 && x<=4) turn();
// }


// //Play back solution
// var soltimer;
// function solplay(){
//     if(mode==4){
//         // stop the play in progress
//         clearTimeout(soltimer);
//         mode=3;
//         // displaybut();
//     }else if(mode!=2){
//         // start play
//         solve();
//         if(mode==3){
//             mode=4;
//             soltimer=setTimeout("playstep()", 200);
//             // displaybut();
//         }
//     }
// }
// function playstep(){
//     if(mode>=3){
//         mode=4;
//         solve();
//         if(mode>=3) soltimer=setTimeout("playstep()", 200);
//     }else{
//         // displaybut();
//     }
// }

// function solve(){
//     if(mode==0||mode==1){
//         mode=3;
//         seq.length=0;

//         //no solution set up yet. Construct it!
//         //save pieces;
//         var back = new Array();
//         for(var i=0;i<20;i++) back[i]=posit[i];
//         back[20]=trn;

//         //put 1 at start
//         var d=find(0);
//         push(d+20);

//         //Check parity
//         c=0;
//         for(var i=0;i<20;i++){
//             for(var j=i+1;j<20;j++){
//                 if(posit[i]>posit[j])c++;
//             }
//         }
//         if(c&1){
//             //Fix parity by moving 1 one space along.
//             push(17);
//             push(0);
//             push(2);
//         }

//         //Solve 2-16
//         for(i=1;i<=15;i++){
//             var c=find(i);
//             while(c>5){
//                 push(c-4);
//                 push(0);
//                 push(24-c);
//                 c-=3;
//             }
//             if(c==5 && i==15){
//                 push(1);
//                 push(0);
//                 push(19);
//                 c-=3;
//             }
//             if(c==2) { push(0); c++; }
//             if(c==3) {
//                 push(1);
//                 push(0);
//                 push(19);
//                 c++;
//             }
//             if(c==5){
//                 push(2);
//                 push(0);
//                 push(18);
//                 c--;
//             }
//             if(c==4) push(0);
//             push(1);
//         }

//         //Solve final 4 pieces.
//         var c=find(16)-1;
//         var d=find(17)-1;
//         if(d>c)d--;
//         c=c*3+d;

//         var sol=new Array();
//         sol[ 0]=new Array();                           //  17 18 19 20
//         sol[ 1]=new Array(19,19, 1,19, 2,19, 1,18);    //  17 20 18 19
//         sol[ 2]=new Array(18, 2,19, 1,18, 1,19, 1);    //  17 19 20 18
//         sol[ 3]=new Array(18, 1,19, 2,18, 1,19);       //  18 17 20 19
//         sol[ 4]=new Array(18,19, 1,19, 2,19, 1,18);    //  19 17 18 20
//         sol[ 5]=new Array(18, 1, 1,19, 1,19,19, 1);    //  20 17 19 18
//         sol[ 6]=new Array(17, 2,19, 1,18, 1,19, 1);    //  18 19 17 20
//         sol[ 7]=new Array(19,19, 1,19, 1, 1,18, 1);    //  20 18 17 19
//         sol[ 8]=new Array( 0,18, 1,19, 2,18, 1,19);    //  19 20 17 18
//         sol[ 9]=new Array(19,19, 1, 1,19, 1,19,19);    //  18 20 19 17
//         sol[10]=new Array(19,19, 2,19,19, 1,19, 1);    //  19 18 20 17
//         sol[11]=new Array(1);                          //  20 19 18 17

//         for(var i=0; i<sol[c].length; i++){
//             if(sol[c][i]) push(sol[c][i]);
//             push(0);
//         }

//         //put 1 at start
//         var d=find(0);
//         push(d+20);

//         //restore pieces;
//         for(var i=0;i<20;i++) posit[i]=back[i];
//         trn=back[20];
//     }
//     if(mode>=3){
//         //do next move of prerecorded sequence
//         if(seq.length==0) mode=0;
//         else{
//             // var c=seq.shift();
//             var c=seq[0];
//             for(var i=1;i<seq.length;i++) seq[i-1]=seq[i];
//             seq.length--;
//             if(seq.length==0) mode=0;
//             if(c)
//                 for(var i=0;i<c;i++) doleft();       //left
//             else doturn();
//         }
//         display();
//     }
// }

// function find(m){
//     for(var i=0;i<20;i++)
//         if(posit[i]==m)break;
//     return(i);
// }
// function push(m){
//     //adds move m to movelist, and performs move as well
//     if(m) {
//         for(i=0;i<m;i++) doleft();
//         if(seq.length) var c=seq[seq.length-1];
//         else c=0;
//         if(c){
//             c+=m+20;
//             while(c>=20)c-=20;
//             if(c) seq[seq.length-1]=c;
//             else seq.length--;
//         }else{
//             c+=m+20;
//             while(c>=20)c-=20;
//             if(c) seq[seq.length]=c;
//         }
//     }
//     else {
//         doturn();
//         if(seq.length!=0 && seq.length[seq.length-1]==0) seq.length--;
//         else seq[seq.length]=0;
//     }
// }


// var obj = document.getElementById('sat');
// /*Ловим касание*/
// obj.addEventListener('touchstart', function(event) {
// if (event.targetTouches.length == 1) {
// var touch=event.targetTouches[0];
// touchOffsetX = touch.pageX - touch.target.offsetLeft;
// touchOffsetY = touch.pageY - touch.target.offsetTop;
// }
// }, false);
// /*Передвигаем объект*/
// obj.addEventListener('touchmove', function(event) {
// if (event.targetTouches.length == 1) {
// var touch = event.targetTouches[0];
// obj.style.left = touch.pageX-touchOffsetX + 'px';
// obj.style.top = touch.pageY-touchOffsetY + 'px';

// // obj.style.WebkitTransform="translate("+(touch.pageX-touchOffsetX)+"px,"+(touch.pageY-touchOffsetY)+"px)";

// }
// }, false);


// var tarobj=document.getElementById('dro');
// obj.addEventListener('touchend', function(event) {
// if (event.changedTouches.length == 1) {
// var tarWidth=tarobj.offsetWidth;
// var tarHeight=tarobj.offsetHeight;
// var tarX=tarobj.offsetLeft;
// var tarY=tarobj.offsetTop;
// if(
// (event.changedTouches[0].pageX > tarX) &&
// (event.changedTouches[0].pageX < (tarX + tarWidth)) &&
// (event.changedTouches[0].pageY > tarY) &&
// (event.changedTouches[0].pageY < (tarY + tarHeight))){
// /*Мы над объектом tarobj*/
// }
// }
// }, false);


// // Обработчик мультитача 
// function multitouch(event) { 
//     // Подавить событие 
//     event.preventDefault(); 
//     // Обработать массив с координатами нажатий 
//     for (var i=0; i<event.touches.length; i++) { 
//         // Получить координаты каждого нажатия 
//         var left=event.touches[i].pageX; 
//         var top=event.touches[i].pageY; 
//         // Выполнить с ними нужные действия 
//     } 
// }

// function move_object(event) { 
//     // alert("here");

//     // Подавить событие 
//     event.preventDefault(); 
//     var left=event.touches[0].pageX; 
//     var top=event.touches[0].pageY;
//     // alert(left);
//     //  alert(top);

//     // Переместить элемент 
//     var el=document.getElementById('floating'); 
//     // alert(el);
//     el.style.top=top++ +'px'; 
//     el.style.left=left++ +'px'; 
//      // alert(left);
//      // alert(top);
// }  

// var touch_position; // Координата нажатия 
  
// function turn_start(event) { 
//     // При начальном нажатии получить координаты 
//     touch_position = event.touches[0].pageX; 
// } 
// function turn_page(event) { 
//     // При движении нажатия отслеживать направление движения 
//     var tmp_move = touch_position-event.touches[0].pageX; 
//     // Сдвиг достаточный? 
//     if (Math.abs(tmp_move)<10) { return false; } 
//     if (tmp_move<0) { 
//         // Листаем вправо 
//     } 
//     else { 
//         // Листаем влево 
//     } 
// } 


function help(){

    alert(
        "Topspin puzzle"+
        "The goal og game is to arrange the numbers in right order\n"
    );
}

// -->
