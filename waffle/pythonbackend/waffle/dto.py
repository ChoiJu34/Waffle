
class Plane:
    def __init__(self, date, name, startPlace, startTime, endPlace, endTime, card, originPrice, discountPrice, layover, long, site, companyImg):
        self.date = date
        self.name = name
        self.startPlace = startPlace
        self.startTime = startTime
        self.endPlace = endPlace
        self.endTime = endTime
        self.card = card
        self.originPrice = originPrice
        self.discountPrice = discountPrice
        self.layover = layover
        self.long = long
        self.site = site
        self.companyImg = companyImg

    def __lt__(self, other):
        return self.discountPrice < other.discountPrice


class Hotel:
    def __init__(self, name, start, end, card, originPrice, discountPrice, url, img, site):
        self.name = name
        self.start = start
        self.end = end
        self.card = card
        self.originPrice = originPrice
        self.discountPrice = discountPrice
        self.url = url
        self.img = img
        self.site = site

    def __lt__(self, other):
        return self.discountPrice < other.discountPrice