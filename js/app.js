'use strict';

/* --- Cat DOM Elements --- */
const displayedCat = {
    element: document.querySelector('.cat'),
    clicksRecordElement: document.querySelector('.clicks-record'),
    nameElement: document.querySelector('.name'),
    imageElement: document.querySelector('.cat-image')
};

/* --- Cat Class --- */
class Cat {
    constructor(color, name, src) {
        this.color = color;
        this.clicksRecord = 0;
        this.name = name;
        this.src = src;
    }
    
    setColor() {
        displayedCat.element.style.color = this.color;
    }
    
    logClicksRecord() {
        displayedCat.clicksRecordElement.textContent = this.clicksRecord;
    }
    
    incrementClicksRecord() {
        this.clicksRecord++;
    }
    
    logName() {
        displayedCat.nameElement.textContent = this.name;
    }
    
    setImage() {
        displayedCat.imageElement.setAttribute('src', this.src);
    }
}

/* --- Instances --- */
const chloe = new Cat('#797F95', 'Chloe', 'images/chloe.png'),
      ozone = new Cat('#CC6266', 'Ozone', 'images/ozone.png'),
      tom = new Cat('#C8CECE', 'Tom', 'images/tom.png'),
      garfield = new Cat('#FCAA16', 'Garfield', 'images/garfield.png'),
      marie = new Cat('#F06594', 'Marie', 'images/marie.png');

/* --- list --- */
const catsList = document.querySelector('.cats-list');
      

/* ----- Click Events ----- */

/* --- Select Cat --- */
catsList.addEventListener('click', event => {
    const catClass = event.target.className;
    let cat;
    
    switch (catClass) {
        case 'chloe':
            cat = chloe;
            break;
        case 'ozone':
            cat = ozone;
            break;
        case 'tom':
            cat = tom;
            break;
        case 'garfield':
            cat = garfield;
            break;
        case 'marie':
            cat = marie;
            break;
    }
    
    cat.setColor();
    cat.logClicksRecord();
    displayedCat.clicksRecordElement.style.display = 'flex';
    cat.logName();
    cat.setImage();
});

/* --- Click Cat --- */
displayedCat.imageElement.addEventListener('click', event => {
    const imageSrc = event.target.getAttribute('src');
    let cat;
    
    switch (imageSrc) {
        case 'images/chloe.png':
            cat = chloe;
            break;
        case 'images/ozone.png':
            cat = ozone;
            break;
        case 'images/tom.png':
            cat = tom;
            break;
        case 'images/garfield.png':
            cat = garfield;
            break;
        case 'images/marie.png':
            cat = marie;
            break;
    }
    
    cat.incrementClicksRecord();
    cat.logClicksRecord();
});



