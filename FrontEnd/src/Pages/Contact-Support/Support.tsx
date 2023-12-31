import { useState } from "react";
import "./Support.css";
import { useLocation } from "react-router-dom";

import Header from "../../Components/Header/GeneralLoggedInHeader.tsx";

function Support() {
  const location = useLocation();
  const [DataCont, setDataCont] = useState(location.state.receivedData);
  return (
    <>
      <Header UserData={DataCont}> </Header>
      <div>
        <header className="dashboard">
          <h1>Space For Dashboard</h1>
        </header>
        <main>
          <div className="maincontainer">
            <div className="left-side">
              <section className="contact-info">
                <h2>Contact Information</h2>
                <p>If you need assistance, feel free to contact us:</p>
                <ul>
                  <li>
                    Email:{" "}
                    <a href="mailto:support@example.com">support@example.com</a>
                  </li>
                  <li>Phone: 09021022626</li>
                </ul>
              </section>

              <section className="faqs">
                <h2>FAQs</h2>
                <p>
                  Check our <a href="#faq-section">FAQ section</a> for answers
                  to common questions.
                </p>
              </section>

              <section className="submit-ticket">
                <p>
                  If you can't find the information you need, you can submit a
                  support ticket.
                </p>
                <a href="" className="ticket-button">
                  Submit a Ticket
                </a>
              </section>
            </div>
          </div>
        </main>

        <footer>&copy; 2023 Support Page</footer>
      </div>
    </>
  );
}

export default Support;
