'use strict';

/* --- Dom Elements --- */
const catsNamesList = document.querySelector('.cats-list'),
      catTemplate = {
          container: document.querySelector('.cat'),
          clicksCount: document.querySelector('.clicks-record'),
          name: document.querySelector('.name'),
          image: document.querySelector('.cat-image')
      };

/* --- Cat Class --- */
class Cat {
    constructor(color, name, src) {
        this.color = color;
        this.clicksCount = 0;
        this.name = name;
        this.src = src;
        this.listItem = `<li class="${this.name.toLowerCase()}" style="color: ${this.color}">${this.name}</li>`;
    }
    
    listCatName() {
        catsNamesList.insertAdjacentHTML('beforeEnd', this.listItem);
    }
    
    setColor() {
        catTemplate.container.style.color = this.color;
    }
    
    logClicksRecord() {
        catTemplate.clicksCount.textContent = this.clicksCount;
    }
    
    incrementClicksRecord() {
        this.clicksCount++;
    }
    
    logName() {
        catTemplate.name.textContent = this.name;
    }
    
    setImage() {
        catTemplate.image.setAttribute('src', this.src);
    }
    
    render() {
        this.setColor();
        this.logClicksRecord();
        catTemplate.clicksCount.classList.add('show');
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
const renderNamesList = () => {
    for (const cat of cats) {
        const [key, obj] = cat;
        obj.listCatName();
    }
}
renderNamesList();

/* --- Cache Images --- */
const images = [];

const preloadImage = src => {
    const image = new Image();
    image.src = src;
    images.push(image);
}

for (const cat of cats) {
    const [key, object] = cat;
    preloadImage(object.src);
}

/* ----- Click Events ----- */
/* --- Select Cat --- */
catsNamesList.addEventListener('click', event => {
    if (event.target.nodeName === 'LI') {
        const catName = event.target.textContent.toLowerCase();
        const currentCat = cats.get(catName);
        currentCat.render();
    }
});

/* --- Click Cat --- */
catTemplate.image.addEventListener('click', event => {
    const catName = event.target.parentElement.querySelector('.name').textContent.toLowerCase();
    const currentCat = cats.get(catName); 
    
    currentCat.incrementClicksRecord();
    currentCat.logClicksRecord();
});



