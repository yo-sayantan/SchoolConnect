# Registration System - Implementation Guide

## Overview

The registration system allows students and parents to register for accounts, which must be approved by the Principal or Admin Assistant before activation.

## Features

### Student Registration
- Upload ID card (front and back)
- Personal information (name, DOB, address)
- Guardian information
- Emergency contact
- Account credentials

### Parent Registration
- Upload ID card (front and back)
- Link to student account(s) via student IDs
- Personal and contact information
- Account credentials

### Admin Approval Workflow
- View pending registrations
- Review ID card images
- Edit registration details before approval
- Approve or reject registrations
- Manage user accounts (enable/disable)

## Role-Based Access Control

### Principal (Highest Access)
- Approve/reject registrations
- Edit registration details
- Enable/disable student and parent accounts
- Delete users
- View all users

### Admin Assistant
- Approve/reject registrations
- Edit registration details
- Enable/disable student and parent accounts
- View all users

### Admission Office
- Same as Admin Assistant (use ADMIN_ASSISTANT role)

## API Endpoints

### Registration Endpoints
```
POST /api/auth/registration/submit
- Submit new registration request
- Body: RegistrationRequestDto
- Public access

GET /api/auth/registration/pending
- Get all pending registration requests
- Requires: PRINCIPAL or ADMIN_ASSISTANT role

GET /api/auth/registration/{id}
- Get specific registration request
- Requires: PRINCIPAL or ADMIN_ASSISTANT role

POST /api/auth/registration/approve
- Approve or reject registration
- Body: ApprovalRequestDto
- Requires: PRINCIPAL or ADMIN_ASSISTANT role

DELETE /api/auth/registration/{id}
- Delete registration request
- Requires: PRINCIPAL role only
```

### File Upload Endpoints
```
POST /api/auth/upload/id-card
- Upload ID card image
- Accepts: image files (max 5MB)
- Returns: { fileUrl, filename }
- Public access
```

### User Management Endpoints
```
GET /api/auth/users
- Get all users
- Requires: PRINCIPAL or ADMIN_ASSISTANT role

GET /api/auth/users/role/{role}
- Get users by role
- Requires: PRINCIPAL or ADMIN_ASSISTANT role

PUT /api/auth/users/{id}/disable
- Disable user account (STUDENT or PARENT only)
- Requires: PRINCIPAL or ADMIN_ASSISTANT role

PUT /api/auth/users/{id}/enable
- Enable user account
- Requires: PRINCIPAL or ADMIN_ASSISTANT role

DELETE /api/auth/users/{id}
- Delete user
- Requires: PRINCIPAL role only
```

## Frontend Pages

### Student Registration
**URL:** `/register/student`
- Form with personal, contact, guardian information
- ID card upload (front and back)
- Password creation
- Success confirmation with redirect to login

### Parent Registration
**URL:** `/register/parent`
- Form with personal and contact information
- Student ID linking (comma-separated for multiple)
- ID card upload (front and back)
- Password creation
- Success confirmation with redirect to login

### Admin Panel
**URL:** `/dashboard/admin`
- Two tabs: Pending Registrations and Manage Users
- Review registration requests with ID card images
- Edit registration details before approval
- Approve/reject with notes
- Enable/disable user accounts

## Testing Guide

### 1. Test Student Registration

```bash
# Navigate to student registration
http://localhost:3000/register/student

# Fill in form:
- Name: Test Student
- Email: teststudent@example.com
- Phone: +1234567890
- Date of Birth: 2010-01-01
- Address: 123 Test St
- Guardian Name: Test Guardian
- Emergency Contact: +0987654321
- Upload ID card images
- Password: password123

# Submit and verify success message
```

### 2. Test Parent Registration

```bash
# Navigate to parent registration
http://localhost:3000/register/parent

# Fill in form:
- Name: Test Parent
- Email: testparent@example.com
- Phone: +1234567891
- Address: 123 Test St
- Emergency Contact: +0987654322
- Student IDs: 9, 10  # Existing student IDs
- Upload ID card images
- Password: password123

# Submit and verify success message
```

### 3. Test Admin Approval

```bash
# Login as Principal or Admin Assistant
Email: principal@school.com
Password: password123

# Navigate to admin panel
http://localhost:3000/dashboard/admin

# Review pending registrations:
1. Click on a pending request
2. View ID card images
3. Edit details if needed
4. Click "Approve" or "Reject"
5. Verify success message
```

### 4. Test Account Management

```bash
# In admin panel, switch to "Manage Users" tab

# Test disable account:
1. Find a student or parent account
2. Click "Disable" button
3. Verify account is disabled

# Test enable account:
1. Find a disabled account
2. Click "Enable" button
3. Verify account is enabled

# Test login with disabled account:
1. Logout
2. Try to login with disabled account
3. Verify login is blocked
```

## Database Schema

### registration_requests Table
```sql
CREATE TABLE registration_requests (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(50) UNIQUE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    id_card_front_url VARCHAR(500),
    id_card_back_url VARCHAR(500),
    linked_student_ids TEXT,
    status VARCHAR(50) NOT NULL,
    reviewed_by BIGINT,
    reviewed_at DATETIME,
    review_notes TEXT,
    address TEXT,
    date_of_birth VARCHAR(50),
    guardian_name VARCHAR(255),
    emergency_contact VARCHAR(50),
    created_at DATETIME,
    updated_at DATETIME
);
```

### users Table (Updated)
```sql
ALTER TABLE users
ADD COLUMN id_card_front_url VARCHAR(500),
ADD COLUMN id_card_back_url VARCHAR(500),
ADD COLUMN linked_student_ids TEXT,
ADD COLUMN address TEXT,
ADD COLUMN date_of_birth VARCHAR(50),
ADD COLUMN guardian_name VARCHAR(255),
ADD COLUMN emergency_contact VARCHAR(50),
ADD COLUMN approved_by BIGINT,
ADD COLUMN approved_at DATETIME;
```

## Security Considerations

1. **File Upload Validation**
   - Only image files allowed
   - Maximum file size: 5MB
   - Files stored with unique UUID filenames

2. **Role-Based Access**
   - Registration approval: PRINCIPAL, ADMIN_ASSISTANT
   - Account disable/enable: PRINCIPAL, ADMIN_ASSISTANT
   - User deletion: PRINCIPAL only

3. **Password Security**
   - Passwords hashed with BCrypt
   - Minimum length: 6 characters
   - Stored securely in database

4. **Data Validation**
   - Email uniqueness check
   - Phone number uniqueness check
   - Student ID validation for parent registration
   - Required ID card uploads

## Troubleshooting

### Registration Submission Fails
- Check file size (must be < 5MB)
- Verify email/phone not already registered
- Ensure all required fields are filled
- Check network connection

### Admin Panel Not Loading
- Verify user role (must be PRINCIPAL or ADMIN_ASSISTANT)
- Check authentication token
- Verify API endpoints are accessible

### File Upload Fails
- Check file type (must be image)
- Verify file size (< 5MB)
- Check upload directory permissions
- Verify server storage space

## Next Steps

1. **Email Notifications**
   - Send confirmation email on registration submission
   - Notify user when registration is approved/rejected
   - Send welcome email with login instructions

2. **SMS Integration**
   - Send OTP for registration verification
   - Notify via SMS on approval

3. **Enhanced Validation**
   - Verify student IDs exist before parent registration
   - Add document verification service
   - Implement duplicate detection

4. **Audit Trail**
   - Log all approval/rejection actions
   - Track who approved/rejected each request
   - Maintain history of account status changes
