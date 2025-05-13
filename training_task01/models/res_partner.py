# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, api, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools.float_utils import float_compare, float_is_zero, float_round

class ResPartner(models.Model):
   _inherit     = 'res.partner'
   _description = "Inherited res.partner"

   # Set readonly in the UI, not here as the Python needs to change it.
   #
   contact_status = fields.Selection (
      [
         ('suspect', 'Suspect'),
         ('prospect', 'Prospect'),
         ('customer', 'Customer'),
      ],
      string   = "Contact Status",
      default  = 'suspect',
   )
   total_est_revenue   = fields.Float    ('Total Est. Revenue', required=True, default=0.0)
   customer_grades_id  = fields.Many2many("res.partner.grades", string="Customer Grades")

   @api.onchange('total_est_revenue')
   def _onchange_total_est_revenue(self):
      for partner in self:
         if partner.total_est_revenue and partner.contact_status == 'suspect':
            partner.contact_status = 'prospect'





