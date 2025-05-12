# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, api, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools.float_utils import float_compare, float_is_zero, float_round

class ResPartner(models.Model):
    _inherit     = 'res.partner'
    _description = "Inherited res.partner"


    contact_status = fields.Selection (
       [
          ('suspect', 'Suspect'),
          ('prospect', 'Prospect'),
          ('customer', 'Customer'),
       ],
       string   = "Contact Status",
       default  = 'suspect',
    )
    total_est_revenue = fields.Integer('Total Est. Revenue', required=True, default=1)


