# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, api, _, Command

from odoo.exceptions import UserError, ValidationError
from odoo.tools.float_utils import float_compare, float_is_zero, float_round


class EstateAccount(models.Model):
   _inherit = "estate.property"
   _description = "Estate Property Account"

   name = fields.Char('Name', required=True)

   def set_property_sold(self):
      print ("set_property_sold overridden")

      # ~/Odoo18/odoo/addons/l10n_account_edi_ubl_cii_tests/tests/test_xml_ubl_be.py
      # https://github.com/odoo/technical-training-solutions/blob/14.0-core/estate_account/models/estate_property.py
      #
      for prop in self:
         invoice = self.env['account.move'].create({
            'move_type'  : 'out_invoice',
            'partner_id' : prop.buyer_id.id,
            'invoice_line_ids' : [
               Command.create({
                  'name'       : prop.name,
                  'quantity'   : 1.0,
                  'price_unit' : prop.selling_price,
               }),
               Command.create({
                  'name'       : "Tax",
                  'quantity'   : 1.0,
                  'price_unit' : prop.selling_price * 6.0 / 100.0,
               }),
               Command.create({
                  'name'       : 'Admin Fees',
                  'quantity'   : 1.0,
                  'price_unit' : 100.00,
               })
            ],
         })
      return super().set_property_sold()
