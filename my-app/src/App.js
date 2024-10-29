import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css';
import Productlist from './components/products';
import CheeseProducts from './components/CheeseProducts';
import ContactForm from './components/ContactForm';
import Team from './components/Team';
import UeberUns from './components/ueberuns';

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Router>
      {/* Navigationsleiste */}
      <nav className="navigation flex justify-between items-center">
        <ul className="navigation-list flex space-x-4">
          <li>
            <Link to="/" className="navigation-link">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li><Link to="/products" className="navigation-link">Produkte</Link></li>
          <li><Link to="/cheese" className="navigation-link">Käseprodukte</Link></li>
          <li><Link to="/team" className="navigation-link">Team</Link></li>
          <li><Link to="/contact" className="navigation-link">Kontaktformular</Link></li>
          <li><Link to="/map" className="navigation-link">Kontakt</Link></li>
          <li><Link to="/about" className="navigation-link">Über uns</Link></li>
        </ul>

        {/* Anmelden-Button und Käse-Logo auf der rechten Seite */}
        <div className="flex items-center space-x-4">
          <button onClick={handleOpenModal} className="login-button">Anmelden</button>
          <img src="/images/cheese-logo.png" alt="Käse Logo" className="cheese-logo" />
        </div>
      </nav>

      {/* Modal für das Anmeldeformular */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Anmelden</h2>
            <form className="login-form">
              <label>
                Benutzername:
                <input type="text" name="username" />
              </label>
              <label>
                Passwort:
                <input type="password" name="password" />
              </label>
              <button type="submit" className="submit-button">Anmelden</button>
            </form>
            <button onClick={handleCloseModal} className="close-button">Schließen</button>
          </div>
        </div>
      )}

      {/* Routen für die Seiten */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Productlist />} />
        <Route path="/cheese" element={<CheeseProducts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/about" element={<UeberUns />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

// Home-Seite mit Kategorie-Verwaltung
function Home() {
  return (
    <section className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Kategorie-Verwaltung</h1>
      <CategoryList />
    </section>
  );
}

// Kontaktformular-Seite
function Contact() {
  return (
    <section className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Kontaktformular</h1>
      <ContactForm />
    </section>
  );
}

// OpenStreetMap-Karte eingebettet in einem iframe
function Map() {
  return (
    <section className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Unsere Adresse</h1>
      <div className="map-container" style={{ border: '1px solid #ddd', overflow: 'hidden', borderRadius: '8px' }}>
        <iframe
          width="100%"
          height="450"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://www.openstreetmap.org/export/embed.html?bbox=7.4603%2C46.9477%2C7.4623%2C46.9487&layer=mapnik&marker=46.9482%2C7.4613"
          title="OpenStreetMap zur Adresse Max-Daetwyler-Platz 1, 3014 Bern"
        ></iframe>
        <p>
          <a href="https://www.openstreetmap.org/?mlat=46.9482&mlon=7.4613#map=17/46.9482/7.4613" target="_blank" rel="noopener noreferrer">
            Größere Karte anzeigen
          </a>
        </p>
      </div>
    </section>
  );
}

// Kategorie-Verwaltungskomponente (verbleibender Code unverändert)
function CategoryList() {
  const [categories, setCategories] = React.useState([]);
  const [editableCategoryId, setEditableCategoryId] = React.useState(null);
  const [editedCategory, setEditedCategory] = React.useState({});

  React.useEffect(() => {
    fetch(`http://localhost:3000/categories`)
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  const handleInputChange = (categoryId, field, value) => {
    setEditedCategory(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [field]: value,
      },
    }));
  };

  const handleSave = (categoryId) => {
    const updatedCategory = editedCategory[categoryId];
    fetch(`http://localhost:3000/categories/${categoryId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCategory),
    })
      .then(response => {
        if (response.ok) {
          setCategories(categories.map(category =>
            category.CategoryID === categoryId ? { ...category, ...updatedCategory } : category
          ));
          setEditableCategoryId(null);
        } else {
          alert('Failed to update category');
        }
      });
  };

  const handleDelete = (categoryId) => {
    fetch(`http://localhost:3000/categories/${categoryId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setCategories(categories.filter(category => category.CategoryID !== categoryId));
        } else {
          alert('Failed to delete category');
        }
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setEditableCategoryId('new')}
      >
        Add New Category
      </button>
      {editableCategoryId === 'new' && (
        <div className="mb-4 p-4 border rounded">
          <input
            className="border p-2 mb-2 w-full"
            type="text"
            placeholder="Category Name"
            value={editedCategory['new']?.CategoryName || ''}
            onChange={(e) => handleInputChange('new', 'CategoryName', e.target.value)}
          />
          <input
            className="border p-2 mb-2 w-full"
            type="text"
            placeholder="Description"
            value={editedCategory['new']?.Description || ''}
            onChange={(e) => handleInputChange('new', 'Description', e.target.value)}
          />
          <div className="flex space-x-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => {
                const newCategory = editedCategory['new'];
                fetch(`http://localhost:3000/categories`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newCategory),
                })
                  .then(response => response.json())
                  .then(data => {
                    setCategories([...categories, data]);
                    setEditableCategoryId(null);
                    setEditedCategory(prev => {
                      const { new: _, ...rest } = prev;
                      return rest;
                    });
                  });
              }}
            >
              Save
            </button>
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setEditableCategoryId(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Category Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.CategoryID} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">
                {editableCategoryId === category.CategoryID ? (
                  <input
                    className="border p-2 w-full"
                    type="text"
                    value={editedCategory[category.CategoryID]?.CategoryName || category.CategoryName}
                    onChange={(e) =>
                      handleInputChange(category.CategoryID, 'CategoryName', e.target.value)
                    }
                  />
                ) : (
                  category.CategoryName
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editableCategoryId === category.CategoryID ? (
                  <input
                    className="border p-2 w-full"
                    type="text"
                    value={editedCategory[category.CategoryID]?.Description || category.Description}
                    onChange={(e) =>
                      handleInputChange(category.CategoryID, 'Description', e.target.value)
                    }
                  />
                ) : (
                  category.Description
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editableCategoryId === category.CategoryID ? (
                  <div className="flex space-x-2">
                    <button 
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => handleSave(category.CategoryID)}
                    >
                      Save
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => setEditableCategoryId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button 
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                      onClick={() => setEditableCategoryId(category.CategoryID)}
                    >
                      Edit
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDelete(category.CategoryID)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
