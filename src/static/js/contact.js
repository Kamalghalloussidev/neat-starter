document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const btn        = document.getElementById('contact-btn');
  const btnLabel   = document.getElementById('contact-btn-label');
  const spinner    = document.getElementById('contact-spinner');
  const successBox = document.getElementById('contact-success');
  const errorBox   = document.getElementById('contact-error');
  const errorMsg   = document.getElementById('contact-error-msg');

  function setLoading(loading) {
    btn.disabled = loading;
    spinner.classList.toggle('hidden', !loading);
    btnLabel.textContent = loading ? 'Envoi...' : 'Soumettre';
  }

  function showSuccess() {
    successBox.classList.remove('hidden');
    errorBox.classList.add('hidden');
  }

  function showError(msg) {
    errorMsg.textContent = msg || 'Une erreur est survenue. Veuillez réessayer.';
    errorBox.classList.remove('hidden');
    successBox.classList.add('hidden');
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    successBox.classList.add('hidden');
    errorBox.classList.add('hidden');
    setLoading(true);

    const payload = {
      nom:       form.nom.value,
      prenom:    form.prenom.value,
      email:     form.email.value,
      telephone: form.telephone ? form.telephone.value : '',
      message:   form.message.value,
    };

    try {
      const res = await fetch('https://formsubmit.co/ajax/contact@pixelcraft-labs.fr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success === 'true') {
        showSuccess();
        form.reset();
      } else {
        showError('Le message n\'a pas pu être envoyé. Veuillez réessayer.');
      }
    } catch (err) {
      showError('Erreur réseau. Vérifiez votre connexion et réessayez.');
    } finally {
      setLoading(false);
    }
  });
});
