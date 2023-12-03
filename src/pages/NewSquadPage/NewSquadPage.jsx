import React, { useState } from 'react';
import SquadForm from '../../components/SquadForm/SquadForm'; 

export default function NewSquadPage() {
  const [formData, setFormData] = useState(initialFormData);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform any necessary actions with the form data
    // For example, you can send it to the server using an API request

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
    <div>
      <h1 className="neon-green">New Squad</h1>
      <SquadForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
}

const initialFormData = {
  // Initialize with any default form data if needed
  // Example:
  squadName: '',
  leader: '',
  // Add other fields as needed
};
