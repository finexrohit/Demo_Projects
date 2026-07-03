const slides = Array.from(document.querySelectorAll('.hero-slide'));
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');
const toggleSlideBtn = document.getElementById('toggleSlide');
const peopleSearch = document.getElementById('peopleSearch');
const searchPeopleBtn = document.getElementById('searchPeople');
const searchAdvancedBtn = document.getElementById('searchAdvanced');
const peopleResults = document.getElementById('peopleResults');
const essMenuToggle = document.getElementById('essMenuToggle');
const essMenuItem = essMenuToggle?.closest('.nav-item');

let activeSlide = 0;
let autoplayEnabled = true;
let autoplayTimer = null;

const peopleDirectory = [
  { name: 'Toshiro Mibe', code: 'HM-1001', title: 'Global Honda President' },
  { name: 'Tsutsumu Otani', code: 'HM-2007', title: 'HMSI President' },
  { name: 'Aarav Sharma', code: 'HR-1482', title: 'HR Business Partner' },
  { name: 'Neha Verma', code: 'IT-2211', title: 'IT Support Lead' },
];

function renderSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === activeSlide);
  });
}

function nextSlide() {
  renderSlide(activeSlide + 1);
}

function prevSlide() {
  renderSlide(activeSlide - 1);
}

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = window.setInterval(() => {
    if (autoplayEnabled) nextSlide();
  }, 5000);
}

function stopAutoplay() {
  if (autoplayTimer) {
    window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}

function toggleAutoplay() {
  autoplayEnabled = !autoplayEnabled;
  toggleSlideBtn.textContent = autoplayEnabled ? '⏸' : '▶';
}

function searchPeople() {
  const query = peopleSearch.value.trim().toLowerCase();

  if (!query) {
    peopleResults.innerHTML = '<span>View all</span>';
    return;
  }

  const matches = peopleDirectory.filter((person) => {
    return (
      person.name.toLowerCase().includes(query) ||
      person.code.toLowerCase().includes(query) ||
      person.title.toLowerCase().includes(query)
    );
  });

  if (!matches.length) {
    peopleResults.innerHTML = '<span>No matching employee found</span>';
    return;
  }

  const [match] = matches;
  peopleResults.innerHTML = `
    <span>${match.name} · ${match.code}</span>
    <span>${match.title}</span>
  `;
}

slides.forEach((slide, index) => {
  slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
});

renderSlide(0);
startAutoplay();

prevSlideBtn.addEventListener('click', () => {
  prevSlide();
});

nextSlideBtn.addEventListener('click', () => {
  nextSlide();
});

toggleSlideBtn.addEventListener('click', () => {
  toggleAutoplay();
});

searchPeopleBtn.addEventListener('click', searchPeople);
searchAdvancedBtn.addEventListener('click', searchPeople);
peopleSearch.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchPeople();
  }
});

document.querySelectorAll('.link-card, .task-item').forEach((element) => {
  element.addEventListener('click', () => {
    const label = element.querySelector('.task-label, strong')?.textContent || 'Item';
    peopleResults.innerHTML = `<span>${label} opened</span>`;
  });
});

document.getElementById('profileBtn').addEventListener('click', () => {
  peopleResults.innerHTML = '<span>Profile menu clicked</span>';
});

if (essMenuToggle && essMenuItem) {
  essMenuToggle.addEventListener('click', (event) => {
    event.preventDefault();
    const isOpen = essMenuItem.classList.toggle('is-open');
    essMenuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!essMenuItem.contains(event.target)) {
      essMenuItem.classList.remove('is-open');
      essMenuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}
