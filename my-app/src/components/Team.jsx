import React from 'react';

function Team() {
  return (
    <section className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Unser Team</h1>
      <div className="flex justify-center">
        <img 
          src="/images/team.jpg" 
          alt="Unser Team" 
          className="rounded-lg shadow-lg w-full max-w-4xl mb-8" 
        />
      </div>

      <div className="text-left max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Über unsere Käserei</h2>
        <p className="mb-6 text-gray-600 leading-relaxed">
          Willkommen in unserer Käserei! Wir sind ein engagiertes Team von Käseliebhabern, die sich leidenschaftlich für die Herstellung von hochwertigen Käsesorten einsetzen. Unser Unternehmen hat seinen Ursprung in der Liebe zur traditionellen Käseherstellung und der Überzeugung, dass jeder Biss ein Geschmackserlebnis sein sollte.
        </p>

        <h3 className="text-xl font-semibold mb-2 text-gray-700">Wer wir sind:</h3>
        <p className="mb-6 text-gray-600 leading-relaxed">
          Unser Team besteht aus erfahrenen Käsemeistern und engagierten Mitarbeitern, die alle Aspekte der Käseherstellung beherrschen. Wir glauben an die Kraft der Zusammenarbeit und setzen auf eine offene Kommunikation, um das Beste aus unseren Produkten herauszuholen.
        </p>

        <h3 className="text-xl font-semibold mb-2 text-gray-700">Was wir machen:</h3>
        <p className="mb-6 text-gray-600 leading-relaxed">
          Wir stellen eine Vielzahl von Käsesorten her, darunter würzige Raclette, cremigen Camembert und aromatischen Paprika-Chili-Käse. Jeder Käse wird mit grösster Sorgfalt und Liebe zum Detail hergestellt, um die besten Aromen und Texturen zu garantieren.
        </p>

        <h3 className="text-xl font-semibold mb-2 text-gray-700">Wo wir sind:</h3>
        <p className="mb-6 text-gray-600 leading-relaxed">
          Unsere Käserei befindet sich inmitten einer malerischen Landschaft, umgeben von frischen, hochwertigen Zutaten. Wir glauben daran, dass die besten Käsesorten aus den besten Zutaten entstehen.
        </p>

        <h3 className="text-xl font-semibold mb-2 text-gray-700">Unsere Geschichte:</h3>
        <p className="text-gray-600 leading-relaxed">
          Unsere Reise begann vor vielen Jahren, als wir die Kunst der Käseherstellung entdeckten. Seitdem haben wir uns darauf spezialisiert, traditionelle Techniken mit modernen Methoden zu kombinieren, um Käse von höchster Qualität zu produzieren. Unsere Leidenschaft für Käse treibt uns jeden Tag an, und wir freuen uns, diese Leidenschaft mit Ihnen zu teilen.
        </p>
      </div>
    </section>
  );
}

export default Team;
