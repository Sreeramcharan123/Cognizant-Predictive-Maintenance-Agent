from fastapi import APIRouter, HTTPException

from backend.database.database import (
    get_machines,
    get_machine_history,
    get_machine_status,
    resolve_machine,
)

router = APIRouter(
    prefix="/api/machines",
    tags=["Machines"],
)


# ============================================================
# GET ALL ACTIVE MACHINES
# ============================================================

@router.get("")
def machines():
    """
    Return all currently active machines.
    Resolved machines are excluded from the active fleet.
    """

    machine_list = get_machines()

    return {
        "count": len(machine_list),
        "machines": machine_list,
    }


# ============================================================
# GET MACHINE HISTORY + STATUS
# ============================================================

@router.get("/{machine_id}")
def machine_history(machine_id: str):
    """
    Return the machine's current status and complete
    prediction history.
    """

    history = get_machine_history(machine_id)
    status = get_machine_status(machine_id)

    if not history and not status:
        raise HTTPException(
            status_code=404,
            detail=f"Machine {machine_id} not found.",
        )

    return {
        "machine_id": machine_id,
        "count": len(history),
        "status": status,
        "history": history,
    }


# ============================================================
# RESOLVE MACHINE
# ============================================================

@router.post("/{machine_id}/resolve")
def mark_machine_resolved(machine_id: str):
    """
    Mark a machine as RESOLVED.

    The machine is removed from active fleet views,
    while its historical prediction records remain
    available in the database.
    """

    try:
        result = resolve_machine(machine_id)

        if not result:
            raise HTTPException(
                status_code=404,
                detail=f"Machine {machine_id} not found.",
            )

        return {
            "success": True,
            "message": f"Machine {machine_id} resolved successfully.",
            "machine_id": machine_id,
            "status": "RESOLVED",
        }

    except HTTPException:
        raise

    except Exception as exc:
        print(
            f"Error resolving machine {machine_id}: {exc}"
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to resolve machine.",
        )