import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    photo: null,
    rank: 'First Rank',
    idNumber: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const element = document.getElementById('output');
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).default;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('output.pdf');

  };

  return (
    <div className="App">
      <h1>Ranking Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Photo:
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Rank:
          <select name="rank" value={formData.rank} onChange={handleChange}>
            <option value="First Rank">First Rank</option>
            <option value="Second Rank">Second Rank</option>
            <option value="Third Rank">Third Rank</option>
          </select>
        </label>
        <label>
          ID Number:
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            pattern="#[0-9]{6}"
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <div id="output" style={{ marginTop: '20px', padding: '10px', border: '1px solid #000' }}>
          <img
            src={formData.photo ? URL.createObjectURL(formData.photo) : ''}
            alt="User Photo"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
          <p>ID: {formData.idNumber}</p>
          <p>User Name: {formData.name}</p>
          <p>
            Congratulations!! You have secured <strong>{formData.rank}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
