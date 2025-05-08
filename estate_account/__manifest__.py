# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'RealEstateAccount',
    'version': '1.0',
    'category': 'Sales/RealEstate',
    'sequence': 15,
    'summary': 'Real Estate Account',
    'description': "",
    'website': 'https://www.odoo.com/page/realestate',
    'depends': [
        'base',
        'account',
        'estate'
    ],
    'data': [
       'security/ir.model.access.csv'
    ],
    'demo': [
    ],
    'css': ['static/src/css/crm.css'],
    'installable': True,
    'application': True,
    'auto_install': False
}
