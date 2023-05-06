import deleteIcon from '../images/icon-delete.svg';

export const OrderItem = ({item}) => {
  return(
    <div className="order">
      <div className="details">
        <img className='thumbnail' src={item.imgSrc} alt="" />
        <div className="product">
          <div className="name">{item.prodName}</div>
          <div className="price">${item.price}.00 × {item.count} <span className="total">${item.price * item.count}.00</span></div>
        </div>
      </div>
      <button onClick={()=>{console.log('SUCCESS!')}}><img className='delete' src={deleteIcon} alt="." /></button>
    </div>
  );
}