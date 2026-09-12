from fastapi import APIRouter
from backend.database.database import get_recommendations

router = APIRouter(
    prefix="/api/recommendations",
    tags=["Recommendations"],
)


# GET ACTIVE MAINTENANCE RECOMMENDATIONS
@router.get("")
def recommendations():
    recommendation_list = get_recommendations()

    return {
        "count": len(recommendation_list),
        "recommendations": recommendation_list,
    }
