import React from 'react';

const styles = {
  footer: { padding: '30px', backgroundColor: '#A0522D', color: 'white', textAlign: 'center', marginTop: '40px' }
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      &copy; {new Date().getFullYear()} The Dezzert Studio. Sweet Dreams are Made of These.
    </footer>
  );
}