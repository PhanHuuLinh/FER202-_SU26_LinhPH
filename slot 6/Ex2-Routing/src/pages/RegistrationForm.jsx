// src/pages/RegistrationForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';

function RegistrationForm() {
  const navigate = useNavigate();

  // State quản lý form
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // State quản lý lỗi
  const [errors, setErrors] = useState({});
  // State quản lý việc form đã được submit chưa (để kích hoạt validation UI của Bootstrap)
  const [validated, setValidated] = useState(false);

  // Xử lý thay đổi dữ liệu nhập
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Xóa lỗi của trường đang nhập khi người dùng gõ tiếp
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Hàm kiểm tra định dạng dữ liệu (validation)
  const validateForm = () => {
    const newErrors = {};

    // 1. Validate Username
    if (!formData.username.trim()) {
      newErrors.username = 'Tên đăng nhập không được để trống.';
    }

    // 2. Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email không đúng định dạng.';
    }

    // 3. Validate Password
    // Yêu cầu: từ 6 kí tự trở lên, gồm chữ hoa, chữ thường, số, kí tự đặc biệt
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải từ 6 ký tự trở lên.';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.';
    }

    // 4. Validate Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu không được để trống.';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý khi nhấn nút Register
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    const isValid = validateForm();
    if (isValid) {
      // Đăng ký thành công -> chuyển hướng về trang chủ
      navigate('/home');
    }
  };

  // Xử lý khi nhấn nút Cancel
  const handleCancel = () => {
    // Xóa trắng dữ liệu form
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setValidated(false);
    // Chuyển hướng về trang chủ
    navigate('/home');
  };

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white text-center py-3">
          <h4 className="mb-0">📝 Đăng ký tài khoản</h4>
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit} noValidate>
            
            {/* Username */}
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Nhập tên đăng nhập"
                value={formData.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Địa chỉ Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Nhập địa chỉ email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-4" controlId="formConfirmPassword">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Xác nhận lại mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Buttons */}
            <Row>
              <Col>
                <Button variant="primary" type="submit" className="w-100">
                  Register
                </Button>
              </Col>
              <Col>
                <Button variant="secondary" type="button" className="w-100" onClick={handleCancel}>
                  Cancel
                </Button>
              </Col>
            </Row>

          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegistrationForm;
