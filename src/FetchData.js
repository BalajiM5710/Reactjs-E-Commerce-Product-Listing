import React, { useState, useEffect } from "react";

function GetData() {
  const [data, SetData] = useState([]);
  const [query, SetQuery] = useState('');
  const [filter, Setfilter] = useState('all');
  const [originalData, SetOriginalData] = useState([]);
  const [cart,Setcart] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/')
      .then((response) => response.json())
      .then((rec) => {
        SetData(rec);
        SetOriginalData(rec);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = () => {
    const filteredData = originalData.filter((el) => {
      const res = 
      el.title.toLowerCase().includes(query.toLowerCase()) ||
      el.id.toString().includes(query)
      return (res);
    });
    SetData(filteredData);
  };

  const handleCategory = (e) => {
    const selectedCategory = e.target.value;
    Setfilter(selectedCategory);

    const dataFiltered = originalData.filter((el) => {
      return selectedCategory === 'all' || selectedCategory === el.category;
    });
    SetData(dataFiltered);
  };

  const handleCart = (newitems) => {
    Setcart([...cart,newitems])
    console.log(newitems)
  }

  return (
    <div className="fetcheddata">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search by title"
          value={query}
          onChange={(e) => SetQuery(e.target.value)}
          className="sb"
        />
        
        <button onClick={handleSearch}>Search</button>

        <select value={filter} onChange={handleCategory} className="filt">
          <option value="all">All</option>
          {[...new Set(originalData.map((el) => el.category))].map((el) => (
            <option key={el} value={el}>{el}</option>
          ))}
        </select>
        <p className="cartmon">In cart items: {cart.length}</p>
      </div>
      <ol>
        {data.map((el) => (
          <li
            key={el.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              src={el.image}
              alt={el.description}
              style={{
                maxWidth: "100px",
                height: "auto",
                marginRight: "40px",
                marginLeft: "10px",
              }}
            />
            <div>
              <h3>{el.title}</h3>
              <p>${el.price}</p>
              <h4>About the product:</h4>
              <p>{el.description}</p>
              <button onClick={()=>handleCart(el)}>Add to cart</button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default GetData;
