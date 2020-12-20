function cards() {
    class CardItem {
        constructor(imgSrc, imgAlt, header, descr, price, parentSelector, ...classes) {
            this.imgSrc = imgSrc
            this.imgAlt = imgAlt
            this.header = header
            this.descr = descr
            this.price = price
            this.parent = document.querySelector(parentSelector)
            this.transfer = 65
            this.classes = classes
            this.changeToRub()
        }

        changeToRub() {
            this.price = this.price * this.transfer;
        }

        createCard() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            }
            this.classes.forEach(className => element.classList.add(className));
            element.innerHTML = `
                    <img src=${this.imgSrc} alt=${this.imgAlt}>
                    <h3 class="menu__item-subtitle">${this.header}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>`
            this.parent.append(element);
        }
    }

    // const getCardContent = async url => {
    //     let res = await fetch(url);
    //
    //     if (!res.ok) {
    //         throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    //     }
    //     return await res.json();
    // };

    // getCardContent('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new CardItem(img, altimg, title, descr, price, '.menu .container').createCard()
    //         });
    //     });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new CardItem(img, altimg, title, descr, price, '.menu .container').createCard()
            });
        });
}

export default cards