import React, { useEffect, useState } from 'react';

const api = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function Productlist() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editableProductId, setEditableProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    fetch(`${api}/products`)
      .then(response => response.json())
      .then(data => {
        const sortedData = sortProducts(data);
        setProducts(sortedData);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const sortProducts = (products) => {
    return products.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
  };

  const handleInputChange = (productId, field, value) => {
    setEditedProduct(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleSave = (productId) => {
    const updatedProduct = editedProduct[productId];
    fetch(`${api}/products/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then(response => {
        if (response.ok) {
          setProducts(products.map(product =>
            product.ProductID === productId ? { ...product, ...updatedProduct } : product
          ));
          setEditableProductId(null);
        } else {
          alert('Failed to update product');
        }
      });
  };

  const handleDelete = (productId) => {
    fetch(`${api}/products/${productId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setProducts(products.filter(product => product.ProductID !== productId));
        } else {
          alert('Failed to delete product');
        }
      });
  };

  // Filter the products based on the search term
  const filteredProducts = products.filter(product =>
    product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Produktliste</h1>
      <p className="product-intro">
        Entdecken Sie unsere sorgfältig ausgewählte Produktpalette, die höchste Qualität und besten Genuss garantiert bei Käserei Hasan
      </p>

      {/* Suchfeld */}
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 w-64 mb-2 block" // Sicherstellen, dass das Suchfeld ein Blockelement ist
          placeholder="Suche nach Produkt..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className="btn btn-primary px-4 py-2 w-64 block" // Button ebenfalls als Blockelement unter dem Suchfeld
          onClick={() => setEditableProductId('new')}
        >
          Neues Produkt hinzufügen
        </button>
      </div>

      {editableProductId === 'new' && (
        <div className="mb-4 p-4 border rounded">
          <input
            className="border p-2 mb-2 w-full"
            type="text"
            placeholder="Produktname"
            value={editedProduct['new']?.ProductName || ''}
            onChange={(e) => handleInputChange('new', 'ProductName', e.target.value)}
          />
          <input
            className="border p-2 mb-2 w-full"
            type="text"
            placeholder="Einheit"
            value={editedProduct['new']?.Unit || ''}
            onChange={(e) => handleInputChange('new', 'Unit', e.target.value)}
          />
          <input
            className="border p-2 mb-2 w-full"
            type="text"
            placeholder="Preis"
            value={editedProduct['new']?.Price || ''}
            onChange={(e) => handleInputChange('new', 'Price', e.target.value)}
          />
          <div className="flex space-x-2">
            <button
              className="btn btn-secondary px-4 py-2 rounded"
              onClick={() => {
                const newProduct = editedProduct['new'];
                fetch(`${api}/products`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newProduct),
                })
                  .then(response => response.json())
                  .then(data => {
                    setProducts([...products, data]);
                    setEditableProductId(null);
                    setEditedProduct(prev => {
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
              onClick={() => setEditableProductId(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Produktname</th>
            <th className="py-2 px-4 border-b">Einheit</th>
            <th className="py-2 px-4 border-b">CHF</th>
            <th className="py-2 px-4 border-b">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.ProductID} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">
                {editableProductId === product.ProductID ? (
                  <input
                    className="border p-2 w-full"
                    type="text"
                    value={editedProduct[product.ProductID]?.ProductName || product.ProductName}
                    onChange={(e) =>
                      handleInputChange(product.ProductID, 'ProductName', e.target.value)
                    }
                  />
                ) : (
                  product.ProductName
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editableProductId === product.ProductID ? (
                  <input
                    className="border p-2 w-full"
                    type="text"
                    value={editedProduct[product.ProductID]?.Unit || product.Unit}
                    onChange={(e) =>
                      handleInputChange(product.ProductID, 'Unit', e.target.value)
                    }
                  />
                ) : (
                  product.Unit
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editableProductId === product.ProductID ? (
                  <input
                    className="border p-2 w-full"
                    type="text"
                    value={editedProduct[product.ProductID]?.Price || product.Price}
                    onChange={(e) =>
                      handleInputChange(product.ProductID, 'Price', e.target.value)
                    }
                  />
                ) : (
                  product.Price
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editableProductId === product.ProductID ? (
                  <div className="flex space-x-2">
                    <button 
                      className="btn btn-secondary px-4 py-2 rounded"
                      onClick={() => handleSave(product.ProductID)}
                    >
                      Save
                    </button>
                    <button 
                      className="btn btn-secondary px-4 py-2 rounded"
                      onClick={() => setEditableProductId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button 
                      className="btn btn-secondary px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 border-none"
                      onClick={() => setEditableProductId(product.ProductID)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-secondary px-4 py-2 rounded bg-red-500 hover:bg-red-600 border-none"
                      onClick={() => handleDelete(product.ProductID)}
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

export default Productlist;
