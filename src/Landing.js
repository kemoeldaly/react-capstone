import React, { useState, useEffect } from 'react';

const CAR_API_BASE_URL = '/api/vehicle-attributes?attribute=bodies.type';

const Landing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [jwtToken, setJwtToken] = useState('');

  const authenticateAndFetchData = async () => {
    try {
      const authResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_token: 'd5b40ad5-2cc6-462e-93d1-89778daf15ba',
          api_secret: 'fbd0d01f0e82ebca68b97e4f80c15c4f',
        }),
      });
  
      if (!authResponse.ok) {
        throw new Error(`Authentication failed! Status: ${authResponse.status}`);
      }
  
      // to Extract from token
      const token = await authResponse.text();
  
      if (!token) {
        throw new Error('Invalid JWT token');
      }
  
      console.log('JWT Token received:', token);
  
      setJwtToken(token);
  
      
      await fetchData(searchTerm);
    } catch (error) {
      console.error('Error during authentication:', error.message);
    }
  };
  
  
  
  
  
  
  

  const fetchData = async (term) => {
    try {
      const apiUrl = `/api/models`;
      const queryParams = `json=[{"field": "make", "op": "in", "val": ["${term}"]}]`;
      const fullUrl = `${apiUrl}?${queryParams}`;
  
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  
  
  

  useEffect(() => {
    authenticateAndFetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchData(searchTerm, jwtToken);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <label>
          Search Cars:
          <input type="text" value={searchTerm} onChange={handleSearchChange} />
        </label>
        <button type="submit">Search</button>
      </form>

      <ul>
        {searchResults.map((car) => (
          <li key={car.id}>{car.make} - {car.model}</li>
        ))}
      </ul>
    </div>
  );
};

export default Landing;
