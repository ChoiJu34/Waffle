
class Plane:
    def __init__(self, date, name, startPlace, startTime, endPlace, endTime, card, originPrice, discountPrice, layover, long, site):
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

    def __lt__(self, other):
        return self.discountPrice > other.discountPrice


class Hotel:
    def __init__(self, name, price, url, img):
        self.name = name
        self.price = price
        self.url = url
        self.img = img

    def __lt__(self, other):
        return self.price > other.price