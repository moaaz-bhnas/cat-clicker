'use strict';

/* --- Page Current Viewed Cat --- */
let currentCat;

/* --- Dom Elements --- */
const catsNamesList = document.querySelector('.cats-list'),
      catView = {
          container: document.querySelector('.cat'),
          clicksCount: document.querySelector('.clicks-record'),
          name: document.querySelector('.name'),
          image: document.querySelector('.cat-image'),
          
          empty() {
              this.clicksCount.classList.remove('show');
              this.clicksCount.textContent = '';
              this.name.textContent = '';
              this.image.setAttribute('src', '');
          }
      },
      addCatForm = document.querySelector('.add-cat'),
      addCatSign = document.querySelector('.add'),
      newCat = {
          nameInput: document.querySelector('.new-cat-name'),
          srcInput: document.querySelector('.new-cat-src'),
          colorInput: document.querySelector('.new-cat-color'),
          addBtn: document.querySelector('button'),
          colorMsg: document.querySelector('small'),
          
          emptyInputs() {
              this.nameInput.value = '';
              this.srcInput.value = '';
              this.colorInput.value = '';
          },
          
          resetColor() {
              this.colorInput.style.color = 'inherit';
          }
      };

/* --- Cat Class --- */
class Cat {
    constructor(color, name, src) {
        this.color = color;
        this.clicksCount = 0;
        this.name = name;
        this.src = src;
        this.listItem = `<li class="${(this.name).toLowerCase()}" style="color: ${this.color}">
                            <span class="cat-name">${this.name}</span>
                            <span class="remove fa fa-times" title="remove" aria-hidden="true"></span>
                        </li>`;
    }
    
    listCatName() {
        catsNamesList.insertAdjacentHTML('beforeEnd', this.listItem);
    }
    
    setColor() {
        catView.container.style.color = this.color;
        document.body.style.backgroundColor = this.color;
        addCatForm.style.color = this.color;
        newCat.addBtn.style.backgroundColor = this.color;
        addCatSign.style.color = this.color;
    }
    
    logClicksRecord() {
        catView.clicksCount.textContent = this.clicksCount;
    }
    
    incrementClicksRecord() {
        this.clicksCount++;
    }
    
    logName() {
        catView.name.textContent = this.name;
    }
    
    setImage() {
        catView.image.setAttribute('src', this.src);
    }
    
    render() {
        this.setColor();
        this.logClicksRecord();
        catView.clicksCount.classList.add('show');
        this.logName();
        this.setImage();
    }
}

/* --- Instances --- */
const cats = new Map([['tom', new Cat('#90979F', 'Tom', 'images/tom.png')],
                      ['garfield', new Cat('#FCAA16', 'Garfield', 'images/garfield.png')],
                      ['marie', new Cat('#F06594', 'Marie', 'images/marie.png')],
                      ['meowth', new Cat('#DF7645', 'Meowth', 'images/meowth.png')],
                      ['sylvester', new Cat('#1F2831', 'Sylvester', 'images/sylvester.png')]]);

/* --- Cache Images --- */
const images = [];

const preloadImage = src => {
    const image = new Image();
    image.src = src;
    images.push(image);
}

const preloadImages = () => {
    for (const cat of cats) {
        const [key, object] = cat;
        preloadImage(object.src);
    }
}
preloadImages();

/* --- Cat List --- */
const renderNamesList = () => {
    for (const cat of cats) {
        const [key, obj] = cat;
        obj.listCatName();
    }
}
renderNamesList();

/* --- Display Random Cat --- */
const fadeOutIn = catObj => {
    catView.container.classList.add('fade-out');
    setTimeout(() => {
        catObj.render();
        catView.container.classList.remove('fade-out');
    }, 150);
}

const displayRandomCat = () => {
    const catNames = [];
    for (const cat of cats) {
        const [name, object] = cat;
        catNames.push(name);
    }
    const randomIndex = Math.floor(Math.random() * catNames.length);
    currentCat = catNames[randomIndex];
    const randomCat = cats.get(catNames[randomIndex]);
    
    fadeOutIn(randomCat);
}
displayRandomCat();

/* --- Random Color Generator --- */
const generateRandomColor = () => {
    const characters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
    let color = '#';
    for (let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * 16);
        color += characters[randomIndex];
    }
    return color;
}

/* ----- Click Events ----- */
/* --- Select and Remove Cats --- */
catsNamesList.addEventListener('click', event => {
    
    const nameOrXClicked = event.target.nodeName === 'SPAN';
    
    if (nameOrXClicked) {
        const catLi = event.target.parentElement,
              clickedCatName = catLi.className; // Chloe
        
        switch (event.target.className) {
            // Select
            case 'cat-name':
                if (currentCat !== clickedCatName) {
                    currentCat = clickedCatName;
                    const catObject = cats.get(clickedCatName); // {color: "#C8CECE", clicksCount: 0, name: "Tom", src: "images/tom.png", listItem: "<li ..
                    fadeOutIn(catObject);
                }
                break;
            // Remove
            case 'remove fa fa-times':
                catLi.remove();
                cats.delete(clickedCatName);
                if (cats.size === 0) {
                    catView.empty()
                    document.body.style.backgroundColor = 'transparent';
                    catsNamesList.style.padding = 0;
                    addCatForm.style.color = 'grey';
                    newCat.addBtn.style.backgroundColor = 'grey';
                    addCatSign.style.color = 'grey';
                } else {
                    displayRandomCat();
                }   
        }
        
    }
});

/* --- Click Cat --- */
catView.image.addEventListener('click', event => {
    const clickedCatName = event.target.parentElement.querySelector('.name').textContent.toLowerCase();
    const currentCat = cats.get(clickedCatName); 
    
    currentCat.incrementClicksRecord();
    currentCat.logClicksRecord();
});

/* --- Add Cat --- */
addCatForm.addEventListener('submit', event => {
    event.preventDefault();
    
    catsNamesList.style.padding = '.5em';
    
    let name = newCat.nameInput.value,
        src = newCat.srcInput.value,
        color;
    
    if (newCat.colorInput.style.color === 'inherit') {
        color = generateRandomColor();   
    } else {
        color = newCat.colorInput.value;
    }
    
    cats.set(name.toLowerCase(), new Cat(color, (name[0].toUpperCase() + name.slice(1).toLowerCase()), src));
    
    catsNamesList.innerHTML = '';
    
    renderNamesList();
    preloadImages();
    newCat.emptyInputs();
    
    newCat.resetColor();
});

/* --- Color Input --- */
newCat.colorInput.addEventListener('input', function() {
    this.style.color = 'inherit';
    this.style.color = newCat.colorInput.value;
});

/* --- form pop-up and sign move --- */
addCatSign.addEventListener('click', function() {
    this.classList.toggle('move');
    addCatForm.classList.toggle('pop-up');
});

/* --- Optional Color Message --- */
newCat.colorInput.addEventListener('focusin', function() {
    newCat.colorMsg.classList.add('show-msg');
    addCatSign.style.transform = 'translate(-6.7rem, calc(-5.2rem - 2.375rem / 2))';
});

newCat.colorInput.addEventListener('focusout', function() {
    newCat.colorMsg.classList.remove('show-msg');
    addCatSign.style.transform = 'translate(-6.7rem, -5.2rem)';
});
