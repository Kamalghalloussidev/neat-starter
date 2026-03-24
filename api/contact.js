module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const data = req.body || {};
    // Log the submission (will appear in Vercel function logs)
    console.log('Contact form submission:', data);

    // TODO: integrate with an email provider or persistence (SendGrid, Mailgun, Airtable, etc.)

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
