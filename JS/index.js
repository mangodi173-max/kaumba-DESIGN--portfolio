// Security Utility: Sanitize inputs against Cross-Site Scripting (XSS)
function sanitizeInput(str) {
  return str.replace(/[&<>"']/g, function (match) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return map[match];
  });
}

// Security Utility: Email Format Validator
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const contactForm = document.getElementById('contactForm');

if (contactForm) {
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const statusMsg = document.getElementById('status-msg');

  // Security: Rate Limiting (Prevent spam button mashing)
  const lastSent = localStorage.getItem('last_message_timestamp');
  const now = Date.now();
  if (lastSent && now - parseInt(lastSent) < 30000) { // 30-second cooldown
    statusMsg.className = 'status-error';
    statusMsg.textContent = 'Please wait 30 seconds before submitting another message.';
    statusMsg.style.display = 'block';
    return;
  }

  // Collect Raw Inputs
  const rawName = document.getElementById('name').value.trim();
  const rawEmail = document.getElementById('email').value.trim();
  const rawMessage = document.getElementById('message').value.trim();

  // Input Validation
  if (!rawName || !rawEmail || !rawMessage) {
    statusMsg.className = 'status-error';
    statusMsg.textContent = 'All fields are required.';
    statusMsg.style.display = 'block';
    return;
  }

  if (!isValidEmail(rawEmail)) {
    statusMsg.className = 'status-error';
    statusMsg.textContent = 'Please enter a valid email address.';
    statusMsg.style.display = 'block';
    return;
  }

  // Sanitize Inputs before storing
  const sanitizedEntry = {
    id: 'msg_' + Date.now(),
    name: sanitizeInput(rawName),
    email: sanitizeInput(rawEmail),
    message: sanitizeInput(rawMessage),
    timestamp: new Date().toISOString()
  };

  // Retrieve existing logs, append, and save back to LocalStorage
  try {
    const existingMessages = JSON.parse(localStorage.getItem('portfolio_messages')) || [];
    existingMessages.push(sanitizedEntry);
    localStorage.setItem('portfolio_messages', JSON.stringify(existingMessages));
    localStorage.setItem('last_message_timestamp', now.toString());

    // Visual Feedback
    statusMsg.className = 'status-success';
    statusMsg.textContent = 'Thank you! Your message has been logged securely.';
    statusMsg.style.display = 'block';

    // Clear Form Fields
    document.getElementById('contactForm').reset();
  } catch (err) {
    statusMsg.className = 'status-error';
    statusMsg.textContent = 'An error occurred while saving your message.';
    statusMsg.style.display = 'block';
  }
});
}