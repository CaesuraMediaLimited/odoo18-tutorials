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
        'contacts'
    ],
    'data'         : [
       'security/ir.model.access.csv',
       'views/training_task_views.xml'
    ],
    'demo'         : [
    ],
    'css'          : ['static/src/css/crm.css'],
    'installable'  : True,
    'application'  : True,
    'auto_install' : False
}
