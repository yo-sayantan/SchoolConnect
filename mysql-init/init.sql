-- ============================================
-- SchoolConnect Database Initialization Script
-- ============================================

-- Create databases
CREATE DATABASE IF NOT EXISTS schoolconnect_auth;

CREATE DATABASE IF NOT EXISTS schoolconnect_academic;

CREATE DATABASE IF NOT EXISTS schoolconnect_communication;

CREATE DATABASE IF NOT EXISTS schoolconnect_calendar;

-- ============================================
-- AUTH SERVICE DATABASE
-- ============================================
USE schoolconnect_auth;

-- Note: Tables will be created by Hibernate
-- Demo users will be created by DataInitializer.java

-- ============================================
-- ACADEMIC SERVICE DATABASE
-- ============================================
USE schoolconnect_academic;

-- Note: Tables will be created by Hibernate
-- Demo data will be inserted after tables are created

-- ============================================
-- COMMUNICATION SERVICE DATABASE
-- ============================================
USE schoolconnect_communication;

-- Note: Tables will be created by Hibernate
-- Demo data will be inserted after tables are created

-- ============================================
-- CALENDAR SERVICE DATABASE
-- ============================================
USE schoolconnect_calendar;

-- Note: Tables will be created by Hibernate
-- Demo data will be inserted after tables are created

FLUSH PRIVILEGES;