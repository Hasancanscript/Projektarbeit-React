import React from 'react';

const products = [
    { src: "/images/image1.jpg", name: "Paprika-Chili Käse", price: "CHF 3.95" },
    { src: "/images/image2.jpg", name: "Camembert Rahmstufe", price: "CHF 4.95" },
    { src: "/images/image3.jpg", name: "Pizza & Gratin Käse", price: "CHF 5.95" },
    { src: "/images/image4.jpg", name: "Bio Raclette Käse", price: "CHF 6.95" },
    { src: "/images/image5.jpg", name: "Bauern Käse", price: "CHF 7.95" },
    { src: "/images/image6.jpg", name: "Schnittkäse mild", price: "CHF 8.95" }
];

function Gallery() {
    return (
        <div className="gallery-grid">
            {products.map((product, index) => (
                <div key={index} className="product-item">
                    <img src={product.src} alt={product.name} className="gallery-image" />
                    <div className="product-info">
                        <h4 className="product-name">{product.name}</h4>
                        <p className="product-price">{product.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Gallery;
