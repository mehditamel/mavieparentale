-- Migration 007: Add phone_number to profiles for SMS notifications (Twilio)

-- UP
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- DOWN (rollback)
-- ALTER TABLE profiles DROP COLUMN IF EXISTS phone_number;
