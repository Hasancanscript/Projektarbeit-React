import React from 'react';

const cheeseProducts = [
    { src: "/images/image1.jpg", name: "Paprika-Chili-Käse", price: "CHF 3.95" },
    { src: "/images/image2.jpg", name: "Camembert", price: "CHF 2.80" },
    { src: "/images/image3.jpg", name: "CUCINA NOBILE Pizza & Gratin, Käsemischung", price: "CHF 2.40" },
    { src: "/images/image4.jpg", name: "Bio Raclettekäse", price: "CHF 13.00" },
    { src: "/images/image5.jpg", name: "MILFINA Raclette Käse Nature in Scheiben", price: "CHF 5.95" },
    { src: "/images/image6.jpg", name: "Bauernkäse", price: "CHF 2.90" }
];

function CheeseProducts() {
    return (
        <div className="gallery-grid">
            {cheeseProducts.map((cheese, index) => (
                <div key={index} className="product-item">
                    <img src={cheese.src} alt={cheese.name} className="gallery-image" />
                    <div className="product-info">
                        <h4 className="product-name">{cheese.name}</h4>
                        <p className="product-price">{cheese.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CheeseProducts;
