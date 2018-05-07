'use strict';

/* --- Dom Elements --- */
const catsList = document.querySelector('.cats-list'),
      displayedCat = {
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
        this.listItem = `<li class="${this.name.toLowerCase()}" style="color: ${this.color}">${this.name}</li>`;
    }
    
    listCatName() {
        catsList.insertAdjacentHTML('beforeEnd', this.listItem);
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
    
    render() {
        this.setColor();
        this.logClicksRecord();
        displayedCat.clicksRecordElement.classList.add('show');
        this.logName();
        this.setImage();
    }
}

/* --- Instances --- */
const cats = new Map([['tom', new Cat('#C8CECE', 'Tom', 'images/tom.png')],
                      ['garfield', new Cat('#FCAA16', 'Garfield', 'images/garfield.png')],
                      ['marie', new Cat('#F06594', 'Marie', 'images/marie.png')],
                      ['meowth', new Cat('#DF7645', 'Meowth', 'images/meowth.png')],
                      ['sylvester', new Cat('#1F2831', 'Sylvester', 'images/sylvester.png')]]);

/* --- Cat List --- */
for (const cat of cats) {
    const [key, obj] = cat;
    obj.listCatName();
}

/* ----- Click Events ----- */
/* --- Select Cat --- */
catsList.addEventListener('click', event => {
    if (event.target.nodeName === 'LI') {
        const catName = event.target.textContent.toLowerCase();
        const currentCat = cats.get(catName);
        currentCat.render();
    }
});

/* --- Click Cat --- */
displayedCat.imageElement.addEventListener('click', event => {
    const catName = event.target.parentElement.querySelector('.name').textContent.toLowerCase();
    const currentCat = cats.get(catName); 
    
    currentCat.incrementClicksRecord();
    currentCat.logClicksRecord();
});



