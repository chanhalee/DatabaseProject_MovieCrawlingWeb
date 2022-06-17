import requests
from bs4 import BeautifulSoup
import pymysql


def open_db():
    conn = pymysql.connect(host='localhost', user='chanha', password='lee', db='exer_pro',
                           unix_socket='/tmp/mysql.sock')

    curs = conn.cursor(pymysql.cursors.DictCursor)

    return conn, curs


def close_db(curs, conn):
    curs.close()
    conn.close()


def execute(sql):
    conn, curs = open_db()

    curs.execute(sql)

    close_db(curs, conn)


createTableMovie = """create table movie(
   	mid integer primary key,
    m_name varchar(100),
    m_rate varchar(20),
    m_netizen_rate float,
    m_netizen_count int,
    m_journalist_score float,
    m_journalist_count int,
    m_playing_time int,
    m_opening_date datetime default now(),
    m_image varchar(1000),
    m_synopsis varchar(10000)
);"""

createTableActor = """
create table actor(
	aid integer primary key,
    ak_name varchar(100),
    ae_name varchar(100),
    a_image varchar(1000)
);
"""
createTableDirector = """
create table director(
	did integer primary key,
    dk_name varchar(100),
    de_name varchar(100),
    d_image varchar(1000)
);
"""
createTableMA = """
create table movie_actor(
	mid int,
    aid int,
    part varchar(10),
    role varchar(100),
    
    foreign key (mid) references movie(mid),
	foreign key (aid) references actor(aid),
    primary key (mid, aid)
);
"""
createTableMD = """create table movie_director(
	mid int,
    did int,

    foreign key (mid) references movie(mid),
	foreign key (did) references director(did),
    primary key (mid, did)
);
"""
createTableMG = """create table movie_genre(
	mid int,
    gid int,

	foreign key (mid) references movie(mid),
    primary key (mid, gid)
);
"""
createTableMP = """
create table movie_photo(
	mid int,
    mp_photo varchar(500),

	foreign key (mid) references movie(mid),
    primary key (mid, mp_photo)
);
"""
dropTable = """ drop table movie_director, movie_actor, movie_genre, movie_photo, movie, actor, director;
"""
# execute(dropTable)
execute(createTableMovie)
execute(createTableActor)
execute(createTableDirector)
execute(createTableMD)
execute(createTableMG)
execute(createTableMA)
execute(createTableMP)
