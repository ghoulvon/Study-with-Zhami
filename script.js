document.addEventListener('DOMContentLoaded', function() {
  // Если возвращаемся из эксперимента
  if (sessionStorage.getItem('returningFromExperiment')) {
    sessionStorage.removeItem('returningFromExperiment');
    const experimentsSection = document.getElementById('experiments');
    const experimentsButton = document.querySelector('.nav-btn[onclick*="experiments"]');
    
    if (experimentsSection && experimentsButton) {
      showSection('experiments', experimentsButton);
      return; // Прерываем дальнейшее выполнение
    }
  }
  
  // Остальной ваш код инициализации...
});

// Функция открытия модального окна
function openExperimentModal(expId) {
  const expData = experimentsData[expId];
  if (!expData) return;

  document.getElementById("modalTitle").textContent = expData.title;
  document.getElementById("modalVideo").src = expData.videoUrl;

  const materialsContainer = document.getElementById("modalMaterials");
  materialsContainer.innerHTML = expData.materials.map(material => `
    <div class="material-card">
      <div class="material-icon">
        <i class="fas fa-file-${material.type}"></i>
      </div>
      <h3 class="material-name">${material.name}</h3>
      <a href="${material.url}" download class="download-btn">
        <i class="fas fa-download"></i> Жүктеу
      </a>
    </div>
  `).join('');

  modal.style.display = "block";
  document.body.style.overflow = "hidden";
  
  // Сохраняем текущую активную секцию
  const activeSection = document.querySelector('.content-section.active').id;
  sessionStorage.setItem('lastActiveSection', activeSection);
}

// Закрытие модального окна
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => e.target == modal && closeModal());

function closeModal() {
  modal.style.display = "none";
  document.getElementById("modalVideo").src = "";
  document.body.style.overflow = "auto";
}

// Обработчик кнопки "Басты бетке оралу"
document.getElementById('modalBackBtn').addEventListener('click', function(e) {
  e.preventDefault();
  closeModal();
  
  // Прокрутка к секции экспериментов после закрытия модального окна
  setTimeout(() => {
    document.getElementById('experiments').scrollIntoView({
      behavior: 'smooth'
    });
  }, 300);
});

// Остальной функционал
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
  // Восстанавливаем последнюю активную секцию
  const lastActiveSection = sessionStorage.getItem('lastActiveSection') || 'games';
  const activeButton = document.querySelector(`.nav-btn[onclick*="${lastActiveSection}"]`);
  
  if (activeButton) {
    showSection(lastActiveSection, activeButton);
  } else {
    const firstButton = document.querySelector('.nav-btn');
    if (firstButton) {
      showSection('games', firstButton);
    }
  }

  // Путь к книге
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