# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, api, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools.float_utils import float_compare, float_is_zero, float_round


class EstateAccount(models.Model):
   _inherit = "estate.property"
   _description = "Estate Property Account"

   name = fields.Char('Name', required=True)

   def set_property_sold(self):
      print ("set_property_sold overridden")
      for prop in self:
         invoice = self.env['account.move'].create({
            'move_type'  : 'out_invoice',
            'partner_id' : prop.buyer_id.id
         })
      return super().set_property_sold()
