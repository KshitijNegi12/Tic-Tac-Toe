//Player Data
let p1=prompt("Enter first player name.");
if(p1==null||p1==""){
    p1='Player 1';
}
let p2=prompt("Enter second player name.");
if(p2==null||p2==""){
    p2='Player 2';
}
if(p1===p2){
    p1=p1+"-1";
    p2=p2+"-2";
}

//Music
let music= new Audio("./music/play.mp3");
let ko=new Audio("./music/ko.mp3");
let press= new Audio("./music/press.mp3");
let turn='X';
document.querySelector('.info').innerHTML="Turn for "+p1+" ("+turn+")";
var gameover=false;
var pressed=0;  // Handle how many grid filled for Draw

//change turn of player
const change=() =>{
    if(turn==='X'){
        turn='O';
    }
    else{
        turn='X';
    }
}

//Check win
const iswin =() =>{
    let boxes=document.getElementsByClassName('boxtext');
    let possibilities = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ]
    possibilities.forEach(ele=>{
        if(boxes[ele[0]].innerHTML===boxes[ele[1]].innerHTML  && boxes[ele[1]].innerHTML===boxes[ele[2]].innerHTML && boxes[ele[0]].innerHTML!==""){
            let p;
            if(turn=='X'){
                p=p1;
            }
            else{
                p=p2;
            }
            document.querySelector('.info').innerHTML=p+" wins";
            ko.play();
            gameover=true;
            pressed=0;
        }
    })
}


// Logic
// all 9 box
let boxes=document.getElementsByClassName('box');
Array.from(boxes).forEach(ele=>{
    let txt=ele.querySelector('.boxtext');
    // Adding Event listner of click
    ele.addEventListener('click',()=>{
        if(!gameover){
            if(txt.innerHTML===""){
                txt.innerHTML=turn;
                press.play();
                iswin();
                change();
                //change the turn for in page
                if(!gameover){
                    let msg=document.getElementsByClassName('info');
                    let p;
                    if(turn=='X'){
                        p=p1;
                    }
                    else{
                        p=p2;
                    }
                    msg[0].innerHTML="Turn for "+p+" ("+turn+")";
                }
                pressed++;
                if(pressed===9){
                    document.querySelector('.info').innerHTML="Draw ";
                }
            }
        }
    })
})

// reset button work
reset.addEventListener('click', ()=>{
    let k=prompt("Do you want to change name press (Y) or any other key to remain unchange. ");
    if(k=='Y'||k=='y'){
        p1=prompt("Enter first player name.");
        if(p1==null||p1==""){
            p1='Player 1';
        }
        p2=prompt("Enter second player name.");
        if(p2==null||p2==""){
            p2='Player 2';
        }
        if(p1==p2){
            p1=p1+"-1";
            p2=p2+"-2";
        }
    }
    let boxes=document.querySelectorAll('.boxtext');
    Array.from(boxes).forEach(ele=>{
        ele.innerHTML="";
    })
    turn='X';
    let msg=document.getElementsByClassName('info');
    let p;
    if(turn=='X'){
        p=p1;
    }
    else{
        p=p2;
    }
    msg[0].innerHTML="Turn for "+p+" ("+turn+")";
    gameover=false;
    pressed=0;
})

// for audio play
document.addEventListener('click',function(){
    music.play();
    this.documentElement.removeEventListener('click',this);
});
