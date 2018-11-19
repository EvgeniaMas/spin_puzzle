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
  for (var i = 0; i < sets; i++) {
        var game_pieces = document.createElement('div');
        game_pieces.className = 'item pos-' +i;
        game_pieces.setAttribute('id', i); 
        game_pieces.setAttribute('draggable', true);        
        elements_blocks_array.push(game_pieces); 
        game_pieces.innerHTML = '<div class="side back"><p class="symbol_text">3</p></div><div class="side front"><p class="number_text">1</p></div>';
        
     }     
      // add to the the DOM pieces
      for (var r=0; r<12; r++){
         game_field.appendChild(elements_blocks_array[r]);
      }          
  }
 //setting games initial state
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
var rotate_lines_element =document.getElementsByClassName('changeble');
var degrees=0// angle of rotation
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

    if(degrees>91 && degrees<181){
    }       
  
} 
var top_line_elements = [];
var converted_to_arr = Array.prototype.slice.call(item_set);
function append_top_line() {
// find top_line pieces
  for (var j=0; j<12; j++){
      if($(converted_to_arr[j]).attr('id')<3) { 
        $(converted_to_arr[j]).addClass('changeble');
      //fix them when rotating;
        top_line_elements.push($(converted_to_arr[j]));
        top_line.appendChild(converted_to_arr[j]);
      }
    }    
}
function change_top_line() {
  var changeble_numbers = document.getElementsByClassName('changeble');
  var first_top_item = $(top_line_elements[0]).find('.number_text').text();
  var third_item = $(top_line_elements[2]).find('.number_text').text();
  $(top_line_elements[0]).find('.number_text').text(third_item);
  $(top_line_elements[2]).find('.number_text').text(first_top_item);
  
	for (var j=0; j<12; j++){
      if(converted_to_arr[j].getAttribute('id')<3) {
       $(converted_to_arr[j]).removeClass('changeble');
       game_field.appendChild(converted_to_arr[j]); 
      }
    }
    //reset top_elements_set
    top_line_elements =[];
    degrees =0;
    // alert(180-degrees);
    rotated_degrees = 180-degrees;
    top_line.style.transform = 'rotate('+ 0 +'deg)';
}

top_pointer.addEventListener('touchmove', rotateWheel);
top_pointer.addEventListener('touchstart', append_top_line, rotateWheel);
top_pointer.addEventListener('touchend',  change_top_line);
//defult rotate direction 
var touch_direction = 'left';
//listen on player touch piece of game
$('.item').on('touchstart', startTouchHandler);        
$('.item').on('touchmove', moveTouchHandler);
// defining ccordinates and rotate of pieces handlings
var xDown = null;                                                        
var yDown = null;                                                        
function startTouchHandler(e) {                                      
    xDown = e.originalEvent.touches[0].clientX;                                      
    yDown = e.originalEvent.touches[0].clientY;                                      
}; 
function moveTouchHandler(e) { 
    if ( ! xDown || ! yDown ) {
        return;
    }
    var xUp = e.originalEvent.touches[0].clientX;                                    
    var yUp = e.originalEvent.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp; 
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
          rotate_items('left');
        } else {
          rotate_items('right');
        }  
      } else {
        if ( yDiff > 0 ) {
           rotate_items('right'); 
        } else { 
           rotate_items('left');
        }                                                                 
    }
      // to default                    
    xDown = null;
    yDown = null;                                             
};
//rotate pieces on particular direction
function rotate_items(touch_direction){
for (var i=0; i<sets; i++){
var index= parseInt(item_set[i].getAttribute('id'));
  var new_index; 
  if( index==0 && touch_direction =='left'){
    new_index =11;
  }
  if( index!=0 && touch_direction =='left'){
    new_index = index-1;
  }
  if( index==11 && touch_direction =='right'){
    new_index =0;
  }
    if( index!=11 && touch_direction =='right'){
    new_index = index+1;
  }  
  item_set[i].style.left = sets_position[new_index][1]+ 'px';
  item_set[i].style.top = sets_position[new_index][0]+ 'px'; 
  // reset ids of pieces   
  item_set[i].setAttribute('id', new_index);
  }   
}
//buttons handlings 
start_button.addEventListener('click', function() { 
  var count=0;
  // alert(count);
  if(count>0){  
  location.reload(); 
    // initial_state();
    // ??????????????????????????????????????????????
    // game_disabled.style.display ='none';
   $(document).find('.item').addClass('flip'); 
  
    // $(document).find('.item').removeClass('flip'); 
    // $(document).find('.item').addClass('flip'); 
    mix();      
  }
  else{
   mix();
   // ??????????????????????????????????????????????
   $(document).find('.item').addClass('flip');  
   // game_disabled.style.display ='none';
   count =1; 
   alert(count);             
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
      // ??????????????????????????????????????????????
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
