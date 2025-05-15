# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, api, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools.float_utils import float_compare, float_is_zero, float_round

class AccountMove(models.Model):
   _inherit = 'account.move'

   # Override the invoice_user_id (Salesperson) and make it depend on  this custom module's is_sales_person
   # ~/Odoo18/odoo/addons/account/models/account_move.py
   #
   invoice_user_id = fields.Many2one(
        'res.users',
        string="Salesperson",
        domain="[('is_sales_person', '=', True)]"
   )

   def action_post(self):
      res = super(AccountMove, self).action_post()
      for move in self:
         print (f"1 : move.move_type is {move.move_type}")
         if move.move_type == 'out_invoice' and move.partner_id:
            partner = move.partner_id
            print (f"2 : partner.contact_status is {partner.contact_status}")
            if partner.contact_status != 'customer':
               partner.contact_status = 'customer'
               print (f"3 : partner.contact_status is {partner.contact_status}")
      return res

