import classNames from "classnames/bind";
import { useEffect, useState, useMemo, useRef } from "react";
import styles from "./OrderComplete.module.scss";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

const cx = classNames.bind(styles);

function OrderDetails() {
  const checkOut = JSON.parse(window.localStorage.getItem("Checkout"));
  const orderID = useRef(checkOut.id);
  const priceShip = useRef(checkOut.priceShip);
  // const [delivery, setDelivery] = useState({data:[delivery]})
  const [bill, setBill] = useState({ data: [] });
  const [order, setOrder] = useState({ paging: [] });

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(
        `http://localhost:3000/orders/${orderID.current}`
      );
      setOrder(res.data);
      setBill(res.data);
      console.log(res.data);
      console.log(bill);
      console.log(order);
    }
    fetchData();
  }, []);

  const total = order.paging.reduce((total, currentValue) => {
    return total + currentValue.quantity * currentValue.product.price;
  }, 0);

  return (
    <div className={cx("order-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("order-hero")}>
        <h2 className={cx("heading")}>CHECKOUT</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>OrderComplete</span>
        </span>
      </div>
      {/* Body */}
      <div className={cx("body")}>
        {/* Header */}
        <div className={cx("header")}>
          <p className={cx("para")}>Thank you. Your order has been received.</p>
          <div className={cx("info-basic")}>
            {/* Order */}
            <div className={cx("order", "number")}>
              <h4 className={cx("title")}>Order Number:</h4>
              <span className={cx("desc")}>13877</span>
            </div>
            {/* Order */}
            <div className={cx("order", "number")}>
              <h4 className={cx("title")}>Order Date:</h4>
              <span className={cx("desc")}>{bill.data.createdAt}</span>
            </div>
            {/* Order */}
            <div className={cx("order", "number")}>
              <h4 className={cx("title")}>Order Total:</h4>
              <span className={cx("desc")}>
                {" "}
                {((priceShip.current && total + priceShip.current.value) *
                  110) /
                  100}{" "}
                VND
              </span>
            </div>
            {/* Order */}
            <div className={cx("order", "number")}>
              <h4 className={cx("title")}>Payment Method:</h4>
              <span className={cx("desc")}>{bill.data.paymentMethod}</span>
            </div>
            {/* Order */}
            {/* <div className={cx("order", "number")}>
              <h4 className={cx("title")}>Receiver Name:</h4>
              <span className={cx("desc")}>
                {bill.data.delivery.receiverName}
              </span>
            </div> */}
            {/* Order */}
            {/* <div className={cx("order", "number")}>
              <h4 className={cx("title")}>Receiver Address:</h4>
              <span className={cx("desc")}>Check payments</span>
            </div> */}
            {/* Order */}
            {/* <div className={cx("order", "number")}>
              <h4 className={cx("title")}>Receiver Phone:</h4>
              <span className={cx("desc")}>Check payments</span>
            </div> */}
          </div>
        </div>
        {/* Content */}
        <div className={cx("content")}>
          <h2 className={cx("heading")}>Order Details</h2>
          {/* Form */}
          <div className={cx("form")}>
            {/* Product Item*/}
            <div className={cx("product-item")}>
              <div className={cx("row")}>
                <h3 className={cx("title", "product-col")}>Product</h3>
                <h3 className={cx("title", "total-col")}>Total</h3>
              </div>
              <div className={cx("list-product")}>
                {order.paging.map((item, index) => {
                  return (
                    <div key={index} className={cx("row", "item")}>
                      <p className={cx("name")}>
                        {item.product.productName} x {item.quantity}
                      </p>
                      <div className={cx("total", "total-col")}>
                        <span className={cx("price")}>
                          {item.product.price * item.quantity} VND
                        </span>
                        <span className={cx("vat")}></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Subtotal Item*/}
            <div className={cx("subtotal-item")}>
              <div className={cx("row")}>
                <h3 className={cx("title")}>Subtotal: </h3>
                <div className={cx("total", "total-col")}>
                  <span className={cx("price")}>
                    {priceShip.current && total} VND
                  </span>
                  <span className={cx("vat")}></span>
                </div>
              </div>
            </div>
            {/* Shipping Item*/}
            <div className={cx("subtotal-item")}>
              <div className={cx("row")}>
                <h3 className={cx("title")}>Shipping: </h3>
                <div className={cx("total", "total-col")}>
                  <span className={cx("price")}>
                    {priceShip.current.value} VND
                  </span>
                </div>
              </div>
            </div>
            {/* VAT Item*/}
            <div className={cx("vat-item")}>
              <div className={cx("row")}>
                <h3 className={cx("title")}>VAT: </h3>
                <div className={cx("total", "total-col")}>
                  <span className={cx("price")}>
                    {" "}
                    {(priceShip.current && total + priceShip.current.value) /
                      10}{" "}
                    VND
                  </span>
                </div>
              </div>
            </div>
            {/* Payment Item*/}
            <div className={cx("payment-item")}>
              <div className={cx("row")}>
                <h3 className={cx("title")}>Payment Method: </h3>
                <div className={cx("total", "total-col")}>
                  <span className={cx("price")}>{bill.data.paymentMethod}</span>
                </div>
              </div>
            </div>
            {/* Order Item*/}
            <div className={cx("order-item")}>
              <div className={cx("row")}>
                <h3 className={cx("title")}>Order Total: </h3>
                <div className={cx("total", "total-col")}>
                  <span className={cx("price")}>
                    {((priceShip.current && total + priceShip.current.value) *
                      110) /
                      100}{" "}
                    VND
                  </span>
                </div>
              </div>
            </div>
            {/* Note Item*/}
            <div className={cx("note-item")}>
              <div className={cx("row")}>
                <h3 className={cx("title")}>Note Total: </h3>
                <div className={cx("total", "total-col")}>
                  <span className={cx("name")}>
                    Your shop have the best product ever. I love it. Hope Paws
                    and Whiskers can go over the world so that I can connect
                    more friends and have more connective guys like me.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default OrderDetails;
