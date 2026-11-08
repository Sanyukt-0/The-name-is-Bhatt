import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from '../lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import characterImg from '../assets/character-render.png';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef     = useRef(null);
  const charRef        = useRef(null);
  const [result,       setResult]       = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status,       setStatus]       = useState(null);
  const [isModalOpen,  setIsModalOpen]  = useState(false);

  useGSAP(() => {
    if (charRef.current) {
      gsap.fromTo(
        charRef.current,
        { opacity: 0, x: -60, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, { scope: sectionRef });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult('Sending....');
    setStatus(null);

    const formData = new FormData(e.target);
    formData.append('access_key', '9bb06752-08d4-49e0-ae5e-ebb80a228b04');

    try {
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(true);
        setStatus('success');
        e.target.reset();
        setResult('');
      } else {
        setResult(data.message || 'Something went wrong.');
        setStatus('error');
      }
    } catch {
      setResult('Network connection error. Please try again later.');
      setStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => { setResult(''); setStatus(null); }, 5000);
    }
  };

  const fields = [
    { id: 'name',  name: 'name',  label: 'Name',     type: 'text',  placeholder: 'Your name',           required: true  },
    { id: 'phone', name: 'phone', label: 'Phone No.', type: 'tel',  placeholder: '+91 000 000 0000',     required: false },
    { id: 'email', name: 'email', label: 'Email',     type: 'email',placeholder: 'your@email.com',       required: false },
    { id: 'subject',name:'subject',label:'Subject',   type: 'text', placeholder: 'Subject of your message',required:false},
  ];

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="contact-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal-icon">✓</div>
            <h3 className="contact-modal-title">Message Sent!</h3>
            <p className="contact-modal-text">I'll respond within 24–48 hours.</p>
            <button className="contact-modal-close" onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* ── Anime Character Render Side Accent (Codepen / AAA Graphic Art) ── */}
      <div ref={charRef} className="contact-char-render-wrap" aria-hidden="true">
        <img
          src={characterImg}
          alt="Character Graphic"
          className="contact-char-render-img"
          loading="lazy"
        />
        <div className="contact-char-render-glow" />
      </div>

      {/* Left column */}
      <div className="contact-left">
        <h1 className="contact-big-heading">
          GET IN <span className="contact-heading-accent">TOUCH</span>
        </h1>

        <div className="contact-info-list">

          <div className="contact-info-item">
            <div className="contact-info-icon-wrap">◎</div>
            <div>
              <h4 className="contact-info-label">Located at</h4>
              <p className="contact-info-text">Haryana</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon-wrap">✉</div>
            <div>
              <h4 className="contact-info-label">Email</h4>
              <a href="mailto:sanyuktbhatt.doon@gmail.com" className="contact-info-link">sanyuktbhatt.doon@gmail.com</a>
            </div>
          </div>

          <a href="https://www.linkedin.com/in/sanyukt-bhatt/" target="_blank" rel="noreferrer" className="contact-info-item contact-info-item-link">
            <div className="contact-info-icon-wrap">in</div>
            <div>
              <h4 className="contact-info-label">LinkedIn</h4>
              <p className="contact-info-link-text">Bhatt-san</p>
            </div>
          </a>

          <a href="https://github.com/Sanyukt-0" target="_blank" rel="noreferrer" className="contact-info-item contact-info-item-link">
            <div className="contact-info-icon-wrap">GH</div>
            <div>
              <h4 className="contact-info-label">GitHub</h4>
              <p className="contact-info-link-text">Sanyukt-0</p>
            </div>
          </a>

          <a href="https://ludusdev.itch.io/" target="_blank" rel="noreferrer" className="contact-info-item contact-info-item-link">
            <div className="contact-info-icon-wrap">IO</div>
            <div>
              <h4 className="contact-info-label">Itch.io</h4>
              <p className="contact-info-link-text">ludus</p>
            </div>
          </a>
        </div>
      </div>

      {/* Right column — form */}
      <div className="contact-right">
        <form onSubmit={onSubmit} className="contact-form-card">
          <h2 className="contact-form-title">Send a Message</h2>

          {fields.map((f) => (
            <div key={f.id} className="contact-field">
              <label htmlFor={f.id} className="contact-field-label">
                {f.label}{f.required && <span className="contact-required"> *</span>}
              </label>
              <input
                id={f.id}
                name={f.name}
                type={f.type}
                required={f.required}
                placeholder={f.placeholder}
                className="contact-input"
              />
            </div>
          ))}

          <div className="contact-field">
            <label htmlFor="message" className="contact-field-label">
              Message <span className="contact-required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Write your message here..."
              className="contact-input contact-textarea"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`contact-submit-btn ${isSubmitting ? 'contact-submit-disabled' : ''}`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'error' && (
            <div className="contact-error-msg">{result}</div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;

