# Twilio OTP Setup

This project uses Twilio Verify for SMS OTP login.

## 1. Create a Twilio account

- Sign in at `https://console.twilio.com`
- Make sure your account can send SMS to India if you will test Indian numbers

## 2. Create a Verify Service

- In Twilio Console, open `Verify`
- Create a new Verify Service
- Choose `SMS` as the channel
- Copy the `Verify Service SID`

## 3. Get your Twilio credentials

From the Twilio Console dashboard, copy:

- `Account SID`
- `Auth Token`

## 4. Add backend environment variables in Vercel

Set these in the `claim360-backend` project:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_VERIFY_SERVICE_SID=VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Also keep the existing backend env vars:

```env
DB_URL=postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require
SECRET_KEY=replace-with-a-strong-random-secret
ACCESS_TOKEN_EXPIRE_MINUTES=1440
ADMIN_EMAIL=admin@claim360.in
ADMIN_PASSWORD=ChangeThisToAStrongPassword123!
ALLOWED_ORIGINS=https://claim360-frontend.vercel.app
```

## 5. Redeploy backend

After adding the Twilio env vars, redeploy the backend project.

## 6. Frontend env

Keep this in the frontend project:

```env
VITE_API_URL=https://your-backend-domain.vercel.app/api
```

## 7. Test flow

- Sign up with name, email, phone, and password
- Click `Send OTP`
- Enter the code from SMS
- You should land in the dashboard

## Notes

- OTP login uses the phone number stored on the user record
- Password login still works with email or phone
- Existing users without a phone number need to sign in with password until a phone number is saved for them
