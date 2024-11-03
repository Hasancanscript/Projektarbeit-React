import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';

const api = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function App() {
  return (
    <Router>
      {/* Navigationsleiste */}
      <nav className="navigation">
        <ul className="navigation-list">
          <li><Link to="/" className="navigation-link">Home</Link></li>
          <li><Link to="/products" className="navigation-link">Produkte</Link></li>
          <li><Link to="/contact" className="navigation-link">Kontaktformular</Link></li>
          <li><Link to="/team" className="navigation-link">Team</Link></li>
          <li><Link to="/about" className="navigation-link">Über uns</Link></li>
        </ul>
      </nav>

      {/* Routen für die Seiten */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/about" element={<About />} />
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

// Produkte-Seite mit Galerie
function Products() {
  return (
    <section className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Produkte</h1>
      <p>Hier findest du eine Auswahl unserer Produkte.</p>
      <Gallery /> {/* Galerie-Komponente hier hinzufügen */}
    </section>
  );
}

// Kontaktformular-Seite mit Umschaltfunktion
function Contact() {
  return (
    <section className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Kontaktformular</h1>
      <ContactForm /> {/* Zeigt das Kontaktformular an */}
    </section>
  );
}

// Team-Seite
function Team() {
  return (
    <section className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Team</h1>
      <p>Lernen Sie unser Team kennen.</p>
    </section>
  );
}

// Über-uns-Seite
function About() {
  return (
    <section className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Über uns</h1>
      <p>Hier erfahren Sie mehr über uns.</p>
    </section>
  );
}

// Kategorie-Verwaltungskomponente
function CategoryList() {
  const [categories, setCategories] = React.useState([]);
  const [editableCategoryId, setEditableCategoryId] = React.useState(null);
  const [editedCategory, setEditedCategory] = React.useState({});

  React.useEffect(() => {
    fetch(`${api}/categories`)
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
    fetch(`${api}/categories/${categoryId}`, {
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
    fetch(`${api}/categories/${categoryId}`, {
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
              className="btn btn-secondary px-4 py-2 rounded"
              onClick={() => {
                const newCategory = editedCategory['new'];
                fetch(`${api}/categories`, {
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
                    window.location.reload(); // Refresh the page
                  });
                  
              }}
            >
              Save
            </button>
            <button 
              className="btn btn-secondary px-4 py-2 rounded"
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
                      className="btn btn-secondary px-4 py-2 rounded"
                      onClick={() => handleSave(category.CategoryID)}
                    >
                      Save
                    </button>
                    <button 
                      className="btn btn-secondary px-4 py-2 rounded"
                      onClick={() => setEditableCategoryId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button 
                      className="btn btn-secondary px-4 py-2 rounded"
                      onClick={() => setEditableCategoryId(category.CategoryID)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-secondary px-4 py-2 rounded"
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
