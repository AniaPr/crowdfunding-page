class Home {
  constructor() {
    const thisHome = this;

    thisHome.getElements();
    thisHome.initActions();
  }

  getElements() {
    const thisHome = this;

    thisHome.icon = document.getElementById('icon');
    thisHome.bookmark = document.getElementById('bookmark');
    thisHome.buttonText = document.getElementById('text');
  }

  initActions() {
    const thisHome = this;

    thisHome.bookmark.addEventListener('click', () => {
      thisHome.icon.classList.toggle('active');
      thisHome.bookmark.classList.toggle('active');
      if (thisHome.bookmark.classList.contains('active')) {
        thisHome.buttonText.innerHTML = 'Bookmarked';
      } else thisHome.buttonText.innerHTML = 'Bookmark';
    });
  }
}

export default Home;
