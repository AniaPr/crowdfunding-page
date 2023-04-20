import { dataSource } from '../data.js';

const templates = {
  templateProduct: Handlebars.compile(
    document.querySelector('#template-product').innerHTML
  ),
  templatePopup: Handlebars.compile(
    document.querySelector('#template-popup').innerHTML
  ),
};

class Product {
  constructor() {
    const thisProduct = this;

    thisProduct.initData();
    thisProduct.render();
    thisProduct.getElements();
    thisProduct.initAction();
    thisProduct.disabledProduct();
  }

  initData() {
    const thisProduct = this;
    thisProduct.data = dataSource.products;
  }

  getElements() {
    const thisProduct = this;

    thisProduct.amountWrapper = document.querySelectorAll(
      '.amount span:first-child'
    );
    thisProduct.radioInput = document.querySelector('.radio-input');
    thisProduct.allCards = document.querySelectorAll('.card');
    thisProduct.popupCards = document.querySelectorAll('.container .card');
    thisProduct.overlay = document.querySelector('.overlay');
    thisProduct.buttonBack = document.getElementById('back');
    thisProduct.popups = document.querySelectorAll('.popup');
    thisProduct.thanks = document.querySelector('.thanks');
    thisProduct.buttonGotIt = document.getElementById('ok');
    thisProduct.buttonsContinue = document.querySelectorAll('.continue');
    thisProduct.support = document.querySelectorAll('.support');
  }

  render() {
    const thisProduct = this;

    thisProduct.productWrapper = document.querySelector('.products');
    thisProduct.popupWrapper = document.querySelector('.container');

    thisProduct.data.forEach((product) => {
      const payload = {
        id: product.id,
        title: product.title,
        donation: product.donation,
        description: product.description,
        amount: product.amount,
      };

      const productHtml = templates.templateProduct(payload);
      thisProduct.productWrapper.innerHTML += productHtml;

      const popupHtml = templates.templatePopup(payload);
      thisProduct.popupWrapper.innerHTML += popupHtml;
    });
  }

  initAction() {
    const thisProduct = this;

    thisProduct.buttonBack.addEventListener('click', () => {
      thisProduct.overlay.classList.add('active');
      thisProduct.popupCards.forEach((card) => {
        card.classList.remove('active');
      });
      thisProduct.radioInput.closest('.card').classList.add('active');
      thisProduct.activeProduct();
    });

    thisProduct.allCards.forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.nodeName === 'BUTTON') {
          thisProduct.popupCards.forEach((card) => {
            card.classList.remove('active');
          });
          thisProduct.overlay.classList.add('active');
          for (let elem of thisProduct.popupCards) {
            if (elem.id === card.id) {
              elem.classList.add('active');
              thisProduct.activeProduct();
            } else elem.classList.remove('active');
          }
        }

        if (e.target.className === 'radio-input') {
          thisProduct.popupCards.forEach((card) => {
            card.classList.remove('active');
          });
          card.classList.add('active');
          thisProduct.activeProduct();
        }
      });
    });

    thisProduct.popups.forEach((popup) => {
      popup.addEventListener('click', (event) => {
        if (event.target.classList.contains('fa-xmark')) {
          thisProduct.overlay.classList.remove('active');
        } else if (event.target.classList.contains('continue')) {
          thisProduct.overlay.classList.remove('active');
          thisProduct.thanks.classList.add('active');
        } else if (event.target === thisProduct.buttonGotIt) {
          thisProduct.thanks.classList.remove('active');
          thisProduct.overlay.classList.remove('active');
        }
      });
    });
  }

  activeProduct() {
    const thisProduct = this;

    thisProduct.popupCards.forEach((card) => {
      const input = card.querySelector('.radio-input');
      if (card.classList.contains('active')) {
        input.checked = true;
        console.log(input.checked);
        for (let show of thisProduct.support) {
          const parent = show.closest('.card');
          if (parent.classList.contains('active')) {
            show.classList.add('show');
          } else show.classList.remove('show');
        }
      }
    });
  }

  disabledProduct() {
    const thisProduct = this;

    for (const amount of thisProduct.amountWrapper) {
      if (amount.innerHTML === '0') {
        const parent = amount.closest('.card');
        const input = parent.querySelector('.radio-input');
        const button = parent.querySelector('.button');

        if (input != null) {
          input.disabled = true;
        }

        button.innerHTML = 'Out of stock';
        parent.classList.add('unavailable');
        button.addEventListener('mouseover', () => {
          button.disabled = true;
        });
      }
    }
  }
}

export default Product;
