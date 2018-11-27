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
var blue =[], green =[], orange =[]; // color sequenses (just three, color indipendent)
var unique_colors;//config unique colors values
var data; 
var current_sequence = [];
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
function normal_number_sequence(){
    var j =1;
     while (j <= sets) {
     numbers.push(j++);
   } 
}

normal_number_sequence();
var config_colors =[];
var config_sequence =[];
function set_symbols(){
// checking for config file
if(data){
 config_data = JSON.parse(data);  
}

var default_data = [
      ['#91ebf8', '#'],['#91ebf8', '2'],
      ['#91ebf8', '3'],['#91ebf8', '3'],
      ['#f88701', '#'],['#f88701', '2'],
      ['#f88701', '1'],['#f88701', '3'],
      ['#90c881', '#'],['#90c881', '2'],
      ['#90c881', '3'],['#90c881', '3']
    ]; 

// TO USE CONFIG FILE DELETE "!", SO (config_data)   
  if(config_data){ 
  for (var i=0; i<sets; i++){   
      symbols[i].style.color = config_data[i].color;
      number_text[i].style.color = config_data[i].color;      
      symbols[i].innerText = config_data[i].symbol;
      number_text[i].innerText = config_data[i].number;
      config_colors.push(config_data[i].color);
      config_sequence[i] = config_data[i].number;      
     }
  }
   else{
    for (var i=0; i<sets; i++){   
      symbols[i].style.color = default_data[i][0];
      number_text[i].style.color = default_data[i][0];
      symbols[i].innerText = default_data[i][1];
     }
   }
unique_colors = unique(config_colors);
}
set_symbols();
//get unique colors in config; 
function unique(colors) {
  var obj_color = {};
  for (var i = 0; i < colors.length; i++) {
    var values = colors[i];
    obj_color[values] = true; 
  }
  return Object.keys(obj_color); 
}
//get color/number sequences in current game
function set_color_sequences(){
if(config_data){
  alert("Config");
   for (var i=0; i<sets; i++){
      if(config_data[i].color == unique_colors[0]){
    blue.push(config_data[i].number);
    }
      else if(config_data[i].color == unique_colors[1]){
     green.push(config_data[i].number);
    }
      else if(config_data[i].color == unique_colors[2]){
    orange.push(config_data[i].number);
    }
  }
}
  
else{
   alert("No config");
   blue = numbers.slice(0, 4);
   green = numbers.slice(4, 8);
   orange = numbers.slice(8, 12); 
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
shuffle(numbers);  
   item_set = document.getElementsByClassName('item');
   current_game_elements = numbers;
   display();
}
function display(){
   for (var i = 0; i < numbers.length; i++){ 
       number_text[i].innerText= numbers[i];
    } 
    set_color_sequences(); 
    get_current_sequence();
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
  // console.log(current_sequence);

  var index1 = current_sequence.indexOf(first_top_item);
  var index2 = current_sequence.indexOf(third_top_item);

  // // if (index !== -1) {
    current_sequence[index1] = third_top_item;
    current_sequence[index2] = first_top_item;
  //}
 console.log(current_sequence);
 changeble_element1.text(third_top_item);
 changeble_element2.text(first_top_item); 
 changeble_element1.css('color', color2);
 changeble_element2.css('color', color1); 
 for(var i=0; i<12; i++){
    game_field.appendChild(converted_to_arr[i]);
       
  } 
    top_line_elements =[];    
    degrees =0;
  
    check_player_solution();
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
   // current_sequence=[];
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
  item_set[i].style.transition = '1.5s ease-in-out';
  item_set[i].style.left = sets_position[new_index][1]+ 'px';
  item_set[i].style.top = sets_position[new_index][0]+ 'px'; 
  
  // reset ids of pieces   
  item_set[i].setAttribute('id', new_index);
  } 
}
 
//buttons handlings 
$(start_button).on('click', function() {
   mix(); 
   game_disabled.style.display ='none';
   $(document).find('.item').addClass('flip');
   set_symbols();
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
});
//sort asc function 
 function sort_asc(arr) {
   return arr.concat().sort(function (a, b) {
     return a - b;
 });
}
//get acsending clockwise color sequences
var blue_asc;
var green_asc;
var orange_asc;
function check_player_solution(){
var joined_sequence = current_sequence.join('');
// console.log(current_sequence);
blue_asc = sort_asc(blue).join('');
green_asc = sort_asc(green).join('');
orange_asc = sort_asc(orange).join('');
console.log(joined_sequence);
console.log(current_sequence.indexOf(blue_asc));
console.log(blue_asc);

//checking up all three color-number counterclock solutions
if (joined_sequence.indexOf(blue_asc)>-1){
// && joined_sequence.indexOf(green_asc)>-1
// && joined_sequence.indexOf(orange_asc)>-1 
  console.log("Solved");  
  //flipping items  
  setTimeout(function() { $(document).find('.item').removeClass('flip'); }, 1000);
   //change buttons state
   start_button.disabled = false;
   reset_button.disabled = true;
   solved_button.disabled = true;
  }

}

function get_current_sequence(){
if(data) {
   current_sequence = config_sequence;
   console.log(current_sequence);  
}
else{
  current_sequence =[];
  var arr = [].slice.call(number_text);
  for (i=0; i<12; i++) {
    current_sequence.push(arr[i].innerText);
  }
  console.log(current_sequence);  
  }
}