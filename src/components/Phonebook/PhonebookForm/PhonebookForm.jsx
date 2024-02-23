import { useState } from 'react';
import { nanoid } from 'nanoid';
import styles from './phonebookForm.module.css';

const PhonebookForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const nameId = nanoid();
  const phoneId = nanoid();

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, phone });
    setName('');
    setPhone('');
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'phone') {
      setPhone(value);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formWrapper}>
          <label htmlFor={nameId}>Name</label>
          <input
            value={name}
            type="text"
            name="name"
            placeholder="Name"
            className={styles.inputName}
            id={nameId}
            onChange={handleChange}
            required
          />
          <label htmlFor={phoneId}>Phone</label>
          <input
            value={phone}
            type="tel"
            name="phone"
            placeholder="Phone"
            className={styles.inputName}
            id={phoneId}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.addContactBtn}>
            Add contact
          </button>
        </div>
      </form>
      <h1>Contacts</h1>
    </div>
  );
};

export default PhonebookForm;
