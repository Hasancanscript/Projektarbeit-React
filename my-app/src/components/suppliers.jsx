import React from 'react';

const api = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function Suppliers() {
  const [suppliers, setSuppliers] = React.useState([]);
  const [editableSupplierId, setEditableSupplierId] = React.useState(null);
  const [editedSupplier, setEditedSupplier] = React.useState({});

  React.useEffect(() => {
    fetch(`${api}/suppliers`)
      .then(response => response.json())
      .then(data => setSuppliers(data));
  }, []);

  const handleInputChange = (supplierId, field, value) => {
    setEditedSupplier(prev => ({
      ...prev,
      [supplierId]: {
        ...prev[supplierId],
        [field]: value,
      },
    }));
  };

  const handleSave = (supplierId) => {
    const updatedSupplier = editedSupplier[supplierId];
    fetch(`${api}/suppliers/${supplierId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedSupplier),
    })
      .then(response => {
        if (response.ok) {
          setSuppliers(suppliers.map(supplier =>
            supplier.SupplierID === supplierId ? { ...supplier, ...updatedSupplier } : supplier
          ));
          setEditableSupplierId(null);
        } else {
          alert('Failed to update supplier');
        }
      });
  };

  const handleDelete = (supplierId) => {
    fetch(`${api}/suppliers/${supplierId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setSuppliers(suppliers.filter(supplier => supplier.SupplierID !== supplierId));
        } else {
          alert('Failed to delete supplier');
        }
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Lieferanten</h2>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setEditableSupplierId('new')}
      >
        Neuen Lieferanten hinzufügen
      </button>
      {editableSupplierId === 'new' && (
        <div className="mb-4 p-4 border rounded">
          <input
            className="border p-2 mb-2 w-full"
            type="text"
            placeholder="Supplier Name"
            value={editedSupplier['new']?.SupplierName || ''}
            onChange={(e) => handleInputChange('new', 'SupplierName', e.target.value)}
          />
          <input
            className="border p-2 mb-2 w-full"
            type="text"
            placeholder="ContactName"
            value={editedSupplier['new']?.ContactName || ''}
            onChange={(e) => handleInputChange('new', 'ContactName', e.target.value)}
          />
          <div className="flex space-x-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => {
                const newSupplier = editedSupplier['new'];
                fetch(`${api}/suppliers`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newSupplier),
                })
                  .then(response => response.json())
                  .then(data => {
                    setSuppliers([...suppliers, data]);
                    setEditableSupplierId(null);
                    setEditedSupplier(prev => {
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
              onClick={() => setEditableSupplierId(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name des Lieferanten</th>
            <th className="py-2 px-4 border-b">Kontakt</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(supplier => (
            <tr key={supplier.SupplierID} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">
                {editableSupplierId === supplier.SupplierID ? (
                  <input
                    className="border p-2 w-full"
                    type="text"
                    value={editedSupplier[supplier.SupplierID]?.SupplierName || supplier.SupplierName}
                    onChange={(e) =>
                      handleInputChange(supplier.SupplierID, 'SupplierName', e.target.value)
                    }
                  />
                ) : (
                  supplier.SupplierName
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editableSupplierId === supplier.SupplierID ? (
                  <input
                    className="border p-2 w-full"
                    type="text"
                    value={editedSupplier[supplier.SupplierID]?.ContactName || supplier.ContactName}
                    onChange={(e) =>
                      handleInputChange(supplier.SupplierID, 'ContactName', e.target.value)
                    }
                  />
                ) : (
                  supplier.ContactName
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editableSupplierId === supplier.SupplierID ? (
                  <div className="flex space-x-2">
                    <button 
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => handleSave(supplier.SupplierID)}
                    >
                      Save
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => setEditableSupplierId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button 
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                      onClick={() => setEditableSupplierId(supplier.SupplierID)}
                    >
                      Edit
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDelete(supplier.SupplierID)}
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

export default Suppliers;
