from fastapi import APIRouter, HTTPException, Request, Response
from backend.auth import authenticate, create_access_token, decode_access_token
from backend.schemas.auth_schema import LoginRequest

router = APIRouter(prefix="/api/auth", tags=["Authentication"])
COOKIE_NAME = "pm_access_token"

def public_user(user):
    return {"id": user["id"], "username": user["username"], "role": user["role"], "display_name": user["display_name"]}

@router.post("/login")
def login(payload: LoginRequest, response: Response):
    user = authenticate(payload.username, payload.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password.")
    token = create_access_token(user, payload.remember_me)
    kwargs = dict(key=COOKIE_NAME, value=token, httponly=True, samesite="lax", secure=False, path="/")
    if payload.remember_me:
        kwargs["max_age"] = 7 * 24 * 60 * 60
    response.set_cookie(**kwargs)
    return {"message": "Login successful", "user": public_user(user)}

@router.get("/me")
def me(request: Request):
    token = request.cookies.get(COOKIE_NAME)
    payload = decode_access_token(token) if token else None
    if not payload:
        raise HTTPException(status_code=401, detail="Not authenticated.")
    return {"authenticated": True, "user": {"id": int(payload["sub"]), "username": payload["username"], "role": payload["role"], "display_name": payload["display_name"]}}

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(COOKIE_NAME, path="/")
    return {"message": "Logged out successfully"}
