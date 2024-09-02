
import { Layout, Row, Col } from "antd";
import { HeartFilled } from "@ant-design/icons";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row className="just">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">
            © 2024, 
            <a href="https://mrphilip.pythonanywhere.com/" className="font-weight-bold" target="_blank">
              Philip Titus, theme by Antd
            </a>
          </div>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <div className="footer-menu">
            <ul>
            <li className="nav-item">
                <a
                  href="https://mrphilip.pythonanywhere.com/privacy/"
                  className="nav-link pe-0 text-muted"
                  target="_blank"
                >
                  Privacy Policy
                </a>
              </li>


              <li className="nav-item">
                <a
                  href="https://mrphilip.pythonanywhere.com/contact/"
                  className="nav-link pe-0 text-muted"
                  target="_blank"
                >
                  Any Questions?
                </a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
