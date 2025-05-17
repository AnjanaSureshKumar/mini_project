import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChooseRegister = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register As</h2>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate('/organizers/register')}>
          Organizer
        </button>
        <button style={styles.button} onClick={() => navigate('/participants/register')}>
          Participant
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
    fontFamily: 'Poppins, sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#FFB5BE',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default ChooseRegister;
