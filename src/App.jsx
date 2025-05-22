import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './assets/App.css';

// Adicionar Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSprayCan, faBalanceScale, faShieldAlt, faSmile, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const faqRefs = useRef([]);

  useEffect(() => {
    // Buscar depoimentos da API
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=3&nat=br');
        const data = await response.json();
        setTestimonials(data.results);
      } catch (error) {
        console.error('Erro ao buscar depoimentos:', error);
      }
    };

    fetchTestimonials();
    // Header scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // GSAP Animations
    const animateElements = () => {
      // Animate FAQ items
      faqRefs.current.forEach((ref, index) => {
        gsap.from(ref, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: ref,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Animate FAQ answers
      const faqAnswers = document.querySelectorAll('.faq-answer');
      faqAnswers.forEach(answer => {
        gsap.set(answer, { height: 0, opacity: 0 });
      });
    };

    animateElements();

    // Smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    // Mobile menu toggle
    const handleMobileMenuClick = () => {
      const navLinks = document.querySelector('.nav-links');
      const body = document.body;

      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        body.style.overflow = '';
      } else {
        navLinks.classList.add('active');
        body.style.overflow = 'hidden';
      }
    };

    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener('click', handleMobileMenuClick);
    }

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        const body = document.body;
        navLinks.classList.remove('active');
        body.style.overflow = '';
      });
    });

    // Fechar menu ao clicar fora
    const handleClickOutside = (event) => {
      const navLinks = document.querySelector('.nav-links');
      const mobileMenuButton = document.querySelector('.mobile-menu-button');

      if (navLinks.classList.contains('active') &&
        !navLinks.contains(event.target) &&
        !mobileMenuButton.contains(event.target)) {
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('click', handleClickOutside);

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.benefit-card, .testimonial-card, .package-card');
    animatedElements.forEach(element => {
      observer.observe(element);
    });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
      if (mobileMenuButton) {
        mobileMenuButton.removeEventListener('click', handleMobileMenuClick);
      }
      document.removeEventListener('click', handleClickOutside);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleFaqClick = (index) => {
    const answer = faqRefs.current[index].querySelector('.faq-answer');

    if (activeFaq === index) {
      gsap.to(answer, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      setActiveFaq(null);
    } else {
      if (activeFaq !== null) {
        const prevAnswer = faqRefs.current[activeFaq].querySelector('.faq-answer');
        gsap.to(prevAnswer, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }

      gsap.to(answer, {
        height: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      setActiveFaq(index);
    }
  };

  return (
    <div className="App">
      <header className={isScrolled ? 'scrolled' : ''}>
        <div className="container header-container">
          <div className="logo-container">
            <h2>FemFresh</h2>
          </div>
          <nav>
            <ul className="nav-links">
              <li><a href="#benefits">Benefits</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><button href="#offer" className="cta-button">Buy Now</button></li>
            </ul>
            <button className="mobile-menu-button" aria-label="Toggle mobile menu">☰</button>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-content">
          <h1>Why Your Intimate Soap is Making You Smell WORSE Down There (And the 7-Day Fix)</h1>
          <h2>Ancient 'Pheromone Secret' Restores Vaginal Freshness in 7 Days</h2>
          <img src="/images/product.png" alt="FemFresh Tabs Product" className="product-image" />
          <a href="#offer" className="cta-button">Get FemFresh Now</a>
        </div>
      </section>

      <section className="lead-section">
        <div className="container lead-content">
          <p>"It's not you," my gynecologist said, leaning forward in her chair. "And it's definitely not your age."</p>
          <p>I blinked back tears of relief. At 42, I'd spent the last three years convinced that my body was betraying me, that the persistent intimate odor I couldn't shake was just part of getting older.</p>
          <p>"What most women don't know," she continued, lowering her voice, "is that 78% of the products marketed for feminine freshness are actually disrupting your body's natural balance. They're literally making the problem worse with every use."</p>
          <p>That ten-minute conversation changed everything for me. And what she shared next – a simple approach based on restoring what she called the "microbiome equilibrium" – transformed not just my physical health, but my entire sense of self...</p>
        </div>
      </section>

      <section className="problem-section">
        <div className="container problem-content">
          <div className="problem-text">
            <h2>The Hidden Foe Behind Your Embarrassing Odor</h2>
            <p>It's being referred to as "Microbiome Disruption" among women's intimate health experts...</p>
            <p>This may be the reason you've been tensing up every time your husband tries to surprise you with a romantic gesture...</p>
            <p>Your mind racing with thoughts of that persistent smell.</p>
            <p>And why you've been avoiding intimate moments for years (the mere thought of it fills you with embarrassment)</p>
            <p>The truth is, age doesn't automatically lead to persistent vaginal odor...</p>
            <p>It's about maintaining the right balance, regardless of your years.</p>
          </div>
          <div className="problem-image">
            <img src="/images/microbiome_balance.png" alt="Microbiome Disruption Concept" />
          </div>
        </div>
      </section>

      <section className="solution-section">
        <div className="container solution-content">
          <div className="solution-text">
            <h2>The Number ONE Solution: "Pheromone Neutralizer"</h2>
            <p>This really IS the answer for women over 35 who have bad vaginal smell wanting to finally enjoy worry-free intimacy and reclaim their confidence...</p>
            <p>Pheromone Neutralizer is a groundbreaking biological mechanism that revolutionizes intimate freshness.</p>
            <p>This innovative process targets the root cause of unwanted odors by intercepting and transforming pheromones – the body's natural scent signals.</p>
            <p>Unlike traditional methods that merely mask odors, Pheromone Neutralizer works at the molecular level…</p>
            <p>Effectively "switching off" the compounds responsible for strong intimate scents.</p>
          </div>
          <div className="solution-image">
            <img src="/images/pheromone_neutralizer.png" alt="Pheromone Neutralizer Concept" />
          </div>
        </div>
      </section>

      <section className="progress-section">
        <div className="container">
          <h2>See Your Transformation in Just 7 Days</h2>
          <p>Watch as your comfort and confidence steadily improve day by day</p>
          <img src="/images/seven_day_progress.png" alt="7-Day Progress Chart" className="progress-image" />
          <div className="before-after">
            <img src="/images/woman_before_after.png" alt="Before and After Using FemFresh" className="progress-image" />
          </div>
        </div>
      </section>

      <section id="benefits" className="benefits-section">
        <div className="container">
          <h2>Experience These Life-Changing Benefits</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <FontAwesomeIcon icon={faSprayCan} className="benefit-icon" size="3x" />
              <h3>Odor Elimination</h3>
              <p>Say goodbye to embarrassing odors in just 7 days with our revolutionary formula.</p>
            </div>
            <div className="benefit-card">
              <FontAwesomeIcon icon={faBalanceScale} className="benefit-icon" size="3x" />
              <h3>Balance Restoration</h3>
              <p>Restore your natural microbiome balance for long-lasting freshness.</p>
            </div>
            <div className="benefit-card">
              <FontAwesomeIcon icon={faShieldAlt} className="benefit-icon" size="3x" />
              <h3>Infection Prevention</h3>
              <p>Strengthen your body's natural defenses against recurring infections.</p>
            </div>
            <div className="benefit-card">
              <FontAwesomeIcon icon={faSmile} className="benefit-icon" size="3x" />
              <h3>Confidence Boost</h3>
              <p>Regain your self-assurance in intimate situations and everyday life.</p>
            </div>
            <div className="benefit-card">
              <FontAwesomeIcon icon={faHeart} className="benefit-icon" size="3x" />
              <h3>Relationship Improvement</h3>
              <p>Enhance your intimate relationships with newfound confidence.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <h2>Hear From Women Who've Transformed Their Lives</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={testimonial.login.uuid}>
                <div className="testimonial-header">
                  <img
                    src={testimonial.picture.large}
                    alt={`${testimonial.name.first} ${testimonial.name.last}`}
                    className="testimonial-avatar"
                  />
                  <div className="testimonial-info">
                    <h4>{`${testimonial.name.first} ${testimonial.name.last}`}</h4>
                    <div className="testimonial-stars">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} className="star-icon" />
                      ))}
                    </div>
                    <span className="verified-badge">Verified Customer</span>
                  </div>
                </div>
                <p>
                  {index === 0 && "I tried every probiotic on the market and nothing seemed to help... till I tried FemFresh. Some people have a 6-pack, but I had a KEG. And I didn't like that. But after taking FemFresh, my tummy went down… and my energy went up! That's the best thing. I'm even sleeping better."}
                  {index === 1 && "I have tried many products that promised so much and failed but your product came through with flying colors. I am thrilled to be losing weight at 66 yrs old. I am thrilled not to have acid reflux and I am thrilled to have finally found a product that does what it says it will do. Thank you from the bottom of my heart."}
                  {index === 2 && "It worked for me - when none of the other products on the market I've tried did. I can finally wear my favorite clothes without worrying. My confidence has skyrocketed and my relationship with my husband has never been better. This is truly life-changing!"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="offer" className="offer-section">
        <div className="container">
          <h2>Choose Your FemFresh Package</h2>
          <p>Select the option that works best for you</p>
          <div className="packages-grid">
            <div className="package-card">
              <img src="/images/product.png" alt="1-Month Supply" className="package-image" />
              <h3>1-Month Supply</h3>
              <div className="package-price">$49.99 <span>$69.99</span></div>
              <ul className="package-features">
                <li>30-day supply of FemFresh Tabs</li>
                <li>Free shipping</li>
                <li>30-day money-back guarantee</li>
              </ul>
              <a href="https://www.checkout-ds24.com/product/608698" className="cta-button">Get Started</a>
            </div>
            <div className="package-card">
              <div className="popular-tag">MOST POPULAR</div>
              <img src="/images/product.png" alt="3-Month Supply" className="package-image" />
              <h3>3-Month Supply</h3>
              <div className="package-price">$119.99 <span>$209.97</span></div>
              <ul className="package-features">
                <li>90-day supply of FemFresh Tabs</li>
                <li>Free shipping</li>
                <li>60-day money-back guarantee</li>
                <li>FREE Intimate Health Guide</li>
              </ul>
              <a href="https://www.checkout-ds24.com/product/608757" className="cta-button">Best Value</a>
            </div>
            <div className="package-card">
              <img src="/images/product.png" alt="6-Month Supply" className="package-image" />
              <h3>6-Month Supply</h3>
              <div className="package-price">$199.99 <span>$419.94</span></div>
              <ul className="package-features">
                <li>180-day supply of FemFresh Tabs</li>
                <li>Free shipping</li>
                <li>90-day money-back guarantee</li>
                <li>FREE Intimate Health Guide</li>
                <li>FREE Wellness Consultation</li>
              </ul>
              <a href="https://www.checkout-ds24.com/product/608759" className="cta-button">Best Results</a>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="container faq-container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item" ref={el => faqRefs.current[0] = el}>
            <div className="faq-question" onClick={() => handleFaqClick(0)}>
              How long does it take to see results?
              <span className="faq-icon">{activeFaq === 0 ? '−' : '+'}</span>
            </div>
            <div className={`faq-answer ${activeFaq === 0 ? 'active' : ''}`}>
              <p>exemple text</p>
            </div>
          </div>
          <div className="faq-item" ref={el => faqRefs.current[1] = el}>
            <div className="faq-question" onClick={() => handleFaqClick(1)}>
              Are there any side effects?
              <span className="faq-icon">{activeFaq === 1 ? '−' : '+'}</span>
            </div>
            <div className={`faq-answer ${activeFaq === 1 ? 'active' : ''}`}>
              <p>exemple text</p>
            </div>
          </div>
          <div className="faq-item" ref={el => faqRefs.current[2] = el}>
            <div className="faq-question" onClick={() => handleFaqClick(2)}>
              How do I take FemFresh Tabs?
              <span className="faq-icon">{activeFaq === 2 ? '−' : '+'}</span>
            </div>
            <div className={`faq-answer ${activeFaq === 2 ? 'active' : ''}`}>
              <p>Simply take one tablet daily with water, preferably in the morning. For best results, take consistently at the same time each day. The tablets are easy to swallow and can be taken with or without food. Many users prefer taking them with breakfast as part of their morning routine.</p>
            </div>
          </div>
          <div className="faq-item" ref={el => faqRefs.current[3] = el}>
            <div className="faq-question" onClick={() => handleFaqClick(3)}>
              Is this suitable for women of all ages?
              <span className="faq-icon">{activeFaq === 3 ? '−' : '+'}</span>
            </div>
            <div className={`faq-answer ${activeFaq === 3 ? 'active' : ''}`}>
              <p>exemple text</p>
            </div>
          </div>
          <div className="faq-item" ref={el => faqRefs.current[4] = el}>
            <div className="faq-question" onClick={() => handleFaqClick(4)}>
              What if it doesn't work for me?
              <span className="faq-icon">{activeFaq === 4 ? '−' : '+'}</span>
            </div>
            <div className={`faq-answer ${activeFaq === 4 ? 'active' : ''}`}>
              <p>exemple text</p>
            </div>
          </div>
          <div className="faq-item" ref={el => faqRefs.current[5] = el}>
            <div className="faq-question" onClick={() => handleFaqClick(5)}>
              Can I take FemFresh Tabs with other medications?
              <span className="faq-icon">{activeFaq === 5 ? '−' : '+'}</span>
            </div>
            <div className={`faq-answer ${activeFaq === 5 ? 'active' : ''}`}>
              <p>exemple text</p>
            </div>
          </div>
          <div className="faq-item" ref={el => faqRefs.current[6] = el}>
            <div className="faq-question" onClick={() => handleFaqClick(6)}>
              How long should I continue taking FemFresh Tabs?
              <span className="faq-icon">{activeFaq === 6 ? '−' : '+'}</span>
            </div>
            <div className={`faq-answer ${activeFaq === 6 ? 'active' : ''}`}>
              <p>exemple text</p>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="container final-cta-content">
          <h2>Reclaim Your Confidence Today</h2>
          <p>Join thousands of women who've transformed their intimate health and rediscovered their confidence with FemFresh Tabs.</p>
          <a href="#offer" className="white-button">Get FemFresh Now</a>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>FemFresh</h3>
              <p>The revolutionary solution for women's intimate health.</p>
            </div>
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#benefits">Benefits</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#offer">Shop Now</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Contact</h3>
              <ul className="footer-links">
                <li>Email: support@femfresh.com</li>
                <li>Phone: 1-800-FEMFRESH</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 FemFresh. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;