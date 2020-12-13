(function () {
	window.addEventListener("tizenhwkey", function (ev) {
		var activePopup = null,
			page = null,
			pageId = "";

		if (ev.keyName === "back") {
			rodando = false;
			document.getElementById("voltar").click();
			return;		
		}
	});
}());

window.onload = function () {
    corpo = document.getElementsByTagName("BODY")[0];
};

var corpo; 
var tempos;
var countDownDate;
var intervalo;
var indice = 0;
var modo = 1;

var rodando = false;

var modoAtual;

function setModo(ref){
	modo = ref;
}

function escolher(modo){
	if(modo === 1){
		modoAtual = [
		          {tempo: 1, tipo: 1}, {tempo: 1, tipo: 2},
		          {tempo: 1, tipo: 1}, {tempo: 1, tipo: 2}
		       //   {tempo: 1, tipo: 1}, {tempo: 1, tipo: 2},
		       //   {tempo: 1, tipo: 1}, {tempo: 1, tipo: 2},
		       //   {tempo: 1, tipo: 1}, {tempo: 1, tipo: 2}
		          ];
	}
	
	if(modo === 2){
		modoAtual = [
	             	{tempo: 1, tipo: 1}, {tempo: 2, tipo: 3},
	             	{tempo: 1, tipo: 1}, {tempo: 2, tipo: 3},
	             	{tempo: 1, tipo: 1}, {tempo: 2, tipo: 3},
	             	{tempo: 1, tipo: 1}, {tempo: 2, tipo: 3},
	             	{tempo: 1, tipo: 1}, {tempo: 2, tipo: 3}
		            ];
	}
	
	if(modo === 3){
		modoAtual = [
	             	{tempo: 2, tipo: 4}, {tempo: 1, tipo: 2},
	             	{tempo: 2, tipo: 4}, {tempo: 1, tipo: 2},
	             	{tempo: 2, tipo: 4}, {tempo: 1, tipo: 2},
	             	{tempo: 2, tipo: 4}, {tempo: 1, tipo: 2},
	             	{tempo: 2, tipo: 4}, {tempo: 1, tipo: 2}
		            ];
	}
}

function startarContagemRegressiva(){
	document.querySelector('#iniciar').style.display="none";
	document.querySelector('#regressiva').style.display="unset";
	document.getElementById("titulo").innerHTML = "Warm up";
	
	corpo.style.backgroundColor = "green";
	
	indice = 0;
	rodando = true;
	
	var cont = 5;
	var lblContador = document.querySelector('#contador');
	lblContador.innerHTML = '' + cont;
	
	tocarAudio(modoAtual[indice].tipo);
	
	setTimeout(function() {
		var x = setInterval(function() {
			cont -= 1;
			lblContador.innerHTML = '' + cont;
			
			if(rodando == false)
				clearInterval(x);
				
			if(cont === 0){
				iniciar();
				clearInterval(x);
			}
			
		}, 1250);
	}, 1000);
}

function iniciar(){
	corpo.style.backgroundColor = "green";
	document.querySelector('#regressiva').style.display="none";
	document.querySelector('#cronometro').style.display="unset";
	iniciarIntervalo();
}


function tocarAudio(tipo){
	var audioElement = document.getElementById('audio');
	var srcWalk = document.getElementById('a-walk').src;
	var contagemRegressiva = document.getElementById('a-54321').src;
	var srcRunConf = document.getElementById('a-run-1').src;
	var srcComplete = document.getElementById('a-complete').src;
	
	if(tipo === 0)
	{
		if(!rodando) return;
		var funcao = function(){
			document.getElementById('audio').src = document.getElementById('a-complete').src;
			audioElement.play();
			
			audioElement.removeEventListener('ended', funcao, false);
		};
		
		audioElement.addEventListener('ended', funcao);		
		audioElement.src = contagemRegressiva;
		audioElement.play();
	}
	
	if(tipo === 1)
	{
		if(!rodando) return;
		var funcao = function(){
			
			if(!rodando) return;
				
			document.getElementById('audio').src = document.getElementById('a-walk').src;
			audioElement.play();
			
			audioElement.removeEventListener('ended', funcao, false);
			document.getElementById("titulo").innerHTML = "WALK";
		};
		
		audioElement.addEventListener('ended', funcao);		
		audioElement.src = contagemRegressiva;
		audioElement.play();
		
	}
	
	if(tipo === 2)
	{
		if(!rodando) return;
		var funcao = function(){
			if(!rodando) return;
			document.getElementById('audio').src = document.getElementById('a-run-1').src;
			audioElement.play();
			
			audioElement.removeEventListener('ended', funcao, false);
			document.getElementById("titulo").innerHTML = "RUN";
		};
		
		audioElement.addEventListener('ended', funcao);		
		audioElement.src = contagemRegressiva;
		audioElement.play();
		
	}
	
	if(tipo === 3)
	{
		if(!rodando) return;
		var funcao = function(){
			if(!rodando) return;
			document.getElementById('audio').src = document.getElementById('a-run-2').src;
			audioElement.play();
			
			audioElement.removeEventListener('ended', funcao, false);
			document.getElementById("titulo").innerHTML = "RUN";
		};
		
		audioElement.addEventListener('ended', funcao);		
		audioElement.src = contagemRegressiva;
		audioElement.play();
		
	}
	
	if(tipo === 4)
	{
		if(!rodando) return;
		var funcao = function(){
			if(!rodando) return;
			document.getElementById('audio').src = document.getElementById('a-walk-2').src;
			audioElement.play();
			
			audioElement.removeEventListener('ended', funcao, false);
			document.getElementById("titulo").innerHTML = "WALK";
		};
		
		audioElement.addEventListener('ended', funcao);		
		audioElement.src = contagemRegressiva;
		audioElement.play();	
	}
}

Date.prototype.addMinutes = function(minutes) {
    var copiedDate = new Date(this.getTime());
    return new Date(copiedDate.getTime() + minutes * 60000);
}	
	
function iniciarIntervalo(){
	document.getElementById("ciclo").innerHTML = '' + (indice) + '/' + modoAtual.length;
	rodando = true;
	countDownDate = new Date().addMinutes(modoAtual[indice].tempo).getTime();
	//countDownDate = new Date().addMinutes(0.20).getTime();
	intervalo = setInterval(function() {
	
	  // Get today's date and time
	  var now = new Date().getTime();
	    
	  // Find the distance between now and the count down date
	  var distance = countDownDate - now;
	    
	  // Time calculations for days, hours, minutes and seconds
	  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	    
	  // Output the result in an element with id="demo"
	  
	  if(minutes > -1 && seconds > -1)
		  document.getElementById("demo").innerHTML = " " + minutes + ":" + seconds;
	    

	  if(seconds == 7 && rodando){
		  
		  if(indice+1 > modoAtual.length -1)
		  {
			  tocarAudio(0);
			  return;
		  }
			  
		  var proximo = modoAtual[indice+1];
			  
		  tocarAudio(proximo.tipo);
	  }
	  
	  if (distance < 0) {
		rodando = false;
	    clearInterval(intervalo);
	    if(indice+1 > modoAtual.length -1)
    	{
	    	document.getElementById("demo").innerHTML = "COMPLETED";
	    	//document.getElementById("voltar").style.display="unset";
    	}
	    else
	    	iniciarIntervalo();
	    
	    indice = indice + 1;
	    document.getElementById("ciclo").innerHTML = '' + (indice) + '/' + modoAtual.length;
	  }
	}, 500);
}

function removerIntervalos(){
	rodando = false;
	clearInterval(intervalo);
	document.querySelector('#iniciar').style.display="unset";
	document.querySelector('#regressiva').style.display="none";
	document.querySelector('#cronometro').style.display="none";
	var audioElement = document.getElementById('audio');
	audioElement.pause();
}
