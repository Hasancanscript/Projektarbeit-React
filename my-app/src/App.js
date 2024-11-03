import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css';
import Productlist from './components/products';
import CheeseProducts from './components/CheeseProducts';
import ContactForm from './components/ContactForm';
import Team from './components/Team';
import Suppliers from './components/suppliers';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const addToCart = (product) => {
    const priceAsNumber = parseFloat(product.price.replace('CHF', '').replace(',', '.').trim());
    setCartItems([...cartItems, { ...product, price: priceAsNumber }]);
  };

  return (
    <Router>
      <nav className="navigation flex justify-between items-center" style={{ backgroundColor: '#1C729C' }}>
        <ul className="navigation-list flex space-x-4">
          <li>
            <Link to="/" className="navigation-link text-white">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li><Link to="/categories" className="navigation-link text-white">Kategorien</Link></li>
          <li><Link to="/products" className="navigation-link text-white">Produkte</Link></li>
          <li><Link to="/suppliers" className="navigation-link text-white">Lieferanten</Link></li>
          <li><Link to="/cheese" className="navigation-link text-white">Käseprodukte</Link></li>
          <li><Link to="/team" className="navigation-link text-white">Team</Link></li>
          <li><Link to="/contact" className="navigation-link text-white">Kontaktformular</Link></li>
          <li><Link to="/map" className="navigation-link text-white">Kontakt</Link></li>
          <li><Link to="/about" className="navigation-link text-white">Über mich</Link></li>
        </ul>

        <div className="flex items-center space-x-4">
          <button onClick={handleOpenModal} className="nav-button">
            <i className="fas fa-user"></i> Anmelden
          </button>
          <Link to="/cart" className="nav-button">
            <i className="fas fa-shopping-cart"></i> Warenkorb ({cartItems.length})
          </Link>
          <img src="/images/cheese-logo.png" alt="Käse Logo" className="cheese-logo" />
        </div>
      </nav>

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
            <button onClick={handleCloseModal} className="close-button">Schliessen</button>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Productlist />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/cheese" element={<CheeseProducts addToCart={addToCart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/about" element={<UeberMich />} />
        <Route path="/map" element={<Map />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
      </Routes>
    </Router>
  );
}

// Gemeinsame Header-Stil Funktion
const PageHeader = ({ title }) => (
  <h1 className="text-4xl font-extrabold mb-4 text-yellow-600 text-center">{title}</h1>
);

// Home-Seite mit grösserem Bild und stilisierter Überschrift
function Home() {
  return (
    <section className="container mx-auto p-4 text-center">
      <PageHeader title="Willkommen auf unserer Webseite" />
      <p className="mb-4 text-lg text-gray-700">
        Entdecken Sie unsere grosse Auswahl an Produkten und lernen Sie unser engagiertes Team kennen. 
        Wir freuen uns, Ihnen die besten Angebote und eine hervorragende Qualität zu bieten.
      </p>
      <img 
        src="/images/welcome-image.png" 
        alt="Willkommensbild" 
        className="mx-auto rounded-lg shadow-2xl"
        style={{ width: '500px', height: '500px', objectFit: 'cover' }}
      />
    </section>
  );
}

// Über mich-Seite
function UeberMich() {
  return (
    <section className="container mx-auto p-4 text-center">
      <PageHeader title="Willkommen auf meiner Seite!" />
      <img 
        src="/images/profile.jpg" 
        alt="Profilbild"
        className="rounded-full mx-auto mb-4"
        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
      />
      <p className="mb-4 text-lg text-gray-700">
        Ich studiere momentan als Wirtschaftsinformatiker bei Feusi und bin auch der Gründer dieser Webseite. 
        Neben meinem Studium arbeite ich bei Swisscom (Schweiz) AG im 2nd Level Bereich. Diese Erfahrung hilft mir, meine IT-Kenntnisse 
        kontinuierlich weiterzuentwickeln und praktische Lösungen für die heutigen technischen Herausforderungen zu finden.
      </p>
      <p className="text-lg text-gray-700">
        In meiner Freizeit interessiere ich mich für innovative Technologien und deren Anwendung in der Geschäftswelt. 
        Ich freue mich, meine Kenntnisse und Fähigkeiten mit Ihnen zu teilen und hoffe, dass meine Webseite Ihnen nützliche 
        Einblicke und Informationen bietet. Zögern Sie nicht, mich zu kontaktieren, wenn Sie Fragen haben oder mehr erfahren möchten!
      </p>
    </section>
  );
}

// Kontaktseite mit Google Maps
function Map() {
  return (
    <section className="container mx-auto p-4">
      <PageHeader title="Unsere Adresse" />
      <div className="map-container" style={{ border: '1px solid #ddd', overflow: 'hidden', borderRadius: '8px' }}>
        <iframe
          width="100%"
          height="450"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2651.913490841002!2d7.4641198!3d46.9664481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e39fe7e4c241b%3A0x85161c9c1c672184!2sFeusi%20Bildungszentrum%20AG!5e0!3m2!1sde!2sch!4v1698416552806!5m2!1sde!2sch"
          allowFullScreen
          title="Google Maps zur Adresse"
        ></iframe>
        <p>
          <a href="https://www.google.ch/maps/place/Feusi+Bildungszentrum+AG/@46.9664481,7.4641198,312m/data=!3m1!1e3!4m6!3m5!1s0x478e39fe7e4c241b:0x85161c9c1c672184!8m2!3d46.966543!4d7.465476!16s%2Fg%2F11f8p332v4?hl=de&entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D"
            target="_blank" rel="noopener noreferrer">
            Grössere Karte anzeigen
          </a>
        </p>
      </div>
    </section>
  );
}

// Kategorie-Seite
function Categories() {
  return (
    <section className="container mx-auto p-4">
      <PageHeader title="Kategorien" />
      <CategoryList />
    </section>
  );
}

// Kontaktformular-Seite
function Contact() {
  return (
    <section className="container mx-auto p-4">
      <PageHeader title="Kontaktformular" />
      <ContactForm />
    </section>
  );
}

// Warenkorb-Seite
function Cart({ cartItems }) {
  const [itemCounts, setItemCounts] = useState(cartItems.map(() => 1));

  const handleIncrease = (index) => {
    setItemCounts((counts) =>
      counts.map((count, i) => (i === index ? count + 1 : count))
    );
  };

  const handleDecrease = (index) => {
    setItemCounts((counts) =>
      counts.map((count, i) => (i === index && count > 1 ? count - 1 : count))
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item, index) => total + (item.price || 0) * itemCounts[index],
    0
  );

  return (
    <section className="container mx-auto p-4">
      <PageHeader title="Ihr Warenkorb" />
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-700">Ihr Warenkorb ist leer.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.src || '/images/placeholder.png'}
                  alt={item.name || 'Produktbild'}
                  style={{ width: '50px', height: '50px' }}
                />
                <div>
                  <h3 className="text-lg font-bold">{item.name || 'Produktname'}</h3>
                  <p className="text-sm text-gray-600">Preis: CHF {item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleDecrease(index)}
                  className="px-2 py-1 border"
                >
                  -
                </button>
                <span>{itemCounts[index]}</span>
                <button
                  onClick={() => handleIncrease(index)}
                  className="px-2 py-1 border"
                >
                  +
                </button>
              </div>
              <p className="text-lg font-bold">
                {(item.price * itemCounts[index]).toFixed(2)} CHF
              </p>
            </div>
          ))}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-bold">Gesamtpreis: {totalPrice.toFixed(2)} CHF</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Warenkorb leeren
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Zur Bestellung
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// Kategorie-Verwaltungskomponente
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
                  window.location.reload(); // Refresh the page
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