from fastapi import APIRouter
from backend.database.database import get_alerts
router = APIRouter(
    prefix="/api/alerts",
    tags=["Alerts"]
)
# GET ACTIVE ALERTS
@router.get("")
def alerts():

    alert_list = get_alerts()

    return {
        "count": len(alert_list),
        "alerts": alert_list
    }