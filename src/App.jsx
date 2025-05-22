// (arquivo limpo para receber novo layout)
import React from 'react';
import './assets/App.css';

// Adiciona FontAwesome via CDN no head
if (!document.getElementById('fa-cdn')) {
  const link = document.createElement('link');
  link.id = 'fa-cdn';
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
  document.head.appendChild(link);
}

function Impact({ children }) {
  return (
    <span style={{

      color: '#ff6b98',
      fontWeight: 'bold',

      fontSize: '1em',
      background: 'yellow',
      margin: '0 2px',
      letterSpacing: '1px',
      textDecoration: 'underline',
      display: 'inline-block',
    }}>{children}</span>
  );
}

function App() {
  return (
    <div className="main-sales-page">
      {/* HERO SECTION */}
      <div className="container pt-4 pb-5 bg-white">
        <div className="text-center text-capitalize">
          {/* Título principal e subtítulo (copy) */}
          <h1>Why Your Intimate Soap is Making You Smell WORSE Down There (And the 7-Day Fix)</h1>
          <h2 className="mb-4 h2r text-center">Ancient 'Pheromone Secret' Restores Vaginal Freshness in 7 Days</h2>
          {/* Imagem do produto */}
          <img src="/images/product.png" alt="FemFresh Tabs Product" className="img-fluid rounded mb-4" style={{ maxWidth: 300, margin: '0 auto', display: 'block' }} />
        </div>
      </div>

      {/* Imagem de benefícios fora do componente, grande e centralizada */}
        <img src="/images/benefit_icons.png" alt="Benefits" style={{ maxWidth: 920, width: '90vw', borderRadius: 20 }} />
    

      {/* STORYTELLING/LEAD */}
      <div className="container p-15 bg-blu-1g notch-top-center notch-white">
        <div className="row align-items-center">
          <div className="col-md-12">
            {/* Texto com destaques */}
            <p style={{ fontSize: '1.15em', lineHeight: 1.8 }}>
              <Impact>"It's not you,"</Impact> my gynecologist said, leaning forward in her chair. <Impact>"not your age."</Impact><br />
              I blinked back tears of relief. At <Impact>42</Impact>, I'd spent the last three years convinced that my body was betraying me, that the <Impact>odor</Impact> I couldn't shake was just part of getting older.<br />
              <Impact>"What women don't know,"</Impact> she continued, lowering her voice, <Impact>"78% of feminine products"</Impact> are actually disrupting your body's natural balance. <Impact>"Making it worse"</Impact> with every use.<br />
              That ten-minute conversation changed <Impact>everything</Impact> for me. And what she shared next – a simple approach based on restoring what she called the <Impact>"microbiome"</Impact> – transformed not just my physical health, but my entire sense of self...<br />
            </p>
          </div>
        </div>
      </div>

      {/* BENEFÍCIOS */}
      <div className="container py-5 bg-gry-1g notch-top-center notch-blu">
        <h2 className="text-center mb-4 h3r">Benefits You'll Experience</h2>
        <div className="row align-items-center mt-4 mt-md-5">
          <div className="col-md-12 col-lg-8 mx-auto">
            <ul className="blu-check" style={{ fontSize: '1.15em', listStyle: 'none', paddingLeft: 0 }}>
              <li><i className="fa-solid fa-circle-check text-ylw" style={{ marginRight: 8, marginBottom: 15 }}></i> <Impact>Eliminate embarrassing odors in 7 days</Impact></li>
              <li><i className="fa-solid fa-circle-check text-ylw" style={{ marginRight: 8, marginBottom: 15 }}></i> <Impact>Restore your intimate microbiome balance</Impact></li>
              <li><i className="fa-solid fa-circle-check text-ylw" style={{ marginRight: 8, marginBottom: 15 }}></i> <Impact>Prevent recurring infections</Impact></li>
              <li><i className="fa-solid fa-circle-check text-ylw" style={{ marginRight: 8, marginBottom: 15 }}></i> <Impact>Boost your confidence and self-esteem</Impact></li>
              <li><i className="fa-solid fa-circle-check text-ylw" style={{ marginRight: 8, marginBottom: 15 }}></i> <Impact>Improve your intimate life and relationships</Impact></li>
            </ul>
          </div>
        </div>
      </div>

      {/* PROGRESSO EM 7 DIAS */}
      <div className="container py-5 bg-blu-1g notch-top-center notch-white">
        <h2 className="text-center mb-4 h3r">See Your Transformation in Just 7 Days</h2>
        <div className="text-center">
          <img src="/images/seven_day_progress.png" alt="7 Day Progress" className="img-fluid rounded mb-4" style={{ maxWidth: 400, margin: '0 auto', display: 'block' }} />
          <img src="/images/woman_before_after.png" alt="Before and After" className="img-fluid rounded" style={{ maxWidth: 400, margin: '0 auto', display: 'block' }} />
        </div>
      </div>

      {/* OFERTA/PACOTES */}
      <div className="container py-5 bg-gry-1g notch-top-center notch-blu">
        <h2 className="text-center mb-4 h3r">Choose Your FemFresh Package</h2>
        <div className="row justify-content-center pt-main" style={{ gap: 24 }}>
          {/* Responsividade mobile: cards em coluna, centralizados, largura 100% em mobile */}
          {[{
            title: '1 Bottle',
            supply: '30 days supply',
            price: '$69',
            per: 'per bottle',
            save: 'Free shipping',
            btn: 'Order Now',
            class: 'pt-normal',
          }, {
            title: '6 Bottles',
            supply: '180 days supply',
            price: '$60',
            per: 'per bottle',
            save: 'Free shipping + bonuses',
            btn: 'Order Now',
            class: 'pt-best',
          }, {
            title: '3 Bottles',
            supply: '90 days supply',
            price: '$65',
            per: 'per bottle',
            save: 'Free shipping',
            btn: 'Order Now',
            class: 'pt-popular',
          }].map((p, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4 mb-4 d-flex align-items-stretch" style={{ minWidth: '280px', maxWidth: '400px' }}>
              <div className={`card-product pt-box ${p.class} text-center w-100`} style={{ width: '100%' }}>
                <div className={`pt-header ${p.class === 'pt-best' ? 'pt-header-2' : p.class === 'pt-popular' ? 'pt-header-3' : ''}`}>{p.title}</div>
                <div className="pt-supply">{p.supply}</div>
                <div className="pt-product text-center pt-3">
                  <img src="/images/product.png" alt={p.title} className="img-fluid rounded" style={{ maxWidth: 120, margin: '0 auto', display: 'block' }} />
                </div>
                <div className="pt-price">
                  <div className="pt-price-left">{p.price}</div>
                  <div className="pt-price-right"><div className="pt-price-per">{p.per}</div></div>
                </div>
                <div className="pt-total-save text-center"><i className="fa-solid fa-truck-fast text-blu" style={{ marginRight: 6 }}></i>{p.save}</div>
                <div className="pt-btn-main">
                  <a href="#" className="pt-cta-btn">{p.btn}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BÔNUS */}
      <div className="container py-5 bg-blu-1g notch-top-center notch-white">
        <h2 className="text-center mb-4 h3r">Exclusive Bonuses for You</h2>
        <div className="row justify-content-center" style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
          {[{
            img: '/images/product.png',
            title: 'Reignite the Spark: A Couple\'s Guide to Intimate Bliss',
            desc: '30 romantic date night ideas, communication techniques, sensual massage tips, and more to deepen your connection.',
          }, {
            img: '/images/product.png',
            title: 'The Ultimate Self-Care Ritual for Radiant Femininity',
            desc: 'A step-by-step daily ritual, DIY natural care recipes, meditations, and confidence-boosting affirmations.',
          }, {
            img: '/images/product.png',
            title: 'Intimate Wardrobe Secrets: Dressing for Confidence & Comfort',
            desc: 'Fashion advice, lingerie tips, and outfit ideas to help you feel fresh, comfortable, and sexy in any outfit.',
          }].map((b, i) => (
            <div key={i} className="col-12 col-md-4 d-flex flex-column align-items-center text-center mb-4" style={{ minWidth: 260, maxWidth: 340, background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px #0001', padding: 24 }}>
              <img src={b.img} alt={b.title} className="img-fluid rounded mb-2" style={{ maxWidth: 120, margin: '0 auto', display: 'block' }} />
              <p style={{ fontWeight: 700, fontSize: '1.1em', color: '#d32f2f', marginBottom: 8 }}><i className="fa-solid fa-gift text-ylw" style={{ marginRight: 6 }}></i>{b.title}</p>
              <p style={{ fontSize: '1em' }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* GARANTIA */}
      <div className="container py-5 bg-gry-1g notch-top-center notch-blu">
        <h2 className="text-center mb-4 h3r">30-Day Guarantee: Satisfaction or Your Money Back!</h2>
        <div className="row align-items-center mt-4">
          <div className="col-md-7">
            <p>Try FemFresh Tabs for 30 days. If you don't feel a difference, we'll refund 100% of your money. No questions, no hassle.</p>
          </div>
          <div className="col-md-5 text-center mt-10">
            <img src="/digistore24.svg" alt="Guarantee" className="img-fluid rounded img-80-sm" style={{ maxWidth: 220, margin: '0 auto', display: 'block' }} />
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="container py-5 bg-blu-1g notch-top-center notch-white">
        <h2 className="text-center mb-4 h3r">Frequently Asked Questions</h2>
        <div className="mt-4">
          <h4 className="mb-3 h4r">How do I use FemFresh Tabs?</h4>
          <p>Take 1 tablet daily, preferably in the morning, with water. For best results, use consistently.</p>
          <hr />
          <h4 className="mb-3 h4r">Are there any side effects?</h4>
          <p>FemFresh Tabs is natural and safe, with no reported side effects. If in doubt, consult your doctor.</p>
          <hr />
          <h4 className="mb-3 h4r">How soon will I see results?</h4>
          <p>Most women notice a difference within the first week of use.</p>
          <hr />
          <h4 className="mb-3 h4r">Can I use it with other medications?</h4>
          <p>There are no known contraindications, but always consult your doctor before starting any supplement.</p>
        </div>
      </div>

      {/* DEPOIMENTOS */}
      <div className="container py-5 bg-gry-1g notch-top-center notch-blu">
        <h2 className="text-center mb-4 h3r">What Our Customers Say</h2>
        <div className="row justify-content-center" style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
          {[{
            img: '/images/testimonial_avatars.png',
            name: 'Samantha, 38',
            text: 'I was skeptical at first, having tried so many products before. But FemFresh Tabs is truly in a league of its own. Not only has the uncomfortable odor disappeared, but I also feel healthier overall. I can wear whatever I want without worry, and my self-esteem has skyrocketed. This product has been a game-changer for me.',
          }, {
            img: '/images/testimonial_avatars.png',
            name: 'Elena, 45',
            text: 'Using FemFresh Tabs has transformed my daily life. I no longer plan my outfits around my insecurities or avoid social situations. The best part? It\'s gentle and natural - no more irritation from harsh products. I feel fresh, confident, and in control. I only wish I had found this solution years ago!',
          }, {
            img: '/images/testimonial_avatars.png',
            name: 'Maria, 42',
            text: 'My marriage improved a lot after I started using FemFresh Tabs. Thank you!',
          }].map((d, i) => (
            <div key={i} className="col-12 col-md-4 d-flex flex-column align-items-center text-center mb-4" style={{ minWidth: 260, maxWidth: 340, background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px #0001', padding: 24 }}>
              <img src={d.img} alt={d.name} className="img-fluid rounded mb-2" style={{ maxWidth: 80, margin: '0 auto', display: 'block' }} />
              <div style={{ color: '#ffd700', fontSize: 18, marginBottom: 6 }}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p style={{ fontSize: '1em', marginBottom: 8 }}><i className="fa-solid fa-quote-left text-ylw" style={{ marginRight: 6 }}></i>{d.text}</p>
              <p style={{ fontWeight: 700, color: '#d32f2f', fontSize: '1.05em' }}>{d.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CALL TO ACTION FINAL */}
      <div className="container py-5 bg-blu-1g notch-top-center notch-white text-center">
        <h2 className="mb-4 h3r">Ready to Transform Your Intimate Confidence?</h2>
        <a href="#" className="pt-cta-btn">I Want FemFresh Tabs Now</a>
      </div>

      {/* RODAPÉ */}
      <footer className="bg-white py-3">
        <div className="container text-center">
          <p className="mb-0 fs-16">&copy; {new Date().getFullYear()} FemFresh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;