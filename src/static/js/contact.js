document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');
  if (!form) return;
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    status.classList.remove('hidden');
    status.classList.remove('text-red-600');
    status.textContent = 'Envoi en cours...';

    const payload = {
      nom: form.nom.value,
      prenom: form.prenom.value,
      email: form.email.value,
      prestation: form.prestation.value,
      message: form.message.value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        status.textContent = 'Message envoyé. Merci !';
        form.reset();
      } else {
        status.textContent = 'Erreur lors de l\'envoi.';
        status.classList.add('text-red-600');
      }
    } catch (err) {
      status.textContent = 'Erreur réseau.';
      status.classList.add('text-red-600');
    }
  });
});
