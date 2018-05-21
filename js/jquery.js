'use strict';

/* --- Dom Elements --- */
const catsNamesList = $('.cats-list'),
      catTemplate = {
          container: $('.cat'),
          clicksCount: $('.clicks-record'),
          name: $('.name'),
          image: $('.cat-image')
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
        catsNamesList.append(this.listItem);
    }
    
    setColor() {
        catTemplate.container.css({color: this.color});
    }
    
    logClicksCount() {
        catTemplate.clicksCount.text(this.clicksCount);
    }
    
    incrementClicksCount() {
        this.clicksCount++;
    }
    
    logName() {
        catTemplate.name.text(this.name);
    }
    
    setImage() {
        catTemplate.image.attr('src', this.src);
    }
    
    render() {
        this.setColor();
        this.logClicksCount();
        catTemplate.clicksCount.addClass('show');
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

/* ----- Click Events ----- */
/* --- Select Cat --- */
catsNamesList.click( event => {
    if (event.target.nodeName === 'LI') {
        const catName = event.target.textContent.toLowerCase();
        const currentCat = cats.get(catName);
        currentCat.render();
    }
});

/* --- Click Cat --- */
catTemplate.image.click( event => {
    const catName = event.target.parentElement.querySelector('.name').textContent.toLowerCase();
    const currentCat = cats.get(catName); 
    
    currentCat.incrementClicksCount();
    currentCat.logClicksCount();
});






