import React, { useState, useEffect } from 'react';
import { searchUsers } from '../../services/projectsService';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Section from '../shared/Section';
import Fieldset from '../shared/Fieldset';
import FormActions from '../shared/FormActions';
import Label from '../shared/Label';
import { showError } from '../../utils/helpers';
export default function MemberModal() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);

  const debounce = (query) => {
    clearTimeout(timeout);
    if (!query) return setResult([]);
    let timeout;
    timeout = setTimeout(() => {
      searchUsers(query)
        .then((users) => {
          setResult(users);
        })
        .catch((err) => {
          showError(err);
        });
    }, 1000);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    debounce(query);
  }, [query]);

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-opacity-75 transition-opacity"
        style={{ backgroundColor: '#000A' }}
      >
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full sm:items-center sm:p-0">
            <Section title="Share Project">
              <input type="text" onChange={handleChange} value={query} />
              <button></button>
            </Section>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}
