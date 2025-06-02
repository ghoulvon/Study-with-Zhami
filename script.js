function showSection(sectionId, clickedButton) {
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });
  
  document.getElementById(sectionId).classList.add('active');
  
  document.querySelectorAll('.nav-btn').forEach(button => {
    button.classList.remove('active');
  });
  
  clickedButton.classList.add('active');
  
  document.getElementById(sectionId).scrollIntoView({
    behavior: 'smooth'
  });
}
document.addEventListener('DOMContentLoaded', function() {
  const firstButton = document.querySelector('.nav-btn');
  if (firstButton) {
    showSection('games', firstButton);
  }

  // Путь к книге — укажи свой файл здесь
  const bookUrl = 'books/A Brief History Of Time - From the Big Bang to Black Holes (Stephen Hawing) (Z-Library).pdf';

  document.querySelectorAll('.read-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      window.open(bookUrl, '_blank');
    });
  });

  document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const a = document.createElement('a');
      a.href = bookUrl;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  });
});
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    window.open('experiment-page.html', '_blank');
  });
});
