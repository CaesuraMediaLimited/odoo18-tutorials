# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, api, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools.float_utils import float_compare, float_is_zero, float_round

class CustomerGrades(models.Model):
   _name        = 'res.partner.grades'
   _description = 'Customer Grades'

   name    = fields.Char (string='Name',    required=True)
   minimum = fields.Float(string='Minimum', required=True)
   maximum = fields.Float(string='Maximum', required=True)
