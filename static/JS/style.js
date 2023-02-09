var blocksize = 25; //dimensione del singolo blocco del canvas//
var rows = 20; //righe canvas//
var cols = 20; //colonne canvas//
var Board;
var context; //sarà l'oggetto che utilizzeremo per disegnare//
let lx = 25
let ly = 25

//disegno la testa del serpente//
var SnakeX = blocksize * 7; 
var SnakeY = blocksize * 7;
var SnakeVX = 0; //velocità del serpente sull'asse x = 0//
var SnakeVY = 0; //velocità del serpente sull'asse y = 0//
//facendo così facciamo spawnare il serpente nel punto 7, 7, del nostro canvas all'inizio del gioco//
var SnakeBody = []; //il corpo del serpente sarà un array che memorizzerà un mucchio di segmenti che equivalgono ad un segmento x o y

//disegnamo la mela//
var MelaX;
var MelaY;
//settiamo lo spawn della mela//

let score = 0

var GameOver = false;



window.onload = function() {
	Board = document.getElementById('Board')  //la variabile Board ha un tag canvas//

	Board.height = rows * blocksize; //impostiamo l'altezza del canvas moltiplicando le righe per la dimensione del singolo blocco//

	Board.width = cols * blocksize; //impostiamo la larghezza del canvas moltiplicando le colonne per la dimensione del singolo blocco//

	context = Board.getContext('2d') //otteniamo il contesto: board prendi contesto 2d (dimensione); tutto questo è usato per disegnare sulla lavagna//

	//funzione di aggiornamento che aggiornerà la lavagna//

	PosizioneMela();

	//facciamo muovere il serpente//

	document.addEventListener("keyup", changeDirection); //changeDirection è il richiamo della funzione//

	//update(); //ripetiamo la funzione update più volte perché sennò non si accocchia mentre il serpente si muove
	setInterval(update, 1000/10); //ogni 100 millisecondi eseguirà la funzione di aggiornamento

}

function ClickButton(){
        var button = document.getElementById('Button')

        Board = document.getElementById('Board')  //la variabile Board ha un tag canvas//

		Board.height = rows * blocksize; //impostiamo l'altezza del canvas moltiplicando le righe per la dimensione del singolo blocco//

		Board.width = cols * blocksize; //impostiamo la larghezza del canvas moltiplicando le colonne per la dimensione del singolo blocco//

		context = Board.getContext('2d') //otteniamo il contesto: board prendi contesto 2d (dimensione); tutto questo è usato per disegnare sulla lavagna//

		//funzione di aggiornamento che aggiornerà la lavagna//

		PosizioneMela();

		//facciamo muovere il serpente//

		document.addEventListener("keyup", changeDirection); //changeDirection è il richiamo della funzione//

		//update(); //ripetiamo la funzione update più volte perché sennò non si accocchia mentre il serpente si muove
		setInterval(update, 1000/10); //ogni 100 millisecondi eseguirà la funzione di aggiornamento
    }

function updateScore(){
	score++
	document.querySelector("#score span").innerHTML = score 
}



function update() {

	if (GameOver) {
		return; //vogliamo che finisca di disegnare quando si perde quindi quando il gioco è finito
	}

	context.fillStyle="orange" //setta il riempimento nero del contesto//
	context.fillRect(0, 0, Board.width, Board.height) // Board.width, Board.height   partiamo dall'angolo 0,0 che dovrebbe rappresentare il primo quadratino in alto a sinistra e riempiamo di nero il canvas fino all'ultimo quadratino


	/*for(let i=0; i<Board.width; i++){
		context.fillStyle="blue"
		context.fillRect(0, 0, Board.width, i)
	}

	/*for(let i=0; i<Board.width; i=i+50){
		context.fillStyle="orange"
		context.fillRect(1, 1, Board.width, i)
	}	*/

	//mettiamo qui l'attributo della mela così riusciamo ad estrarre prima la mela quando il serpente ci passa sopra per mangialra

	context.fillStyle="red" //setta il riempimento del blocco rosso per il colore della mela//
	context.fillRect(MelaX, MelaY, blocksize, blocksize)

	//mettiamo l'if quando la posizione del serpente combacia con quella della mela

	if (SnakeX == MelaX && SnakeY == MelaY) {

		SnakeBody.push([MelaX, MelaY]) //dopo aver mangiato la mela il corpo del serpente si allungherà, in base alla direzione in cui sta andando, di un segmento sull'asse x o sull'asse y
		updateScore()
		PosizioneMela()
	}

	for (let i = SnakeBody.length-1; i > 0; i--){
		SnakeBody[i] = SnakeBody[i-1] //partiamo dalla fine del corpo del serpente (la coda) che ogni volta che il serpente avanzerà prenderà le coordinate precedenti aggiornandole rimanendo sempre indietro e attaccata alla testa del serpente
	}

	if(SnakeBody.length){
		SnakeBody[0] = [SnakeX, SnakeY] //impostiamo inizialmente il corpo del serpente che è pari a 0 che riguarda la parte prima della testa e la imposteremo sulle coordinate della testa così avanzeranno insieme
	}

	context.fillStyle="lime" //setta il riempimento del blocco lime per il colore del serpente//
	SnakeX += SnakeVX * blocksize //faccio muovere il serpente di un blocco sull'asse x
	SnakeY += SnakeVY * blocksize //faccio muovere il serpente di un blocco sull'asse y
	context.fillRect(SnakeX, SnakeY, blocksize, blocksize) //disegnamo la testa del serpente nel canvas settando larghezza e altezza//

	//assegnamo il ciclo for per aumentare la lunghezza del serpente quando mangia

	//disegnamo i segmenti corporei aggiuntivi del corpo del serpente

	for (let i = 0; i < SnakeBody.length; i++){
		context.fillRect(SnakeBody[i][0], SnakeBody[i][1], blocksize, blocksize); //queste sono le coordinate x e y che prenderanno la dimensione del singolo blocco grazie a blocksize
	} //la mela che viene mangiata diventa il corpo del serpente ma non si aggrega ad esso rimane fissa (DA SISTEMARE)



	//condizioni del GameOver
	if (SnakeX < 0 || SnakeX > cols * blocksize || SnakeY < 0 || SnakeY > rows * blocksize) { // condizione utilizzata per quando il serpente supera con l'asse x o y i limiti del nostro canvas
		GameOver = true
		alert("Game Over")
	}

	for(let i = 0; i < SnakeBody.length; i++) {

		if (SnakeX == SnakeBody[i][0] && SnakeY == SnakeBody[i][1]) {
			
			GameOver = true
			alert("Game Over")
		}
	}
}



function changeDirection(e) {

	//condizione se premiamo la freccia//

	//!= significa non è uguale a

	if (e.code == "ArrowUp" && SnakeVY != 1) { //aggiungo il controllo che non permette di muovermi nella posizione opposta a quella in cui sto andando perchè sennò il serpente si mangia il corpo
		SnakeVX = 0; //muovendosi in alto la velocità del serpente sull'asse x non cambierà//
		SnakeVY = -1; //muovendosi in alto la velocità del serpente sull'asse y cambierà e passerà a -1//
	}

	else if (e.code == "ArrowDown" && SnakeVY != -1) {
		SnakeVX = 0; //muovendosi in basso la velocità del serpente sull'asse x non cambierà//
		SnakeVY = 1; //muovendosi in basso la velocità del serpente sull'asse y cambierà e passerà a 1//
	}

	else if (e.code == "ArrowLeft" && SnakeVX != 1) {
		SnakeVX = -1; //muovendosi a sinistra la velocità del serpente sull'asse x cambierà e passerà a -1//
		SnakeVY = 0; //muovendosi in alto la velocità del serpente sull'asse y non cambierà//
	}

	else if (e.code == "ArrowRight" && SnakeVX != -1) {
		SnakeVX = 1; //muovendosi a sinistra la velocità del serpente sull'asse x cambierà e passerà a 1//
		SnakeVY = 0; //muovendosi in alto la velocità del serpente sull'asse y non cambierà//
	}
}

//creiamo una funzione che faccia spawnare il cibo in un punto a caso nel canvas//
function PosizioneMela() {

	//Math.random restituisce un numero compreso tra 0 e 1 e lo moltiplica per il numero di colonne o righe del canvas così diventerà un numero compreso tra 0 e 19 e lo moltiplichiamo per la dimensione del blocco (25)//
	//urilizziamo Math.floor per eliminare le cifre decimali//

	MelaX = Math.floor(Math.random() * cols) * blocksize;
	MelaY = Math.floor(Math.random() * rows) * blocksize;
}
