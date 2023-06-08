let music= new Audio("./music/play.mp3");
let ko=new Audio("./music/ko.mp3");
let press= new Audio("./music/press.mp3");
let turn='X';
var gameover=false;

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
music.play();
const iswin =() =>{
    // getting all grids to check
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
            document.querySelector('.info').innerHTML=turn+" wins";
            ko.play();
            gameover=true;
        }
    })
}


// DOM work

// all 9 box
let boxes=document.getElementsByClassName('box');
// getting every ele
Array.from(boxes).forEach(ele=>{
    //handle span msg
    let txt=ele.querySelector('.boxtext');
    // Adding Event listner of click
    ele.addEventListener('click',()=>{
        if(txt.innerHTML===""){
            txt.innerHTML=turn;
            press.play();
            iswin();
            change();
            //change the turn for in page
            if(!gameover){
                let msg=document.getElementsByClassName('info');
                msg[0].innerHTML="Turn for "+turn;
            }
        }
    })
})

reset.addEventListener('click', ()=>{
    let boxes=document.querySelectorAll('.boxtext');
    Array.from(boxes).forEach(ele=>{
        ele.innerHTML="";
    })
    turn='X';
    let msg=document.getElementsByClassName('info');
        msg[0].innerHTML="Turn for "+turn;
        gameover=false;
})

