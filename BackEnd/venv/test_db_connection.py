import mysql.connector

# Database configuration
config = {
    'host': 'sql109.infinityfree.com',
    'user': 'if0_36878951',
    'password': 'QSwDAGEBOvC3W',
    'database': 'if0_36878951_number_guessing_game',
    'raise_on_warnings': True
}

try:
    # Establish a connection to the database
    conn = mysql.connector.connect(**config)

    if conn.is_connected():
        db_Info = conn.get_server_info()
        print(f"Connected to MySQL Server version {db_Info}")
        
        # Execute a test query
        cursor = conn.cursor()
        cursor.execute("SELECT DATABASE();")
        record = cursor.fetchone()
        print(f"You are connected to database: {record[0]}")

except mysql.connector.Error as e:
    print(f"Error connecting to MySQL DB: {e}")

finally:
    # Close the database connection
    if 'conn' in locals() and conn.is_connected():
        cursor.close()
        conn.close()
        print("MySQL connection is closed")
