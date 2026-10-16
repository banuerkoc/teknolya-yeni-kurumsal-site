document.addEventListener('submit', function (event) {
  if (event.target.id !== 'contactRequest') return;
  event.preventDefault();
  const data = new FormData(event.target);
  const lines = [
    `Ad Soyad: ${data.get('name')}`,
    `Firma: ${data.get('company')}`,
    `E-posta: ${data.get('email')}`,
    `Telefon: ${data.get('phone')}`,
    `İlgilenilen Çözüm: ${data.get('solution')}`,
    `İşletme Ölçeği: ${data.get('scale')}`,
    '',
    'İhtiyaç:',
    data.get('message')
  ];
  const subject = `Teknolya çözüm talebi — ${data.get('company')}`;
  window.location.href = `mailto:info@teknolya.com.tr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
});
