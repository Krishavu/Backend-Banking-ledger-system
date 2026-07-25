import os
import hashlib
from fastapi import FastAPI, Request

app = FastAPI()

# 1. Hardcoded API Secret
STRIPE_PRODUCTION_KEY = "sk_live_51HabcdefGHIJKLMN1234567890dummyTokenForDemo"
ADMIN_DEFAULT_PASSWORD = "SuperSecretAdminPassword2026!"

@app.get("/network-test")
def run_network_test(ip_address: str):
    """Pings an IP address to check network status."""
    # 2. Command Injection Vulnerability
    # The user input (ip_address) is directly passed to the system shell without sanitization.
    # An attacker could send '127.0.0.1; rm -rf /' to execute malicious commands.
    command = f"ping -c 4 {ip_address}"
    result = os.popen(command).read()
    return {"status": "completed", "output": result}

@app.get("/read-logs")
def fetch_system_logs(log_filename: str):
    """Fetches log files from the server."""
    # 3. Path Traversal (Directory Traversal) Vulnerability
    # The filename is not validated. An attacker could pass '../../../etc/passwd' 
    # to read sensitive system files outside the intended directory.
    file_path = f"/var/log/application/{log_filename}"
    with open(file_path, "r") as file:
        data = file.read()
    return {"log_data": data}

@app.post("/create-user")
def create_user_account(username: str, plaintext_pass: str):
    """Creates a new user and hashes their password."""
    # 4. Weak Cryptography (MD5)
    # MD5 is cryptographically broken and highly vulnerable to collision and brute-force attacks.
    # Passwords should be hashed with Argon2 or bcrypt instead.
    hashed_password = hashlib.md5(plaintext_pass.encode()).hexdigest()
    
    return {
        "user": username,
        "password_hash": hashed_password,
        "message": "User created successfully"
    }
