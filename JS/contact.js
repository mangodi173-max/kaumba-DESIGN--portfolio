const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');
const messageModal = document.getElementById('message-modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const modalIcon = document.getElementById('modal-icon');
const modalCloseButtons = document.querySelectorAll('.modal-close, .modal-action');

function showMessageModal(title, message, type) {
  modalTitle.textContent = title;
  modalText.textContent = message;
  modalIcon.textContent = type === 'success' ? '\u2713' : '!';
  messageModal.className = `message-modal message-modal-${type}`;
  messageModal.hidden = false;
  modalCloseButtons[0].focus();
}

function closeMessageModal() {
  messageModal.hidden = true;
}

modalCloseButtons.forEach(button => button.addEventListener('click', closeMessageModal));
messageModal.addEventListener('click', event => {
  if (event.target === messageModal) {
    closeMessageModal();
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !messageModal.hidden) {
    closeMessageModal();
  }
});

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!message) {
      showMessageModal('Message required', 'Please enter a message before sending.', 'error');
      formStatus.className = 'form-status form-status-error';
      formStatus.textContent = 'Please enter a message before sending.';
      return;
    }

    if (!name || !email || !subject) {
      showMessageModal('Some details are missing', 'Please complete all required fields.', 'error');
      formStatus.className = 'form-status form-status-error';
      formStatus.textContent = 'Please complete all required fields.';
      return;
    }

    if (!contactForm.checkValidity()) {
      showMessageModal('Check your email', 'Please enter a valid email address.', 'error');
      formStatus.className = 'form-status form-status-error';
      formStatus.textContent = 'Please enter a valid email address.';
      return;
    }

    const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
    messages.push({ name, email, subject, message, sentAt: new Date().toISOString() });
    localStorage.setItem('portfolio_messages', JSON.stringify(messages));

    showMessageModal('Message sent successfully', 'Thank you for reaching out. I will get back to you soon.', 'success');
    formStatus.className = 'form-status form-status-success';
    formStatus.textContent = 'Message sent successfully. Thank you!';
    contactForm.reset();
  });
}
