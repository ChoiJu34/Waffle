# Generated by Django 4.2.5 on 2023-09-13 06:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.CharField(blank=True, max_length=45, null=True)),
                ('name', models.CharField(blank=True, max_length=45, null=True)),
                ('account_number', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'account',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AccountHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_date', models.CharField(blank=True, max_length=45, null=True)),
                ('place', models.CharField(blank=True, max_length=45, null=True)),
                ('money', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'account_history',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Airplane',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=10, null=True)),
                ('code', models.CharField(blank=True, max_length=3, null=True)),
                ('city', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'airplane',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Benefit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('max', models.IntegerField(blank=True, null=True)),
                ('at', models.CharField(blank=True, max_length=45, null=True)),
                ('if_field', models.IntegerField(blank=True, db_column='if', null=True)),
                ('get_percent', models.FloatField(blank=True, null=True)),
                ('get_price', models.IntegerField(blank=True, null=True)),
                ('type', models.IntegerField(blank=True, null=True)),
                ('case', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'benefit',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=45)),
                ('company', models.CharField(max_length=45)),
                ('brand', models.CharField(max_length=10)),
                ('charge', models.CharField(blank=True, max_length=45, null=True)),
                ('img', models.CharField(blank=True, max_length=45, null=True)),
                ('revenue', models.IntegerField(blank=True, null=True)),
                ('annual_fee', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'card',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=45, null=True)),
                ('unit', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'country',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='EmailToken',
            fields=[
                ('id', models.CharField(max_length=15, primary_key=True, serialize=False)),
                ('expired', models.IntegerField(blank=True, null=True)),
                ('expiration_date', models.DateTimeField(blank=True, null=True)),
                ('user_id', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'email_token',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Exchange',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.IntegerField(blank=True, null=True)),
                ('date', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'exchange',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ExchangePerDay',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.IntegerField(blank=True, null=True)),
                ('time', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'exchange_per_day',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='FavoritCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'favorit_card',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='FavoritPakcage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('plane_place', models.CharField(blank=True, max_length=45, null=True)),
                ('plane_time', models.CharField(blank=True, max_length=45, null=True)),
                ('plane_company', models.CharField(blank=True, max_length=45, null=True)),
                ('plan_site', models.CharField(blank=True, max_length=45, null=True)),
                ('plane_price', models.IntegerField(blank=True, null=True)),
                ('hotel_start', models.CharField(blank=True, max_length=45, null=True)),
                ('hotel_end', models.CharField(blank=True, max_length=45, null=True)),
                ('hotel_name', models.CharField(blank=True, max_length=45, null=True)),
                ('hotel_site', models.CharField(blank=True, max_length=45, null=True)),
                ('hotel_price', models.IntegerField(blank=True, null=True)),
                ('origin_price', models.IntegerField(blank=True, null=True)),
                ('discount_price', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'favorit_pakcage',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='PackageBenefit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('get', models.IntegerField(blank=True, null=True)),
                ('type', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'package_benefit',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=45, null=True)),
                ('type', models.IntegerField(blank=True, null=True)),
                ('price', models.IntegerField(blank=True, null=True)),
                ('tip', models.CharField(blank=True, max_length=45, null=True)),
                ('left', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'schedule',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Scheduler',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=45, null=True)),
                ('start_date', models.CharField(blank=True, max_length=45, null=True)),
                ('end_date', models.CharField(blank=True, max_length=45, null=True)),
                ('country', models.CharField(blank=True, max_length=45, null=True)),
                ('final', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'scheduler',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='SplendorInfo',
            fields=[
                ('idx', models.AutoField(primary_key=True, serialize=False)),
                ('nickname', models.CharField(blank=True, max_length=45, null=True)),
                ('client', models.CharField(blank=True, max_length=45, null=True)),
                ('roomcode', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'splendor_info',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='SplendorRoomcode',
            fields=[
                ('idx', models.AutoField(primary_key=True, serialize=False)),
                ('gaming', models.IntegerField(blank=True, null=True)),
                ('roomcode', models.CharField(blank=True, max_length=45, null=True)),
                ('status', models.CharField(blank=True, max_length=45, null=True)),
                ('count', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'splendor_roomcode',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='SplendorServer',
            fields=[
                ('idx', models.AutoField(primary_key=True, serialize=False)),
                ('address', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'splendor_server',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TeamAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=45, null=True)),
                ('account_number', models.IntegerField(blank=True, null=True)),
                ('end_day', models.CharField(blank=True, max_length=45, null=True)),
                ('goal', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'team_account',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TeamMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('master', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'team_member',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TeamName',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'team_name',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=45)),
                ('email', models.CharField(max_length=45)),
                ('password', models.CharField(max_length=200)),
                ('birthday', models.DateTimeField(blank=True, null=True)),
                ('tel', models.CharField(max_length=45)),
                ('refresh_token', models.CharField(blank=True, max_length=45, null=True)),
                ('create_at', models.DateTimeField(blank=True, null=True)),
                ('update_at', models.DateTimeField(blank=True, null=True)),
                ('role', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'user',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UserCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'user_card',
                'managed': False,
            },
        ),
    ]