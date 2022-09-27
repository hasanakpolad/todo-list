import React, { useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [items, setItems] = useState([
    { itemName: "Item1", quantity: 1, isSelected: false },
    { itemName: "Item2", quantity: 3, isSelected: true },
    { itemName: "Item3", quantity: 2, isSelected: false },
    { itemName: "Item4", quantity: 2, isSelected: true }
  ]);

  const [inpValue, setInpValue] = useState("")
  const [totalItem, setTotalItem] = useState(0)

  const handleSubmit = () => {
    const newItem = {
      itemName: inpValue,
      quantity: 1,
      isSelected: false
    }

    const newItems = [...items, newItem]

    setItems(newItems);
    setInpValue('');
  }

  const handleQuaIncrease = (index) => {

    const newItems = [...items];

    newItems[index].quantity++;

    setItems(newItems)
    handleTotalCount();
  }

  const handleQuaDecrease = (index) => {
    const newItems = [...items];

    if (newItems[index].quantity === 0) return

    newItems[index].quantity--;

    setItems(newItems);
    handleTotalCount()
  }

  const handleClickSelected = (index) => {

    const newItems = [...items]

    newItems[index].isSelected = !newItems[index].isSelected

    setItems(newItems)
  }

  const handleTotalCount = () => {
   const totalItem = items.reduce((total, item)=> {
      return total + item.quantity
    }, 0)

    setTotalItem(totalItem)
  }
  return (
    <div className='app-background'>
      <div className='main-container'>
        <div className='add-item-box'>
          <input className='add-item-input' placeholder='Add an item...' value={inpValue} onChange={(event) => setInpValue(event.target.value)} />
          <FontAwesomeIcon icon={faPlus} onClick={() => handleSubmit()} />
        </div>
        <div className='item-list'>
          {items.map((item, index) =>
            <div className='item-container' key={index}>
              <div className='item-name' onClick={() => handleClickSelected(index)}>
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className='completed'>{item.itemName}</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>
              <div className='quantity'>
                <button>
                  <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuaDecrease(index)} />
                </button>
                <span> {item.quantity} </span>
                <button>
                  <FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuaIncrease(index)} />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className='total'>Total: {totalItem}</div>
      </div>
    </div>
  );
}

export default App;
