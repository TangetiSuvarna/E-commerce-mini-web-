import React from 'react';

const styles = {
  pageTitle: { textAlign: 'center', color: '#5C3317', fontSize: '2.5em', marginBottom: '40px', borderBottom: '3px solid #D2B48C', paddingBottom: '10px' },
  section: { padding: '20px', marginBottom: '30px', backgroundColor: '#FFF8DC', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  heading: { color: '#8B4513', borderBottom: '1px solid #D2B48C', paddingBottom: '5px', marginBottom: '15px' }
};

export default function About() {
  return (
    <div>
      <h1 style={styles.pageTitle}>Our Story: The Dezzert Studio 🥐</h1>

      <section style={styles.section}>
        <h2 style={styles.heading}>The Dezzert Studio Philosophy</h2>
        <p>
          Founded on the principle that life is too short for mediocre treats, **The Dezzert Studio** is a home bakery dedicated to crafting **small-batch, artisanal goods**. We use only the finest ingredients—local eggs, European butter, and ethically sourced chocolate. Every item is baked fresh daily with passion and precision.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>Visit Us / Contact</h2>
        <p>
          We operate as a **pick-up only** studio.
        </p>
        <p>
          **Pick-Up Location:** [Your City/Neighborhood Area] (Full address provided upon order confirmation).<br/>
          **Hours:** Tuesday - Saturday, 9:00 AM - 4:00 PM<br/>
          **Email:** hello@dezzertstudio.com<br/>
          **Custom Orders:** Please email us 7 days in advance!
        </p>
      </section>
    </div>
  );
}