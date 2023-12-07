import React, { useState } from 'react';
import SquadForm from '../../components/SquadForm/SquadForm'; 

export default function NewSquadPage() {
  const [formData, setFormData] = useState(initialFormData);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="mt-8">
      <SquadForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
}

const initialFormData = {
  squadName: '',
  leader: '',
};
