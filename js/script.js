{
  ('use strict');

  const templates = {
    templateOption: Handlebars.compile(
      document.querySelector('#template-option').innerHTML
    ),
  };

  class OptionList {
    constructor() {
      const thisOption = this;

      thisOption.initData();
      thisOption.render();
      thisOption.initActions();
    }

    initData() {
      const thisOption = this;

      thisOption.data = dataSource.options;
    }

    render() {
      const thisOption = this;

      const optionWrapper = document.querySelector('.option');

      thisOption.data.forEach((option) => {
        const data = templates.templateOption({
          title: option.title,
          donation: option.donation,
          description: option.description,
          amount: option.amount,
          button: option.button,
        });
        optionWrapper.innerHTML += data;
      });

      const cards = document.querySelectorAll('.amount span:first-child');
      for (let card of cards) {
        if (card.innerHTML === '0') {
          const parent = card.closest('.card');
          const button = parent.querySelector('.button');
          button.innerHTML = 'Out of stock';
          parent.classList.add('unavailable');
        }
      }
    }

    initActions() {
      const thisOption = this;

      const icon = document.getElementById('icon');
      const bookmark = document.getElementById('bookmark');
      const buttonText = document.getElementById('text');

      bookmark.addEventListener('click', () => {
        icon.classList.toggle('active');
        bookmark.classList.toggle('active');
        if (bookmark.classList.contains('active')) {
          buttonText.innerHTML = 'Bookmarked';
        } else buttonText.innerHTML = 'Bookmark';
      });
    }
  }

  new OptionList();
}
