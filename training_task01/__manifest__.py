# -*- coding                    : utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name'         : 'TrainingTask',
    'version'      : '1.0',
    'category'     : 'Sales/TrainingTask',
    'sequence'     : 15,
    'summary'      : 'Training Task',
    'description'  : "",
    'website'      : 'https://www.odoo.com/page/trainingtask',
    'depends'      : [
        'base',
        'account',
        'contacts',
        'crm',
        'sale'
    ],
    'data'         : [
       'security/groups.xml',
       'security/ir.model.access.csv',
       'views/training_task_views.xml',
       'views/training_task_menus.xml',
       'views/res_partner_views.xml',
       'views/customer_grades_views.xml',
       'views/res_users_views.xml',
       'views/sale_order_view.xml'
    ],
    'demo'         : [
    ],
    'css'          : ['static/src/css/crm.css'],
    'installable'  : True,
    'application'  : True,
    'auto_install' : False
}

