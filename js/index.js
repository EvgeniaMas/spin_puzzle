var game_field = document.getElementById('numbers_field');//game board
var symbols = document.getElementsByClassName('symbol_text');//symbols 
var number_text = document.getElementsByClassName('number_text');//numbers opened
var top_line = document.getElementById('top_line');//rotation_line
var elements_blocks_array = [];// created pieces on game board
var numbers = []; //right sequence of numbers
var sets_position =[];// game sets x,y
var current_game_elements =[]; //sequence for current game
var item_set; //HTML collection of created items
var sets = 12; //fixed amount of game set
var config_data;// configuration colors, symbols
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
        game_pieces.className = 'item';
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

function set_symbols(){
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
  }
set_symbols();
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
    for (var k =0; k<numbers_parts.length; k++){
      numbers_parts[k].sort(function (a, b) {
    return a - b;
     });
      parts.push(numbers_parts[k]);
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
var degrees=0// angle of rotation
var initial_rotation= 0;
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
    wheel.style.transform = 'rotate('+degrees+'deg)';
    top_line.style.transform = 'rotate('+degrees+'deg)';

} 
var top_line_elements = [];
var converted_to_arr = Array.prototype.slice.call(item_set);
function append_top_line() {
 
// find top_line pieces
  for (var j=0; j<12; j++){
      if($(converted_to_arr[j]).attr('id')<3) { 
       //fix them when rotating;
        top_line_elements.push($(converted_to_arr[j]));
        top_line.appendChild(converted_to_arr[j]);
      }
    }    
}
//animate wheel rotation
$.fn.animateWheel = function(angle, duration,deg) {
  return this.each(function() {
    var $rotate_elem = $(this);
    $({deg: deg}).animate({deg: angle}, {
      duration: duration,     
      step: function(rotates) {
        $rotate_elem.css({
           transform: 'rotate(' + rotates + 'deg)'
         });
      },
      
    });
  });
};

function update_top_line(){
//checking if top line is actual 
 var first_top_item;
 var third_item;
 //updating HTML item collection
  item_set = document.getElementsByClassName('item');
  converted_to_arr = Array.prototype.slice.call(item_set);
  for (var j=0; j<3; j++){   
   if($(converted_to_arr[j]).attr('id')==0) { 
    var first = j;
    first_top_item = $(converted_to_arr[j]).find('.number_text').text(); 
   }
   if($(converted_to_arr[j]).attr('id')==2) { 
    third_top_item = $(converted_to_arr[j]).find('.number_text').text(); 
     var third = j;
   }
 }
 var changeble_element1 = $(converted_to_arr[first]).find('.number_text');
 var changeble_element2= $(converted_to_arr[third]).find('.number_text');
 var color1 = $(changeble_element1).css('color'); 
 var color2 = $(changeble_element2).css('color'); 
 changeble_element1.text(third_top_item);
 changeble_element2.text(first_top_item); 
 changeble_element1.css('color', color2);
 changeble_element2.css('color', color1); 

  for(var i=0; i<12; i++){
    game_field.appendChild(converted_to_arr[i]);
  }  
    //reset top_elements_set and degrees
    top_line_elements =[];    
    degrees =0;
}
function checkWheelposition() {
//return top_line to default position checking the state of wheel
if (initial_rotation==0){   
   wheel.style.transform = 'rotate('+ 180 +'deg)'; 
   update_top_line();
   initial_rotation = 180;
}
else if (initial_rotation==180) {
  wheel.style.transform = 'rotate('+ 0 +'deg)'; 
  initial_rotation = 0;
  update_top_line();
 }
}
wheel.addEventListener('touchmove', rotateWheel);
wheel.addEventListener('touchstart', append_top_line, rotateWheel);
wheel.addEventListener('touchend', checkWheelposition);
//listen on player touch piece of game
$('.item').on('touchstart', startTouchHandler);        
$('.item').on('touchmove', moveTouchHandler);
// defining ccordinates and rotate of pieces handlings and
//target element
var xDown = null;                                                        
var yDown = null;  
var dragged_element;                                                      
function startTouchHandler(e) {
xDown = e.originalEvent.touches[0].clientX;                                      
yDown = e.originalEvent.touches[0].clientY;   
    dragged_element = e.target.parentNode;  
    if (!$(dragged_element).hasClass('item')){
     dragged_element = dragged_element.parentNode;
    }                                 
}
function moveTouchHandler(e) { 
    if ( ! xDown || ! yDown ) {
        return;
    }
    var xUp = e.originalEvent.touches[0].clientX;                                    
    var yUp = e.originalEvent.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp; 
    //getting target element id for directions;
    var element_id=dragged_element.getAttribute('id'); 
    // defining rotation direction deoending on id or default
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 && element_id>-1 && element_id<3) {         
          rotate_items('left');
        } 
        else if  ( xDiff > 0 && element_id>5 && element_id<9) {
          rotate_items('right');           
        }
        else if ( xDiff < 0 && element_id>-1 && element_id<3) {
          rotate_items('right');
        } 
        else if  ( xDiff < 0 && element_id>5 && element_id<9) {
         
          rotate_items('left');           
        } 
        else {          
          rotate_items('right');
        }
      } else {
        // alert(element_id);
        if ( yDiff > 0 && element_id>2 && element_id<6) {
         
            rotate_items('left');
        } 
        else if ( yDiff > 0 && element_id>8 && element_id<12) {
          
            rotate_items('right');
        } 
        else if( yDiff < 0 && element_id>2 && element_id<6) {
         
            rotate_items('right');
        } 
        else if ( yDiff < 0 && element_id>8 && element_id<12) {
         
            rotate_items('left');
        } 
        else { 
          rotate_items('right');
        }                                                                 
    }
      // to default                    
    xDown = null;
    yDown = null;                                             
}
//rotate pieces in particular direction
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
var count=0;

$(start_button).on('click', function() {
  if (count>0){
  initial_state(); 
  set_symbols();
  mix(); 
   game_disabled.style.display ='none';
   $(document).find('.item').addClass('flip'); 
  }
  else { 

   mix(); 
   game_disabled.style.display ='none';
   $(document).find('.item').addClass('flip');
   count=1; 
   }  
   start_button.disabled = true;
   reset_button.disabled = false;
   solved_button.disabled = false;
});
$(solved_button).on('click', function() {
  var solved_sequence = [];
  var j =1;
     while (j <= sets) {
     solved_sequence.push(j++);
   } 
  for (var i = 0; i < solved_sequence.length; i++){ 
    $(number_text[i]).text(solved_sequence[i]);
    } 
   $(document).find('.item').addClass('flip');
   $(document).find('.item').removeClass('flip');
     start_button.disabled = false;
     reset_button.disabled = true;
     solved_button.disabled = true;
     game_disabled.style.display ='block';
});
$(reset_button).on('click', function() { 
  for (var i = 0; i < current_game_elements.length; i++){ 
      $(number_text[i]).text(current_game_elements[i]);
    } 
  wheel.style.transform = 'rotate('+degrees+'deg)'; 

  // for (var i = 0; i < 12; i++){ 
  // $(converted_to_arr[i]).find('.number_text').text(current_game_elements[i]);
  // game_field.appendChild(converted_to_arr[i]);    
  // }  
});
