from django.db import models

class Account(models.Model):
    start_date = models.CharField(max_length=45, blank=True, null=True)
    name = models.CharField(max_length=45, blank=True, null=True)
    account_number = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'account'


class AccountHistory(models.Model):
    account = models.ForeignKey(Account, models.DO_NOTHING)
    create_date = models.CharField(max_length=45, blank=True, null=True)
    place = models.CharField(max_length=45, blank=True, null=True)
    money = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'account_history'


class Airplane(models.Model):
    name = models.CharField(max_length=10, blank=True, null=True)
    code = models.CharField(max_length=3, blank=True, null=True)
    city = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'airplane'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Benefit(models.Model):
    max = models.IntegerField(blank=True, null=True)
    at = models.CharField(max_length=45, blank=True, null=True)
    if_field = models.IntegerField(db_column='if', blank=True, null=True)  # Field renamed because it was a Python reserved word.
    get_percent = models.FloatField(blank=True, null=True)
    get_price = models.IntegerField(blank=True, null=True)
    type = models.IntegerField(blank=True, null=True)
    card = models.ForeignKey('Card', models.DO_NOTHING)
    case = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'benefit'


class Card(models.Model):
    name = models.CharField(max_length=45)
    company = models.CharField(max_length=45)
    brand = models.CharField(max_length=10)
    charge = models.CharField(max_length=45, blank=True, null=True)
    img = models.CharField(max_length=45, blank=True, null=True)
    revenue = models.IntegerField(blank=True, null=True)
    annual_fee = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'card'


class Country(models.Model):
    name = models.CharField(max_length=45, blank=True, null=True)
    unit = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'country'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class EmailToken(models.Model):
    id = models.CharField(primary_key=True, max_length=15)
    expired = models.IntegerField(blank=True, null=True)
    expiration_date = models.DateTimeField(blank=True, null=True)
    user_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'email_token'


class Exchange(models.Model):
    price = models.IntegerField(blank=True, null=True)
    date = models.CharField(max_length=45, blank=True, null=True)
    country = models.ForeignKey(Country, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'exchange'


class ExchangePerDay(models.Model):
    price = models.IntegerField(blank=True, null=True)
    time = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'exchange_per_day'


class FavoritCard(models.Model):
    user = models.ForeignKey('User', models.DO_NOTHING)
    card = models.ForeignKey(Card, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'favorit_card'


class FavoritPakcage(models.Model):
    plane_place = models.CharField(max_length=45, blank=True, null=True)
    plane_time = models.CharField(max_length=45, blank=True, null=True)
    plane_company = models.CharField(max_length=45, blank=True, null=True)
    plan_site = models.CharField(max_length=45, blank=True, null=True)
    plane_price = models.IntegerField(blank=True, null=True)
    hotel_start = models.CharField(max_length=45, blank=True, null=True)
    hotel_end = models.CharField(max_length=45, blank=True, null=True)
    hotel_name = models.CharField(max_length=45, blank=True, null=True)
    hotel_site = models.CharField(max_length=45, blank=True, null=True)
    hotel_price = models.IntegerField(blank=True, null=True)
    origin_price = models.IntegerField(blank=True, null=True)
    discount_price = models.IntegerField(blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'favorit_pakcage'


class PackageBenefit(models.Model):
    pakcage = models.ForeignKey(FavoritPakcage, models.DO_NOTHING)
    benefit = models.ForeignKey(Benefit, models.DO_NOTHING)
    get = models.IntegerField(blank=True, null=True)
    type = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'package_benefit'


class Plane(models.Model):
    company = models.CharField(max_length=10, blank=True, null=True)
    startplane = models.CharField(db_column='startPlane', max_length=10, blank=True, null=True)  # Field name made lowercase.
    starttime = models.CharField(db_column='startTime', max_length=10, blank=True, null=True)  # Field name made lowercase.
    endplane = models.CharField(db_column='endPlane', max_length=10, blank=True, null=True)  # Field name made lowercase.
    endtime = models.CharField(db_column='endTime', max_length=10, blank=True, null=True)  # Field name made lowercase.
    layover = models.CharField(db_column='layover', max_length=5, blank=True, null=True)  # Field name made lowercase.
    long = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'plane'


class Planecard(models.Model):
    cardname = models.CharField(db_column='cardName', max_length=20, blank=True, null=True)  # Field name made lowercase.
    discountprice = models.IntegerField(db_column='discountPrice', blank=True, null=True)  # Field name made lowercase.
    originprice = models.IntegerField(db_column='originPrice', blank=True, null=True)  # Field name made lowercase.
    plane = models.ForeignKey(Plane, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'planecard'


class Schedule(models.Model):
    name = models.CharField(max_length=45, blank=True, null=True)
    type = models.IntegerField(blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    tip = models.CharField(max_length=45, blank=True, null=True)
    scheduler = models.ForeignKey('Scheduler', models.DO_NOTHING)
    left = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'schedule'


class Scheduler(models.Model):
    user = models.ForeignKey('User', models.DO_NOTHING)
    name = models.CharField(max_length=45, blank=True, null=True)
    start_date = models.CharField(max_length=45, blank=True, null=True)
    end_date = models.CharField(max_length=45, blank=True, null=True)
    country = models.CharField(max_length=45, blank=True, null=True)
    final = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'scheduler'


class TeamAccount(models.Model):
    name = models.CharField(max_length=45, blank=True, null=True)
    account_number = models.IntegerField(blank=True, null=True)
    end_day = models.CharField(max_length=45, blank=True, null=True)
    goal = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'team_account'


class TeamMember(models.Model):
    user = models.ForeignKey('User', models.DO_NOTHING)
    team_account = models.ForeignKey(TeamAccount, models.DO_NOTHING)
    master = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'team_member'


class TeamName(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=45, blank=True, null=True)
    team_account = models.ForeignKey(TeamAccount, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'team_name'


class User(models.Model):
    name = models.CharField(max_length=45)
    email = models.CharField(max_length=45)
    password = models.CharField(max_length=200)
    birthday = models.DateTimeField(blank=True, null=True)
    tel = models.CharField(max_length=45)
    refresh_token = models.CharField(max_length=45, blank=True, null=True)
    create_at = models.DateTimeField(blank=True, null=True)
    update_at = models.DateTimeField(blank=True, null=True)
    role = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'


class UserCard(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING)
    card = models.ForeignKey(Card, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'user_card'

