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

    console.log('[Contact] Envoi du payload :', payload);

    try {
      const res = await fetch('https://formsubmit.co/ajax/contact@pixelcraft-labs.fr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('[Contact] Statut HTTP :', res.status, res.statusText);

      const rawText = await res.text();
      console.log('[Contact] Réponse brute :', rawText);

      let data = {};
      try { data = JSON.parse(rawText); } catch (parseErr) {
        console.warn('[Contact] Impossible de parser la réponse JSON :', parseErr.message);
      }

      console.log('[Contact] Réponse parsée :', data);

      if (res.ok && data.success === 'true') {
        console.log('[Contact] ✅ Envoi réussi');
        showSuccess();
        form.reset();
      } else {
        console.error('[Contact] ❌ Échec —', 'HTTP', res.status, '| data.success =', data.success, '| message =', data.message || '(aucun)');
        showError('Le message n\'a pas pu être envoyé (code ' + res.status + '). Veuillez réessayer.');
      }
    } catch (err) {
      console.error('[Contact] ❌ Erreur réseau :', err.name, err.message);
      showError('Erreur réseau (' + err.message + '). Vérifiez votre connexion et réessayez.');
    } finally {
      setLoading(false);
    }
  });
});
