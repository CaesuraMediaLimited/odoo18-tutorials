# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, api, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools.float_utils import float_compare, float_is_zero, float_round

class SalesPeople(models.Model):
   _inherit = 'res.users'
   _description = 'Sales People'

   name            = fields.Char (string="Name")
   is_sales_person = fields.Boolean(string="Sales Person")

