document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    // Prevent double-submission and let Netlify handle POST
    // show simple feedback
    status.classList.remove('hidden');
  });
});
