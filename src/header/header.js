// import React, { useState, useEffect } from 'react';
// import './Header.css';
// import logo from '../logo1.png';

// const Header = ({ headName, cartCount, toggleCart }) => {
//   // Define sample categories and artists for demonstration

//   const [categories, setCategories] = useState([]);

//   // Fetch categories from the API when the component mounts
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/list_categories');
//       if (!response.ok) {
//         throw new Error('Failed to fetch categories');
//       }
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       console.error('Error fetching categories:', error.message);
//     }
//   };
  
//   const [artists, setArtists] = useState([]);

//   // Fetch artists from the API when the component mounts
//   useEffect(() => {
//     fetchArtists();
//   }, []);

//   const fetchArtists = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/list_artists');
//       if (!response.ok) {
//         throw new Error('Failed to fetch artists');
//       }
//       const data = await response.json();
//       setArtists(data);
//     } catch (error) {
//       console.error('Error fetching artists:', error.message);
//     }
//   };

// return (
//     <div className="header">
//       <img
//         className="header__logo"
//         src={logo}
//         alt="Logo"
//       />

//       <div className="header__dropdowns">
//         {/* Dropdown for categories */}
//         <select className="header__dropdown">
//           <option value="">Select Category</option>
//           {categories.map((category, index) => (
//             <option key={index} value={category}>{category}</option>
//           ))}
//         </select>

//         {/* Dropdown for artists */}
//         <select className="header__dropdown">
//           <option value="">Select Artist</option>
//           {artists.map((artist, index) => (
//             <option key={index} value={artist}>{artist}</option>
//           ))}
//         </select>
//       </div>

//       <div className="header__nav">
//         <div className="header__option">
//           <span className="header__optionLineOne">Hello, Sign in</span>
//           <span className="header__optionLineTwo">Account & Lists</span>
//         </div>
//         <div className="header__option">
//           <a href="#!" onClick={toggleCart} className="header__optionLineTwo" style={{color:"white",paddingTop:"5px"}}>Cart ({cartCount})</a>
//         </div>
//       </div>

//       <div className="header__option">
//         {headName === "SignIn" ? (
//           <a href="/signin" className="header__optionLineTwo" style={{color:"white"}}>
//             Sign In
//           </a>
//         ) : (
//           <a href="/" className="header__optionLineTwo" style={{color:"white"}}>
//             Sign Out
//           </a>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../logo1.png';

const Header = ({ headName, cartCount, toggleCart, onCategoryChange, onArtistChange }) => {
  // Define state to hold artists and categories fetched from the API
  const [artists, setArtists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');

  // Fetch artists and categories from the API when the component mounts
  useEffect(() => {
    fetchArtists();
    fetchCategories();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/list_artists');
      if (!response.ok) {
        throw new Error('Failed to fetch artists');
      }
      const data = await response.json();
      setArtists(data);
    } catch (error) {
      console.error('Error fetching artists:', error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/list_categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  // Handler function to handle category selection
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    onCategoryChange(selectedCategory);
  };

  // Handler function to handle artist selection
  const handleArtistChange = (event) => {
    const selectedArtist = event.target.value;
    setSelectedArtist(selectedArtist);
    onArtistChange(selectedArtist);
  };

  return (
    <div className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Logo"
      />

      <div className="header__dropdowns">
        {/* Dropdown for categories */}
        <select className="header__dropdown" onChange={handleCategoryChange} value={selectedCategory}>
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>

        {/* Dropdown for artists */}
        <select className="header__dropdown" onChange={handleArtistChange} value={selectedArtist}>
          <option value="">Select Artist</option>
          {artists.map((artist, index) => (
            <option key={index} value={artist}>{artist}</option>
          ))}
        </select>
      </div>

      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">Hello, Sign in</span>
          <span className="header__optionLineTwo">Account & Lists</span>
        </div>
        <div className="header__option">
          <a href="#!" onClick={toggleCart} className="header__optionLineTwo" style={{color:"white",paddingTop:"5px"}}>Cart ({cartCount})</a>
        </div>
      </div>

      <div className="header__option">
        {headName === "SignIn" ? (
          <a href="/signin" className="header__optionLineTwo" style={{color:"white"}}>
            Sign In
          </a>
        ) : (
          <a href="/" className="header__optionLineTwo" style={{color:"white"}}>
            Sign Out
          </a>
        )}
      </div>
    </div>
  );
};

export default Header;
