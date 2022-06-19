import time
from selenium import webdriver
import re
import pyperclip
from bs4 import BeautifulSoup as bs
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import credential
import dbManage


driver = webdriver.Chrome(
    '/Users/chl/dbproject/mvsite/crawler/chromedriver')

movieDataBuffer = []
genreDataBuffer = []
actorDataBuffer = []
movieReviewBuffer = []
movieActorBuffer = []
directorDataBuffer = []
movieDirectorBuffer = []
movieSceneBuffer = []


def crawl_movie_info(mid):
    global movieDataBuffer
    global genreDataBuffer

    movie_info = []
    html = driver.page_source
    soup = bs(html, 'html.parser')

    movie_info.append(mid)
    m_title = soup.select_one(
        '#content > div.article > div.mv_info_area > div.mv_info > h3 > a:nth-child(1)')
    movie_info.append(m_title.get_text() if m_title is not None else '')
    m_rate = soup.select_one(
        '#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(8) > p > a')
    movie_info.append(m_rate.get_text() if m_rate is not None else '')
    score_area = soup.select_one(
        '#content > div.article > div.section_group.section_group_frst > div > div > div.score_area')
    if score_area is not None:
        m_netizen_count = score_area.select_one(
            'div.netizen_score > div > span > em')
        m_journalist_count = score_area.select_one(
            'div.special_score > div > span > em')

        if m_netizen_count is not None:
            if m_netizen_count == 0:
                movie_info += [0, 0]
            else:
                m_netizen_rate = score_area.select_one(
                    'div.netizen_score > div > div > em')
                movie_info.append(float(m_netizen_rate.get_text())
                                  if m_netizen_rate is not None else 0)
                movie_info.append(
                    int(re.sub(',', '', m_netizen_count.get_text())))

        if m_journalist_count is not None:
            if m_journalist_count == 0:
                movie_info += [0, 0]
            else:
                m_journalist_rate = score_area.select_one(
                    'div.special_score > div > div > em')
                movie_info.append(float(m_journalist_rate.get_text())
                                  if m_journalist_rate is not None else 0)
                movie_info.append(int(m_journalist_count.get_text()))
    else:
        movie_info += [0, 0, 0, 0]

    movieDataBuffer.append(movie_info)
    info_spec_dds = soup.select(
        '#content > div.article > div.mv_info_area > div.mv_info > dl > dd')
    scope = info_spec_dds[0].select('p>span')
    arr = [0, '']

    for raw_item in scope:
        links = raw_item.select('a')
        if len(links) == 0:
            m_playing_time = raw_item.get_text()
            arr[0] = int(m_playing_time[:-2])

        else:
            for raw_link in links:
                link = raw_link.attrs['href']
                if link.find('genre') != -1:
                    gid = int(link.split('genre=')[1])
                    genreDataBuffer.append((mid, gid))
                elif link.find('open') != -1:
                    opening_date = link.split('open=')[1]
                    if len(opening_date) == 8:
                        temp = list(opening_date)
                        if (temp[4] == '0' and temp[5] == '0'):
                            temp[5] = '1'
                        if (temp[6] == '0' and temp[7] == '0'):
                            temp[7] = '1'
                        temp.insert(4, '-')
                        temp.insert(7, '-')
                        arr[1] = ''.join(temp)
    movie_info += arr

    image_url = soup.select_one(
        '#content > div.article > div.mv_info_area > div.poster > a > img')
    movie_info.append(image_url.attrs['src'] if image_url is not None else '')

    raw_synopsis = soup.find("div", {"class": "story_area"})
    movie_info.append('\n'.join(raw_synopsis.text.strip().split(
        '\n')) if raw_synopsis is not None else '')


def crawl_movie_review(mid):
    global movieReviewBuffer
    try:
        review_link = driver.find_element(
            by=By.XPATH, value='//*[@id="movieEndTabMenu"]/li/a[@title="리뷰"]')
    except Exception as e:
        return
    review_link.send_keys(Keys.COMMAND + '\n')
    driver.switch_to.window(driver.window_handles[3])
    d = 1
    try:
        html = driver.page_source
        soup = bs(html, 'html.parser')

        reviews = soup.select(
            '#reviewTab > div.ifr_area > div.review > ul.rvw_list_area > li')
        if len(reviews) == 0:
            driver.close()
            driver.switch_to.window(driver.window_handles[2])
            return
        for review in reviews:
            review_tuple = [0, mid, '0000-00-00', '', 0, '', '']
            rid = int(review.select_one('a').attrs['onclick'].split(
                'showReviewDetail(')[1].split(')')[0])
            user_name = review.select_one('span.user > a').text
            buf = review.select('span.user > em')
            if len(buf) != 2:
                r_date = '0000-00-00'
                recommended = 0
            else:
                r_date = buf[0].text
                if len(r_date) == 10:
                    r_date = r_date.replace(".", "-")
                else:
                    r_date = '0000-00-00'
                recommended = buf[1].text.split('추천 ')[1]
            title = review.select_one('a > strong').text
            reviewContent = review.select_one('p > a').get_text

            review_tuple[0] = rid
            review_tuple[2] = r_date
            review_tuple[3] = user_name
            review_tuple[4] = recommended
            review_tuple[5] = title
            review_tuple[6] = reviewContent
            movieReviewBuffer.append(tuple(review_tuple))
    except Exception as e:
        driver.close()
        driver.switch_to.window(driver.window_handles[2])
        return

    driver.close()
    driver.switch_to.window(driver.window_handles[2])


def crawl_movie_scene(mid):
    global movieSceneBuffer
    try:
        scene_link = driver.find_element(
            by=By.XPATH, value='//*[@id="movieEndTabMenu"]/li/a[@title="포토"]')
    except Exception as e:
        return
    scene_link.send_keys(Keys.COMMAND + '\n')
    driver.switch_to.window(driver.window_handles[3])
    d = 1
    try:
        html = driver.page_source
        soup = bs(html, 'html.parser')

        scenes = soup.select(
            '#photo_area > div.photo > div.list_area > div.rolling_list > ul > li')
        if len(scenes) == 0:
            driver.close()
            driver.switch_to.window(driver.window_handles[2])
            return
        for scene in scenes:
            scene_tuple = [
                mid, 'https://ssl.pstatic.net/static/movie/2012/06/dft_img120x150.png']
            if scene.attrs['data-json'].find('fullImageUrl886px'):
                scene_img = scene.attrs['data-json'].split('fullImageUrl886px')[
                    1].split("\":\"")[1].split("\"")[0]
                scene_tuple[1] = scene_img
            movieSceneBuffer.append(tuple(scene_tuple))
    except Exception as e:
        driver.close()
        driver.switch_to.window(driver.window_handles[2])
        return

    driver.close()
    driver.switch_to.window(driver.window_handles[2])


def crawl_actor_director_info_from_mid(mid):
    global actorDataBuffer
    global directorDataBuffer

    html = driver.page_source
    soup = bs(html, 'html.parser')

    actors = soup.select(
        '#content > div.article > div.section_group.section_group_frst > div.obj_section.noline > div > div.lst_people_area.height100 > ul > li')
    actor_info = [0, '', '', '']
    movie_actor_info = [mid, 0, '', '']

    for actor in actors:
        ak_name = actor.select_one('div > a')
        if ak_name is not None:

            if ak_name.attrs['href'].find('code=') != -1:
                aid = int(ak_name.attrs['href'].split('code=')[1])
                actor_info[0] = aid
                actor_info[1] = ak_name.text
                movie_actor_info[1] = aid

        ae_name = actor.select_one('div > em')
        actor_info[2] = ae_name.text if ae_name is not None else ''

        a_image = actor.select_one('p > a > img')
        actor_info[3] = a_image.attrs['src'] if a_image is not None else ''
        actorDataBuffer.append(tuple(actor_info))
        actor_info = [0, '', '', '']

        part = actor.select_one('div > div > p > em')
        movie_actor_info[2] = part.text if part is not None else ''
        role = actor.select_one('div > div > p > span')
        movie_actor_info[3] = role.text if role is not None else ''

        movieActorBuffer.append(tuple(movie_actor_info))
        movie_actor_info = [mid, 0, '', '']

    directors = soup.select(
        '#content > div.article > div.section_group.section_group_frst > div.obj_section > div > div.dir_obj')
    dir_info = [0, '', '', '']
    movie_dir_info = [mid, 0]

    for director in directors:
        d_link = director.select_one('p > a')
        if d_link is not None:

            if d_link.attrs['href'].find('code=') != -1:
                did = int(d_link.attrs['href'].split('code=')[1])
                dir_info[0] = did
                movie_dir_info[1] = did

        dk_name = director.select_one('div > a')
        dir_info[1] = dk_name.text if dk_name is not None else ''

        de_name = director.select_one('div > em')
        dir_info[2] = de_name.text if de_name is not None else ''

        d_image = director.select_one('p > a > img')
        dir_info[3] = d_image.attrs['src'] if d_image is not None else ''

        directorDataBuffer.append(tuple(dir_info))
        dir_info = [0, '', '', '']

        movieDirectorBuffer.append(tuple(movie_dir_info))
        movie_dir_info = [mid, 0]


def parse_mid_from_url(url):
    tmp = url.split('code=')
    return int(tmp[1])


def fault_handler(mid, e, conn, cur, fault_location):
    global i
    i += 1
    print(i, mid, e, fault_location)

    if fault_location == 1:
        movieDataBuffer.clear()
    elif fault_location == 2:
        actorDataBuffer.clear()
    elif fault_location == 3:
        directorDataBuffer.clear()
    elif fault_location == 4:
        movieActorBuffer.clear()
    elif fault_location == 5:
        movieDirectorBuffer.clear()
    elif fault_location == 6:
        genreDataBuffer.clear()
    elif fault_location == 7:
        movieSceneBuffer.clear()
    elif fault_location == 8:
        movieReviewBuffer.clear()


def fault_handler_main(mid, e, conn, cur):
    print("fault at main")


def insert_into_table(mid):
    global movieDataBuffer
    global genreDataBuffer
    global actorDataBuffer
    global directorDataBuffer
    global movieActorBuffer
    global movieDirectorBuffer
    global movieSceneBuffer

    conn, cur = dbManage.open_db()

    insert_movie(mid, conn, cur)
    insert_movie_review(mid, conn, cur)
    insert_actor(mid, conn, cur)
    insert_director(mid, conn, cur)
    insert_movie_actor(mid, conn, cur)
    insert_movie_director(mid, conn, cur)
    insert_movie_genre(mid, conn, cur)
    insert_movie_scene(mid, conn, cur)

    dbManage.close_db(conn, cur)


def insert_movie(mid, conn, cur):
    if len(movieDataBuffer) == 0:
        return

    insert_sql_movie = """
    insert ignore into movie (mid, m_name, m_rate, m_netizen_rate, m_netizen_count, m_journalist_score, m_journalist_count, m_playing_time, m_opening_date, m_image, m_synopsis)
    values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

    try:
        cur.executemany(insert_sql_movie, movieDataBuffer)
        conn.commit()
        movieDataBuffer.clear()
    except Exception as e:
        fault_handler(mid, e, conn, cur, 1)


def insert_movie_review(mid, conn, cur):
    if len(movieReviewBuffer) == 0:
        return

    insert_sql_movie_review = """insert ignore into movie_review (rid, mid, r_date, r_user_name, r_recommended, r_title, r_contents)
    values(%s, %s, %s, %s, %s, %s, %s)"""

    try:
        cur.executemany(insert_sql_movie_review, movieReviewBuffer)
        conn.commit()
    except Exception as e:
        print(movieReviewBuffer)
        fault_handler(mid, e, conn, cur, 1)

    movieReviewBuffer.clear()


def insert_actor(mid, conn, cur):
    if len(actorDataBuffer) == 0:
        return
    insert_sql_actor = """
    insert ignore into actor (aid, ak_name, ae_name, a_image)
    values(%s, %s, %s, %s)
    """
    for a in actorDataBuffer:
        try:
            b = [a]
            cur.executemany(insert_sql_actor, b)
            conn.commit()
        except Exception as e:
            print(actorDataBuffer)
            fault_handler(mid, e, conn, cur, 2)


def insert_director(mid, conn, cur):
    if len(directorDataBuffer) == 0:
        return
    insert_sql_director = """
    insert ignore into director (did, dk_name, de_name, d_image)
    values(%s, %s, %s, %s)
    """

    try:
        cur.executemany(insert_sql_director, directorDataBuffer)
        conn.commit()
        directorDataBuffer.clear()

    except Exception as e:
        fault_handler(mid, e, conn, cur, 3)


def insert_movie_actor(mid, conn, cur):

    if len(movieActorBuffer) == 0:
        return

    insert_sql_movie_actor = """
    insert ignore into movie_actor (mid, aid, part, role)
    values(%s, %s, %s, %s)
    """

    try:
        cur.executemany(insert_sql_movie_actor, movieActorBuffer)
        conn.commit()
        movieActorBuffer.clear()
    except Exception as e:
        print("movieActorBuffer", movieActorBuffer)
        fault_handler(mid, e, conn, cur, 4)


def insert_movie_director(mid, conn, cur):

    if len(movieDirectorBuffer) == 0:
        return

    insert_sql_movie_director = """
    insert ignore into movie_director (mid, did)
    values(%s, %s)
    """

    try:
        cur.executemany(insert_sql_movie_director, movieDirectorBuffer)
        conn.commit()
        movieDirectorBuffer.clear()

    except Exception as e:
        fault_handler(mid, e, conn, cur, 5)


def insert_movie_genre(mid, conn, cur):

    if len(genreDataBuffer) == 0:
        return
    insert_sql_movie_genre = """
    insert ignore into movie_genre(mid, gid)
    values(%s, %s)
    """

    try:
        cur.executemany(insert_sql_movie_genre, genreDataBuffer)
        conn.commit()
        genreDataBuffer.clear()

    except Exception as e:
        fault_handler(mid, e, conn, cur, 6)


def insert_movie_scene(mid, conn, cur):
    if len(movieSceneBuffer) == 0:
        return
    insert_sql_movie_scene = """
    insert ignore into movie_scene (mid, ms_scene)
    values(%s, %s)
    """

    try:
        cur.executemany(insert_sql_movie_scene, movieSceneBuffer)
        conn.commit()
        movieSceneBuffer.clear()

    except Exception as e:
        fault_handler(mid, e, conn, cur, 7)


def login():
    login_btn = driver.find_element(
        by=By.CSS_SELECTOR, value='#gnb_login_button')
    login_btn.click()

    naver_id = credential.naver_id
    naver_pw = credential.naver_pw

    element_id = driver.find_element_by_id('id')
    element_id.click()
    pyperclip.copy(naver_id)
    element_id.send_keys(Keys.COMMAND + 'v')
    time.sleep(1)

    element_pw = driver.find_element_by_id('pw')
    element_pw.click()
    element_pw.click()
    pyperclip.copy(naver_pw)
    element_pw.send_keys(Keys.COMMAND + 'v')
    time.sleep(1)

    driver.find_element_by_id('log.login').click()
    time.sleep(1)


def main():

    conn, cur = dbManage.open_db()

    url = 'https://movie.naver.com/movie/sdb/browsing/bmovie_open.naver'
    driver.get(url)
    login()
    year_directory = driver.find_elements(
        by=By.XPATH, value='//*[@id="old_content"]/table/tbody/tr/td/a')
    for current_year in year_directory[:12]:
        current_year.send_keys(Keys.COMMAND + '\n')
        driver.switch_to.window(driver.window_handles[1])

        while True:
            movie_directory = driver.find_elements(
                by=By.XPATH, value='//*[@id="old_content"]/ul/li')

            for current_movie in movie_directory:
                movie_info_link = current_movie.find_element(
                    by=By.CSS_SELECTOR, value='a')
                movie_info_link.send_keys(Keys.COMMAND + '\n')
                driver.switch_to.window(driver.window_handles[2])

                try:
                    mid = parse_mid_from_url(driver.current_url)
                    print(mid)
                    crawl_movie_info(mid)
                    crawl_movie_review(mid)
                    crawl_movie_scene(mid)

                    actor_link = driver.find_element(
                        by=By.XPATH, value='//*[@id="movieEndTabMenu"]/li[2]/a')
                    actor_link.send_keys(Keys.COMMAND + '\n')
                    driver.switch_to.window(driver.window_handles[3])
                    crawl_actor_director_info_from_mid(mid)
                    driver.close()
                    driver.switch_to.window(driver.window_handles[2])

                    insert_into_table(mid)

                except Exception as e:
                    fault_handler_main(parse_mid_from_url(
                        driver.current_url), e, conn, cur)

                driver.close()
                driver.switch_to.window(driver.window_handles[1])

            if not driver.find_elements(by=By.CSS_SELECTOR, value='#old_content > div.pagenavigation > table > tbody > tr > td.next > a'):
                break
            else:
                driver.find_element(
                    by=By.CSS_SELECTOR, value='#old_content > div.pagenavigation > table > tbody > tr > td.next > a').click()

        driver.close()
        driver.switch_to.window(driver.window_handles[0])

    dbManage.close_db(conn, cur)
    driver.quit()


if __name__ == '__main__':
    main()
