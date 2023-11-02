import classNames from "classnames/bind";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import styles from "./OrderHistory.module.scss";
import images from "~/assets/images";

const cx = classNames.bind(styles);

function Order_History() {
  return (
    <div className={cx("order-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("order-hero")}>
        <h2 className={cx("heading")}>ORDER History</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>ViewBillHistory</span>
        </span>
      </div>
      {/* Main */}
      <main className={cx("main")}>
        {/* Header */}
        <header className={cx("header")}>
          <h2 className={cx("title")}>Your Order History</h2>
        </header>
        {/* Body */}
        <div className={cx("body")}>
          <div className={cx("pending")}>
            <h3 className={cx("heading")}>PENDING ORDERS</h3>
            {/* Content */}
            <div className={cx("content")}>
              {/* Column */}
              <table className={cx("table")}>
                <thead className={cx("table-header")}>
                  <tr>
                    <th className={cx("table-item", "title")}>NO</th>
                    <th className={cx("table-item", "title")}>PRODUCTS</th>
                    <th className={cx("table-item", "title")}>STATUS</th>
                    <th className={cx("table-item", "title")}>ORDER DATE</th>
                    <th className={cx("table-item", "title")}>VIEW</th>
                  </tr>
                </thead>
                <tbody className={cx("table-body")}>
                  <tr>
                    <td className={cx("table-item")}>1</td>
                    <td className={cx("table-item")}>
                      <div className={cx("product-list")}>
                        <p>123</p>
                        <p>123</p>
                        <p>123</p>
                        <p>123</p>
                        <p>123</p>
                      </div>
                    </td>
                    <td className={cx("table-item")}>1</td>
                    <td className={cx("table-item")}>1</td>
                    <td className={cx("table-item")}>
                      <img src={images.viewIcon} alt="img" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Order_History;
