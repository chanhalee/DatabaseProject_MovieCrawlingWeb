# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

from scrapy.item import Item, Field


class MovieCrawlerItemMovie(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    mid = scrapy.Field()
    m_name = scrapy.Field()
    m_rate = scrapy.Field()
    m_netizen_rate = scrapy.Field()
    m_netizen_count = scrapy.Field()
    m_journalist_score = scrapy.Field()
    m_journalist_count = scrapy.Field()
    m_playing_time = scrapy.Field()
    m_opening_date = scrapy.Field()
    m_image = scrapy.Field()
    m_synopsis = scrapy.Field()


class MovieCrawlerItemActor(scrapy.Item):
    aid = scrapy.Field()
    ak_name = scrapy.Field()
    ae_name = scrapy.Field()
    a_image = scrapy.Field()


class MovieCrawlerItemDirector(scrapy.Item):
    did = scrapy.Field()
    dk_name = scrapy.Field()
    de_name = scrapy.Field()
    d_image = scrapy.Field()


class MovieCrawlerItemMA(scrapy.Item):
    mid = scrapy.Field()
    aid = scrapy.Field()
    part = scrapy.Field()
    role = scrapy.Field()


class MovieCrawlerItemMD(scrapy.Item):
    mid = scrapy.Field()
    did = scrapy.Field()


class MovieCrawlerItemMP(scrapy.Item):
    mid = scrapy.Field()
    mp_photo = scrapy.Field()


class MovieCrawlerItemMG(scrapy.Item):
    mid = scrapy.Field()
    gid = scrapy.Field()
