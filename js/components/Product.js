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
    thisProduct.actionContinue();
    thisProduct.activeProduct();
    thisProduct.progressBarAction();
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
    thisProduct.popupCards = document.querySelectorAll('.container .card');
    thisProduct.backThisProject = document.querySelector('.back-project');
    thisProduct.buttonsBack = document.querySelectorAll('.back');
    thisProduct.popups = document.querySelectorAll('.popup');
    thisProduct.thanks = document.querySelector('.thanks');
    thisProduct.buttonGotIt = document.getElementById('gotIt');
    thisProduct.buttonsContinue = document.querySelectorAll('.continue');
    thisProduct.support = document.querySelectorAll('.support');
    thisProduct.backers = document.querySelector('.backers');
    thisProduct.totalAmount = document.getElementById('money');
    thisProduct.progressBar = document.querySelector('.progress-bar');
    thisProduct.alert = document.querySelector('.alert-wrapper');
    thisProduct.menuIcon = document.querySelector('.fa-bars');
    thisProduct.mobileMenu = document.querySelector('.mobile-menu');
  }

  totalBackers() {
    const thisProduct = this;

    const change = thisProduct.backers.innerHTML.replace(',', '');
    const newValue = parseFloat(change) + 1;
    thisProduct.backers.innerHTML = newValue.toLocaleString('en-US');
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

    thisProduct.buttonsBack.forEach((button) => {
      button.addEventListener('click', () => {
        thisProduct.backThisProject.classList.add('active');
        const card = button.closest('.card');
        document.querySelector('.back-project .popup').scroll({ top: 0 });

        thisProduct.popupCards.forEach((elem) => {
          if (elem.id === card.id) {
            elem.classList.add('active');
            elem.scrollIntoView({ block: 'center', behavior: 'smooth' });

            const input = elem.querySelector('.radio-input');
            input.checked = true;
            if (elem.classList.contains('active')) {
              const support = elem.querySelector('.support');
              support.classList.add('show');
            }
          }
        });
      });
    });

    thisProduct.popups.forEach((popup) => {
      popup.addEventListener('click', (event) => {
        if (event.target.classList.contains('fa-xmark')) {
          thisProduct.backThisProject.classList.remove('active');
          thisProduct.removeActiveClass();
        } else if (event.target === thisProduct.buttonGotIt) {
          thisProduct.thanks.classList.remove('active');
          //thisProduct.thanks.querySelector('.popup').classList.add('close');
          thisProduct.backThisProject.classList.remove('active');
          thisProduct.removeActiveClass();
          setTimeout(() => {
            thisProduct.progressBarAction();
          }, 2500);
        }
      });
    });

    thisProduct.menuIcon.addEventListener('click', () => {
      thisProduct.mobileMenu.classList.add('active');
      thisProduct.menuIcon.classList.add('hide');
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-xmark')) {
        thisProduct.mobileMenu.classList.remove('active');
        thisProduct.menuIcon.classList.remove('hide');
      }
    });

    for (let overlay of document.querySelectorAll('.overlay')) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    }
  }

  actionContinue() {
    const thisProduct = this;

    thisProduct.buttonsContinue.forEach((elem) => {
      elem.addEventListener('click', () => {
        let sum = parseFloat(
          thisProduct.totalAmount.innerHTML.replace(',', '')
        );
        let input = elem.closest('.box').querySelector('input');
        let newValue = 0;
        let placeholder = parseInt(input.placeholder);
        let value = parseInt(input.value);

        if (value < placeholder || value === 0 || isNaN(value)) {
          thisProduct.alert.classList.add('active');
          document.getElementById('ok').addEventListener('click', () => {
            thisProduct.alert.classList.remove('active');
          });
          input.value = placeholder;
        } else if (value >= placeholder) {
          newValue = value;
          thisProduct.backThisProject.classList.remove('active');
          thisProduct.thanks.classList.add('active');
          input.value = '';
          thisProduct.totalBackers();
        }

        sum += newValue;
        thisProduct.totalAmount.innerHTML = (sum / 1000)
          .toFixed(3)
          .replace('.', ',');
      });
    });
  }

  progressBarAction() {
    const thisProduct = this;

    let bar = parseFloat(thisProduct.totalAmount.innerHTML);
    let width = 1;

    const progress = () => {
      if (width >= bar) {
        clearInterval(id);
      } else {
        width++;
        thisProduct.progressBar.style.width = width + '%';
      }
    };

    const id = setInterval(progress, 10);
  }

  removeActiveClass() {
    const thisProduct = this;

    thisProduct.popupCards.forEach((card) => {
      card.classList.remove('active');
      const support = card.querySelector('.support');
      support.classList.remove('show');
      const input = card.querySelector('.radio-input');
      input.checked = false;
    });
  }

  activeProduct() {
    const thisProduct = this;

    thisProduct.popupCards.forEach((card) => {
      card.addEventListener('click', () => {
        const input = card.querySelector('.radio-input');
        if (input.checked) {
          for (let card of thisProduct.popupCards) {
            card.classList.remove('active');
          }
          card.classList.add('active');
          card.scrollIntoView({ block: 'center', behavior: 'smooth' });
          for (let show of thisProduct.support) {
            const parent = show.closest('.card');
            if (parent.classList.contains('active')) {
              show.classList.add('show');
            } else show.classList.remove('show');
          }
        }
      });
    });
  }

  disabledProduct() {
    const thisProduct = this;

    for (const amount of thisProduct.amountWrapper) {
      if (amount.innerHTML === '0') {
        const parent = amount.closest('.card');
        const button = parent.querySelector('.button');

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
