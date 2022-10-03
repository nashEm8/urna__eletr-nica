let votoPara = document.querySelector('.texto-voto span');
let cargo = document.querySelector('.texto-cargo span');
let inforCandidato = document.querySelector('.infor-candidato');
let aviso = document.querySelector('.instrucao-2');
let imgCandidatos = document.querySelector('.instrucao-right');
let numeroVoto = document.querySelector('.numero-voto');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votosTotal = [];

function comecarEtapa(){
	let etapa = etapas[etapaAtual];

	let numeroHtml = 'Número: ' + "&nbsp" + "&nbsp";
	numero = '';
	votoBranco = false;


	for(let i = 0; i < etapa.numeros; i++){
		if(i === 0){
			numeroHtml += '<div class="numero pisca"></div>';
		} else {
			numeroHtml += '<div class="numero"></div>';
		}
	}	


	votoPara.style.display = 'none';
	cargo.innerHTML = etapa.titulo;
	inforCandidato.innerHTML = '';
	aviso.style.display = 'none';
	imgCandidatos.innerHTML = '';
	numeroVoto.innerHTML = numeroHtml;
}

function atualizaInterface(){
	let etapa = etapas[etapaAtual];
	let candidato = etapa.candidato.filter((item) =>{
		if(item.numero === numero){
			return true;
		} else {
			return false;
		}
	});

	console.log('Candidato', candidato);

	if(candidato.length > 0){
		candidato = candidato[0];
		votoPara.style.display = 'block';
		inforCandidato.innerHTML = `Nome: ${candidato.nome} <br/> Partido: ${candidato.partido}`;
		aviso.style.display = 'block';

		let fotosHtml = '';
		for(let i in candidato.fotos){
			if(candidato.fotos[i].small){
				fotosHtml += `<div class="instrucao-right-img small"><img src="./imagens/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`;
			} else {
			fotosHtml += `<div class="instrucao-right-img"><img src="./imagens/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`;
		}
	}

		imgCandidatos.innerHTML = fotosHtml;
	} else {
		votoPara.style.display = 'block';
		aviso.style.display = 'block';
		inforCandidato.innerHTML = `<div class="aviso--votoBN pisca">VOTO NULO</div>`;
	}

}

function clicou(n){
	let elementoNumero = document.querySelector('.numero.pisca');
	if(elementoNumero !== null){
		elementoNumero.innerHTML = n;
		numero = `${numero}${n}`;

		elementoNumero.classList.remove('pisca');
		if(elementoNumero.nextElementSibling !== null){
			elementoNumero.nextElementSibling.classList.add('pisca');
		} else {
			atualizaInterface();
		}
	}
}

function branco(){
		numero = '';
		votoBranco = true;
		votoPara.style.display = 'block';
		aviso.style.display = 'block';
		numeroVoto.innerHTML = '';
		inforCandidato.innerHTML = `<div class="aviso--votoBN pisca">VOTO EM BRANCO</div>`;
		imgCandidatos.innerHTML = '';
}

function corrige(){
	comecarEtapa();
}

function confirma(){
	let etapa = etapas[etapaAtual];
	let votoConfirmado = false;

	if(votoBranco === true){
		votoConfirmado = true;
		votosTotal.push({
			etapa: etapas[etapaAtual].titulo,
			voto: 'Branco'
		});
	} else if(numero.length === etapa.numeros){
		votoConfirmado = true;
		votosTotal.push({
			etapa: etapas[etapaAtual].titulo,
			voto: numero
		});
	}

	if(votoConfirmado){
		etapaAtual++;
		if(etapas[etapaAtual] !== undefined){
			comecarEtapa();
		} else {
			document.querySelector('.tela').innerHTML = `<div class="aviso--gigante">FIM</div>`;
			console.log(votosTotal);
		}
	}
}

comecarEtapa();