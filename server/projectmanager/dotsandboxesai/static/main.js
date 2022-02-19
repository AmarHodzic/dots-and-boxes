class Kvadrat{
    clicked = false;
    constructor(t, b, l, r ,gD){
        this.top = t;
        this.bottom = b;
        this.left = l;
        this.right = r;
        this.glavniDiv = gD;
    }

    checkBox(){
        
        if(this.top == true && this.bottom == true && this.left == true && this.right == true){
            return true;
        }else {
            return false;
        }
    }
}

var matricaStanja = [];
clickedColor = "black";
clickedColorRed = "rgb(130, 73, 72)";
clickedColorBlue = "rgb(84, 105, 133)"
SpecialRed = "rgb(168, 52, 50)"
let pocetna = document.getElementById("pocetna");
let dimenzijeTable = document.getElementById("velicinaTable");
let turn = 1;// 1 - prvi igrac, 2 - drugi igrac
let Player1_points = document.getElementById("player1Score");
let Player2_points = document.getElementById("player2Score");
let winner = document.getElementById("winner");
let backButton = document.getElementById("backButton");
let container = document.getElementById("container");
let continueButton = document.getElementById("continueButton");
let listaPoteza = document.getElementById("listaPoteza");
let divListaPoteza =document.getElementById("divListaPoteza")



function pocni() {
    container.style.pointerEvents = "auto"
    let tezina = document.getElementById('tezina')
    let modIgre = document.getElementById('modIgre')
    console.log(tezina.value)
    console.log(modIgre.value)
    if(modIgre.value == 'PvsP'){
        let n = document.getElementById("velicinaTable").value;
        pocetna.style.display = "none";
        createMatrix(n);
        displayBoard(n,modIgre.value,null);
    }else if(modIgre.value == 'PvsAI'){
        let n = document.getElementById("velicinaTable").value;
        pocetna.style.display = "none";
        createMatrix(n);
        displayBoard(n, modIgre.value, tezina)
    }
}

function createMatrix(n) {
    for (let i = 0; i < n; i++) {
        matricaStanja[i] = [];
        for (let j = 0; j < n; j++) {
            matricaStanja[i][j] = (new Kvadrat(false, false, false, false, -1));
        }
    }
}

function checkPoints() {
    let n = document.getElementById("velicinaTable").value;

    p1points = 0;
    p2points = 0;
    win = 0;
    for(let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            if(matricaStanja[i][j].glavniDiv == 1){
                p1points += 1;
                Player1_points.innerHTML = p1points;
            }
            else if(matricaStanja[i][j].glavniDiv == 2){
                p2points+=1;
                Player2_points.innerHTML = p2points;
            }
            else if(matricaStanja[i][j].glavniDiv == -1){
                win+=1;
            }
        }
    }
    if(win == 0){
        let pobednik =''
        if(parseInt(Player1_points.textContent) > parseInt(Player2_points.textContent)){
            winner.innerHTML = "Blue wins!"
            pobednik = 'Plavi je pobedio!'
        }
        else if(parseInt(Player2_points.textContent) > parseInt(Player1_points.textContent)){
            winner.innerHTML = "Red wins!"
            pobednik='Crveni je pobedio!'
        }
        else{
            winner.innerHTML = "Draw..."
            pobednik='Partija je neresena!'
        }
    // pocetna.style.display = "block";
    setTimeout(()=>{
        let x = confirm(`${pobednik} Ako zelite da se vratite u meni kliknite OK. Kliknite Cancel ako zelite da vidite partiju.`);
        if(x){
            pocetna.style.display = "block"
            container.style.display = "none"
            backButton.style.display = "none"
        }     
    },2500)
    }
}

function goBack() {
    container = document.getElementById("container")
    container.style.display = "none";
    pocetna.style.display= "block";
    backButton.style.display= "none";
    continueButton.style.display="block"
}

function goContinue() {
    container.style.display = "block"
    continueButton.style.display="none"
    pocetna.style.display= "none"
    backButton.style.display="block"
}


function displayBoard(n,modIgre,tezina){
        container.style.display= "block";
        // container.style.pointerEvents = "none"
        Player1_points.textContent = "0"
        Player2_points.textContent = "0"
        turn = 1;
        winner.textContent = "";
        divListaPoteza.style.display="block";
        listaPoteza.innerHTML = ""
        backButton.style.display = "block";

        if(turn == 1){
            document.getElementById('turn').innerHTML = "P1 turn"
            document.getElementById('turn').style="color:blue;";
        }else{
            document.getElementById('turn').innerHTML = "P2 turn"
            document.getElementById('turn').style="color:red;";    
        }

        var txt = "";
        for(let i=0; i<n; i++){
                txt += `<div style="display: flex; width:100%; height: ${100/n}%">` 

            for(let j=0; j<n; j++){
                txt += `<div style="width: ${100/n}%; height: 100%;background-color: rgb(176, 174, 158);">
                        <div style="display: flex;width: 100%; height: 20%;background-color: chocolate;">
                            <div style="height: 100%; width: 20%; background-color:rgb(101, 148, 107);"></div>
                            <button id="h${i.toString()+j.toString()}" onclick="klik(this.id,modIgre,tezina)" style="width: 80%;background-color:rgb(189, 217, 190); height: 100%;"></button>
                        </div>
                        <div style="display: flex;height: 80%; width: 100%;">
                            <button id="v${i.toString()+j.toString()}" onclick="klik(this.id,modIgre,tezina)" style="height: 100%;background-color:rgb(189, 217, 190);width: 20%;"> </button>
                            <div id="div${i.toString()+j.toString()}" style="height:100%; width: 80%;"></div>
                        </div>
                    </div>`;
            }
            
            txt += `<div style="width: ${100/(n*5+1)}%; height: 100%;background-color: chocolate;">
                        <div style="width: 100%; height: 20%; background-color: rgb(101, 148, 107);"></div>
                        <button id="r${i.toString()+(n-1)}" onclick="klik(this.id,modIgre,tezina)" style="width: 100%;background-color:rgb(189, 217, 190); height: 80%;"></button>
                    </div>`;
            txt += `</div>`;

        }
        
        txt += `<div style="display: flex;width: 650px; height: ${100/(n*5+1)}%;background-color: chocolate;">`;
        for(let i=0; i<n; i++){
                    txt += `<div style="height: 100%; width: 20%; background-color: rgb(101, 148, 107);"></div>
                            <button id="b${(n-1)+i.toString()}" onclick="klik(this.id,modIgre,tezina)" style="width: 80%;background-color:rgb(189, 217, 190); height: 100%;"></button>`;
        }
        txt += `<div style="height: 100%; width: 20%; background-color: rgb(101, 148, 107);"></div>`;
        txt += ` </div>`;
        
        container.innerHTML = txt;
}

function makeMoveVSAI(id){
    dugme = document.getElementById(id);
        let changeTurn = true;
        if(id.charAt(0) === 'h'){
            let divIspod = document.getElementById(`div${id.charAt(1)+id.charAt(2)}`);
            let divIznad = document.getElementById(`div${(id.charAt(1)-1)+id.charAt(2)}`);
            // SETOVANJE MATRICE STANJA
        
            matricaStanja[id.charAt(1)][id.charAt(2)].top = true;
            if(id.charAt(1)!=0){
                matricaStanja[id.charAt(1)-1][id.charAt(2)].bottom = true;
                if(matricaStanja[id.charAt(1)-1][id.charAt(2)].checkBox()){
                    divIznad.className="blue"
                    matricaStanja[id.charAt(1)-1][id.charAt(2)].glavniDiv=1; 
                    changeTurn = false;
                }
            }
            if(matricaStanja[id.charAt(1)][id.charAt(2)].checkBox()){
                divIspod.className="blue"
                matricaStanja[id.charAt(1)][id.charAt(2)].glavniDiv=1;    
                changeTurn = false;
            }
        }

        else if(id.charAt(0) === 'v'){
            let divLevo = document.getElementById(`div${id.charAt(1)+id.charAt(2)}`);
            let divDesno = document.getElementById(`div${id.charAt(1)+(id.charAt(2)-1)}`);
            matricaStanja[id.charAt(1)][id.charAt(2)].left = true;
            if(id.charAt(2)!=0){
                matricaStanja[id.charAt(1)][id.charAt(2)-1].right = true;
                if(matricaStanja[id.charAt(1)][id.charAt(2)-1].checkBox()){
                    divDesno.className="blue"
                    matricaStanja[id.charAt(1)][id.charAt(2)-1].glavniDiv=1;
                    changeTurn = false;
                }
            }
            if(matricaStanja[id.charAt(1)][id.charAt(2)].checkBox()){
                    divLevo.className="blue"
                    matricaStanja[id.charAt(1)][id.charAt(2)].glavniDiv=1;
                    changeTurn = false;
            }
        }
        else if(id.charAt(0) === 'r'){
            matricaStanja[id.charAt(1)][id.charAt(2)].right = true;
            let div = document.getElementById(`div${id.charAt(1)+id.charAt(2)}`);
            if(matricaStanja[id.charAt(1)][id.charAt(2)].checkBox()){
                div.className="blue"
                matricaStanja[id.charAt(1)][id.charAt(2)].glavniDiv=1;                
                changeTurn = false;
            }
        }
        else{
            matricaStanja[id.charAt(1)][id.charAt(2)].bottom = true;
            let div = document.getElementById(`div${id.charAt(1)+id.charAt(2)}`);
            if(matricaStanja[id.charAt(1)][id.  charAt(2)].checkBox()){
                div.className="blue"
                matricaStanja[id.charAt(1)][id.  charAt(2)].glavniDiv=1;
                changeTurn = false;
            }
        }

        if(changeTurn){
            turn = turn==1?2:1;
            
            if(turn == 1){
                document.getElementById('turn').innerHTML = "P1 turn"
                document.getElementById('turn').style="color:blue;";
            }else{
                document.getElementById('turn').innerHTML = "P2 turn"
                document.getElementById('turn').style="color:red;";    
            }
        }

        dugme.disabled = true;
        dugme.style.backgroundColor = clickedColor;

        checkPoints();

        let potezi;
        potezi = `<li>${id} Player${(turn%2)+1}</li>`
        listaPoteza.innerHTML += potezi;

        return changeTurn

}

function makeMove(id){
    
    dugme = document.getElementById(id);
        let changeTurn = true;
        if(id.charAt(0) === 'h'){
            let divIspod = document.getElementById(`div${id.charAt(1)+id.charAt(2)}`);
            let divIznad = document.getElementById(`div${(id.charAt(1)-1)+id.charAt(2)}`);
            // SETOVANJE MATRICE STANJA
        
            matricaStanja[id.charAt(1)][id.charAt(2)].top = true;
            if(id.charAt(1)!=0){
                matricaStanja[id.charAt(1)-1][id.charAt(2)].bottom = true;
                if(matricaStanja[id.charAt(1)-1][id.charAt(2)].checkBox()){
                    if(turn==1){
                        divIznad.className="blue"
                        matricaStanja[id.charAt(1)-1][id.charAt(2)].glavniDiv=1;
                    }  
                    else if(turn == 2){
                        divIznad.className="red"
                        matricaStanja[id.charAt(1)-1][id.charAt(2)].glavniDiv=2;
                    }
                    changeTurn = false;
                }
            }
            // PROVERA BOJENJA
            if(matricaStanja[id.charAt(1)][id.charAt(2)].checkBox()){
                if(turn==1){
                        divIspod.className="blue"
                        matricaStanja[id.charAt(1)][id.charAt(2)].glavniDiv=1;
                }  
                    else if(turn == 2){
                        divIspod.className="red"
                        matricaStanja[id.charAt(1)][id.charAt(2)].glavniDiv=2;
                    }
                    changeTurn = false;
            }
        }

        else if(id.charAt(0) === 'v'){
            let divLevo = document.getElementById(`div${id.charAt(1)+id.charAt(2)}`);
            let divDesno = document.getElementById(`div${id.charAt(1)+(id.charAt(2)-1)}`);
            matricaStanja[id.charAt(1)][id.charAt(2)].left = true;
            if(id.charAt(2)!=0){
                matricaStanja[id.charAt(1)][id.charAt(2)-1].right = true;
                if(matricaStanja[id.charAt(1)][id.charAt(2)-1].checkBox()){

                    if(turn==1){
                        divDesno.className="blue"
                        matricaStanja[id.charAt(1)][id.charAt(2)-1].glavniDiv=1;
                    }  
                    else if(turn == 2){
                        divDesno.className="red"
                        matricaStanja[id.charAt(1)][id.charAt(2)-1].glavniDiv=2;
                    }
                    changeTurn = false;
                }
            }

            if(matricaStanja[id.charAt(1)][id.charAt(2)].checkBox()){
                if(turn==1){
                        divLevo.className="blue"
                        matricaStanja[id.charAt(1)][id.charAt(2)].glavniDiv=1;
                }  
                    else if(turn == 2){
                        divLevo.className="red"
                        matricaStanja[id.charAt(1)][id.charAt(2)].glavniDiv=2;
                    }
                    changeTurn = false;
            }
        }

        else if(id.charAt(0) === 'r'){
            matricaStanja[id.charAt(1)][id.charAt(2)].right = true;
            let div = document.getElementById(`div${id.charAt(1)+id.charAt(2)}`);
            if(matricaStanja[id.charAt(1)][id.charAt(2)].checkBox()){
                if(turn==1){
                        div.className="blue"
                        matricaStanja[id.charAt(1)][id.charAt(2)].glavniDiv=1;
                }  
                    else if(turn == 2){
                        div.className="red"
                        matricaStanja[id.charAt(1)][id.charAt(2)].glavniDiv=2;
                    }
                    changeTurn = false;
            }
        }

        else{
            matricaStanja[id.charAt(1)][id.charAt(2)].bottom = true;
            let div = document.getElementById(`div${id.charAt(1)+id.charAt(2)}`);
            if(matricaStanja[id.charAt(1)][id.  charAt(2)].checkBox()){
                if(turn==1){
                        div.className="blue"
                        matricaStanja[id.charAt(1)][id.  charAt(2)].glavniDiv=1;
                }  
                    else if(turn == 2){
                            div.className="red"
                        matricaStanja[id.charAt(1)][id.  charAt(2)].glavniDiv=2;
                    }
                    changeTurn = false;
            }
        }

        if(changeTurn){
            turn = turn==1?2:1;
            
            if(turn == 1){
                document.getElementById('turn').innerHTML = "P1 turn"
                document.getElementById('turn').style="color:blue;";
            }else{
                document.getElementById('turn').innerHTML = "P2 turn"
                document.getElementById('turn').style="color:red;";    
            }
        }

        dugme.disabled = true;
        dugme.style.backgroundColor = SpecialRed;
        
        setTimeout(nazadUCrno.bind(null,dugme),700)
        
        checkPoints();
    
        let potezi;
        potezi = `<li>${id} Player${(turn%2)+1}</li>`
        listaPoteza.innerHTML += potezi;
}

function nazadUCrno(dugme){
    dugme.style.backgroundColor= clickedColor
}

function twoDimToOneDim(arr){
    let newArr = []
    for(let i=0;i<arr.length;i++)
        newArr = newArr.concat(arr[i])
    return newArr
}

async function getAiMove(id, tezina){
    while(true){
        // AIisPlaying = true;
        console.log(matricaStanja)
        let newArr = twoDimToOneDim(matricaStanja)
        let dataToSend = []
        for(let i = 0;i<newArr.length;i++){
            let obj = {
                bottom:newArr[i].bottom,
                top:newArr[i].top,
                left:newArr[i].left,
                right:newArr[i].right,
                glavniDiv:newArr[i].glavniDiv
            }
            dataToSend.push(obj)
        }
        console.log(tezina)
        const response = await fetch('/getmove',{
            method:"POST",
            body:JSON.stringify({diff:tezina,data:dataToSend})
        });
        const jsonResponse = await response.json()
        console.log(jsonResponse)
        if(jsonResponse.message){
            console.log('hehe')
            turn = 1;
            container.style.pointerEvents="auto"
            // AIisPlaying = false
            break
        }
        else{
            let direction = jsonResponse.dir
            let col = jsonResponse.col
            let row = jsonResponse.row
            let changeTurn = playAIMove(direction, col, row);
            let potezi;
            potezi = `<li>${direction+row+col} Player${(turn%2)+1}</li>`
            listaPoteza.innerHTML += potezi;
            if(changeTurn){
                    container.style.pointerEvents="auto"
                    // AIisPlaying = false
                    break
                }
            }
    }
}

function playAIMove(direction, col, row) {
    let id = direction+row
    id+=col
    dugme = document.getElementById(id);
    let changeTurn = true;
    if(id.charAt(0) === 'h'){
        let divIspod = document.getElementById(`div${id.charAt(1)+id.charAt(2)}`);
        let divIznad = document.getElementById(`div${(id.charAt(1)-1)+id.charAt(2)}`);
        // SETOVANJE MATRICE STANJA
    
        matricaStanja[id.charAt(1)][id.charAt(2)].top = true;
        if(id.charAt(1)!=0){
            matricaStanja[id.charAt(1)-1][id.charAt(2)].bottom = true;
            if(matricaStanja[id.charAt(1)-1][id.charAt(2)].checkBox()){
                divIznad.className="red"
                matricaStanja[id.charAt(1)-1][id.charAt(2)].glavniDiv=2;
                changeTurn = false;
            }
        }
        // PROVERA BOJENJA
        if(matricaStanja[id.charAt(1)][id.charAt(2)].checkBox()){
            divIspod.className="red"
            matricaStanja[id.charAt(1)][id.charAt(2)].glavniDiv=2;
            changeTurn = false;
        }
    }

    else if(id.charAt(0) === 'v'){
        let divLevo = document.getElementById(`div${id.charAt(1)+id.charAt(2)}`);
        let divDesno = document.getElementById(`div${id.charAt(1)+(id.charAt(2)-1)}`);
        matricaStanja[id.charAt(1)][id.charAt(2)].left = true;
        if(id.charAt(2)!=0){
            matricaStanja[id.charAt(1)][id.charAt(2)-1].right = true;
            if(matricaStanja[id.charAt(1)][id.charAt(2)-1].checkBox()){

                if(turn==1){
                    divDesno.className="blue"
                    matricaStanja[id.charAt(1)][id.charAt(2)-1].glavniDiv=1;
                }  
                else if(turn == 2){
                    divDesno.className="red"
                    matricaStanja[id.charAt(1)][id.charAt(2)-1].glavniDiv=2;
                }
                changeTurn = false;
            }
        }

        if(matricaStanja[id.charAt(1)][id.charAt(2)].checkBox()){
            divLevo.className="red"
            matricaStanja[id.charAt(1)][id.charAt(2)].glavniDiv=2;
            changeTurn = false;
        }
    }

    else if(id.charAt(0) === 'r'){
        matricaStanja[id.charAt(1)][id.charAt(2)].right = true;
        let div = document.getElementById(`div${id.charAt(1)+id.charAt(2)}`);
        if(matricaStanja[id.charAt(1)][id.charAt(2)].checkBox()){
            div.className="red"
            matricaStanja[id.charAt(1)][id.charAt(2)].glavniDiv=2;
            changeTurn = false;
        }
    }

    else{
        matricaStanja[id.charAt(1)][id.charAt(2)].bottom = true;
        let div = document.getElementById(`div${id.charAt(1)+id.charAt(2)}`);
        if(matricaStanja[id.charAt(1)][id.  charAt(2)].checkBox()){        
            div.className="red"
            matricaStanja[id.charAt(1)][id.  charAt(2)].glavniDiv=2;
            changeTurn = false;
        }
    }

    if(changeTurn){
        turn = turn==1?2:1;
        
        if(turn == 1){
            document.getElementById('turn').innerHTML = "P1 turn"
            document.getElementById('turn').style="color:blue;";
        }else{
            document.getElementById('turn').innerHTML = "P2 turn"
            document.getElementById('turn').style="color:red;";    
        }
    }

    dugme.disabled = true;
    dugme.style.backgroundColor = SpecialRed;
    setTimeout(nazadUCrno.bind(null,dugme),700)
        
    // console.log(dugme);
    // console.log(id)
    // console.log(matricaStanja)
    
    checkPoints();
    // console.log(p1points)
    // console.log(p2points)
    return changeTurn
}

// let AIisPlaying = false

function klik(id,modIgre,tezina) {
    if(modIgre.value=='PvsP'){
        makeMove(id)
    }else if(modIgre.value=="PvsAI"){
        // if(!AIisPlaying){
            let isAITUrn = makeMoveVSAI(id) // AI POTEZ true/false
            if(isAITUrn){
                getAiMove(id,tezina.value)
                container.style.pointerEvents = "none"
            // }
        }
    }
}