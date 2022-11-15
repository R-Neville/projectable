import React, { useState } from 'react';
import { searchUsers, addMember } from '../../services/projectsService';
import { createPortal } from 'react-dom';
import AsyncSelect from 'react-select/async';
import { useThemeContext } from '../../context-providers/ThemeProvider';
import Section from '../shared/Section';
import FormError from '../shared/FormError';
import { showError } from '../../utils/helpers';

export default function MemberModal({ open, onClose, projectId, onDone }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [formError, setFormError] = useState('');
  const { theme } = useThemeContext();

  const loadOptions = (query, callback) => {
    setTimeout(async () => {
      try {
        const result = await searchUsers(query, projectId);
        const options = result.data.map((userRecord) => {
          return { value: userRecord, label: userRecord.email };
        });
        callback(options);
      } catch (err) {
        showError(err);
      }
    }, 2000);
  };

  const handleChange = (query) => {
    setSelectedUser(query);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedUser === null) {
      setFormError('enter a user email to add to project');
    } else {
      addMember(projectId, selectedUser.value)
        .then(() => {
          onDone();
          onClose();
        })
        .catch((error) => {
          showError(error);
        });
    }
  };

  if (!open) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-opacity-75 transition-opacity"
        style={{ backgroundColor: '#000A' }}
      >
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full sm:items-center sm:p-0">
            <Section title="Share Project">
              {formError && (
                <FormError
                  text={formError}
                  onDismiss={() => setFormError('')}
                />
              )}
              <AsyncSelect
                type="text"
                isClearable={true}
                value={selectedUser}
                onChange={handleChange}
                placeholder="search by email"
                loadOptions={loadOptions}
                className="p-1 m-3 w-full border-0 rounded outline-0"
              />
              <div>
                <button
                  className="py-2 px-3 w-40 rounded mx-3"
                  style={{
                    backgroundColor: theme.fgHighlight,
                    color: theme.bgHighlight,
                  }}
                  onClick={handleSubmit}
                >
                  Add User
                </button>
                <button
                  className="py-2 px-3 w-40 rounded mx-3"
                  style={{
                    backgroundColor: theme.fgHighlight,
                    color: theme.bgHighlight,
                  }}
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}
