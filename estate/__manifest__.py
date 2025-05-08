# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'RealEstate',
    'version': '1.0',
    'category': 'Sales/RealEstate',
    'sequence': 15,
    'summary': 'Real Estate',
    'description': "",
    'website': 'https://www.odoo.com/page/realestate',
    'depends': [
        'base',
    ],
    'data': [
       'security/ir.model.access.csv',
       'views/estate_property_offer_views.xml',
       'views/estate_property_views.xml',
       'views/estate_property_type_views.xml',
       'views/estate_property_tag_views.xml',
       'views/estate_menus.xml',
       'views/res_users_views.xml'
    ],
    'demo': [
    ],
    'css': ['static/src/css/crm.css'],
    'installable': True,
    'application': True,
    'auto_install': False
}
