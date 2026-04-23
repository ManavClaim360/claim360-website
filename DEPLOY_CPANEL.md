# cPanel Deployment Guide

This project is prepared for a common cPanel setup:

- `frontend/` as a static React site
- `backend/` as a Python app
- no Vercel-specific deployment config

## Recommended setup

- Main website on `public_html/`
- Backend on a Python App subdomain such as `api.yourdomain.com`

Using a separate API subdomain is usually the easiest cPanel/shared-hosting setup.

## Frontend

Edit `frontend/.env.production` before building.

If the API will run on a subdomain:

```env
VITE_API_URL=https://api.yourdomain.com/api
```

If the API is reverse proxied on the same domain under `/api`, keep:

```env
VITE_API_URL=/api
```

Build:

```bash
cd frontend
npm install
npm run build
```

Upload everything inside `frontend/dist/` into `public_html/`.

`frontend/public/.htaccess` is included in the build so React routes work on Apache/cPanel.

## Backend

Upload the `backend/` folder to a path like:

```text
/home/USERNAME/claim360-backend
```

In cPanel `Setup Python App`:

1. Create the app
2. Choose Python 3.10+ if available
3. Set the application root to the uploaded backend folder
4. Set the application URL to your API domain/path
5. Set startup file to `passenger_wsgi.py`
6. Set entry point to `application`

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `backend/.env`:

```env
DB_URL=sqlite:///claim360.db
SECRET_KEY=replace-with-a-long-random-secret
ACCESS_TOKEN_EXPIRE_MINUTES=1440
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=replace-with-a-strong-password
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

Then restart the Python app from cPanel.

## Notes

- This backend uses `a2wsgi` so FastAPI can run through cPanel Passenger.
- If your hosting plan does not include `Setup Python App`, the backend cannot run there as-is.
- For better production reliability, switch from SQLite to MySQL or PostgreSQL if your host provides it.
