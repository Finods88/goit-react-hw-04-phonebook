import { useState, useEffect, useRef } from 'react';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import ContactsList from './ContactsList/ContactsList';

import styles from './phonebook.module.css';
import { nanoid } from 'nanoid';

const Phonebook = () => {
  const [contacts, setContacts] = useState(() => {
    const data = JSON.parse(localStorage.getItem('phonebook'));
    return data || [];
  });
  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('phonebook', JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();

    const dublicated = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      return normalizedCurrentName === normalizedName;
    });

    return Boolean(dublicated);
  };

  const addContact = data => {
    if (isDublicate(data.name)) {
      return alert(
        `Contact ${data.name} with tel: ${data.phone} already in phonebook`
      );
    }
    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const changeFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFiltredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const filtredContacts = contacts.filter(({ name, phone }) => {
      const normalizedName = name.toLowerCase();
      const normalizedPhone = phone.trim();

      return (
        normalizedName.includes(normalizedFilter) ||
        normalizedPhone.includes(normalizedFilter)
      );
    });

    return filtredContacts;
  };

  const items = getFiltredContacts();

  return (
    <div className={styles.phonebookWrapper}>
      <PhonebookForm onSubmit={addContact} />
      <div>
        <input
          type="text"
          name="filter"
          placeholder="Search"
          onChange={changeFilter}
          className={styles.filter}
        />
        <ContactsList items={items} deleteContact={deleteContact} />
      </div>
    </div>
  );
};

export default Phonebook;
