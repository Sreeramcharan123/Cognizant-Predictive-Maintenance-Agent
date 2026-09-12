import sqlite3
from pathlib import Path
from datetime import datetime

# DATABASE CONFIGURATION
BACKEND_DIR = Path(__file__).resolve().parent.parent
DATABASE_DIR = BACKEND_DIR / "data"
DATABASE_DIR.mkdir(parents=True, exist_ok=True)

DATABASE_PATH = DATABASE_DIR / "predictive_maintenance.db"


# DATABASE CONNECTION
def get_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


# DATABASE INITIALIZATION
def initialize_database():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS prediction_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            machine_id TEXT NOT NULL,
            machine_type TEXT NOT NULL,
            air_temperature REAL NOT NULL,
            process_temperature REAL NOT NULL,
            rotational_speed REAL NOT NULL,
            torque REAL NOT NULL,
            tool_wear REAL NOT NULL,
            failure_probability REAL NOT NULL,
            failure_probability_percent REAL NOT NULL,
            risk_level TEXT NOT NULL,
            anomaly_detected INTEGER NOT NULL,
            recommendation TEXT,
            human_review_required INTEGER NOT NULL,
            created_at TEXT NOT NULL
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS maintenance_recommendations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            prediction_id INTEGER NOT NULL,
            recommendation TEXT NOT NULL,
            priority TEXT,
            status TEXT NOT NULL DEFAULT 'PENDING',
            created_at TEXT NOT NULL,
            reviewed_at TEXT,
            FOREIGN KEY (prediction_id) REFERENCES prediction_history(id)
        )
        """
    )

    # Machine lifecycle/status is kept separately from prediction history.
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS machines (
            machine_id TEXT PRIMARY KEY,
            machine_type TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'ACTIVE',
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
        """
    )

    # Safely register machines that already existed before the status feature.
    cursor.execute(
        """
        INSERT OR IGNORE INTO machines (
            machine_id, machine_type, status, created_at, updated_at
        )
        SELECT
            machine_id,
            MAX(machine_type),
            'ACTIVE',
            MIN(created_at),
            MAX(created_at)
        FROM prediction_history
        GROUP BY machine_id
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL,
            display_name TEXT NOT NULL,
            active INTEGER NOT NULL DEFAULT 1,
            created_at TEXT NOT NULL
        )
        """
    )

    connection.commit()
    connection.close()


# USER AUTHENTICATION HELPERS

def create_user(username, password_hash, role, display_name):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        """
        INSERT OR IGNORE INTO users
            (username, password_hash, role, display_name, active, created_at)
        VALUES (?, ?, ?, ?, 1, ?)
        """,
        (username.lower().strip(), password_hash, role, display_name, datetime.now().isoformat()),
    )
    connection.commit()
    connection.close()


def get_user_by_username(username):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        "SELECT * FROM users WHERE username = ? AND active = 1",
        (username.lower().strip(),),
    )
    row = cursor.fetchone()
    connection.close()
    return dict(row) if row else None


# SAVE PREDICTION
def save_prediction(
    machine_id,
    machine_type,
    machine_data,
    prediction_result,
    anomaly_result,
    recommendation,
    human_review_required,
):
    connection = get_connection()
    cursor = connection.cursor()
    created_at = datetime.now().isoformat()

    # A new analysis means the machine is being actively monitored again.
    cursor.execute(
        """
        INSERT INTO machines (
            machine_id, machine_type, status, created_at, updated_at
        )
        VALUES (?, ?, 'ACTIVE', ?, ?)
        ON CONFLICT(machine_id) DO UPDATE SET
            machine_type = excluded.machine_type,
            status = 'ACTIVE',
            updated_at = excluded.updated_at
        """,
        (machine_id, machine_type, created_at, created_at),
    )

    failure_probability = prediction_result["failure_probability"]
    failure_probability_percent = prediction_result["failure_probability_percent"]
    risk_level = prediction_result["risk_level"]
    anomaly_detected = int(anomaly_result["anomaly_detected"])
    human_review = int(human_review_required)

    cursor.execute(
        """
        INSERT INTO prediction_history (
            machine_id,
            machine_type,
            air_temperature,
            process_temperature,
            rotational_speed,
            torque,
            tool_wear,
            failure_probability,
            failure_probability_percent,
            risk_level,
            anomaly_detected,
            recommendation,
            human_review_required,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            machine_id,
            machine_type,
            machine_data["Air temperature [K]"],
            machine_data["Process temperature [K]"],
            machine_data["Rotational speed [rpm]"],
            machine_data["Torque [Nm]"],
            machine_data["Tool wear [min]"],
            failure_probability,
            failure_probability_percent,
            risk_level,
            anomaly_detected,
            recommendation,
            human_review,
            created_at,
        ),
    )

    prediction_id = cursor.lastrowid

    if risk_level == "CRITICAL":
        priority = "IMMEDIATE"
    elif risk_level == "HIGH":
        priority = "HIGH"
    elif risk_level == "MEDIUM":
        priority = "MEDIUM"
    else:
        priority = "LOW"

    cursor.execute(
        """
        INSERT INTO maintenance_recommendations (
            prediction_id,
            recommendation,
            priority,
            status,
            created_at
        )
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            prediction_id,
            recommendation,
            priority,
            "PENDING",
            created_at,
        ),
    )

    connection.commit()
    connection.close()
    return prediction_id


# GET PREDICTION HISTORY
def get_prediction_history(limit=50):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        """
        SELECT *
        FROM prediction_history
        ORDER BY id DESC
        LIMIT ?
        """,
        (limit,),
    )
    rows = cursor.fetchall()
    connection.close()
    return [dict(row) for row in rows]


# GET MACHINE HISTORY
def get_machine_history(machine_id):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        """
        SELECT *
        FROM prediction_history
        WHERE machine_id = ?
        ORDER BY id DESC
        """,
        (machine_id,),
    )
    rows = cursor.fetchall()
    connection.close()
    return [dict(row) for row in rows]


# GET MACHINE STATUS
def get_machine_status(machine_id):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        """
        SELECT *
        FROM machines
        WHERE machine_id = ?
        """,
        (machine_id,),
    )
    row = cursor.fetchone()
    connection.close()
    return dict(row) if row else None


# GET UNIQUE ACTIVE MACHINES
def get_machines(status="ACTIVE"):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        """
        SELECT
            m.machine_id,
            m.machine_type,
            m.status,
            COUNT(p.id) AS prediction_count,
            MAX(p.created_at) AS last_prediction,
            MAX(p.failure_probability_percent) AS maximum_failure_probability
        FROM machines m
        LEFT JOIN prediction_history p
            ON p.machine_id = m.machine_id
        WHERE m.status = ?
        GROUP BY m.machine_id, m.machine_type, m.status
        ORDER BY m.machine_id
        """,
        (status,),
    )
    rows = cursor.fetchall()
    connection.close()
    return [dict(row) for row in rows]


# MARK MACHINE RESOLVED
def resolve_machine(machine_id):
    connection = get_connection()
    cursor = connection.cursor()
    resolved_at = datetime.now().isoformat()

    cursor.execute(
        """
        UPDATE machines
        SET status = 'RESOLVED',
            updated_at = ?
        WHERE machine_id = ?
        """,
        (resolved_at, machine_id),
    )

    if cursor.rowcount == 0:
        connection.close()
        return None

    # Close maintenance items belonging to this resolved machine.
    cursor.execute(
        """
        UPDATE maintenance_recommendations
        SET status = 'RESOLVED',
            reviewed_at = ?
        WHERE prediction_id IN (
            SELECT id
            FROM prediction_history
            WHERE machine_id = ?
        )
        AND status != 'RESOLVED'
        """,
        (resolved_at, machine_id),
    )

    connection.commit()

    cursor.execute(
        "SELECT * FROM machines WHERE machine_id = ?",
        (machine_id,),
    )
    row = cursor.fetchone()
    connection.close()
    return dict(row) if row else None


# GET ALERTS FOR ACTIVE MACHINES ONLY
def get_alerts():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        """
        SELECT p.*
        FROM prediction_history p
        INNER JOIN machines m
            ON m.machine_id = p.machine_id
        WHERE m.status = 'ACTIVE'
          AND (p.risk_level IN ('HIGH', 'CRITICAL')
               OR p.anomaly_detected = 1)
        ORDER BY p.id DESC
        """
    )
    rows = cursor.fetchall()
    connection.close()
    return [dict(row) for row in rows]


# GET ACTIVE MAINTENANCE RECOMMENDATIONS
def get_recommendations():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        """
        SELECT
            r.*,
            p.machine_id,
            p.machine_type,
            p.risk_level,
            p.failure_probability_percent,
            p.anomaly_detected
        FROM maintenance_recommendations r
        INNER JOIN prediction_history p
            ON p.id = r.prediction_id
        INNER JOIN machines m
            ON m.machine_id = p.machine_id
        WHERE m.status = 'ACTIVE'
          AND r.status != 'RESOLVED'
        ORDER BY r.id DESC
        """
    )
    rows = cursor.fetchall()
    connection.close()
    return [dict(row) for row in rows]
