$('#start_game').click( function() {
  if($(document).find('.item').hasClass('flip')) { 
    $(document).find('.item').removeClass('flip');

  } else {
    $(document).find('.item').addClass('flip');
  }
})
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
    var symbols = document.getElementsByClassName('symbol_text');
    var numbers = document.getElementsByClassName('number_text');
    var circletopArray = [];
    var circlebottomArray = [];
    var circleleftArray = [];
    var circlerightArray = [];
    var colors = ['#91ebf8','#90c881', '#f88701'];
    for (var i = 0; i < pieces_in_row; i++) {
        var top = document.createElement('div');
        top.className = 'item';
        top.innerHtml= '<div class="side back"><p class="symbol_text">1</p></div><div class="side front"><p class="number_text">1</p></div>';
        circletopArray.push(top);              
        top.style.width = horizontal_row +'px'; 
        circletopArray[i].style.color = colors[0]; 
        top.innerHTML = '<div class="side back"><p class="symbol_text">2</p></div><div class="side front"><p class="number_text">33</p></div>';
        top_line.appendChild(circletopArray[i]);      
        var bottom = document.createElement('div');
        bottom.className = 'item';
        bottom.innerHTML = '<div class="side back"><p class="symbol_text">3</p></div><div class="side front"><p class="number_text">33</p></div>';
        circlebottomArray.push(bottom); 
        bottom.style.width = horizontal_row +'px';
        symbols[i].style.color = colors[1];
        numbers[i].style.color = colors[0];              
        bottom_line.appendChild(circlebottomArray[i]);
    }

        for (var i = 0; i < pieces_in_row; i++) {
        var lefts = document.createElement('div');
        lefts.className = 'item';
        lefts.innerHTML = '<div class="side back"><p class="symbol_text">#</p></div><div class="side front"><p class="number_text">33</p></div>';
        circleleftArray.push(lefts);              
        lefts.style.width = horizontal_row +'px'; 
        circleleftArray[i].style.color = colors[1];         
        left_line.appendChild(circleleftArray[i]); 
        
        var rights = document.createElement('div');
        rights.className = 'item';
        rights.innerHTML = '<div class="side back"><p class="symbol_text">#</p></div><div class="side front"><p class="number_text">33</p></div>';
        circlerightArray.push(rights);              
        rights.style.width = horizontal_row +'px'; 
        circlerightArray[i].style.color = colors[1];         
        right_line.appendChild(circlerightArray[i]);   
    }


    // $(circletopArray[0]).text("#");
    // $(circlebottomArray[0]).text("#"); 
    // $(circleleftArray[0]).text("#");
    // $(circlerightArray[0]).text("#");
    //  $(circletopArray[1]).text("1");
    // $(circlebottomArray[1]).text("1"); 
    // $(circleleftArray[1]).text("1");
    // $(circlerightArray[1]).text("1");
    // $(circletopArray[2]).text("2"); 
    // $(circlebottomArray[2]).text("2"); //диванчик
    // $(circleleftArray[2]).text("2");
    // $(circlerightArray[2]).text("3");
 
 
// // бета/0x33 
// // перечеркнутый диванчик /0x32 

}

setup();



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



    // $(function(){
    //   $(".card").flip({
    //     trigger: "click"
    //   });
    // });
var elements_blocks= $('.number_text');
var elements = [];
var current_game_elements =[];
// while (sets >= 1) {
// elements.push(sets--);
// }
var j =1;
while (j <= sets) {
elements.push(j++);
}


// console.log(elements);

var posit = [0, 1, 2, 3, 4, 5, 8, 7, 6, 11, 10, 9];
//Mixing the numbers for new play
function reset(){
for (var i = 0; i < current_game_elements.length; i++){  
$(elements_blocks[i]).text(current_game_elements[i]); 
}
}
function mix(){
// shuffle(elements);
// console.log(elements);
current_game_elements = elements;
// console.log(elements);
// for (i=0; i<elements.length; i++){   
//    $('div.circle').style.transform = 'rotate('+180+'deg)';
// }
display();
}
function left(){
elements.push(elements.shift());  
display();
}
function right(){
var last_element = elements.pop();    
elements.unshift(last_element); 
// console.log(elements); 
display();
}
//Displaying the mixed numbers for new play
function display(){
for (var i = 0; i < elements.length; i++){ 
$(elements_blocks[i]).text(elements[i]);
}

var bottom_line = document.getElementById('bottom_line'); 
var number_merge = $(bottom_line).find('.number_text');
var a= $(number_merge[0]).text();
var b = $(number_merge[2]).text();
$(number_merge[2]).text(a);
$(number_merge[0]).text(b);
var left_line = document.getElementById('left_side');
var number_merges = $(left_line).find('.number_text');
var c= $(number_merges[0]).text();
var d = $(number_merges[2]).text();
$(number_merges[2]).text(c);
$(number_merges[0]).text(d);
}

// rotation elements
document.addEventListener("DOMContentLoaded", function() {
var pointer = document.getElementById("pointer"),
        rotate_line = document.getElementById("top_line");
        var top_pointer = document.getElementById("top_pointer");
        var bottom_pointer = document.getElementById("bottom_pointer");
        var pointerBox = pointer.getBoundingClientRect(),
        centerPoint = window.getComputedStyle(pointer).transformOrigin,
        centers = centerPoint.split(" ");
        var rotate_lines_element =$('#top_line').find('.number_text');
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
// window.addEventListener('mousemove', rotatePointer);
// bottom_pointer.addEventListener('touchmove', rotatePointer);
// bottom_pointer.addEventListener('touchstart', rotatePointer);
top_pointer.addEventListener('touchmove', rotatePointer);
top_pointer.addEventListener('touchstart', rotatePointer);
// pointer.addEventListener('touchmove', rotatePointer);
// pointer.addEventListener('touchstart', rotatePointer);
// top_line.addEventListener('touchstart', rotatePointer);
// top_line.addEventListener('touchmove', rotatePointer);
});

function help(){

    alert(
        "Topspin puzzle"+
        "The goal og game is to arrange the numbers in right order\n"
    );
}

// var item_set = e.target.getElementsByClassName('item');

// item_set.addEventListener('touchmove', rotateSet);
// item_set.addEventListener('touchstart', rotateSet);


// function rotateSet(){
  var ts;
$('.item').bind('touchstart', function(e) {
    ts = e.originalEvent.touches[0].clientY;
});

$('.item').bind('touchmove', function(e) {
    var te = e.originalEvent.changedTouches[0].clientY;
    if (ts > te) {
        // if ($(e.target).hasClass('.item')){

            var isResizeble = false;

if(!isResizeble) {
  
 left();

isRezeble = true;
}
        
        
        console.log('up');
    // }
       // document.getElementById("").style.transform = "rotate(50deg)";
    } else {
        right();
        console.log('down');
    }
});  
// }
