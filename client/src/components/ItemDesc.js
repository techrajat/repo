import React, { useEffect, useState } from 'react';

function ItemDesc() {
    const [item, setItem] = useState({});

    const getItemDetails=async()=>{
        const response = await fetch("http://127.0.0.1:8000/getitemdetails", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `article_id=${encodeURIComponent(localStorage.getItem('selectedItem'))}`
        });
        if(response.status === 200){
            const product = await response.json();
            setItem(product.result);
        }
    };

    useEffect(()=>{
        getItemDetails();
    }, []);

  return (
    <div>
      <div className="desc">
        <div className="showItemImg">
            <img src={`data:image/jpeg;base64,${item.image}`} alt="" />
        </div>
        <div className="card addToCart">
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                Best seller<span class="visually-hidden">unread messages</span>
            </span>
            <span className="group">{item.perceived_colour_value_name} {item.perceived_colour_master_name} {item.department_name}</span>
            <h5 className="card-title">{item.prod_name}</h5>
            <span className="price">&#8377;{item.price}</span>
            <p className="card-text">{item.detail_desc}</p>
            <button type="button" class="btn btn-primary custom-btn rounded-5 ">Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default ItemDesc;