-- =========================================================
-- Freelancer Job Matching System (FJMS)
-- Database Schema for SQL Server - FULLY OPTIMIZED
-- Based on Use Case Diagram: Guest, Verified User, Freelancer, Employer, Admin, VNPay Gateway
-- =========================================================

CREATE DATABASE FJMS_DB;
GO

USE FJMS_DB;
GO

-- =========================================================
-- 1. USERS & AUTHENTICATION
-- =========================================================

CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    avatar_url NVARCHAR(255),
    bio NVARCHAR(1000),
    role_default VARCHAR(30) DEFAULT 'FREELANCER',
    status VARCHAR(30) DEFAULT 'ACTIVE', -- ACTIVE, BANNED, SUSPENDED
    is_email_verified BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME NULL
);

CREATE TABLE UserRoles (
    user_role_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    role_name VARCHAR(30) NOT NULL, -- ADMIN, FREELANCER, EMPLOYER
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE EmailVerifications (
    verification_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    verification_code VARCHAR(20) NOT NULL,
    expired_at DATETIME NOT NULL,
    is_used BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE PasswordResetTokens (
    reset_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    reset_token VARCHAR(255) NOT NULL,
    expired_at DATETIME NOT NULL,
    is_used BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE BankAccounts (
    bank_account_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    bank_name NVARCHAR(100) NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    account_holder NVARCHAR(100) NOT NULL,
    is_default BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- =========================================================
-- 2. FREELANCER PROFILE & SKILLS
-- =========================================================

CREATE TABLE FreelancerProfiles (
    freelancer_id INT PRIMARY KEY,
    headline NVARCHAR(200),
    experience_years INT DEFAULT 0 CONSTRAINT CHK_Experience_Years CHECK (experience_years >= 0),
    hourly_rate DECIMAL(12,2) CONSTRAINT CHK_Hourly_Rate CHECK (hourly_rate >= 0),
    availability_status VARCHAR(30) DEFAULT 'AVAILABLE', -- AVAILABLE, BUSY
    portfolio_summary NVARCHAR(1000),
    rating_average DECIMAL(3,2) DEFAULT 0 CONSTRAINT CHK_Rating_Avg CHECK (rating_average BETWEEN 0 AND 5),
total_reviews INT DEFAULT 0 CONSTRAINT CHK_Total_Reviews CHECK (total_reviews >= 0),
    FOREIGN KEY (freelancer_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Skills (
    skill_id INT IDENTITY(1,1) PRIMARY KEY,
    skill_name NVARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE FreelancerSkills (
    freelancer_skill_id INT IDENTITY(1,1) PRIMARY KEY,
    freelancer_id INT NOT NULL,
    skill_id INT NOT NULL,
    skill_level VARCHAR(30), -- BEGINNER, INTERMEDIATE, EXPERT
    FOREIGN KEY (freelancer_id) REFERENCES FreelancerProfiles(freelancer_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES Skills(skill_id) ON DELETE CASCADE
);

CREATE TABLE Portfolios (
    portfolio_id INT IDENTITY(1,1) PRIMARY KEY,
    freelancer_id INT NOT NULL,
    title NVARCHAR(200) NOT NULL,
    description NVARCHAR(1000),
    project_url NVARCHAR(255),
    image_url NVARCHAR(255),
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (freelancer_id) REFERENCES FreelancerProfiles(freelancer_id) ON DELETE CASCADE
);

-- =========================================================
-- 3. PROJECTS (JOBS)
-- =========================================================

CREATE TABLE ProjectCategories (
    category_id INT IDENTITY(1,1) PRIMARY KEY,
    category_name NVARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Projects (
    project_id INT IDENTITY(1,1) PRIMARY KEY,
    employer_id INT NOT NULL,
    category_id INT,
    title NVARCHAR(200) NOT NULL,
    description NVARCHAR(MAX) NOT NULL,
    budget_min DECIMAL(12,2) CONSTRAINT CHK_Budget_Min CHECK (budget_min >= 0),
    budget_max DECIMAL(12,2) CONSTRAINT CHK_Budget_Max CHECK (budget_max >= 0),
    deadline DATE,
    status VARCHAR(30) DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED, ONGOING, COMPLETED, CLOSED
    selected_freelancer_id INT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME NULL,
    CONSTRAINT CHK_Budget_Range CHECK (budget_max >= budget_min),
    FOREIGN KEY (employer_id) REFERENCES Users(user_id),
    FOREIGN KEY (selected_freelancer_id) REFERENCES Users(user_id),
    FOREIGN KEY (category_id) REFERENCES ProjectCategories(category_id) ON DELETE SET NULL
);

CREATE TABLE ProjectSkills (
    project_skill_id INT IDENTITY(1,1) PRIMARY KEY,
    project_id INT NOT NULL,
    skill_id INT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES Skills(skill_id) ON DELETE CASCADE
);

CREATE TABLE ProjectModeration (
    moderation_id INT IDENTITY(1,1) PRIMARY KEY,
    project_id INT NOT NULL,
    admin_id INT NOT NULL,
    action VARCHAR(30) NOT NULL, -- APPROVE, REJECT
    reason NVARCHAR(500),
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES Users(user_id)
);

-- =========================================================
-- 4. PROPOSALS / BIDDING
-- =========================================================

CREATE TABLE Proposals (
    proposal_id INT IDENTITY(1,1) PRIMARY KEY,
    project_id INT NOT NULL,
    freelancer_id INT NOT NULL,
    proposed_price DECIMAL(12,2) NOT NULL CONSTRAINT CHK_Proposed_Price CHECK (proposed_price > 0),
    delivery_time_days INT NOT NULL CONSTRAINT CHK_Delivery_Time CHECK (delivery_time_days > 0),
    cover_letter NVARCHAR(MAX),
    status VARCHAR(30) DEFAULT 'SUBMITTED', -- SUBMITTED, ACCEPTED, REJECTED, CANCELED
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME NULL,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (freelancer_id) REFERENCES Users(user_id)
);

CREATE TABLE ProposalHistories (
    history_id INT IDENTITY(1,1) PRIMARY KEY,
    proposal_id INT NOT NULL,
    old_price DECIMAL(12,2),
    new_price DECIMAL(12,2),
    old_delivery_time_days INT,
    new_delivery_time_days INT,
    action VARCHAR(30) NOT NULL, -- UPDATE, WITHDRAW
    changed_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (proposal_id) REFERENCES Proposals(proposal_id) ON DELETE CASCADE
);

-- =========================================================
-- 5. MESSAGING & AI CHATBOX SUPPORT
-- =========================================================

CREATE TABLE Conversations (
    conversation_id INT IDENTITY(1,1) PRIMARY KEY,
    project_id INT NULL,
    employer_id INT NOT NULL,
    freelancer_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) ON DELETE SET NULL,
    FOREIGN KEY (employer_id) REFERENCES Users(user_id),
    FOREIGN KEY (freelancer_id) REFERENCES Users(user_id)
);

CREATE TABLE Messages (
    message_id INT IDENTITY(1,1) PRIMARY KEY,
    conversation_id INT NOT NULL,
    sender_id INT NOT NULL,
    message_content NVARCHAR(MAX) NOT NULL,
    sent_at DATETIME DEFAULT GETDATE(),
    is_read BIT DEFAULT 0,
    FOREIGN KEY (conversation_id) REFERENCES Conversations(conversation_id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES Users(user_id)
);

CREATE TABLE AIChatSessions (
    session_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    session_title NVARCHAR(200),
    status VARCHAR(30) DEFAULT 'ACTIVE', -- ACTIVE, CLOSED
    started_at DATETIME DEFAULT GETDATE(),
    ended_at DATETIME NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE AIChatMessages (
    ai_message_id INT IDENTITY(1,1) PRIMARY KEY,
    session_id INT NOT NULL,
    sender_type VARCHAR(20) NOT NULL, -- USER, AI
    message_content NVARCHAR(MAX) NOT NULL,
    intent_type VARCHAR(50) NULL, -- ACCOUNT, PROJECT, PROPOSAL, PAYMENT, REPORT, GENERAL
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (session_id) REFERENCES AIChatSessions(session_id) ON DELETE CASCADE
);

CREATE TABLE SystemGuides (
    guide_id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(200) NOT NULL,
content NVARCHAR(MAX) NOT NULL,
    guide_type VARCHAR(50) NOT NULL, -- ACCOUNT, PROJECT, PROPOSAL, PAYMENT, REPORT, WALLET, GENERAL
    is_active BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME NULL
);

-- =========================================================
-- 6. WORK SUBMISSION & REVISIONS
-- =========================================================

CREATE TABLE WorkSubmissions (
    submission_id INT IDENTITY(1,1) PRIMARY KEY,
    project_id INT NOT NULL,
    freelancer_id INT NOT NULL,
    description NVARCHAR(MAX),
    file_url NVARCHAR(255),
    status VARCHAR(30) DEFAULT 'SUBMITTED', -- SUBMITTED, APPROVED, REVISIONS_REQUESTED
    submitted_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (freelancer_id) REFERENCES Users(user_id)
);

CREATE TABLE Revisions (
    revision_id INT IDENTITY(1,1) PRIMARY KEY,
    submission_id INT NOT NULL,
    employer_id INT NOT NULL,
    revision_note NVARCHAR(MAX) NOT NULL,
    status VARCHAR(30) DEFAULT 'REQUESTED', -- REQUESTED, RESOLVED
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (submission_id) REFERENCES WorkSubmissions(submission_id) ON DELETE CASCADE,
    FOREIGN KEY (employer_id) REFERENCES Users(user_id)
);

CREATE TABLE ProjectCompletions (
    completion_id INT IDENTITY(1,1) PRIMARY KEY,
    project_id INT NOT NULL UNIQUE,
    employer_id INT NOT NULL,
    freelancer_id INT NOT NULL,
    completed_at DATETIME DEFAULT GETDATE(),
    confirmation_note NVARCHAR(500),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id),
    FOREIGN KEY (employer_id) REFERENCES Users(user_id),
    FOREIGN KEY (freelancer_id) REFERENCES Users(user_id)
);

-- =========================================================
-- 7. WALLET, ESCROW, VNPAY PAYMENT
-- =========================================================

CREATE TABLE Wallets (
    wallet_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    balance DECIMAL(12,2) DEFAULT 0 CONSTRAINT CHK_Wallet_Balance CHECK (balance >= 0),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Payments (
    payment_id INT IDENTITY(1,1) PRIMARY KEY,
    project_id INT NOT NULL,
    employer_id INT NOT NULL,
    amount DECIMAL(12,2) NOT NULL CONSTRAINT CHK_Payment_Amount CHECK (amount > 0),
    payment_method VARCHAR(50) DEFAULT 'VNPAY',
    payment_status VARCHAR(30) DEFAULT 'PENDING', -- PENDING, SUCCESS, FAILED
    vnpay_transaction_code VARCHAR(100),
    payment_url NVARCHAR(500),
    paid_at DATETIME NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id),
    FOREIGN KEY (employer_id) REFERENCES Users(user_id)
);

CREATE TABLE EscrowTransactions (
    escrow_id INT IDENTITY(1,1) PRIMARY KEY,
    payment_id INT NOT NULL,
    project_id INT NOT NULL,
employer_id INT NOT NULL,
    freelancer_id INT NOT NULL,
    amount DECIMAL(12,2) NOT NULL CONSTRAINT CHK_Escrow_Amount CHECK (amount > 0),
    escrow_status VARCHAR(30) DEFAULT 'HELD', -- HELD, RELEASED, REFUNDED
    held_at DATETIME DEFAULT GETDATE(),
    released_at DATETIME NULL,
    refunded_at DATETIME NULL,
    FOREIGN KEY (payment_id) REFERENCES Payments(payment_id),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id),
    FOREIGN KEY (employer_id) REFERENCES Users(user_id),
    FOREIGN KEY (freelancer_id) REFERENCES Users(user_id)
);

CREATE TABLE WalletTransactions (
    transaction_id INT IDENTITY(1,1) PRIMARY KEY,
    wallet_id INT NOT NULL,
    related_payment_id INT NULL,
    transaction_type VARCHAR(30) NOT NULL, -- DEPOSIT, WITHDRAW, RECEIVE_REVENUE
    amount DECIMAL(12,2) NOT NULL CONSTRAINT CHK_Tx_Amount CHECK (amount > 0),
    description NVARCHAR(500),
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (wallet_id) REFERENCES Wallets(wallet_id) ON DELETE CASCADE,
    FOREIGN KEY (related_payment_id) REFERENCES Payments(payment_id)
);

CREATE TABLE FreelancerPayouts (
    payout_id INT IDENTITY(1,1) PRIMARY KEY,
    freelancer_id INT NOT NULL,
    bank_account_id INT NOT NULL,
    escrow_id INT NOT NULL,
    amount DECIMAL(12,2) NOT NULL CONSTRAINT CHK_Payout_Amount CHECK (amount > 0),
    payout_status VARCHAR(30) DEFAULT 'PENDING', -- PENDING, COMPLETED, FAILED
    admin_id INT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    paid_at DATETIME NULL,
    FOREIGN KEY (freelancer_id) REFERENCES Users(user_id),
    FOREIGN KEY (bank_account_id) REFERENCES BankAccounts(bank_account_id),
    FOREIGN KEY (escrow_id) REFERENCES EscrowTransactions(escrow_id),
    FOREIGN KEY (admin_id) REFERENCES Users(user_id)
);

-- =========================================================
-- 8. REVIEWS & REPORTS
-- =========================================================

CREATE TABLE Reviews (
    review_id INT IDENTITY(1,1) PRIMARY KEY,
    project_id INT NOT NULL,
    employer_id INT NOT NULL,
    freelancer_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment NVARCHAR(1000),
    status VARCHAR(30) DEFAULT 'VISIBLE', -- VISIBLE, HIDDEN
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id),
    FOREIGN KEY (employer_id) REFERENCES Users(user_id),
    FOREIGN KEY (freelancer_id) REFERENCES Users(user_id)
);

CREATE TABLE ViolationReports (
    report_id INT IDENTITY(1,1) PRIMARY KEY,
    reporter_id INT NOT NULL,
    reported_user_id INT NULL,
    project_id INT NULL,
    message_id INT NULL,
    review_id INT NULL,
    report_type VARCHAR(50) NOT NULL, -- SCAM, HARASSMENT, PLAGIARISM, OTHER
    reason NVARCHAR(MAX) NOT NULL,
    status VARCHAR(30) DEFAULT 'PENDING', -- PENDING, RESOLVED, DISMISSED
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (reporter_id) REFERENCES Users(user_id),
FOREIGN KEY (reported_user_id) REFERENCES Users(user_id),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id),
    FOREIGN KEY (message_id) REFERENCES Messages(message_id),
    FOREIGN KEY (review_id) REFERENCES Reviews(review_id)
);

CREATE TABLE ReportActions (
    action_id INT IDENTITY(1,1) PRIMARY KEY,
    report_id INT NOT NULL,
    admin_id INT NOT NULL,
    action_type VARCHAR(50) NOT NULL, -- WARN, BAN_USER, DELETE_CONTENT, NO_ACTION
    note NVARCHAR(500),
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (report_id) REFERENCES ViolationReports(report_id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES Users(user_id)
);

CREATE TABLE Disputes (
    dispute_id INT IDENTITY(1,1) PRIMARY KEY,
    project_id INT NOT NULL,
    opened_by INT NOT NULL,
    against_user_id INT NULL,
    reason NVARCHAR(MAX) NOT NULL,
    status VARCHAR(30) DEFAULT 'OPEN', -- OPEN, RESOLVED, CLOSED
    created_at DATETIME DEFAULT GETDATE(),
    resolved_at DATETIME NULL,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id),
    FOREIGN KEY (opened_by) REFERENCES Users(user_id),
    FOREIGN KEY (against_user_id) REFERENCES Users(user_id)
);

CREATE TABLE DisputeResolutions (
    resolution_id INT IDENTITY(1,1) PRIMARY KEY,
    dispute_id INT NOT NULL,
    admin_id INT NOT NULL,
    decision VARCHAR(50) NOT NULL, -- REFUND_EMPLOYER, PAY_FREELANCER, SPLIT_50_50
    note NVARCHAR(1000),
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (dispute_id) REFERENCES Disputes(dispute_id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES Users(user_id)
);

CREATE TABLE UserAccountActions (
    user_action_id INT IDENTITY(1,1) PRIMARY KEY,
    target_user_id INT NOT NULL,
    admin_id INT NOT NULL,
    action_type VARCHAR(30) NOT NULL, -- BAN, UNBAN, SUSPEND
    reason NVARCHAR(500),
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (target_user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES Users(user_id)
);

-- =========================================================
-- 9. AUDIT LOGS
-- =========================================================

CREATE TABLE AuditLogs (
    log_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NULL,
    action_name VARCHAR(100) NOT NULL,
    target_table VARCHAR(100),
    target_id INT,
    description NVARCHAR(1000),
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL
);
GO

-- =========================================================
-- 10. DATABASE TRIGGERS (TỰ ĐỘNG HÓA NGHIỆP VỤ)
-- =========================================================

-- Trigger tự động tạo bản ghi hồ sơ rỗng và Ví tiền ngay khi User mới đăng ký
CREATE TRIGGER trg_AfterUserInsert
ON Users
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Tự động tạo Ví tiền
    INSERT INTO Wallets (user_id, balance, updated_at)
SELECT user_id, 0, GETDATE() FROM inserted;

    -- Tự động khởi tạo Hồ sơ Freelancer mặc định
    INSERT INTO FreelancerProfiles (freelancer_id, experience_years, hourly_rate, availability_status, rating_average, total_reviews)
    SELECT user_id, 0, 0, 'AVAILABLE', 0, 0 FROM inserted;
END;
GO

-- =========================================================
-- 11. INDEXES (TỐI ƯU HÓA TỐC ĐỘ TRUY VẤN)
-- =========================================================

CREATE NONCLUSTERED INDEX IX_Projects_Status ON Projects(status);
CREATE NONCLUSTERED INDEX IX_Proposals_ProjectID ON Proposals(project_id);
CREATE NONCLUSTERED INDEX IX_FreelancerSkills_SkillID ON FreelancerSkills(skill_id);
CREATE NONCLUSTERED INDEX IX_Messages_ConversationID ON Messages(conversation_id);
CREATE NONCLUSTERED INDEX IX_Payments_Status ON Payments(payment_status);
GO

-- =========================================================
-- 12. SEED DATA (DỮ LIỆU MẪU CƠ BẢN)
-- =========================================================

INSERT INTO Skills(skill_name) VALUES
(N'Java'), (N'Web Design'), (N'Content Writing'), (N'Translation'), (N'SQL Server'), (N'ReactJS'), (N'Node.js');

INSERT INTO ProjectCategories(category_name) VALUES
(N'Programming'), (N'Design'), (N'Writing'), (N'Translation'), (N'Marketing');

INSERT INTO SystemGuides(title, content, guide_type) VALUES
(N'How to register and verify email', N'Users can create an account, verify email, and log in to use advanced features.', 'ACCOUNT'),
(N'How to post a project', N'Employers can create a project by entering title, description, budget, deadline, and required skills.', 'PROJECT'),
(N'How to submit a proposal', N'Freelancers can view project details and submit a proposal with price and delivery time.', 'PROPOSAL'),
(N'How VNPay payment works', N'Employers pay through VNPay. The payment is held in escrow until the project is completed.', 'PAYMENT'),
(N'How to report a violation', N'Users can report scam, inappropriate content, or disputes for Admin review.', 'REPORT');
GO

-- =========================================================
-- 13. VIEWS (BÁO CÁO & HIỂN THỊ)
-- =========================================================

-- View Admin Dashboard phân tách chi tiết số lượng vai trò người dùng
ALTER VIEW vw_AdminDashboard AS
SELECT
    (SELECT COUNT(*) FROM Users) AS total_users,
    (SELECT COUNT(DISTINCT user_id) FROM UserRoles WHERE role_name = 'FREELANCER') AS total_freelancers,
    (SELECT COUNT(DISTINCT user_id) FROM UserRoles WHERE role_name = 'EMPLOYER') AS total_employers,
    (SELECT COUNT(*) FROM Projects) AS total_projects,
    (SELECT COUNT(*) FROM Projects WHERE status = 'COMPLETED') AS completed_projects,
    (SELECT COUNT(*) FROM ViolationReports WHERE status = 'PENDING') AS pending_reports,
    (SELECT ISNULL(SUM(amount), 0) FROM Payments WHERE payment_status = 'SUCCESS') AS total_success_payment;
GO
-- View hiển thị hồ sơ Freelancer công khai ra trang chủ
ALTER VIEW vw_PublicFreelancerProfiles AS
SELECT
    u.user_id,
    u.full_name,
    u.avatar_url,
    fp.headline,
    fp.experience_years,
    fp.hourly_rate,
    fp.rating_average,
    fp.total_reviews,
    fp.availability_status
FROM Users u
JOIN FreelancerProfiles fp ON u.user_id = fp.freelancer_id
WHERE u.status = 'ACTIVE';
GO