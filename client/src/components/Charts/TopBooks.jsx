import React, { useState, useEffect } from 'react';
import TopBooksChart from './Charts';

const App = () => {
  const [topBooks, setTopBooks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/books/top", {
        method:"GET",
        headers: {
          "Content-Type" : "application/json"
      },
      })
      const data = await response.json();
      setTopBooks(data.topBooks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='p-5 text-center'>
      <h1 className='font-semibold text-4xl mb-10'>Our Most Preferred Books</h1>
      <TopBooksChart topBooks={topBooks} />
    </div>
  );
};

export default App;
