import base64
import hashlib
import hmac
import os
from datetime import datetime, timedelta, timezone

import jwt

from backend.database.database import create_user, get_user_by_username

JWT_SECRET = os.getenv("JWT_SECRET", "CHANGE_THIS_DEMO_SECRET_IN_PRODUCTION")
JWT_ALGORITHM = "HS256"
PBKDF2_ITERATIONS = 310_000


def hash_password(password: str) -> str:
    salt = os.urandom(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, PBKDF2_ITERATIONS)
    return f"pbkdf2_sha256${PBKDF2_ITERATIONS}${base64.urlsafe_b64encode(salt).decode()}${base64.urlsafe_b64encode(digest).decode()}"


def verify_password(password: str, stored_hash: str) -> bool:
    try:
        scheme, iterations, salt_b64, digest_b64 = stored_hash.split("$", 3)
        if scheme != "pbkdf2_sha256":
            return False
        salt = base64.urlsafe_b64decode(salt_b64.encode())
        expected = base64.urlsafe_b64decode(digest_b64.encode())
        actual = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, int(iterations))
        return hmac.compare_digest(actual, expected)
    except (ValueError, TypeError):
        return False


def seed_default_users():
    create_user("engineer", hash_password("Engineer@123"), "Maintenance Engineer", "Maintenance Engineer")
    create_user("supervisor", hash_password("Supervisor@123"), "Supervisor", "Supervisor")
    create_user("admin", hash_password("Admin@123"), "Admin", "Administrator")


def authenticate(username, password):
    user = get_user_by_username(username)
    if not user or not verify_password(password, user["password_hash"]):
        return None
    return user


def create_access_token(user, remember_me=False):
    now = datetime.now(timezone.utc)
    expires = now + timedelta(days=7 if remember_me else 1)
    return jwt.encode({
        "sub": str(user["id"]), "username": user["username"], "role": user["role"],
        "display_name": user["display_name"], "iat": now, "exp": expires
    }, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_access_token(token):
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.PyJWTError:
        return None
