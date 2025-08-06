// Animación de entrada de las tarjetas 
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.fabric-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'all 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200);
  });

  // Filtrar telas del catálogo según texto del buscador
  const searchInput = document.getElementById('fabricSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const filter = searchInput.value.toLowerCase();
      const cards = document.querySelectorAll('.fabric-card');

      cards.forEach(card => {
        const name = card.querySelector('.fabric-name').textContent.toLowerCase();
        const description = card.querySelector('.fabric-description').textContent.toLowerCase();

        if (name.includes(filter) || description.includes(filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Slider automático para cada .fabric-slider
  const sliders = document.querySelectorAll('.fabric-slider');
  sliders.forEach(slider => {
    const images = slider.querySelectorAll('.slider-img');
    if (images.length <= 1) return; // Si solo hay 1 imagen, no animar
    let current = 0;

    setInterval(() => {
      images[current].classList.remove('active');
      current = (current + 1) % images.length;
      images[current].classList.add('active');
    }, 3000);
  });

  // --- NUEVO: Código para el carrusel personalizado ---
  // Productos para el carrusel con su info
 const productos = [
  {
    nombre: "Lino Sastrero",
    descripcion: "Elegante y fresco, el lino sastrero combina la naturalidad del lino con la estructura ideal para prendas formales de verano. Ideal para trajes livianos, blazers y pantalones con caída impecable."
  },
  {
    nombre: "Morley Suede",
    descripcion: "Tela con textura acanalada tipo morley y acabado tipo gamuza. Suave, elástica y elegante, ideal para prendas modernas, cómodas y con un toque sofisticado."
  },
  {
    nombre: "Wafle",
    descripcion: "Tela con textura acanalada en forma de cuadrícula, suave y confortable al tacto. Perfecta para prendas casuales, buzos, joggers y looks relajados con estilo."
  }
];


  // Variables para el carrusel
  let currentSlideIndex = 0;
  const slides = document.querySelectorAll('.carousel img');
  const indicators = document.querySelectorAll('.indicator');
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    if (index >= totalSlides) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = totalSlides - 1;
    else currentSlideIndex = index;

    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');

    // Actualizar texto y botón del producto
    const nameEl = document.getElementById('product-name');
    const descEl = document.getElementById('product-description');
    const btn = document.querySelector('.product-info .contact-btn');

    if (nameEl && descEl && btn) {
      nameEl.textContent = productos[currentSlideIndex].nombre;
      descEl.textContent = productos[currentSlideIndex].descripcion;

      // Actualizar onclick del botón para enviar consulta con nombre correcto
      btn.onclick = () => enviarConsultaConNombre(productos[currentSlideIndex].nombre);
    }
  }

  function nextSlide() {
    showSlide(currentSlideIndex + 1);
  }

  function prevSlide() {
    showSlide(currentSlideIndex - 1);
  }

  function currentSlide(index) {
    showSlide(index - 1);
  }

  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
  window.currentSlide = currentSlide;

  function startCarousel() {
    setInterval(nextSlide, 4000);
  }

  // Función para abrir WhatsApp con mensaje personalizado (nuevo)
  function enviarConsultaConNombre(nombreTela) {
    const mensaje = `Hola, buenas, ¿cómo va? Vi su página y quería consultar por esta tela: ${nombreTela}`;
    const numero = "5491157498970";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  // Inicializar carrusel al cargar DOM
  if (slides.length > 0) {
    showSlide(0);
    startCarousel();
  }
  // --- FIN NUEVO ---
});

// WhatsApp consulta con mensaje personalizado
function enviarConsulta(element) {
  const nombreTela = element.getAttribute('data-name') || 'tela';
  const mensaje = `Hola, buenas, ¿cómo va? Vi su página y quería consultar por esta tela: ${nombreTela}`;
  const numero = "5491157498970";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

// Modal para mostrar imágenes en grande y navegar entre ellas
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeBtn = modal.querySelector('.close');
const prevBtn = modal.querySelector('.prev');
const nextBtn = modal.querySelector('.next');

let currentImages = [];
let currentIndex = 0;

function openModal(sliderDiv) {
  currentImages = Array.from(sliderDiv.querySelectorAll('.slider-img')).map(img => img.src);
  currentIndex = 0;
  showModalImage();
  modal.style.display = 'flex';
}

function showModalImage() {
  modalImg.src = currentImages[currentIndex];
  modalCaption.textContent = `Imagen ${currentIndex + 1} de ${currentImages.length}`;
}

closeBtn.onclick = () => {
  modal.style.display = 'none';
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  showModalImage();
};

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  showModalImage();
};

// Cerrar modal al hacer click fuera de la imagen
window.onclick = event => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Añadir listeners a botones consultar (para que funcionen)
document.addEventListener('DOMContentLoaded', () => {
  const consultButtons = document.querySelectorAll('.contact-btn');
  consultButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      enviarConsulta(btn);
    });
  });

  // Añadir apertura modal al hacer click en la imagen del slider
  const sliders = document.querySelectorAll('.fabric-slider');
  sliders.forEach(slider => {
    slider.style.cursor = 'pointer';
    slider.addEventListener('click', () => {
      openModal(slider);
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.querySelector('.whatsapp-dropdown');
  if (!dropdown) return;

  dropdown.addEventListener('click', e => {
    // Alternar desplegable (toggle) al clic
    const content = dropdown.querySelector('.whatsapp-dropdown-content');
    if (!content) return;

    if (content.style.display === 'block') {
      content.style.display = 'none';
      dropdown.setAttribute('aria-expanded', 'false');
    } else {
      content.style.display = 'block';
      dropdown.setAttribute('aria-expanded', 'true');
    }
  });

  // Opcional: cerrar el desplegable al hacer clic fuera
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) {
      const content = dropdown.querySelector('.whatsapp-dropdown-content');
      if (content) {
        content.style.display = 'none';
        dropdown.setAttribute('aria-expanded', 'false');
      }
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.whatsapp-float-btn');
  const menu = document.querySelector('.whatsapp-float-dropdown-content');

  btn.addEventListener('click', () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      menu.style.display = 'none';
      btn.setAttribute('aria-expanded', 'false');
    } else {
      menu.style.display = 'block';
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  // Cerrar el menú si se hace click fuera
  document.addEventListener('click', (event) => {
    if (!btn.contains(event.target) && !menu.contains(event.target)) {
      menu.style.display = 'none';
      btn.setAttribute('aria-expanded', 'false');
    }
  });
});
