let container = document.querySelector('.image-container')
let title = document.querySelector('.title-container')
let colorContainer = document.querySelector('.color-container')
let rareContainer = document.querySelector('.rare-container')
let showColorsButton = document.querySelector('.show-colors')
let showRarityButton = document.querySelector('.show-rarity')
let resetButton = document.querySelector('.reset-button')

let allRarity = []
let allColors = []

document.addEventListener("DOMContentLoaded", function() {
    title.addEventListener("click", function() {
        this.remove();
        container.style.filter = 'none';

        showColorsButton.style.display = 'inline-block';
        showRarityButton.style.display = 'inline-block';
        resetButton.style.display = 'inline-block';

        // document.querySelectorAll('.rare-button-elements').forEach(button => {
        //     button.style.display = 'inline-block';
        // });
    });

    showColorsButton.addEventListener('click', function() {
        document.querySelectorAll('.button-elements').forEach(button =>{
            button.style.display = button.style.display === 'none' ? 'inline-block' : 'none';
        });
    })

    showRarityButton.addEventListener('click', function() {
        document.querySelectorAll('.rare-button-elements').forEach(button =>{
            button.style.display = button.style.display === 'none' ? 'inline-block' : 'none';
        });
    })

    resetButton.addEventListener('click', function() {
        resetImages();
    })

    fetch('data.json')
        .then((response) => response.json())
        .then((eyes) => {
            eyes.forEach((eye, index) => {
                let element = document.createElement('div');
                element.classList.add(`eye`);
                element.style.color = eye.color;
                element.setAttribute('data-color', eye.color);
                element.setAttribute('data-rarity', eye.rarity)

                    let img = document.createElement('img');
                    img.src = `./assets/${eye.asset}`;

                    container.append(element);
                    element.append(img);

                    if(!allColors.includes(eye.color)){
                        allColors.push(eye.color);
                    }

                    if(!allRarity.includes(eye.rarity)) {
                        allRarity.push(eye.rarity);
                    }
            });

            allColors.forEach(color => {
                let colorButtons = document.createElement('button');
                colorButtons.classList.add('button-elements')
                colorButtons.innerText = color;
                colorButtons.addEventListener('click', function() {
                    filterByColor(color);
                });
                colorContainer.appendChild(colorButtons);
            });

            allRarity.forEach(rarity => {
                let rarityButtons = document.createElement('button');
                rarityButtons.classList.add('rare-button-elements')
                rarityButtons.innerText = rarity;
                rarityButtons.addEventListener('click', function() {
                    filterByRarity(rarity);
                });
                rareContainer.appendChild(rarityButtons);
            });


        })

       

    function filterByColor(color) {
        // Hide all photos
        let photos = container.querySelectorAll('div.eye');
        photos.forEach(photo => {
            if (photo.getAttribute('data-color') !== color) {
                photo.classList.add('hidden');
            } else {
                photo.classList.remove('hidden');
            }
        });
        
    }

    function filterByRarity(rarity) {
        // Hide all photos
        let photos = container.querySelectorAll('div.eye');
        photos.forEach(photo => {
            if (photo.getAttribute('data-rarity') !== rarity) {
                photo.classList.add('hidden');
            } else {
                photo.classList.remove('hidden');
            }
        });
        
    }

    function resetImages() {
        let photos = container.querySelectorAll('.eye');
        photos.forEach(photo => {
            photo.classList.remove('hidden')
        })

    }

})
        