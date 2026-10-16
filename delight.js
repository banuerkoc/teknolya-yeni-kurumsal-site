(() => {
  if (document.querySelector('.flap-spark')) return;
  const spark = document.createElement('aside');
  spark.className = 'flap-spark';
  spark.setAttribute('aria-label', 'Flap hızlı erişim');
  spark.innerHTML = `<div class="flap-spark-card" id="flap-spark-card"><small>Flap burada</small><strong>İşinizi biraz hafifletelim mi?</strong><p>Size uygun çözümü birlikte bulabiliriz.</p><div class="flap-spark-links"><a href="/teknolya-yeni-kurumsal-site/cozumler/">Çözümleri gör</a><a href="/teknolya-yeni-kurumsal-site/is-ortagi/">Bize katıl</a></div></div><button class="flap-spark-button" type="button" aria-expanded="true" aria-controls="flap-spark-card" aria-label="Flap hızlı erişimi aç veya kapat"><span class="flap-spark-glow" aria-hidden="true"></span><span class="flap-spark-face" aria-hidden="true"><i class="flap-spark-eye"></i><i class="flap-spark-eye"></i><i class="flap-spark-smile"></i></span></button>`;
  document.body.appendChild(spark);
  const button = spark.querySelector('button');
  requestAnimationFrame(() => spark.classList.add('is-arrived'));
  const restTimer = setTimeout(() => {
    spark.classList.add('is-resting');
    button.setAttribute('aria-expanded', 'false');
  }, 6500);
  button.addEventListener('click', () => {
    clearTimeout(restTimer);
    const open = !spark.classList.contains('is-open') && spark.classList.contains('is-resting');
    spark.classList.toggle('is-resting', !open);
    spark.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
  });
})();
