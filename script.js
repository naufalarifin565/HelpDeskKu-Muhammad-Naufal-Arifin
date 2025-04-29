// Navigasi dengan animasi
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.remove('active');
        });
        
        this.classList.add('active');
        targetSection.classList.add('active');

        // Smooth scroll ke section
        window.scrollTo({
            top: targetSection.offsetTop - 100,
            behavior: 'smooth'
        });
    });
});

// Validasi Formulir
const contactForm = document.getElementById('contactForm');
const messagePreview = document.getElementById('messagePreview');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const topic = document.getElementById('topic');
    const message = document.getElementById('message');
    
    if (validateForm(name, email, topic, message)) {
        showPreview(name.value, email.value, topic.value, message.value);
        this.reset();
    }
});

function validateForm(name, email, topic, message) {
    let isValid = true;

    if (name.value.trim() === '') {
        showError(name, 'Nama tidak boleh kosong');
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError(email, 'Email tidak valid');
        isValid = false;
    }

    if (topic.value === '') {
        showError(topic, 'Silakan pilih topik');
        isValid = false;
    }

    if (message.value.trim() === '') {
        showError(message, 'Pesan tidak boleh kosong');
        isValid = false;
    }

    return isValid;
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error');
    errorElement.textContent = message;
}

function showPreview(name, email, topic, message) {
    messagePreview.innerHTML = `
        <h3>Preview Pesan:</h3>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Topik:</strong> ${topic}</p>
        <p><strong>Pesan:</strong> ${message}</p>
    `;
    messagePreview.style.display = 'block';
}

// FAQ dengan animasi
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const faqAnswer = button.nextElementSibling;
        
        faqItem.classList.toggle('active');

        if (faqAnswer.style.maxHeight) {
            faqAnswer.style.maxHeight = null;
        } else {
            faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
        }

        const icon = button.querySelector('i');
        if (icon) {
            icon.style.transform = faqItem.classList.contains('active') 
                ? 'rotate(180deg)' 
                : 'rotate(0deg)';
        }
    });
});

// Simulasi Status Tiket
function checkTicket() {
    const statusMessages = {
        message: ["Sedang diproses", "Menunggu tanggapan", "Dalam investigasi"],
        success: ["Selesai"],
        error: ["Tiket tidak ditemukan"]
    };

    const ticketNumber = document.getElementById('ticketNumber').value;
    const statusBox = document.getElementById('ticketStatus');

    if (!ticketNumber.trim()) {
        statusBox.textContent = "Silakan masukkan nomor tiket";
        statusBox.className = 'status-box error';
        return;
    }

    const randomType = Object.keys(statusMessages)[
        Math.floor(Math.random() * Object.keys(statusMessages).length)
    ];
    const randomMessage = statusMessages[randomType][
        Math.floor(Math.random() * statusMessages[randomType].length)
    ];

    statusBox.textContent = `Status Tiket #${ticketNumber}: ${randomMessage}`;
    statusBox.className = `status-box ${randomType}`;
}
