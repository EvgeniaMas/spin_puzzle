var game_field = document.getElementById('numbers_field');//game board
var symbols = document.getElementsByClassName('symbol_text');//symbols 
var number_text = document.getElementsByClassName('number_text');//numbers opened
var top_line =   document.getElementById('top_line');//rotation_line
var elements_blocks_array = [];// created pieces on game board
var numbers = []; //right sequence of numbers
var sets_position =[];// game sets x,y
var top_sets = [];// set of top line for rotation
var current_game_elements =[]; //sequence for current game
var item_set; //HTML collection of created items
var sets = 12; //fixed amount of game set
var config_data// configuration colors, symbols
var game_disabled = document.getElementById('game_disabled_layout');
// buttons and state
var start_button = document.getElementById('start_game');
var reset_button = document.getElementById('reset');
var solved_button = document.getElementById('solved_puzzle');
start_button.disabled = false;
reset_button.disabled = true;
solved_button.disabled = true;
// creating pieces;
function initial_state() { 
    var mainWidth = parseInt(window.getComputedStyle(game_field).width.slice(0, -2));
    var pieces_in_row = sets/4;
    // var horizontal_row= mainWidth/pieces_in_row; 
    for (var i = 0; i < sets; i++) {
        var game_pieces = document.createElement('div');
        game_pieces.className = 'item pos-' +i;
        game_pieces.setAttribute('id', i); 
        game_pieces.setAttribute('draggable', true);        
        elements_blocks_array.push(game_pieces);              
        // game_pieces.style.width = horizontal_row +'px';       
        game_pieces.innerHTML = '<div class="item_wrapper"><div class="side back"><p class="symbol_text">3</p></div><div class="side front"><p class="number_text">1</p></div></div>';
        
     }     
      // add to the the DOM pieces
      for (var r=0; r<12; r++){
         game_field.appendChild(elements_blocks_array[r]);
      }          
  }
 //setting games initia state
initial_state();     
function right_sequence(){
    var j =1;
     while (j <= sets) {
     numbers.push(j++);
   } 
}
right_sequence();
// checking for config file
config_data = JSON.parse(data);
var default_data = [
      ['#91ebf8', '#'],['#91ebf8', '2'],
      ['#91ebf8', '3'],['#91ebf8', '3'],
      ['#f88701', '#'],['#f88701', '2'],
      ['#f88701', '1'],['#f88701', '3'],
      ['#90c881', '#'],['#90c881', '2'],
      ['#90c881', '3'],['#90c881', '3']
    ]; 
// TO USE CONFIG FILE DELETE "!", SO (config_data)   
  if(!config_data){ 
  for (var i=0; i<sets; i++){   
      symbols[i].style.color = config_data[i].color;
      number_text[i].style.color = config_data[i].color;      
      symbols[i].innerText = config_data[i].symbol;
     }
  }
   else{
    for (var i=0; i<sets; i++){   
      symbols[i].style.color = default_data[i][0];
      number_text[i].style.color = default_data[i][0];      
      symbols[i].innerText = default_data[i][1];
     }
   }
item_set = document.getElementsByClassName('item');
document.addEventListener('DOMContentLoaded', set_coodinates);
function set_coodinates (){
 for (i=0; i<sets; i++){
   var posX = item_set[i].offsetTop; 
   var posY = item_set[i].offsetLeft; 
   var coord = [posX, posY];
   sets_position.push(coord); 
  }
}
//rotate pieces right
function rotate_right(){
for (var i=0; i<sets; i++){
 var index= parseInt(item_set[i].getAttribute('id'));
  var new_index; 
  if( index==11){
    new_index =0;
  }
  else{
    new_index = index+1;
  }
  setTimeout(function(){
    item_set[i].style.left = sets_position[new_index][1]+ 'px';
    item_set[i].style.top = sets_position[new_index][0]+ 'px';  
       }, 2500)  
  
  item_set[i].setAttribute('id', new_index);
  }  	
}
//rotate pieces left
function rotate_left(){
for (var i=0; i<sets; i++){
 var index= parseInt(item_set[i].getAttribute('id'));
  var new_index; 
  if( index==0){
    new_index =11;
  }
  else{
    new_index = index-1;
  } 
  setTimeout(function(){
  item_set[i].style.left = sets_position[new_index][1]+ 'px';
  item_set[i].style.top = sets_position[new_index][0]+ 'px';
  }, 2500)    
  item_set[i].setAttribute('id', new_index);
  }  	
}
// Shaffle number funtion
function shuffle(array) {	
  var currentIndex = array.length, temporaryValue, randomIndex ;  
  while (0 !== currentIndex) {   
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;   
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//peventiong dbclicks
game_field.dbclick = 
function() { 
  return false;
} 
//Mixing the numbers for new game
function mix(){  
// shuffle(numbers);
var color_size = 4; 
var numbers_parts = []; 
for (var i = 0; i <Math.ceil(numbers.length/color_size); i++){
    numbers_parts[i] = numbers.slice((i*color_size), (i*color_size) + color_size);
}
var parts=[];
   //ascending array_parts
    for (var i =0; i<numbers_parts.length; i++){
      numbers_parts[i].sort(function (a, b) {
    return a - b;
     });
      parts.push(numbers_parts[i]);
    }
    //new joined an ordered array to display
    numbers= parts.reduce(function(joined, current) {
     return joined.concat(current);
    }, []);
   item_set = document.getElementsByClassName('item');
   current_game_elements = numbers;
   display();
}
function display(){
   for (var i = 0; i < numbers.length; i++){ 
       number_text[i].innerText= numbers[i];
    }  
}
// rotation elements
var wheel = document.getElementById('wheel');
var wheelBox = wheel.getBoundingClientRect();
var centerPoint = window.getComputedStyle(wheel).transformOrigin;
var centers = centerPoint.split(" ");
var rotate_lines_element =$('#top_line').find('.item');
var degrees=0// angle of rotation
var initial_degrees =0;

function rotateWheel(e) {
    var wheelEvent = e;
       if (e.targetTouches && e.targetTouches[0]) {
          e.preventDefault(); 
          wheelEvent = e.targetTouches[0];        
          mouseX = wheelEvent.pageX;
          mouseY = wheelEvent.pageY;
    } else {
          mouseX = e.clientX,
          mouseY = e.clientY;
    }
    var centerY = wheelBox.top + parseInt(centers[1]) - window.pageYOffset;
    var centerX = wheelBox.left + parseInt(centers[0]) - window.pageXOffset;
    var radians = Math.atan2(mouseX - centerX, mouseY - centerY);
    degrees = (radians * (180 / Math.PI) * -1) + 180;
    // console.log(180-degrees);
    wheel.style.transform = 'rotate('+degrees+'deg)';
    top_line.style.transform = 'rotate('+degrees+'deg)';
    number_text[0].style.transform = 'rotate('+degrees+'deg)';
    number_text[1].style.transform = 'rotate('+degrees+'deg)';
    number_text[2].style.transform = 'rotate('+degrees+'deg)';

    

   // var arr = [1,2,3,4,5,6];
   // arr[1] = arr.splice(0,1, arr[1])[0];

  
   // console.log( elements_blocks_array);
//console.log(arr)

    if(degrees>91 && degrees<181){
        // alert("here");
       	// var id_0 = item_set[0].getAttribute('id');
       	// var id_2 = item_set[2].getAttribute('id');
       	// item_set[2].setAttribute('id', id_0);
       	// item_set[0].setAttribute('id', id_2);

       	// alert(id_0);
       	// alert(id_2);

       	// var id_0 = number_text[0].innerText;
       	// var id_2 = number_text[2].innerText;
       	// number_text[2].innerText =  id_0;
       	// number_text[0].innerText = id_2;



    }
        
  
} 

var top_line_elements = [];
var converted_to_arr = Array.prototype.slice.call(item_set);
function append_top_line() {
// console.log(top_line_elements);

// find top_line pieces
  for (var j=0; j<12; j++){
      if($(converted_to_arr[j]).attr('id')<3) { 
      //fix them when rotating;
         top_line_elements.push($(converted_to_arr[j]));
         // console.log($(converted_to_arr[j]));

        top_line.appendChild(converted_to_arr[j]);
      }
    }
    // console.log(top_line_elements);
    // var top_line_elements = [];
    // var converted_to_arr= [];
    // console.log(top_line_elements);
}
// function append_top_line_field() {

	// alert("here");
    //  game_field.appendChild(item_set[0]);
    // game_field.appendChild(item_set[1]);
    // game_field.appendChild(item_set[2]);

      // for (var j=0; j<3; j++){
      //    game_field.appendChild(elements_blocks_array[j]);
      // }
// }
function change_top_line() {

	for (var j=0; j<12; j++){
      if($(converted_to_arr[j]).attr('id')<3) { 
      //fix them when rotating;
         top_line_elements.push($(converted_to_arr[j]));
         // console.log($(converted_to_arr[j]));

        game_field.appendChild(converted_to_arr[j]);
      }
    }

	// console.log(number_text[0].innerText);
	// console.log(number_text[1].innerText);
	// console.log(number_text[2].innerText);
	// alert("here");
    // for(var i; i<3; i++){
    game_field.appendChild(item_set[0]);
    game_field.appendChild(item_set[1]);
    // game_field.appendChild(item_set[2]);
    	// console.log(converted_to_arr[i]);
    // }

    // alert("Done");
	
	   // alert(degrees);
       // if(degrees>91 && degrees<181){
        // alert("here");
       	// var id_0= set_item[0].getAttribute('id');
       	// var id_2 = set_item[2].getAttribute('id');
       	// alert(id_0);
       	// alert(id_2);
       	  // var first_top_item= number_text[0].innerText;          
          // var second_top_item = number_text[2].innerText;
          // console.log(elements_blocks_array);
          // number_text[2].innerText=first_top_item;
          // number_text[0].innerText=second_top_item;
          // console.log(top_line_elements);
          var first_top_item= item_set[0];          
          var second_top_item = item_set[2];
          item_set[0] = second_top_item
          item_set[2] = first_top_item;
          for (var i =0; i<3; i++){
          	game_field.appendChild(top_line_elements[i]);
          }
          
          console.log(top_line_elements);
          // number_text[2].innerText=first_top_item;
          // number_text[0].innerText=second_top_item;

          // game_field.appendChild(item_set[0]);
          // game_field.appendChild(item_set[1]);
          // game_field.appendChild(item_set[2]);
          


          // }
       }      
top_pointer.addEventListener('touchmove', rotateWheel);
top_pointer.addEventListener('touchstart', append_top_line, rotateWheel);
top_pointer.addEventListener('touchend',  change_top_line);



//defining a direction of set rotation
var initial_touch;
// item_set.addEventListener('touchstart', function(e) {
//   initial_touch = e.originalEvent.touches[0].clientX;
//   // console.log(initial_touch);
// });

// var currentX;
// var lastX = 0;
// var lastT;
// $('.item').bind('touchstart', function(e) {
//     // If still moving clear last setTimeout
//     clearTimeout(lastT);
//     var callback = function () {
//         console.log(1);
//     };

//     initial_touch = e.originalEvent.touches[0].clientX;

//     // After stoping or first moving
//     if(lastX == 0) {
//         lastX = initial_touch;
//     }

//     if(initial_touch < lastX) {
//         // alert("hi left");
//         rotate_left();
//         callback();
//     } else if(initial_touch > lastX){
//         // alert("hi right");
//         rotate_right();
//         callback();
//     }

//     // Save last position
//     lastX = initial_touch;

//     // Check if moving is done
//     lastT = setTimeout(function() {
//         lastX = 0;
//     }, 100);
// });




$('.item').bind('touchstart', function(e) {
	// alert("here");
    initial_touch = e.originalEvent.touches[0].clientX;
    console.log(initial_touch);
});

$('.item').on('touchstart', function(e) {
    var touch_offset = e.originalEvent.changedTouches[0].clientX;
     // console.log(touch_offset);
    if (initial_touch > touch_offset) {
    //  setInterval(function() {
      rotate_left();
   // }, 1500);	
     
     } else {
     	// alert("right");
       rotate_right();
    }
});  
start_button.addEventListener('click', function() { 
  var count=0;
  if(count>1){   
    initial_state();
    // game_disabled.style.display ='none';
    $(document).find('.item').removeClass('flip'); 
    $(document).find('.item').addClass('flip'); 
    mix();      
  }
  else{
   mix();
   $(document).find('.item').addClass('flip');  
   // game_disabled.style.display ='none';
   count++;              
  }
   
   start_button.disabled = true;
   reset_button.disabled = false;
   solved_button.disabled = false;  
      

});
solved_button.addEventListener('click', function() {
  var solved_sequence = [];
  var j =1;
     while (j <= sets) {
     solved_sequence.push(j++);
   } 
  for (var i = 0; i < solved_sequence.length; i++){ 
    $(number_text[i]).text(solved_sequence[i]);
    }  
    setInterval(function() {
     $(document).find('.item').removeClass('flip');  
     }, 500);
     start_button.disabled = false;
     reset_button.disabled = true;
     solved_button.disabled = true;
     game_disabled.style.display ='block';

});
reset_button.addEventListener('click', function() { 
  for (var i = 0; i < current_game_elements.length; i++){ 
      $(number_text[i]).text(current_game_elements[i]);
    } 
});


// var currentX;
// var lastX = 0;
// var lastT;
// $(document).bind('touchmove', function(e) {
//     // If still moving clear last setTimeout
//     clearTimeout(lastT);

//     currentX = e.originalEvent.touches[0].clientX;

//     // After stoping or first moving
//     if(lastX == 0) {
//         lastX = currentX;
//     }

//     if(currentX < lastX) {
//         // Left
//     } else if(currentX > lastX){
//         // Right
//     }

//     // Save last position
//     lastX = currentX;

//     // Check if moving is done
//     lastT = setTimeout(function() {
//         lastX = 0;
//     }, 100);
// });