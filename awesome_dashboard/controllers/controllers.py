# -*- coding: utf-8 -*-

import logging
import random
import json

from odoo import http
from odoo.http import request

logger = logging.getLogger(__name__)

class AwesomeDashboard(http.Controller):
    @http.route('/awesome_dashboard/statistics', type='json', auth='user')
    def get_statistics(self):
        """
        Returns a dict of statistics about the orders:
            'average_quantity': the average number of t-shirts by order
            'average_time': the average time (in hours) elapsed between the
                moment an order is created, and the moment is it sent
            'nb_cancelled_orders': the number of cancelled orders, this month
            'nb_new_orders': the number of new orders, this month
            'total_amount': the total amount of orders, this month
        """

        return {
            'average_quantity': random.randint(4, 12),
            'average_time': random.randint(4, 123),
            'nb_cancelled_orders': random.randint(0, 50),
            'nb_new_orders': random.randint(10, 200),
            'orders_by_size': {
                'm': random.randint(0, 150),
                's': random.randint(0, 150),
                'xl': random.randint(0, 150),
            },
            'total_amount': random.randint(100, 1000)
        }

    @http.route('/awesome_dashboard/save_settings', type='json', auth='user')
    def save_dashboard_settings(self, selectedIds):
        user = request.env.user
        user.dashboard_config = json.dumps(selectedIds)
        return {'status': 'ok'}

    @http.route('/awesome_dashboard/load_settings', type='json', auth='user')
    def load_dashboard_settings(self):
        user = request.env.user
        if user.dashboard_config:
           return {'settings' : json.loads(user.dashboard_config), 'status': 'ok'}
        else:
           return {'status': 'ok'}


