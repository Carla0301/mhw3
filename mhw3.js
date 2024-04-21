//mostra una seconda immagine di ciascuna localita' quando si passa sopra con il mouse
//torna l'immagine di prima una volta che ci si sposta con il mouse

const mappaViaggiOver={
    venezia: "https://a.cdn-hotels.com/gdcs/production126/d943/56a06cca-b264-46e6-86eb-d518efd2198f.jpg?impolicy=fcrop&w=800&h=533&q=medium",
    roma: "https://tourismmedia.italia.it/is/image/mitur/1600X1000_8_cose_imperdibili_natale_di_roma_hero?wid=1080&hei=660&fit=constrain,1&fmt=webp",
    palermo:"https://a.cdn-hotels.com/gdcs/production63/d1896/79f77da4-aa4b-4915-a74d-6c8f9b652694.jpg",
    trento:"https://scorcidimondo.it/wp-content/uploads/2021/10/PSX_20211026_175601-scaled.jpg"
}

const mappaViaggiOut={
    venezia: "https://experience.europlan.it/wp-content/uploads/2019/04/venezia-classica1920x1080.jpg",
    roma: "https://media.istockphoto.com/id/539115110/it/foto/colosseo-di-roma-e-sole-mattutino-italia.jpg?s=612x612&w=0&k=20&c=ngbBMGVEkJxHsnt4SN7ZuncEnRenq2tFI8V0-zCg4pw=",
    palermo:"https://civitavecchia.portmobility.it/sites/default/files/palermo_-_la_fontana_pretoria.jpg",
    trento:"https://www.hotelmontana.it/wp-content/uploads/2019/04/Trento.jpg"
}



function onMouseoverViaggio(event){

    const image=event.currentTarget;
    image.src=mappaViaggiOver[image.parentNode.dataset.citta];
    image.removeEventListener("mouseover", onMouseoverViaggio);
    image.addEventListener("mouseout", onMouseoutViaggio);
}

function onMouseoutViaggio(event){

    const image=event.currentTarget;
    image.src=mappaViaggiOut[image.parentNode.dataset.citta];
    image.removeEventListener("mouseout", onMouseoutViaggio);
    image.addEventListener("mouseover", onMouseoverViaggio);

}

const img_venezia=document.querySelector("#img_venezia");
img_venezia.addEventListener("mouseover", onMouseoverViaggio);

const img_roma=document.querySelector("#img_roma");
img_roma.addEventListener("mouseover", onMouseoverViaggio);

const img_palermo=document.querySelector("#img_palermo");
img_palermo.addEventListener("mouseover", onMouseoverViaggio);

const img_trento=document.querySelector("#img_trento");
img_trento.addEventListener("mouseover", onMouseoverViaggio);




//menu a tendina su Servizi a bordo e Contatti

function menuTendina(event){

    const elemento=event.currentTarget;


    const tendina=elemento.parentNode.querySelector(".hidden");
    tendina.classList.remove("hidden");
    tendina.classList.add("menu_tendina");
    

    elemento.removeEventListener("mouseover", menuTendina);
    elemento.addEventListener("mouseout", rimuoviTendina);
}

function rimuoviTendina(event){

    const elemento=event.currentTarget;
    const tendina=elemento.parentNode.querySelector(".menu_tendina");
    
    tendina.classList.remove("menu_tendina");
    tendina.classList.add("hidden");

    elemento.removeEventListener("mouseout", rimuoviTendina);
    elemento.addEventListener("mouseover", menuTendina);
}

const servizi=document.querySelector("#menu_tendina_servizi a");
servizi.addEventListener("mouseover", menuTendina);

const contatti=document.querySelector("#contatti a");
contatti.addEventListener("mouseover", menuTendina);



//"clicca qui per saperne di piu'" nei riquadri dei viaggi
//uso i data-* per salvare info come il num di abitanti, turisti all'anno e i metri quadrati
//che poi mostro una volta che si clicca su "clicca qui per maggiori info"


function onClickScopriDiPiu(event){
    
    const elemento=event.currentTarget;
    const info=document.createElement("p");

    const blocco_viaggio=elemento.parentNode;

    info.textContent=blocco_viaggio.dataset.abitanti + blocco_viaggio.dataset.turismo + blocco_viaggio.dataset.grandezza;
    

    
    elemento.classList.remove("bottoni_viaggi")
    elemento.classList.add("hidden");

    
    blocco_viaggio.appendChild(info);
}


const bottone_venezia=document.querySelector("#bottone_venezia");
bottone_venezia.addEventListener("click", onClickScopriDiPiu);

const bottone_palermo=document.querySelector("#bottone_palermo");
bottone_palermo.addEventListener("click", onClickScopriDiPiu);

const bottone_roma=document.querySelector("#bottone_roma");
bottone_roma.addEventListener("click", onClickScopriDiPiu);

const bottone_trento=document.querySelector("#bottone_trento");
bottone_trento.addEventListener("click", onClickScopriDiPiu);


//api meteo

function chiudiMeteo(event){
    if(event.key==="Escape"){
        const blocco_risultato=document.querySelector("#results_meteo");
        blocco_risultato.innerHTML="";
        // const testo_barra_input=document.querySelector("#content");
        // console.log(testo_barra_input)
        // testo_barra_input.innerHTML="";
        //non funonzia
    }
}

function onJson_meteo(json){

    console.log("richiesta ricevuta!");
    const risultato=json;
    console.log(risultato);

    const blocco_risultato=document.querySelector("#results_meteo");

    for(let item of risultato.days){
        const previsione_giornata=document.createElement("p");
        previsione_giornata.textContent=item.datetime+" temperatura: "+item.temp+". "+item.description;
        blocco_risultato.appendChild(previsione_giornata);
        
    }

    const messaggio_chiusura=document.createElement("p");
    messaggio_chiusura.textContent="premi escape per cancellare le previsioni";
    blocco_risultato.appendChild(messaggio_chiusura);
}


function onResponse(response){
    return response.json();
}


function search(event){

    event.preventDefault();

    //seleziono il contenuto di testo inserito
    const contenuto=document.querySelector("#content").value;

    //verifico che sia stato inserito effettivamente del testo
    if(contenuto){
        const localita = encodeURIComponent(contenuto);
        meteo_request=meteo_endpoint+localita+"/?key="+key_meteo+"&lang=it"+"&unitGroup=metric";
        fetch(meteo_request).then(onResponse).then(onJson_meteo);
    }else alert("inserisci una località");
}


const form_meteo=document.querySelector("#search_content");
form_meteo.addEventListener("submit", search);


const key_meteo="98PN893CB5TC5MNASCALHZULR"
const meteo_endpoint="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"

window.addEventListener('keydown', chiudiMeteo);





//api spotify

function onJson_music(json){
    console.log("siamo alla json music")
    console.log(json)

    if(json.tracks){
        console.log("canzoni")
        const risultati_brani=json.tracks.items
        for(let item of risultati_brani){
            console.log(item.name)
        }
    }

    if(json.albums){
        console.log("album")
        const risultati_album=json.albums.items
        for(let item of risultati_album){
            console.log(item.name+" Numero tracce: "+item.total_tracks+" Uscito il: "+item.release_date)
        }
    }

    if(json.artists){
        console.log("artisti")
        const risultati_artisti=json.artists.items
        for(let item of risultati_artisti){
            console.log(item.name+" Numero followers: "+item.followers.total)
        }
    }

}

function onResponse_music(response){
    return response.json();
}

function search_music(event){

    //rimuovo la funzione di default
    event.preventDefault();

    const contenuto=document.querySelector("#content_spotify").value;

    if(contenuto){
        const text=encodeURIComponent(contenuto);
        const tipo=document.querySelector("#tipo").value;

        console.log(text)

        fetch(spotify_endpoint_search+tipo+"&q="+text,
            {
                headers:
                {
                  'Authorization': 'Bearer ' + token
                }
              }
        ).then(onResponse_music).then(onJson_music)
    }

}

function OnJsonToken(json){
    //setto la variabile token alla stringa che viene restituita (ovvero access_token, che corrisponde al token stesso)
    token=json.access_token;
    console.log("token ricevuto")
}

function onTokenResponse(response){
    return response.json();
}

const spotify_client_id="2e836c32d8e2429b887c4d348e393941"
const spotify_client_secret="6731a89481c745c388f3533bf0bae8c6"

const spotify_endpoint_search="https://api.spotify.com/v1/search?type="
const spotify_endpoint_token="https://accounts.spotify.com/api/token";


//richiedo il token appena apro la pagina
let token;
fetch(spotify_endpoint_token,{
    method:"POST",
    body: "grant_type=client_credentials",
   headers:
   {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Basic " + btoa(spotify_client_id + ":" + spotify_client_secret)
   }
}).then(onTokenResponse).then(OnJsonToken);

//aggiungo l'event listener al form
const form_spotify=document.querySelector("#search_music");
form_spotify.addEventListener("submit", search_music);