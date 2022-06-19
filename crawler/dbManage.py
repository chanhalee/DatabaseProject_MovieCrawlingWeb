import pymysql


def open_db():
    conn = pymysql.connect(
        host='localhost',
        port=3306,
        user='chanha',
        password='lee',
        db='movie_data')

    cur = conn.cursor(pymysql.cursors.DictCursor)
    return conn, cur


def close_db(conn, cur):
    cur.close()
    conn.close()
