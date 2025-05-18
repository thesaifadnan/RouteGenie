import React, { useState } from 'react';

const Home = () => {
  const [stops, setStops] = useState(['']);
  const [weight, setWeight] = useState('');

  const handleAddStop = () => {
    setStops([...stops, '']);
  };

  const handleRemoveStop = (index) => {
    const updated = stops.filter((_, i) => i !== index);
    setStops(updated);
  };

  const handleChangeStop = (index, value) => {
    const updated = [...stops];
    updated[index] = value;
    setStops(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const deliveryData = {
      source: 'Clock Tower, Dehradun',
      stops,
      weight: parseFloat(weight),
    };

    console.log('Form Data:', deliveryData);
    // Next step: Save to Firebase
  };

  return (
    <div className="form-container">
      <h2>Delivery Route Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Source Location:</label>
          <input type="text" value="Clock Tower, Dehradun" readOnly />
        </div>

        <div className="form-group">
          <label>Delivery Stops:</label>
          {stops.map((stop, index) => (
            <div key={index} className="stop-input">
              <input
                type="text"
                placeholder={`Stop ${index + 1}`}
                value={stop}
                onChange={(e) => handleChangeStop(index, e.target.value)}
              />
              {stops.length > 1 && (
                <button type="button" onClick={() => handleRemoveStop(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddStop}>Add Stop</button>
        </div>

        <div className="form-group">
          <label>Package Weight (kg):</label>
          <input
            type="number"
            min="1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
