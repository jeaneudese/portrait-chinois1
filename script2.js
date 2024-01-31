document.addEventListener("DOMContentLoaded", function () {
  var resultatsSection = document.getElementById("resultats");
  // analogie html
  data.forEach(function (f) {
    var blocAna = document.createElement("div");
    blocAna.className = "blocAna";

    blocAna.innerHTML =
      '<section>' +
      '<h2 class="si-jetais">' +
      "Si j'étais " + f.analogie + ", je serais... " +
      "</h2>" +
      '<h2 class="analogie">' +
      f.valeurAnalogie +
      '</h2>' +
      '<div class="description">' +
      '<p class="text">' +
      f.description +
      '</p>' +
      '<img class="cliquable" src="' + f.image + '" alt="image d '+f.valeurAnalogie+'">' +
      '<div class="popup invisible">' +
      '<img src="" alt="">' +
      '</div>' +
      '</div>' +
      '</section>';

    resultatsSection.appendChild(blocAna);
  });



  // image cliquable et s'aggrandi
  document.querySelectorAll(".cliquable").forEach(function (element) {
    element.addEventListener('click', function (e) {

      document.querySelector(".popup").classList.add('visible');
      document.querySelector(".popup").classList.remove('invisible');
      console.log(e.target.getAttribute('src'))
      document.querySelector('.visible img').setAttribute('src', e.target.getAttribute('src'));

    });
  });

  document.querySelector('.popup').addEventListener('click', function (e) {
    document.querySelector('.popup').classList.add('invisible');
    document.querySelector('.popup').classList.remove('visible');
  });

  // formulaire
  document.querySelector("#envoie").addEventListener('click', function (e) {
    var urlVisitee = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=gambette&courriel="
      + document.querySelector("#mail").value
      + "&message=Si j'étais ... "
      + document.querySelector("#analogie").value
      + " je serais ... "
      + document.querySelector("#valeurAnalogie").value
      + ' '
      + document.querySelector("#desc").value
      + document.querySelector("#image").value


    fetch(urlVisitee).then(function (reponse) {
      reponse.json().then(function (data) {
        if (data.status == "success") {
          document.querySelector('#messageApresEnvoi').innerHTML = "Votre message a bien été reçu";
        } else {
          document.querySelector("#messageApresEnvoi").innerHTML = "Problème : votre message n'a pas été reçu";
        }

      })
    })

  })


  document.querySelector('#analogie').addEventListener('keyup', function (e) {
    console.log("Champ analogie modifié")
    document.querySelector('#analogieSuggeree').innerHTML = document.querySelector('#analogie').value;
  })

  document.querySelector('#valeurAnalogie').addEventListener('keyup', function (e) {
    document.querySelector('#valeurAnalogieSuggeree').innerHTML = document.querySelector('#valeurAnalogie').value;
  })

  document.querySelector('#image').addEventListener('keyup', function (e) {
    document.querySelector('#imageSuggeree').innerHTML = "";
    var imageUrl = document.querySelector('#image').value;
    if (imageUrl) {
      var imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.alt = 'Image';

      imageSuggeree.appendChild(imgElement);
    }
  })

  document.querySelector('#desc').addEventListener('keyup', function (e) {
    document.querySelector('#descriptionSuggeree').innerHTML = document.querySelector('#desc').value;
  })



  // mentions legale 



  document.querySelector('.mention').addEventListener('click', function (e) {

    if (this.classList.contains('v-invisible')) {
        this.classList.remove('v-invisible');
        this.classList.add('v-visible');
    } else {
      
        this.classList.remove('v-visible');
        this.classList.add('v-invisible');
    }
});

});