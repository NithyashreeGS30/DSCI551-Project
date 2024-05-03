// import React, { useState, useEffect } from 'react';
// import './BodyPage.css';
// import Header from './header/header';
// import CheckoutPage from './checkoutpage/checkoutpage';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon
// import AddIcon from '@mui/icons-material/Add'; // Import the add icon

// const BodyPage1 = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedArtist, setSelectedArtist] = useState('');
//   const [products, setProducts] = useState([]);
//   const [showCondition, setShowCondition] = useState(null);
//   const [editProductId, setEditProductId] = useState(null);
//   const [editPrice, setEditPrice] = useState('');
//   const [editCondition, setEditCondition] = useState('');
//   const [showForm, setShowForm] = useState(false); // State to control the visibility of the form
//   const [formData, setFormData] = useState({
//     artist: '',
//     art_id: '',
//     art_images: '',
//     price: '',
//     location: '',
//     title: '',
//     creation_year: '',
//     signed: '',
//     condition: '',
//     category: '',
//     movement: ''
//   });

//   useEffect(() => {
//     if (selectedCategory) {
//       fetchProducts(selectedCategory);
//     }
//   }, [selectedCategory]);

//   const fetchProducts = async (category) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/search_by_category?category=${category}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const data = await response.json();
//       const artworksArray = Object.values(data.artworks);
//       setProducts(artworksArray);
//     } catch (error) {
//       console.error('Error fetching products:', error.message);
//     }
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   const handleArtistChange = async (artist) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/search_by_artist?artist=${artist}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const data = await response.json();
//       const artworksArray = Object.values(data.artworks);
//       setProducts(artworksArray);
//     } catch (error) {
//       console.error('Error fetching products:', error.message);
//     }
//   };

//   const addToCart = (product) => {
//     const existingItem = cartItems.find((item) => item._id === product._id);

//     if (existingItem) {
//       const updatedCartItems = cartItems.map((item) =>
//         item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
//       );
//       setCartItems(updatedCartItems);
//     } else {
//       setCartItems([...cartItems, { ...product, quantity: 1 }]);
//     }
//   };

//   const toggleCart = () => {
//     setIsCartOpen((prevState) => !prevState);
//   };

//   const handleImageClick = (productId) => {
//     setShowCondition(productId);
//   };

//   const handleCloseCondition = () => {
//     setShowCondition(null);
//   };

//   const handleEditClick = (productId, initialPrice, initialCondition) => {
//     setEditProductId(productId);
//     setEditPrice(initialPrice);
//     setEditCondition(initialCondition);
//   };

//   const handleEditCancel = () => {
//     setEditProductId(null);
//     setEditPrice('');
//     setEditCondition('');
//   };

//   const handleEditSubmit = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/update_artwork', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           art_id: editProductId,
//           new_price: editPrice,
//           new_condition: editCondition
//         })
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to update artwork');
//       }
  
//       // Update the products array with the edited data
//       const updatedProducts = products.map(product => {
//         if (product.ArtID === editProductId) {
//           return {
//             ...product,
//             Price: editPrice, // Update the price
//             Condition: editCondition // Update the condition
//           };
//         }
//         return product;
//       });
  
//       setProducts(updatedProducts);
  
//       const data = await response.json();
//       console.log(data); // Logging the response from the server
//       setEditProductId(null);
//       setEditPrice('');
//       setEditCondition('');
//     } catch (error) {
//       console.error('Error updating artwork:', error.message);
//     }
//   };

//   const handleDeleteProduct = async (productId) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/delete_artwork?art_id=${productId}`, {
//         method: 'DELETE'
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to delete product');
//       }
  
//       const data = await response.json();
//       console.log(data.message); // Log the response message from the server
  
//       // Filter out the deleted product from the products array
//       const updatedProducts = products.filter(product => product.ArtID !== productId);
//       setProducts(updatedProducts);
//     } catch (error) {
//       console.error('Error deleting product:', error.message);
//     }
//   };

//   const handleInsertDocument = () => {
//     // Show the form when the add icon is clicked
//     setShowForm(true);
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission
    
//     try {
//       const response = await fetch('http://127.0.0.1:8000/insert_document', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData), // Use formData from state
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to insert document');
//       }
  
//       const data = await response.json();
//       console.log(data); // Log the response from the server
  
//       // Optionally, reset the form data and hide the form after successful submission
//       setFormData({
//         artist: '',
//         art_id: '',
//         art_images: '',
//         price: '',
//         location: '',
//         title: '',
//         creation_year: '',
//         signed: '',
//         condition: '',
//         category: '',
//         movement: ''
//       });
//       setShowForm(false);
//     } catch (error) {
//       console.error('Error inserting document:', error.message);
//     }
//   };

//   return (
//     <div>
//       <Header
//         headName="SignOut"
//         cartCount={cartItems.length}
//         toggleCart={toggleCart}
//         onCategoryChange={handleCategoryChange}
//         onArtistChange={handleArtistChange}
//       />
//       <div className="body-page">
//         <div className="product-grid">
//           {products.map((product) => (
//             <div key={product._id} className="product-card">
//               <img
//                 src={product.ArtImages}
//                 alt={product.Artist}
//                 className="product-image"
//                 style={{ width: '200px', height: '200px' }}
//                 onClick={() => handleImageClick(product._id)}
//               />
//               <div className="product-info">
//                 <div className="product-name" style={{fontWeight:"bold"}}>{product.Title}</div>
//                 <div className="product-title">{product.Artist}</div>
//                 <div className="product-price">{product.Price}</div>
//                 {showCondition === product._id && (
//                   <div className="product-condition">
//                     <h3>Condition:</h3>
//                     <p>{product.Condition}</p>
//                     <button onClick={handleCloseCondition} style={{ background: '#ff9900', color: 'white' }}>
//                       Close
//                     </button>
//                   </div>
//                 )}
//                 {editProductId === product.ArtID ? (
//                   <div>
//                     <input
//                       type="text"
//                       value={editPrice}
//                       onChange={(e) => setEditPrice(e.target.value)}
//                       placeholder="Enter new price"
//                     />
//                     <input
//                       type="text"
//                       value={editCondition}
//                       onChange={(e) => setEditCondition(e.target.value)}
//                       placeholder="Enter new condition"
//                     />
//                     <button onClick={handleEditSubmit}>Submit</button>
//                     <button onClick={handleEditCancel}>Cancel</button>
//                   </div>
//                 ) : (
//                   <div className="icon-container"> {/* Add this container */}
//                     <EditIcon
//                       style={{ marginRight: '10px', cursor: 'pointer', color: '#ff9900' }}
//                       onClick={() => handleEditClick(product.ArtID, product.Price, product.Condition)}
//                     />
//                     <DeleteIcon
//                       style={{ cursor: 'pointer', color: '#ff9900' }}
//                       onClick={() => handleDeleteProduct(product.ArtID)}
//                     />
//                   </div>
//                 )}
//                 <button
//                   className="add-to-cart-button"
//                   onClick={() => addToCart(product)}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//           {showForm ? (
//             <div className="product-card">
//               {/* Your form component goes here */}
//               <form onSubmit={handleFormSubmit}>
//                 <input
//                   type="text"
//                   name="artist"
//                   value={formData.artist}
//                   onChange={handleFormChange}
//                   placeholder="Artist"
//                 />
//                 <input
//                   type="text"
//                   name="art_id"
//                   value={formData.art_id}
//                   onChange={handleFormChange}
//                   placeholder="Art ID"
//                 />
//                 <input
//                   type="text"
//                   name="art_images"
//                   value={formData.art_images}
//                   onChange={handleFormChange}
//                   placeholder="Art Images"
//                 />
//                 <input
//                   type="text"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleFormChange}
//                   placeholder="Price"
//                 />
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleFormChange}
//                   placeholder="Location"
//                 />
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleFormChange}
//                   placeholder="Title"
//                 />
//                 <input
//                   type="text"
//                   name="creation_year"
//                   value={formData.creation_year}
//                   onChange={handleFormChange}
//                   placeholder="Creation Year"
//                 />
//                 <input
//                   type="text"
//                   name="signed"
//                   value={formData.signed}
//                   onChange={handleFormChange}
//                   placeholder="Signed"
//                 />
//                 <input
//                   type="text"
//                   name="condition"
//                   value={formData.condition}
//                   onChange={handleFormChange}
//                   placeholder="Condition"
//                 />
//                 <input
//                   type="text"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleFormChange}
//                   placeholder="Category"
//                 />
//                 <input
//                   type="text"
//                   name="movement"
//                   value={formData.movement}
//                   onChange={handleFormChange}
//                   placeholder="Movement"
//                 />
//                 <button type="submit">Submit</button>
//               </form>
//             </div>
//           ) : (
//             <div className="product-card" onClick={handleInsertDocument}>
//               <AddIcon style={{ width: '100px', height: '100px', cursor: 'pointer' }} />
//             </div>
//           )}
//         </div>
//       </div>
//       {isCartOpen && <CheckoutPage cartItems={cartItems} />}
//     </div>
//   );
// };

// export default BodyPage1;

import React, { useState, useEffect } from 'react';
import './BodyPage.css';
import Header from './header/header';
import CheckoutPage from './checkoutpage/checkoutpage';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon
import AddIcon from '@mui/icons-material/Add'; // Import the add icon

const BodyPage1 = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');
  const [products, setProducts] = useState([]);
  const [showCondition, setShowCondition] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [editCondition, setEditCondition] = useState('');
  const [showForm, setShowForm] = useState(false); // State to control the visibility of the form
  const [formData, setFormData] = useState({
    artist: '',
    art_id: '',
    art_images: '',
    price: '',
    location: '',
    title: '',
    creation_year: '',
    signed: '',
    condition: '',
    category: '',
    movement: ''
  });

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchProducts = async (category) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/search_by_category?category=${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      const artworksArray = Object.values(data.artworks);
      setProducts(artworksArray);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleArtistChange = async (artist) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/search_by_artist?artist=${artist}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      const artworksArray = Object.values(data.artworks);
      setProducts(artworksArray);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  const handleImageClick = (productId) => {
    setShowCondition(productId);
  };

  const handleCloseCondition = () => {
    setShowCondition(null);
  };

  const handleEditClick = (productId, initialPrice, initialCondition) => {
    setEditProductId(productId);
    setEditPrice(initialPrice);
    setEditCondition(initialCondition);
  };

  const handleEditCancel = () => {
    setEditProductId(null);
    setEditPrice('');
    setEditCondition('');
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/update_artwork', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          art_id: editProductId,
          new_price: editPrice,
          new_condition: editCondition
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update artwork');
      }
  
      // Update the products array with the edited data
      const updatedProducts = products.map(product => {
        if (product.ArtID === editProductId) {
          return {
            ...product,
            Price: editPrice, // Update the price
            Condition: editCondition // Update the condition
          };
        }
        return product;
      });
  
      setProducts(updatedProducts);
  
      const data = await response.json();
      console.log(data); // Logging the response from the server
      setEditProductId(null);
      setEditPrice('');
      setEditCondition('');
    } catch (error) {
      console.error('Error updating artwork:', error.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/delete_artwork?art_id=${productId}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
  
      const data = await response.json();
      console.log(data.message); // Log the response message from the server
  
      // Filter out the deleted product from the products array
      const updatedProducts = products.filter(product => product.ArtID !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  const handleInsertDocument = () => {
    // Show the form when the add icon is clicked
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    try {
      const response = await fetch('http://127.0.0.1:8000/insert_document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Use formData from state
      });
  
      if (!response.ok) {
        throw new Error('Failed to insert document');
      }
  
      const data = await response.json();
      console.log(data); // Log the response from the server
  
      // Optionally, reset the form data and hide the form after successful submission
      setFormData({
        artist: '',
        art_id: '',
        art_images: '',
        price: '',
        location: '',
        title: '',
        creation_year: '',
        signed: '',
        condition: '',
        category: '',
        movement: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error inserting document:', error.message);
    }
  };

  return (
    <div>
      <Header
        headName="SignOut"
        cartCount={cartItems.length}
        toggleCart={toggleCart}
        onCategoryChange={handleCategoryChange}
        onArtistChange={handleArtistChange}
      />
      <div className="body-page">
        {/* Display text prompting user to select category or artist */}
        {(!selectedCategory && !selectedArtist) && (
          <div className="select-prompt">
            <p>Please select a category or artist to search.</p>
          </div>
        )}
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.ArtImages}
                alt={product.Artist}
                className="product-image"
                style={{ width: '200px', height: '200px' }}
                onClick={() => handleImageClick(product._id)}
              />
              <div className="product-info">
                <div className="product-name" style={{fontWeight:"bold"}}>{product.Title}</div>
                <div className="product-title">{product.Artist}</div>
                <div className="product-price">{product.Price}</div>
                {showCondition === product._id && (
                  <div className="product-condition">
                    <h3>Condition:</h3>
                    <p>{product.Condition}</p>
                    <button onClick={handleCloseCondition} style={{ background: '#ff9900', color: 'white' }}>
                      Close
                    </button>
                  </div>
                )}
                {editProductId === product.ArtID ? (
                  <div>
                    <input
                      type="text"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      placeholder="Enter new price"
                    />
                    <input
                      type="text"
                      value={editCondition}
                      onChange={(e) => setEditCondition(e.target.value)}
                      placeholder="Enter new condition"
                    />
                    <button onClick={handleEditSubmit}>Submit</button>
                    <button onClick={handleEditCancel}>Cancel</button>
                  </div>
                ) : (
                  <div className="icon-container"> {/* Add this container */}
                    <EditIcon
                      style={{ marginRight: '10px', cursor: 'pointer', color: '#ff9900' }}
                      onClick={() => handleEditClick(product.ArtID, product.Price, product.Condition)}
                    />
                    <DeleteIcon
                      style={{ cursor: 'pointer', color: '#ff9900' }}
                      onClick={() => handleDeleteProduct(product.ArtID)}
                    />
                  </div>
                )}
                <button
                  className="add-to-cart-button"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
          {showForm ? (
            <div className="product-card">
              {/* Your form component goes here */}
              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  name="artist"
                  value={formData.artist}
                  onChange={handleFormChange}
                  placeholder="Artist"
                />
                <input
                  type="text"
                  name="art_id"
                  value={formData.art_id}
                  onChange={handleFormChange}
                  placeholder="Art ID"
                />
                <input
                  type="text"
                  name="art_images"
                  value={formData.art_images}
                  onChange={handleFormChange}
                  placeholder="Art Images"
                />
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  placeholder="Price"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  placeholder="Location"
                />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="Title"
                />
                <input
                  type="text"
                  name="creation_year"
                  value={formData.creation_year}
                  onChange={handleFormChange}
                  placeholder="Creation Year"
                />
                <input
                  type="text"
                  name="signed"
                  value={formData.signed}
                  onChange={handleFormChange}
                  placeholder="Signed"
                />
                <input
                  type="text"
                  name="condition"
                  value={formData.condition}
                  onChange={handleFormChange}
                  placeholder="Condition"
                />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  placeholder="Category"
                />
                <input
                  type="text"
                  name="movement"
                  value={formData.movement}
                  onChange={handleFormChange}
                  placeholder="Movement"
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          ) : (
            <div className="product-card" onClick={handleInsertDocument}>
              <AddIcon style={{ width: '100px', height: '100px', cursor: 'pointer' }} />
            </div>
          )}
        </div>
      </div>
      {isCartOpen && <CheckoutPage cartItems={cartItems} />}
    </div>
  );
};

export default BodyPage1;
